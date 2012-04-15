#!/usr/bin/env ruby

require "sinatra"

set :public_folder, File.join(File.dirname(__FILE__), "src")

get /^\/[^\/]*$/ do
  send_file("src/index.html")
end

