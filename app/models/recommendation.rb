class Recommendation < ApplicationRecord
  belongs_to :from_user, class_name: 'User',
              foreign_key: 'from_user_id'
  belongs_to :to_user, class_name: 'User',
              foreign_key: 'to_user_id'
  belongs_to :movie
  before_save :update_from_user_points
  validate :parties_not_equal
  alias_attribute :ByUserID, :from_user_id
  alias_attribute :ToUserID, :to_user_id
  alias_attribute :MovieID, :movie_id
  alias_attribute :RecommendationID, :id
  scope :pending, -> {where(UserRating: nil)}
  scope :rated, -> {where.not(UserRating: nil )}
  private
    def parties_not_equal
      if self.from_user_id == self.to_user_id
        self.errors["base"] << "Recommendations can't be from and to the same user."
      end 
    end

    def update_from_user_points
      return true
    end
  
end
