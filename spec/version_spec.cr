require "spec"
require "../src/blingfire/version"

describe BlingFire do
  it "should be a string" do
    BlingFire::VERSION.should match(/\d+\.\d+\.\d+/)
  end
  it "should be a string" do
    BlingFire::SOURCE_URL.should be_a(String)
  end
end
