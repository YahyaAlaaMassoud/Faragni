class Genre < ApplicationRecord
    has_and_belongs_to_many :movies
    
    def self.get_genres_from_string genres_cs
        names = genres_cs.split(',')
        genres = []
        names.each{|g_name| genres << Genre.where(name: g_name.lstrip.rstrip).first}
        return genres
    end
end
