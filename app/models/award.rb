class Award < ApplicationRecord
    has_many_and_belongs_to :movie_casts    
end
