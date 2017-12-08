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

    alias_attribute :UserID, :id
    # specifies how log in is carried out
    def self.from_token_request request
        email = request.params["auth"].try(:[], "Email")
        if(email.present?)
            return User.where(Email: email).first
        else
            return nil
        end
    end

    def follow user_id
        user_to_follow = User.find(user_id)
            
        if(self == user_to_follow)
            self.errors[:base] << "You can't follow yourself"
            return false
        end
        if(self.followings.where(id: user_id).first.present?)
            self.errors[:base] << "You already follow this user"
            return false
        end

        self.followings << user_to_follow
        return true
    end

    def unfollow user_id
        user_to_unfollow = User.find(user_id)
        
        if(self == user_to_unfollow)
            self.errors[:base] << "You can't unfollow yourself"
            return false
        end

        if(self.followings.where(id: user_id).first.blank?)
            self.errors[:base] << "You aren't following this user"
            return false
        end

        self.followings.delete(user_to_unfollow)
        return true
    end

    def add_to_watchlist movie_id
        movie_to_add = Movie.find(movie_id)

        if(self.watchlist.where(id: movie_id).first.present?)
            self.errors[:base] << "Movie already exists in watchlist"
            return false
        end

        self.watchlist << movie_to_add
        return true
    end

    def remove_from_watchlist movie_id
        movie_to_remove = Movie.find(movie_id)

        if(self.watchlist.where(id: movie_id).first.blank?)
            self.errors[:base] << "Movie doesn't exist in watchlist"
            return false
        end

        self.watchlist.delete(movie_to_remove)
        return true
    end

    private
        # parses a base64 image into a paperclip attachment
        def parse_image
            image = Paperclip.io_adapters.for(profilePic_base)
            image.original_filename = "profilePic_base.jpg"
            self.profilePic = image;
        end

end
