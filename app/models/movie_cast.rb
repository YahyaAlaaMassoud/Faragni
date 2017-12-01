class MovieCast < ApplicationRecord
    belongs_to :movie
    belongs_to :cast_member
    belongs_to :job
    has_many_and_belongs_to :awards
end
