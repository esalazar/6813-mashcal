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
  contacts = []
  DB[:contacts].filter(:from_id => session[:user][:id]).each do |c|
    user = DB[:user].filter(:id => c[:to_id]).first
    contacts << user
  end
  contacts.sort {|a,b| a[:display_name] <=> b[:display_name] }
  @contacts = Hash.new { Array.new }
  contacts.each do |c|
    first_letter = c[:display_name][0]
    @contacts[first_letter] = @contacts[first_letter] << c[:display_name]
  end
  @contact_letters = @contacts.keys.sort
  @event = params[:event]
  erb :invite
end

get "/my_events.html" do
	events = []
	@events = Hash.new { Array.new }
	DB[:event].filter(:creator_id => session[:user][:id]).each do |e|
		events << e
	end
	@events = events
	erb :my_events
end

get "/incoming_events.html" do
	erb :incoming_events
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

post "/ajax/create_event" do
  DB[:event].insert(:title => params[:title],
                    :description => params[:description])
  @event = DB[:event].filter(:title => params[:title],
                    :description => params[:description]).first
  erb :schedule
end

post "/ajax/add_times" do
  params[:times].split(",").each do |time|
    DB[:alloted_time].insert(:start_time => time.to_i,
                             :end_time => time.to_i + 1000 * 60 * 60)
    alloted_time = DB[:alloted_time].filter(:start_time => time.to_i,
                             :end_time => time.to_i + 1000 * 60 * 60)
    DB[:event_to_time].insert(:event_id => params[:event_id].to_i,
                              :alloted_time_id => alloted_time[:id])
  end
  redirect "/invite.html?event=" + params[:event]
end

