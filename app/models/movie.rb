class Movie < ApplicationRecord
    belongs_to :production_company
    has_and_belongs_to_many :tags
    has_and_belongs_to_many :genres
    has_many :movie_casts
    has_many :cast_members, through => :movie_casts
    has_many :awards, through => :movie_casts

end
