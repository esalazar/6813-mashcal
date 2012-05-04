#!/usr/bin/env ruby

require "sinatra"
require "json"

set :public_folder, File.join(File.dirname(__FILE__), "src")

set :port, 6813

get /^\/[^\/]*$/ do
  send_file("src/index.html")
end

get "/ajax/contacts/:id" do
  puts "here"
  puts request.path_info
  contacts = {}
  contacts[:contacts] = ["Bill Smith", "Bob Jones", "Billy Awesome",
                         "Kate Upton", "Rihanna", "Dick Clark (RIP)",
                         "Jennifer Anniston", "Katy Perry", "Beyonce"]
  contacts.to_json
end

