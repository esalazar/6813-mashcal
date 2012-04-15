#!/usr/bin/env ruby

require "sinatra"

set :public_folder, File.join(File.dirname(__FILE__), "src")

set :port, 6813

get /^\/[^\/]*$/ do
  send_file("src/index.html")
end

