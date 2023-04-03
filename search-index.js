crystal_doc_search_index_callback({"repository_name":"blingfire","body":"# BlingFire for Crystal\n\n[![build](https://github.com/kojix2/blingfire-crystal/actions/workflows/build.yml/badge.svg)](https://github.com/kojix2/blingfire-crystal/actions/workflows/build.yml)\n\nThis is a Crystal port of the [blingfire-ruby](https://github.com/ankane/blingfire-ruby). This port aims to bring the power of [BlingFire](https://github.com/microsoft/BlingFire) tokenizers to Crystalists. This library allows you to run GPT-2 tokenization compatible with [ChatGPT](https://chat.openai.com/).\n\n## Installation\n\n```sh\ngit clone https://github.com/kojix2/blingfire-crystal\ncrystal run downloader.cr\ncrystal spec\n```\n\ndownloader.cr downloads compiled libraries from [ankane/ml-builds](https://github.com/ankane/ml-builds). It also downloads [some models](https://github.com/microsoft/BlingFire/tree/master/dist-pypi/blingfire) from the official BlingFire repository.\n\n## example\n\nSee gpt2.cr in example directory\n\n```crystal\nrequire \"../src/blingfire\"\n\n# Load the model\nmodel = BlingFire::Model.new(\"gpt2.bin\")\n\n# Get the text\ntext = \"Intelligence is an accident of evolution, and not necessarily an advantage.\"\n\n# Tokenize the text\ntokens = model.text_to_ids(text)\n\n# Print the tokens\nputs tokens\n\n# Token to text\nmodel = BlingFire::Model.new(\"gpt2.i2w\")\n\n# Print the text\ntext = model.ids_to_text(tokens)\n\n# Print the text\nputs text\n```\n\n## Documentation\n\n- [blingfire-crystal](https://kojix2.github.io/blingfire-crystal/)\n\n## Development\n\nThis port is a hurried work based on ankane/blingfire-ruby. It has passed basic tests, but there might still exist some undiscovered bugs. Please use it with care and report any issues you find. Pull requests and forks are much appreciated.\n\n## License\n\nThis project is licensed under the MIT License. Please see the [LICENSE](LICENSE) file for more information.\n","program":{"html_id":"blingfire/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"locations":[],"repository_name":"blingfire","program":true,"enum":false,"alias":false,"const":false,"types":[{"html_id":"blingfire/BlingFire","path":"BlingFire.html","kind":"module","full_name":"BlingFire","name":"BlingFire","abstract":false,"locations":[{"filename":"src/blingfire.cr","line_number":5,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L5"},{"filename":"src/blingfire/libblingfire.cr","line_number":1,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/libblingfire.cr#L1"},{"filename":"src/blingfire/model.cr","line_number":3,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L3"},{"filename":"src/blingfire/version.cr","line_number":1,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/version.cr#L1"}],"repository_name":"blingfire","program":false,"enum":false,"alias":false,"const":false,"constants":[{"id":"SOURCE_URL","name":"SOURCE_URL","value":"\"https://github.com/kojix2/blingfire-crystal\""},{"id":"VERSION","name":"VERSION","value":"{{ (`shards version /home/runner/work/blingfire-crystal/blingfire-crystal/src/blingfire`).chomp.stringify }}"}],"extended_modules":[{"html_id":"blingfire/BlingFire","kind":"module","full_name":"BlingFire","name":"BlingFire"}],"instance_methods":[{"html_id":"free_model(model)-instance-method","name":"free_model","abstract":false,"args":[{"name":"model","external_name":"model","restriction":""}],"args_string":"(model)","args_html":"(model)","location":{"filename":"src/blingfire.cr","line_number":94,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L94"},"def":{"name":"free_model","args":[{"name":"model","external_name":"model","restriction":""}],"visibility":"Public","body":"LibBlingFire.FreeModel(model)"}},{"html_id":"ids_to_text(model,ids,skip_special_tokens=true,output_buffer_size=nil)-instance-method","name":"ids_to_text","abstract":false,"args":[{"name":"model","external_name":"model","restriction":""},{"name":"ids","external_name":"ids","restriction":""},{"name":"skip_special_tokens","default_value":"true","external_name":"skip_special_tokens","restriction":""},{"name":"output_buffer_size","default_value":"nil","external_name":"output_buffer_size","restriction":""}],"args_string":"(model, ids, skip_special_tokens = true, output_buffer_size = nil)","args_html":"(model, ids, skip_special_tokens = <span class=\"n\">true</span>, output_buffer_size = <span class=\"n\">nil</span>)","location":{"filename":"src/blingfire.cr","line_number":86,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L86"},"def":{"name":"ids_to_text","args":[{"name":"model","external_name":"model","restriction":""},{"name":"ids","external_name":"ids","restriction":""},{"name":"skip_special_tokens","default_value":"true","external_name":"skip_special_tokens","restriction":""},{"name":"output_buffer_size","default_value":"nil","external_name":"output_buffer_size","restriction":""}],"visibility":"Public","body":"output_buffer_size || (output_buffer_size = ids.size * 6)\no = Pointer(UInt8).malloc(output_buffer_size)\nout_size = LibBlingFire.IdsToText(model, ids, ids.size, o, output_buffer_size, skip_special_tokens)\ncheck_status(out_size, ids.size * 48)\nString.new(o, out_size - 1)\n"}},{"html_id":"lib_version-instance-method","name":"lib_version","abstract":false,"location":{"filename":"src/blingfire.cr","line_number":8,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L8"},"def":{"name":"lib_version","visibility":"Public","body":"LibBlingFire.GetBlingFireTokVersion"}},{"html_id":"load_model(model_path)-instance-method","name":"load_model","abstract":false,"args":[{"name":"model_path","external_name":"model_path","restriction":""}],"args_string":"(model_path)","args_html":"(model_path)","location":{"filename":"src/blingfire.cr","line_number":12,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L12"},"def":{"name":"load_model","args":[{"name":"model_path","external_name":"model_path","restriction":""}],"visibility":"Public","body":"Model.new(model_path)"}},{"html_id":"normalize_spaces(text)-instance-method","name":"normalize_spaces","abstract":false,"args":[{"name":"text","external_name":"text","restriction":""}],"args_string":"(text)","args_html":"(text)","location":{"filename":"src/blingfire.cr","line_number":98,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L98"},"def":{"name":"normalize_spaces","args":[{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"u_space = 32\nt = text.encode(\"UTF-8\")\nsize = [text.bytesize * 1.5, 20].max.to_i\no = Pointer(UInt8).malloc(size)\nout_size = LibBlingFire.NormalizeSpaces(t, t.bytesize, o, size, u_space)\ncheck_status(out_size, size)\nString.new(o, out_size)\n"}},{"html_id":"text_to_ids(model,text,max_len=nil,unk_id=0)-instance-method","name":"text_to_ids","abstract":false,"args":[{"name":"model","external_name":"model","restriction":""},{"name":"text","external_name":"text","restriction":""},{"name":"max_len","default_value":"nil","external_name":"max_len","restriction":""},{"name":"unk_id","default_value":"0","external_name":"unk_id","restriction":""}],"args_string":"(model, text, max_len = nil, unk_id = 0)","args_html":"(model, text, max_len = <span class=\"n\">nil</span>, unk_id = <span class=\"n\">0</span>)","location":{"filename":"src/blingfire.cr","line_number":64,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L64"},"def":{"name":"text_to_ids","args":[{"name":"model","external_name":"model","restriction":""},{"name":"text","external_name":"text","restriction":""},{"name":"max_len","default_value":"nil","external_name":"max_len","restriction":""},{"name":"unk_id","default_value":"0","external_name":"unk_id","restriction":""}],"visibility":"Public","body":"t = text.encode(\"UTF-8\")\nsize = (max_len || t.bytesize)\nids = Pointer(Int32).malloc(size)\nout_size = LibBlingFire.TextToIds(model, t, t.bytesize, ids, size, unk_id)\ncheck_status(out_size, size)\nArray(Int32).new(max_len || out_size) do |i|\n  ids[i]\nend\n"}},{"html_id":"text_to_ids_with_offsets(model,text,max_len=nil,unk_id=0)-instance-method","name":"text_to_ids_with_offsets","abstract":false,"args":[{"name":"model","external_name":"model","restriction":""},{"name":"text","external_name":"text","restriction":""},{"name":"max_len","default_value":"nil","external_name":"max_len","restriction":""},{"name":"unk_id","default_value":"0","external_name":"unk_id","restriction":""}],"args_string":"(model, text, max_len = nil, unk_id = 0)","args_html":"(model, text, max_len = <span class=\"n\">nil</span>, unk_id = <span class=\"n\">0</span>)","location":{"filename":"src/blingfire.cr","line_number":73,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L73"},"def":{"name":"text_to_ids_with_offsets","args":[{"name":"model","external_name":"model","restriction":""},{"name":"text","external_name":"text","restriction":""},{"name":"max_len","default_value":"nil","external_name":"max_len","restriction":""},{"name":"unk_id","default_value":"0","external_name":"unk_id","restriction":""}],"visibility":"Public","body":"t = text.encode(\"UTF-8\")\nsize = (max_len || t.bytesize)\nids = Pointer(Int32).malloc(size)\nstart_offsets = Pointer(Int32).malloc(size)\nend_offsets = Pointer(Int32).malloc(size)\nout_size = LibBlingFire.TextToIdsWithOffsets(model, t, t.bytesize, ids, start_offsets, end_offsets, size, unk_id)\ncheck_status(out_size, size)\nresult = Array(Int32).new(max_len || out_size) do |i|\n  ids[i]\nend\noffsets = unpack_offsets(start_offsets, end_offsets, result, text)\n{result, *offsets}\n"}},{"html_id":"text_to_sentences(text)-instance-method","name":"text_to_sentences","abstract":false,"args":[{"name":"text","external_name":"text","restriction":""}],"args_string":"(text)","args_html":"(text)","location":{"filename":"src/blingfire.cr","line_number":40,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L40"},"def":{"name":"text_to_sentences","args":[{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"text_to(text, \"\\n\") do |t, o, size|\n  LibBlingFire.TextToSentences(t, t.bytesize, o, size)\nend"}},{"html_id":"text_to_sentences_with_model(model,text)-instance-method","name":"text_to_sentences_with_model","abstract":false,"args":[{"name":"model","external_name":"model","restriction":""},{"name":"text","external_name":"text","restriction":""}],"args_string":"(model, text)","args_html":"(model, text)","location":{"filename":"src/blingfire.cr","line_number":46,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L46"},"def":{"name":"text_to_sentences_with_model","args":[{"name":"model","external_name":"model","restriction":""},{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"text_to(text, \"\\n\") do |t, o, size|\n  LibBlingFire.TextToSentencesWithModel(t, t.bytesize, o, size, model)\nend"}},{"html_id":"text_to_sentences_with_offsets(text)-instance-method","name":"text_to_sentences_with_offsets","abstract":false,"args":[{"name":"text","external_name":"text","restriction":""}],"args_string":"(text)","args_html":"(text)","location":{"filename":"src/blingfire.cr","line_number":52,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L52"},"def":{"name":"text_to_sentences_with_offsets","args":[{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"text_to_with_offsets(text, \"\\n\") do |t, o, start_offsets, end_offsets, size|\n  LibBlingFire.TextToSentencesWithOffsets(t, t.bytesize, o, start_offsets, end_offsets, size)\nend"}},{"html_id":"text_to_sentences_with_offsets_with_model(model,text)-instance-method","name":"text_to_sentences_with_offsets_with_model","abstract":false,"args":[{"name":"model","external_name":"model","restriction":""},{"name":"text","external_name":"text","restriction":""}],"args_string":"(model, text)","args_html":"(model, text)","location":{"filename":"src/blingfire.cr","line_number":58,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L58"},"def":{"name":"text_to_sentences_with_offsets_with_model","args":[{"name":"model","external_name":"model","restriction":""},{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"text_to_with_offsets(text, \"\\n\") do |t, o, start_offsets, end_offsets, size|\n  LibBlingFire.TextToSentencesWithOffsetsWithModel(t, t.bytesize, o, start_offsets, end_offsets, size, model)\nend"}},{"html_id":"text_to_words(text)-instance-method","name":"text_to_words","abstract":false,"args":[{"name":"text","external_name":"text","restriction":""}],"args_string":"(text)","args_html":"(text)","location":{"filename":"src/blingfire.cr","line_number":16,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L16"},"def":{"name":"text_to_words","args":[{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"text_to(text, \" \") do |t, o, size|\n  LibBlingFire.TextToWords(t, t.bytesize, o, size)\nend"}},{"html_id":"text_to_words_with_model(model,text)-instance-method","name":"text_to_words_with_model","abstract":false,"args":[{"name":"model","external_name":"model","restriction":""},{"name":"text","external_name":"text","restriction":""}],"args_string":"(model, text)","args_html":"(model, text)","location":{"filename":"src/blingfire.cr","line_number":22,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L22"},"def":{"name":"text_to_words_with_model","args":[{"name":"model","external_name":"model","restriction":""},{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"text_to(text, \" \") do |t, o, size|\n  LibBlingFire.TextToWordsWithModel(t, t.bytesize, o, size, model)\nend"}},{"html_id":"text_to_words_with_offsets(text)-instance-method","name":"text_to_words_with_offsets","abstract":false,"args":[{"name":"text","external_name":"text","restriction":""}],"args_string":"(text)","args_html":"(text)","location":{"filename":"src/blingfire.cr","line_number":28,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L28"},"def":{"name":"text_to_words_with_offsets","args":[{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"text_to_with_offsets(text, \" \") do |t, o, start_offsets, end_offsets, size|\n  LibBlingFire.TextToWordsWithOffsets(t, t.bytesize, o, start_offsets, end_offsets, size)\nend"}},{"html_id":"text_to_words_with_offsets_with_model(model,text)-instance-method","name":"text_to_words_with_offsets_with_model","abstract":false,"args":[{"name":"model","external_name":"model","restriction":""},{"name":"text","external_name":"text","restriction":""}],"args_string":"(model, text)","args_html":"(model, text)","location":{"filename":"src/blingfire.cr","line_number":34,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire.cr#L34"},"def":{"name":"text_to_words_with_offsets_with_model","args":[{"name":"model","external_name":"model","restriction":""},{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"text_to_with_offsets(text, \" \") do |t, o, start_offsets, end_offsets, size|\n  LibBlingFire.TextToWordsWithOffsetsWithModel(t, t.bytesize, o, start_offsets, end_offsets, size, model)\nend"}}],"types":[{"html_id":"blingfire/BlingFire/Model","path":"BlingFire/Model.html","kind":"class","full_name":"BlingFire::Model","name":"Model","abstract":false,"superclass":{"html_id":"blingfire/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"blingfire/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"blingfire/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/blingfire/model.cr","line_number":4,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L4"}],"repository_name":"blingfire","program":false,"enum":false,"alias":false,"const":false,"namespace":{"html_id":"blingfire/BlingFire","kind":"module","full_name":"BlingFire","name":"BlingFire"},"constructors":[{"html_id":"new(path)-class-method","name":"new","abstract":false,"args":[{"name":"path","external_name":"path","restriction":""}],"args_string":"(path)","args_html":"(path)","location":{"filename":"src/blingfire/model.cr","line_number":7,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L7"},"def":{"name":"new","args":[{"name":"path","external_name":"path","restriction":""}],"visibility":"Public","body":"_ = allocate\n_.initialize(path)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"html_id":"finalize-instance-method","name":"finalize","abstract":false,"location":{"filename":"src/blingfire/model.cr","line_number":44,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L44"},"def":{"name":"finalize","visibility":"Public","body":"LibBlingFire.FreeModel(@handle)"}},{"html_id":"ids_to_text(ids,skip_special_tokens=true,output_buffer_size=nil)-instance-method","name":"ids_to_text","abstract":false,"args":[{"name":"ids","external_name":"ids","restriction":""},{"name":"skip_special_tokens","default_value":"true","external_name":"skip_special_tokens","restriction":""},{"name":"output_buffer_size","default_value":"nil","external_name":"output_buffer_size","restriction":""}],"args_string":"(ids, skip_special_tokens = true, output_buffer_size = nil)","args_html":"(ids, skip_special_tokens = <span class=\"n\">true</span>, output_buffer_size = <span class=\"n\">nil</span>)","location":{"filename":"src/blingfire/model.cr","line_number":36,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L36"},"def":{"name":"ids_to_text","args":[{"name":"ids","external_name":"ids","restriction":""},{"name":"skip_special_tokens","default_value":"true","external_name":"skip_special_tokens","restriction":""},{"name":"output_buffer_size","default_value":"nil","external_name":"output_buffer_size","restriction":""}],"visibility":"Public","body":"BlingFire.ids_to_text(@handle, ids, skip_special_tokens, output_buffer_size)"}},{"html_id":"text_to_ids(text,max_len=nil,unk_id=0)-instance-method","name":"text_to_ids","abstract":false,"args":[{"name":"text","external_name":"text","restriction":""},{"name":"max_len","default_value":"nil","external_name":"max_len","restriction":""},{"name":"unk_id","default_value":"0","external_name":"unk_id","restriction":""}],"args_string":"(text, max_len = nil, unk_id = 0)","args_html":"(text, max_len = <span class=\"n\">nil</span>, unk_id = <span class=\"n\">0</span>)","location":{"filename":"src/blingfire/model.cr","line_number":28,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L28"},"def":{"name":"text_to_ids","args":[{"name":"text","external_name":"text","restriction":""},{"name":"max_len","default_value":"nil","external_name":"max_len","restriction":""},{"name":"unk_id","default_value":"0","external_name":"unk_id","restriction":""}],"visibility":"Public","body":"BlingFire.text_to_ids(@handle, text, max_len, unk_id)"}},{"html_id":"text_to_ids_with_offsets(text,max_len=nil,unk_id=0)-instance-method","name":"text_to_ids_with_offsets","abstract":false,"args":[{"name":"text","external_name":"text","restriction":""},{"name":"max_len","default_value":"nil","external_name":"max_len","restriction":""},{"name":"unk_id","default_value":"0","external_name":"unk_id","restriction":""}],"args_string":"(text, max_len = nil, unk_id = 0)","args_html":"(text, max_len = <span class=\"n\">nil</span>, unk_id = <span class=\"n\">0</span>)","location":{"filename":"src/blingfire/model.cr","line_number":32,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L32"},"def":{"name":"text_to_ids_with_offsets","args":[{"name":"text","external_name":"text","restriction":""},{"name":"max_len","default_value":"nil","external_name":"max_len","restriction":""},{"name":"unk_id","default_value":"0","external_name":"unk_id","restriction":""}],"visibility":"Public","body":"BlingFire.text_to_ids_with_offsets(@handle, text, max_len, unk_id)"}},{"html_id":"text_to_sentences(text)-instance-method","name":"text_to_sentences","abstract":false,"args":[{"name":"text","external_name":"text","restriction":""}],"args_string":"(text)","args_html":"(text)","location":{"filename":"src/blingfire/model.cr","line_number":20,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L20"},"def":{"name":"text_to_sentences","args":[{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"BlingFire.text_to_sentences_with_model(@handle, text)"}},{"html_id":"text_to_sentences_with_offsets(text)-instance-method","name":"text_to_sentences_with_offsets","abstract":false,"args":[{"name":"text","external_name":"text","restriction":""}],"args_string":"(text)","args_html":"(text)","location":{"filename":"src/blingfire/model.cr","line_number":24,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L24"},"def":{"name":"text_to_sentences_with_offsets","args":[{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"BlingFire.text_to_sentences_with_offsets_with_model(@handle, text)"}},{"html_id":"text_to_words(text)-instance-method","name":"text_to_words","abstract":false,"args":[{"name":"text","external_name":"text","restriction":""}],"args_string":"(text)","args_html":"(text)","location":{"filename":"src/blingfire/model.cr","line_number":12,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L12"},"def":{"name":"text_to_words","args":[{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"BlingFire.text_to_words_with_model(@handle, text)"}},{"html_id":"text_to_words_with_offsets(text)-instance-method","name":"text_to_words_with_offsets","abstract":false,"args":[{"name":"text","external_name":"text","restriction":""}],"args_string":"(text)","args_html":"(text)","location":{"filename":"src/blingfire/model.cr","line_number":16,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L16"},"def":{"name":"text_to_words_with_offsets","args":[{"name":"text","external_name":"text","restriction":""}],"visibility":"Public","body":"BlingFire.text_to_words_with_offsets_with_model(@handle, text)"}},{"html_id":"to_unsafe:Pointer(Void)-instance-method","name":"to_unsafe","abstract":false,"location":{"filename":"src/blingfire/model.cr","line_number":40,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L40"},"def":{"name":"to_unsafe","visibility":"Public","body":"@handle"}}],"types":[{"html_id":"blingfire/BlingFire/Model/ModelError","path":"BlingFire/Model/ModelError.html","kind":"class","full_name":"BlingFire::Model::ModelError","name":"ModelError","abstract":false,"superclass":{"html_id":"blingfire/Exception","kind":"class","full_name":"Exception","name":"Exception"},"ancestors":[{"html_id":"blingfire/Exception","kind":"class","full_name":"Exception","name":"Exception"},{"html_id":"blingfire/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"blingfire/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/blingfire/model.cr","line_number":5,"url":"https://github.com/kojix2/blingfire-crystal/blob/96f6f0e04384ec3b753496183dc1e99d97961de8/src/blingfire/model.cr#L5"}],"repository_name":"blingfire","program":false,"enum":false,"alias":false,"const":false,"namespace":{"html_id":"blingfire/BlingFire/Model","kind":"class","full_name":"BlingFire::Model","name":"Model"}}]}]}]}})