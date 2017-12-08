class User < ApplicationRecord
    # validations and security
    validates :UserName, presence: true
    validates :Email, presence: true
    has_secure_password

    #watchlist
    has_many :watchlists
    has_many :watchlist, through: :watchlists, source: :movie

    #ratings
    has_many :ratings  
    
    #recommendations
    has_many :own_recommendations, class_name: "Recommendation", foreign_key: :from_user_id
    has_many :recommendations, class_name: "Recommendation", foreign_key: :to_user_id

    # followers and followings
    has_many :followers_associations, class_name: 'Following', foreign_key: :user_id
    has_many :follows_associations, class_name: 'Following', foreign_key: :follower_id
    has_many :followers, class_name: 'User', through: :followers_associations
    has_many :followings, class_name: 'User', through: :follows_associations, foreign_key: :follower_id, source: 'user'
    
    
    # profile pictues
    has_attached_file :profilePic, styles: { medium: "300x300>", thumb: "100x100>" }
    validates_attachment_content_type :profilePic, content_type: /\Aimage\/.*\z/
    attr_accessor :profilePic_base

    # get the profile picture url for sending through the GET requests
    def profilePic_url
        self.profilePic.url
    end

    def self.from_token_request request
        email = request.params["auth"].try(:[], "Email")
        if(email.present?)
            return User.where(Email: email).first
        else
            return nil
        end
    end        

    private
        # parses a base64 image into a paperclip attachment
        def parse_image
            image = Paperclip.io_adapters.for(profilePic_base)
            image.original_filename = "profilePic_base.jpg"
            self.profilePic = image;
        end

end
