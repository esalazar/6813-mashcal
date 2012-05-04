#!/usr/bin/env ruby

require "sinatra"
require 'sinatra/flash'
require "json"
require "sequel"

DB = Sequel.connect("sqlite://mashcal.db")

set :public_folder, File.join(File.dirname(__FILE__), "src")
set :views, File.join(File.dirname(__FILE__), "src")

set :port, 6813

enable :sessions

get "/" do
  if session[:user]
    send_file("src/index.html")
  else
    erb :login
  end
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

post "/ajax/login" do
  user = DB[:user].filter(:username => params[:username]).first
  if !user.nil? && user[:password] == params[:password]
    session[:user] = user
  else
    flash[:error] = "Invalid username or password"
  end
  redirect "/"
end

post "/ajax/logout" do
  session[:user] = nil
end
