donwload_url =
  {% if flag?(:linux) %}
    {% if flag?(:arm) %}
      "https://github.com/ankane/ml-builds/releases/download/blingfire-0.1.8/libblingfiretokdll.arm64.so"
    {% else %}
      "https://github.com/ankane/ml-builds/releases/download/blingfire-0.1.8/libblingfiretokdll.so"
    {% end %}
  {% elsif flag?(:darwin) %}
    {% if flag?(:aarch64) %}
      "https://github.com/ankane/ml-builds/releases/download/blingfire-0.1.8/libblingfiretokdll.arm64.dylib"
    {% else %}
      "https://github.com/ankane/ml-builds/releases/download/blingfire-0.1.8/libblingfiretokdll.dylib"
    {% end %}
  {% elsif flag?(:windows) %}
    "https://github.com/ankane/ml-builds/releases/download/blingfire-0.1.8/blingfiretokdll.dll"
  {% end %}

system "wget -nc -P src/blingfire/ #{donwload_url}"

system "wget -nc -P spec/fixtures/ https://github.com/microsoft/BlingFire/raw/master/dist-pypi/blingfire/gpt2.bin"
system "wget -nc -P spec/fixtures/ https://github.com/microsoft/BlingFire/raw/master/dist-pypi/blingfire/gpt2.i2w"
system "wget -nc -P spec/fixtures/ https://github.com/microsoft/BlingFire/raw/master/dist-pypi/blingfire/wbd_chuni.bin"
system "wget -nc -P spec/fixtures/ https://github.com/microsoft/BlingFire/raw/master/dist-pypi/blingfire/bert_base_tok.bin"
system "wget -nc -P spec/fixtures/ https://github.com/microsoft/BlingFire/raw/master/dist-pypi/blingfire/bert_base_cased_tok.i2w"
system "wget -nc -P spec/fixtures/ https://github.com/microsoft/BlingFire/raw/master/dist-pypi/blingfire/xlnet.bin"
system "wget -nc -P spec/fixtures/ https://github.com/microsoft/BlingFire/raw/master/dist-pypi/blingfire/roberta.bin"
