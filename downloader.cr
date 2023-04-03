require "./download_blingfire"

filenames =
  [
    "gpt2.bin",
    "gpt2.i2w",
    "wbd_chuni.bin",
    "bert_base_tok.bin",
    "bert_base_cased_tok.i2w",
    "xlnet.bin",
    "roberta.bin",
  ]

filenames.each do |filename|
  system "wget -nc -P #{__DIR__}/spec/fixtures/ https://github.com/microsoft/BlingFire/raw/master/dist-pypi/blingfire/#{filename}"
end
