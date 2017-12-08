class Rating < ApplicationRecord
  belongs_to :movie
  belongs_to :user
  validates_uniqueness_of :user, scope: :movie
end
