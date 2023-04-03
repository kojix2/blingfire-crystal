# BlingFire for Crystal

[![build](https://github.com/kojix2/blingfire-crystal/actions/workflows/build.yml/badge.svg)](https://github.com/kojix2/blingfire-crystal/actions/workflows/build.yml)

This is a Crystal port of the [blingfire-ruby](https://github.com/ankane/blingfire-ruby). This port aims to bring the power of [BlingFire](https://github.com/microsoft/BlingFire) tokenizers to Crystalists. This library allows you to run GPT-2 tokenization compatible with [ChatGPT](https://chat.openai.com/).

## Installation

```sh
git clone https://github.com/kojix2/blingfire-crystal
crystal run downloader.cr
crystal spec
```

downloader.cr downloads compiled libraries from [ankane/ml-builds](https://github.com/ankane/ml-builds). It also downloads [some models](https://github.com/microsoft/BlingFire/tree/master/dist-pypi/blingfire) from the official BlingFire repository.

## example

See gpt2.cr in example directory

```crystal
require "../src/blingfire"

# Load the model
model = BlingFire::Model.new("gpt2.bin")

# Get the text
text = "Intelligence is an accident of evolution, and not necessarily an advantage."

# Tokenize the text
tokens = model.text_to_ids(text)

# Print the tokens
puts tokens

# Token to text
model = BlingFire::Model.new("gpt2.i2w")

# Print the text
text = model.ids_to_text(tokens)

# Print the text
puts text
```

## Documentation

- [blingfire-crystal](https://kojix2.github.io/blingfire-crystal/)

## Development

This port is a hurried work based on ankane/blingfire-ruby. It has passed basic tests, but there might still exist some undiscovered bugs. Please use it with care and report any issues you find. Pull requests and forks are much appreciated.

## License

This project is licensed under the MIT License. Please see the [LICENSE](LICENSE) file for more information.
