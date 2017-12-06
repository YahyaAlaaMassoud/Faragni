class CastMember < ApplicationRecord
    has_many :movie_casts
    has_many :awards, through: :movie_casts
end
