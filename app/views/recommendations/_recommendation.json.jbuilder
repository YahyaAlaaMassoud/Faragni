json.extract! recommendation, :id, :from_user_id, :to_user_id, :ExpectedRating, :UserRating, :Message, :created_at, :updated_at
json.url recommendation_url(recommendation, format: :json)
