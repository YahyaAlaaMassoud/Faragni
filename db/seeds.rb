# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'
require 'rest-client'

CSV.foreach("movies.csv", :headers => true) do |row|
  movie = row.to_hash
  imdb_id = movie[:imdbID]
  imdb_movie = RestClient.get "https://www.omdbapi.com/?i=tt#{imdb_id}&apikey=ddd4a842";
end