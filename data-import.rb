#!/usr/bin/env ruby

require "sequel"

DB = Sequel.connect("sqlite://mashcal.db")

DB[:user].insert(:id => 0, :display_name => "Katy Perry", :username => "katy", :password => "boom")
DB[:user].insert(:id => 1, :display_name => "Beyonce Knowles", :username => "hovasgirl", :password => "boom")
DB[:user].insert(:id => 2, :display_name => "Ke$ha", :username => "keshasuxx", :password => "boom")
DB[:user].insert(:id => 3, :display_name => "Jessica Alba", :username => "jalbz", :password => "boom")
DB[:user].insert(:id => 4, :display_name => "Colbie Smulders", :username => "robin", :password => "boom")
DB[:user].insert(:id => 5, :display_name => "Scarlett Johannson", :username => "blackwidow", :password => "boom")
DB[:user].insert(:id => 6, :display_name => "Jennifer Anniston", :username => "rachel", :password => "boom")
DB[:user].insert(:id => 7, :display_name => "Eliza Dushku", :username => "eliza", :password => "boom")
DB[:user].insert(:id => 10, :display_name => "Edgar Salazar", :username => "edgar", :password => "boom")
DB[:user].insert(:id => 11, :display_name => "Ryan Lopopolo", :username => "lopopolo", :password => "boom")
DB[:user].insert(:id => 12, :display_name => "Ulzii", :username => "ulzibay", :password => "boom")

(0..7).each do |id|
  (10..12).each do |uid|
    DB[:contacts].insert({ :from_id => uid, :to_id => id })
    DB[:contacts].insert({ :from_id => id, :to_id => uid })
  end
end
