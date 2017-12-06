class Job < ApplicationRecord
    has_many :movie_casts
    has_many :cast_members, through: :movie_casts
end
