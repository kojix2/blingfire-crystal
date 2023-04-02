require "./libblingfire"

module BlingFire
  class Model
    class ModelError < Exception; end

    def initialize(path)
      raise ModelError.new("Model file not found: #{path}") unless File.exists?(path)
      @handle = LibBlingFire.LoadModel(path)
    end

    def text_to_words(text)
      BlingFire.text_to_words_with_model(@handle, text)
    end

    def text_to_words_with_offsets(text)
      BlingFire.text_to_words_with_offsets_with_model(@handle, text)
    end

    def text_to_sentences(text)
      BlingFire.text_to_sentences_with_model(@handle, text)
    end

    def text_to_sentences_with_offsets(text)
      BlingFire.text_to_sentences_with_offsets_with_model(@handle, text)
    end

    def text_to_ids(text, max_len = nil, unk_id = 0)
      BlingFire.text_to_ids(@handle, text, max_len, unk_id)
    end

    def text_to_ids_with_offsets(text, max_len = nil, unk_id = 0)
      BlingFire.text_to_ids_with_offsets(@handle, text, max_len, unk_id)
    end

    def ids_to_text(ids, skip_special_tokens = true, output_buffer_size = nil)
      BlingFire.ids_to_text(@handle, ids, skip_special_tokens, output_buffer_size)
    end

    def to_unsafe
      @handle
    end

    def finalize
      LibBlingFire.FreeModel(@handle)
    end
  end
end
