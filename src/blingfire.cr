require "./blingfire/libblingfire"
require "./blingfire/model"
require "./blingfire/version"

module BlingFire
  extend self

  def lib_version
    LibBlingFire.GetBlingFireTokVersion
  end

  def load_model(model_path)
    Model.new(model_path)
  end

  def text_to_words(text)
    text_to(text, " ") do |t, o, size|
      LibBlingFire.TextToWords(t, t.bytesize, o, size)
    end
  end

  def text_to_words_with_model(model, text)
    text_to(text, " ") do |t, o, size|
      LibBlingFire.TextToWordsWithModel(t, t.bytesize, o, size, model)
    end
  end

  def text_to_words_with_offsets(text)
    text_to_with_offsets(text, " ") do |t, o, start_offsets, end_offsets, size|
      LibBlingFire.TextToWordsWithOffsets(t, t.bytesize, o, start_offsets, end_offsets, size)
    end
  end

  def text_to_words_with_offsets_with_model(model, text)
    text_to_with_offsets(text, " ") do |t, o, start_offsets, end_offsets, size|
      LibBlingFire.TextToWordsWithOffsetsWithModel(t, t.bytesize, o, start_offsets, end_offsets, size, model)
    end
  end

  def text_to_sentences(text)
    text_to(text, "\n") do |t, o, size|
      LibBlingFire.TextToSentences(t, t.bytesize, o, size)
    end
  end

  def text_to_sentences_with_model(model, text)
    text_to(text, "\n") do |t, o, size|
      LibBlingFire.TextToSentencesWithModel(t, t.bytesize, o, size, model)
    end
  end

  def text_to_sentences_with_offsets(text)
    text_to_with_offsets(text, "\n") do |t, o, start_offsets, end_offsets, size|
      LibBlingFire.TextToSentencesWithOffsets(t, t.bytesize, o, start_offsets, end_offsets, size)
    end
  end

  def text_to_sentences_with_offsets_with_model(model, text)
    text_to_with_offsets(text, "\n") do |t, o, start_offsets, end_offsets, size|
      LibBlingFire.TextToSentencesWithOffsetsWithModel(t, t.bytesize, o, start_offsets, end_offsets, size, model)
    end
  end

  def text_to_ids(model, text, max_len = nil, unk_id = 0)
    t = text.encode("UTF-8")
    size = (max_len || t.bytesize)
    ids = Pointer(Int32).malloc(size)
    out_size = LibBlingFire.TextToIds(model, t, t.bytesize, ids, size, unk_id)
    check_status out_size, size
    Array(Int32).new(max_len || out_size) { |i| ids[i] }
  end

  def text_to_ids_with_offsets(model, text, max_len = nil, unk_id = 0)
    t = text.encode("UTF-8")
    size = (max_len || t.bytesize)
    ids = Pointer(Int32).malloc(size)
    start_offsets = Pointer(Int32).malloc(size)
    end_offsets = Pointer(Int32).malloc(size)
    out_size = LibBlingFire.TextToIdsWithOffsets(model, t, t.bytesize, ids, start_offsets, end_offsets, size, unk_id)
    check_status out_size, size
    result = Array(Int32).new(max_len || out_size) { |i| ids[i] }
    offsets = unpack_offsets(start_offsets, end_offsets, result, text)
    {result, *offsets}
  end

  def ids_to_text(model, ids, skip_special_tokens = true, output_buffer_size = nil)
    output_buffer_size ||= ids.size * 6
    o = Pointer(UInt8).malloc(output_buffer_size)
    out_size = LibBlingFire.IdsToText(model, ids, ids.size, o, output_buffer_size, skip_special_tokens)
    check_status out_size, ids.size * 48
    String.new(o, out_size - 1)
  end

  def free_model(model)
    LibBlingFire.FreeModel(model)
  end

  def normalize_spaces(text)
    u_space = 0x20
    t = text.encode("UTF-8")
    size = [text.bytesize * 1.5, 20].max.to_i
    o = Pointer(UInt8).malloc(size)
    out_size = LibBlingFire.NormalizeSpaces(t, t.bytesize, o, size, u_space)
    check_status out_size, size
    String.new(o, out_size)
  end

  private def text_to(text, sep)
    t = text.encode("UTF-8")
    size = [t.bytesize * 3, 20].max
    o = Pointer(UInt8).malloc(size)
    out_size = yield(t, o, size)
    check_status out_size, size
    String.new(o, out_size - 1).split(sep)
  end

  private def text_to_with_offsets(text, sep)
    t = text.encode("UTF-8")
    size = [t.bytesize * 3, 20].max
    o = Pointer(UInt8).malloc(size)

    start_offsets = Pointer(Int32).malloc(size)
    end_offsets = Pointer(Int32).malloc(size)
    out_size = yield(t, o, start_offsets, end_offsets, size)
    check_status out_size, size
    result = String.new(o, out_size - 1).split(sep)
    offsets = unpack_offsets(start_offsets, end_offsets, result, text)
    {result, *offsets}
  end

  private def unpack_offsets(start_offsets, end_offsets, result, text)
    start_bytes = Array(Int32).new(result.size) { |i| start_offsets[i] }
    end_bytes = Array(Int32).new(result.size) { |i| end_offsets[i] }
    starts = [] of Int32
    ends = [] of Int32

    pos = 0
    starts_index = 0
    ends_index = 0

    text.each_char.with_index do |c, i|
      while starts_index < start_bytes.size && (pos == start_bytes[starts_index] || start_bytes[starts_index] == -1)
        starts << i
        starts_index += 1
      end
      pos += c.bytesize
      while ends_index < end_bytes.size && pos - 1 == end_bytes[ends_index]
        ends << i + 1
        ends_index += 1
      end
    end

    {starts, ends}
  end

  private def check_status(ret, size)
    raise "BlingFire error" if ret < 0 || ret > size
  end
end
