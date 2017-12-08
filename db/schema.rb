# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171208002303) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "awards", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "awards_winners", id: false, force: :cascade do |t|
    t.bigint "movie_cast_id", null: false
    t.bigint "award_id", null: false
    t.index ["award_id"], name: "index_awards_winners_on_award_id"
    t.index ["movie_cast_id"], name: "index_awards_winners_on_movie_cast_id"
  end

  create_table "cast_members", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.integer "age"
    t.decimal "popularity"
    t.datetime "date_of_birth"
    t.datetime "date_of_death"
    t.text "biography"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "followings", force: :cascade do |t|
    t.integer "user_id"
    t.integer "follower_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "genres", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "genres_movies", id: false, force: :cascade do |t|
    t.bigint "movie_id", null: false
    t.bigint "genre_id", null: false
    t.index ["genre_id"], name: "index_genres_movies_on_genre_id"
    t.index ["movie_id"], name: "index_genres_movies_on_movie_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "movie_casts", force: :cascade do |t|
    t.bigint "movie_id"
    t.bigint "cast_member_id"
    t.bigint "job_id"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cast_member_id"], name: "index_movie_casts_on_cast_member_id"
    t.index ["job_id"], name: "index_movie_casts_on_job_id"
    t.index ["movie_id"], name: "index_movie_casts_on_movie_id"
  end

  create_table "movies", force: :cascade do |t|
    t.string "imdbID"
    t.string "imdbVotes"
    t.decimal "imdbRating"
    t.string "Title"
    t.string "Language"
    t.string "TagLine"
    t.date "ReleaseDate"
    t.string "Poster_file_name"
    t.string "Poster_content_type"
    t.integer "Poster_file_size"
    t.datetime "Poster_updated_at"
    t.boolean "Adult"
    t.decimal "Popularity"
    t.string "Actors"
    t.string "BoxOffice"
    t.string "Country"
    t.string "Director"
    t.decimal "Metascore"
    t.text "Plot"
    t.string "Runtime"
    t.string "Website"
    t.string "Writer"
    t.integer "Year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "movies_tags", id: false, force: :cascade do |t|
    t.bigint "movie_id", null: false
    t.bigint "tag_id", null: false
    t.index ["movie_id"], name: "index_movies_tags_on_movie_id"
    t.index ["tag_id"], name: "index_movies_tags_on_tag_id"
  end

  create_table "production_companies", force: :cascade do |t|
    t.string "company_name"
    t.text "description"
    t.string "headquarters"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ratings", force: :cascade do |t|
    t.decimal "rating"
    t.text "review"
    t.bigint "user_id"
    t.bigint "movie_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["movie_id"], name: "index_ratings_on_movie_id"
    t.index ["user_id"], name: "index_ratings_on_user_id"
  end

  create_table "recommendations", force: :cascade do |t|
    t.integer "from_user_id"
    t.integer "to_user_id"
    t.bigint "movie_id"
    t.decimal "ExpectedRating"
    t.decimal "UserRating"
    t.string "Message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["movie_id"], name: "index_recommendations_on_movie_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "FirstName"
    t.string "LastMame"
    t.date "DateOfBirth"
    t.string "UserName", null: false
    t.string "Email", null: false
    t.string "password_digest"
    t.date "JoiningDate", default: -> { "now()" }, null: false
    t.string "bio"
    t.string "profilePic_file_name"
    t.string "profilePic_content_type"
    t.integer "profilePic_file_size"
    t.datetime "profilePic_updated_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["Email"], name: "index_users_on_Email", unique: true
    t.index ["UserName"], name: "index_users_on_UserName", unique: true
  end

  create_table "watchlists", force: :cascade do |t|
    t.bigint "movie_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["movie_id"], name: "index_watchlists_on_movie_id"
    t.index ["user_id"], name: "index_watchlists_on_user_id"
  end

end
