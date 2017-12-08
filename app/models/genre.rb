class Genre < ApplicationRecord
    has_and_belongs_to_many :movies
    alias_attribute :GenreID, :id
    def self.get_genres_from_string genres_cs
        return [] if genres_cs.blank?
        names = genres_cs.split(',')
        genres = []
        names.each{|g_name| genres << Genre.where(name: g_name.lstrip.rstrip).first}
        return genres
    end
end
