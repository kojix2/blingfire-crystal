module BlingFire
  {% if env("GRDIR") %}
    @[Link(ldflags: "-L #{__DIR__} -l blingfiretokdll -Wl,-rpath,#{__DIR__}")]
  {% else %}
    @[Link("blingfire")]
  {% end %}
  lib LibBlingFire
    # version
    fun GetBlingFireTokVersion : Int32

    # text to sentences
    fun TextToSentencesWithOffsetsWithModel(p_in_utf8_str : UInt8*, in_utf8_str_byte_count : Int32, p_out_utf8_str : UInt8*, p_start_offsets : Int32*, p_end_offsets : Int32*, max_out_utf8_str_byte_count : Int32, h_model : Void*) : Int32
    fun TextToSentencesWithOffsets(p_in_utf8_str : UInt8*, in_utf8_str_byte_count : Int32, p_out_utf8_str : UInt8*, p_start_offsets : Int32*, p_end_offsets : Int32*, max_out_utf8_str_byte_count : Int32) : Int32
    fun TextToSentencesWithModel(p_in_utf8_str : UInt8*, in_utf8_str_byte_count : Int32, p_out_utf8_str : UInt8*, max_out_utf8_str_byte_count : Int32, h_model : Void*) : Int32
    fun TextToSentences(p_in_utf8_str : UInt8*, in_utf8_str_byte_count : Int32, p_out_utf8_str : UInt8*, max_out_utf8_str_byte_count : Int32) : Int32

    # text to words
    fun TextToWordsWithOffsetsWithModel(p_in_utf8_str : UInt8*, in_utf8_str_byte_count : Int32, p_out_utf8_str : UInt8*, p_start_offsets : Int32*, p_end_offsets : Int32*, max_out_utf8_str_byte_count : Int32, h_model : Void*) : Int32
    fun TextToWordsWithOffsets(p_in_utf8_str : UInt8*, in_utf8_str_byte_count : Int32, p_out_utf8_str : UInt8*, p_start_offsets : Int32*, p_end_offsets : Int32*, max_out_utf8_str_byte_count : Int32) : Int32
    fun TextToWordsWithModel(p_in_utf8_str : UInt8*, in_utf8_str_byte_count : Int32, p_out_utf8_str : UInt8*, max_out_utf8_str_byte_count : Int32, h_model : Void*) : Int32
    fun TextToWords(p_in_utf8_str : UInt8*, in_utf8_str_byte_count : Int32, p_out_utf8_str : UInt8*, max_out_utf8_str_byte_count : Int32) : Int32

    # misc
    fun NormalizeSpaces(p_in_utf8_str : UInt8*, in_utf8_str_byte_count : Int32, p_out_utf8_str : UInt8*, max_out_utf8_str_byte_count : Int32, u_space : Int32) : Int32
    fun TextToHashes(p_in_utf8_str : UInt8*, in_utf8_str_byte_count : Int32, p_hash_arr : Int32*, max_hash_arr_length : Int32, word_ngrams : Int32, bucket_size : Int32) : Int32

    # model
    fun LoadModel(p_sz_ldb_file_name : UInt8*) : Void*

    # text to ids
    fun TextToIdsWithOffsets(model_ptr : Void*, p_in_utf8_str : UInt8*, in_utf8_str_byte_count : Int32, p_ids_arr : Int32*, p_start_offsets : Int32*, p_end_offsets : Int32*, max_ids_arr_length : Int32, unk_id : Int32) : Int32
    fun TextToIds(model_ptr : Void*, p_in_utf8_str : UInt8*, in_utf8_str_byte_count : Int32, p_ids_arr : Int32*, max_ids_arr_length : Int32, unk_id : Int32) : Int32

    # free model
    fun FreeModel(model_ptr : Void*) : Int32

    # prefix
    fun SetNoDummyPrefix(model_ptr : Void*, f_no_dummy_prefix : Bool) : Int32

    # ids to text
    fun IdsToText(model_ptr : Void*, p_ids_arr : Int32*, ids_count : Int32, p_out_utf8_str : UInt8*, max_out_utf8_str_byte_count : Int32, skip_special_tokens : Bool) : Int32
  end
end
