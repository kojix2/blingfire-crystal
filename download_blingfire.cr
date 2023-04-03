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

system "wget -nc -P #{__DIR__}/src/blingfire/ #{donwload_url}"
