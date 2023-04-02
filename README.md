# blingfire-crystal

Port of [blingfire-ruby](https://github.com/ankane/blingfire-ruby) to Crystal

GPT-2 tokenizer (compatible with ChatGPT) that is working well somehow.


```sh
git clone https://github.com/kojix2/blingfire-crystal
crystal run downloader.cr
crystal spec
```

## example

gpt2.cr in example directory

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

Note: This is a port of ankane/blingfire-ruby, which I made in a great hurry. It has passed the minimum testing, but I think there are still some bugs. Please use with caution.

Bug reports are welcome, but pull requests and forks are far more welcome.
