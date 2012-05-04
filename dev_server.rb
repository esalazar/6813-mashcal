#!/usr/bin/env ruby

require "sinatra"
require "json"

set :public_folder, File.join(File.dirname(__FILE__), "src")
set :views, File.join(File.dirname(__FILE__), "src")

set :port, 6813

get "/" do
  send_file("src/index.html")
end

get "/invite.html" do
  @contacts = {}
  @contacts["B"] = ["Bill Smith", "Bob Jones", "Billy Awesome", "Beyonce"]
  @contacts["D"] = ["Dick Clark (RIP)"]
  @contacts["K"] = ["Kate Upton", "Katy Perry"]
  @contacts["J"] = ["Jennifer Anniston"]
  @contacts["R"] = ["Rihanna"]
  @contacts.each_pair { |k,v| @contacts[k] = v.sort }
  @contact_letters = ["B", "D", "J", "K", "R"].sort
  erb :invite
end

get "/ajax/contacts/:id" do
  contacts = {}
  contacts[:contacts] = ["Bill Smith", "Bob Jones", "Billy Awesome",
                         "Kate Upton", "Rihanna", "Dick Clark (RIP)",
                         "Jennifer Anniston", "Katy Perry", "Beyonce"]
  contacts.to_json
end

