class Rating < ApplicationRecord
  belongs_to :movie
  belongs_to :user
  validates_uniqueness_of :user, scope: :movie

  alias_attribute :MovieID, :movie_id
  alias_attribute :UserID, :user_id
end
