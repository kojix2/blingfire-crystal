require "../src/blingfire"
require "colorize"

Dir.cd("#{__DIR__}/../spec/fixtures")

# Load the model
model = BlingFire::Model.new("gpt2.bin")

# Get the text
text = "Intelligence is an accident of evolution, and not necessarily an advantage."
puts "- text: #{text.colorize(:green)}"

# Tokenize the text
tokens = model.text_to_ids(text)

# Print the tokens
puts "- text2token: #{tokens.colorize(:green)}"

# Token to text
model = BlingFire::Model.new("gpt2.i2w")

# Print the text
text = model.ids_to_text(tokens)

# Print the text
puts "- token2text: #{text.colorize(:green)}"
