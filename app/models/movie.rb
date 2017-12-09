class Movie < ApplicationRecord
    before_validation :parse_image    
    # belongs_to :production_company
    
    has_and_belongs_to_many :tags
    has_and_belongs_to_many :genres
    has_many :movie_casts
    has_many :cast_members, through: :movie_casts
    has_many :awards, through: :movie_casts
    has_many :wishers, through: :watchlists, source: :users
    has_many :ratings
    has_many :recommendations
    
    has_attached_file :Poster, styles: { medium: "300x300>", thumb: "100x100>" }
    validates_attachment_content_type :Poster, content_type: /\Aimage\/.*\z/
    # do_not_validate_attachment_file_type :Poster    
    
    attr_accessor :poster_base

    def Poster_url
        add_host_prefix(self.Poster.url)
    end

    def Genres
        ret = ""
        self.genres.each{|genre| ret += "#{genre.name}, "}
        return ret.chomp(", ");
    end

    private
        def parse_image
            # return nil
            image = Paperclip.io_adapters.for(poster_base)
            image.original_filename = "poster.jpg"
            self.Poster = image;
        end
        
        def add_host_prefix(url)
            URI.join(ActionController::Base.asset_host, url)
        end

end
