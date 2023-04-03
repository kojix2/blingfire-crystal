require "spec"
require "../src/blingfire/model"

describe BlingFire::Model do
  it "should load a model" do
    model = BlingFire::Model.new("spec/fixtures/gpt2.bin")
    model.should_not be_nil
  end

  it "#test_text_to_words_with_model" do
    model = BlingFire.load_model("spec/fixtures/wbd_chuni.bin")
    text = "This is the Bling-Fire tokenizer. 2007年9月日历表_2007年9月农历阳历一览表-万年历"

    expected = "This is the Bling - Fire tokenizer . 2007 年 9 月 日 历 表 _2007 年 9 月 农 历 阳 历 一 览 表 - 万 年 历"
    model.text_to_words(text).join(" ").should eq(expected)

    expected = "This is the Bling - Fire tokenizer . 2007年9月日历表_2007年9月农历阳历一览表 - 万年历"
    BlingFire.text_to_words(text).join(" ").should eq(expected)

    model.text_to_words_with_offsets(text)
    model.text_to_sentences_with_offsets(text)
  end

  it "#text_to_ids" do
    s = "Эpple pie. How do I renew my virtual smart card?: /Microsoft IT/ 'virtual' smart card certificates for DirectAccess are valid for one year. In order to get to microsoft.com we need to type pi@1.2.1.2."
    model = BlingFire.load_model("spec/fixtures/bert_base_tok.bin")
    expected = [1208, 9397, 2571, 11345, 1012, 2129, 2079, 1045, 20687, 2026, 7484, 6047, 4003, 1029, 1024, 1013, 7513, 2009, 1013, 1005, 7484, 1005, 6047, 4003, 17987, 2005, 3622, 6305, 9623, 2015, 2024, 9398, 2005, 2028, 2095, 1012, 1999, 2344, 2000, 2131, 2000, 7513, 1012, 4012, 2057, 2342, 2000, 2828, 14255, 1030, 1015, 1012, 1016, 1012, 1015, 1012, 1016, 1012, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    model.text_to_ids(s, 128, 100).should eq(expected)

    expected = [1208, 9397, 2571, 11345, 1012, 2129, 2079, 1045, 20687, 2026, 7484, 6047, 4003, 1029, 1024, 1013, 7513, 2009, 1013, 1005, 7484, 1005, 6047, 4003, 17987, 2005, 3622, 6305, 9623, 2015, 2024, 9398, 2005, 2028, 2095, 1012, 1999, 2344, 2000, 2131, 2000, 7513, 1012, 4012, 2057, 2342, 2000, 2828, 14255, 1030, 1015, 1012, 1016, 1012, 1015, 1012, 1016, 1012, 1208, 9397, 2571, 11345, 1012, 2129, 2079, 1045, 20687, 2026, 7484, 6047, 4003, 1029, 1024, 1013, 7513, 2009, 1013, 1005, 7484, 1005, 6047, 4003, 17987, 2005, 3622, 6305, 9623, 2015, 2024, 9398, 2005, 2028, 2095, 1012, 1999, 2344, 2000, 2131, 2000, 7513, 1012, 4012, 2057, 2342, 2000, 2828, 14255, 1030, 1015, 1012, 1016, 1012, 1015, 1012, 1016, 1012, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    model.text_to_ids(s + s, 128, 100).should eq(expected)

    expected = [1208, 9397, 2571, 11345, 1012, 2129, 2079, 1045, 20687, 2026, 7484, 6047, 4003, 1029, 1024, 1013, 7513, 2009, 1013, 1005, 7484, 1005, 6047, 4003, 17987, 2005, 3622, 6305, 9623, 2015, 2024, 9398, 2005, 2028, 2095, 1012, 1999, 2344, 2000, 2131, 2000, 7513, 1012, 4012, 2057, 2342, 2000, 2828, 14255, 1030, 1015, 1012, 1016, 1012, 1015, 1012, 1016, 1012]
    model.text_to_ids(s).should eq(expected)
  end

  it "#text_to_ids_with_offsets" do
    model = BlingFire.load_model("spec/fixtures/bert_base_tok.bin")
    text = "hello world!"
    output = model.text_to_ids_with_offsets(text)
    output.should eq({[7592, 2088, 999], [0, 6, 11], [5, 11, 12]})
  end

  it "#ids_to_text" do
    model = BlingFire.load_model("spec/fixtures/bert_base_cased_tok.i2w")
    model.ids_to_text([1188, 1110, 170, 2774]).should eq("This is a test")
  end

  it "xlnet" do
    model = BlingFire.load_model("spec/fixtures/xlnet.bin")
    model.text_to_ids("hello world!", 4, 100).should eq([24717, 185, 136, 0])
  end

  it "roberta" do
    model = BlingFire.load_model("spec/fixtures/roberta.bin")
    model.text_to_ids("This is a test", 4, 100).should eq([152, 16, 10, 1296])

    ids, start_offsets, end_offsets = model.text_to_ids_with_offsets("This is a test", 4, 100)
    ids.should eq([152, 16, 10, 1296])
    start_offsets.should eq([0, 4, 7, 9])
    end_offsets.should eq([4, 7, 9, 14])
  end

  it "load_model_invalid" do
    expect_raises(BlingFire::Model::ModelError) { BlingFire.load_model("spec/fixtures/invalid.bin") }
  end
end
