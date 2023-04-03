require "spec"
require "../src/blingfire"

describe BlingFire do
  describe "#lib_version" do
    it "should return a string" do
      BlingFire.lib_version.should be_a(Int32)
    end
  end

  it "#text_to_words" do
    text = "This is the Bling-Fire tokenizer"
    output = BlingFire.text_to_words(text)
    output.join(" ").should eq "This is the Bling - Fire tokenizer"
  end

  it "#text_to_words_with_offsets" do
    text = "hello world!"
    output = BlingFire.text_to_words_with_offsets(text)
    output.should eq({["hello", "world", "!"], [0, 6, 11], [5, 11, 12]})
  end

  it "#text_to_words_with_offsets utf_8" do
    text = "“ hello ”"
    output = BlingFire.text_to_words_with_offsets(text)
    output.should eq({["“", "hello", "”"], [0, 2, 8], [1, 7, 9]})
  end

  it "#text_to_sentences" do
    text = "In order to login to Café use pi@1.2.1.2. Split the data into train/test with a test size of 20% then use recurrent model (use LSTM or GRU)."
    expected = ["In order to login to Café use pi@1.2.1.2.", "Split the data into train/test with a test size of 20% then use recurrent model (use LSTM or GRU)."]
    output = BlingFire.text_to_sentences(text)
    output.should eq expected

    expected = ["In order to login to Café use pi@1.2.1.2.", "Split the data into train/test with a test size of 20% then use recurrent model (use LSTM or GRU)."]
    output = BlingFire.text_to_sentences(text)
    output.should eq expected
  end

  it "#test_text_to_sentences_with_offsets" do
    text = "This is one sentence. Another sentence."
    output = BlingFire.text_to_sentences_with_offsets(text)
    expected = {["This is one sentence.", "Another sentence."], [0, 22], [21, 39]}
    output.should eq expected
  end

  it "#text_to_words_multiple_spaces" do
    text = "hello   world!"
    output = BlingFire.text_to_words(text)
    output.join(" ").should eq "hello world !"
  end

  it "#text_to_sentences_newlines" do
    text = "hello\nworld!"
    output = BlingFire.text_to_sentences(text)
    output.join(" ").should eq "hello world!"
  end

  it "#normalize_spaces" do
    text = "hello   world!"
    output = BlingFire.normalize_spaces(text)
    output.should eq "hello world!"
  end
end
