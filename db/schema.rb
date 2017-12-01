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

ActiveRecord::Schema.define(version: 20171201163145) do

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
    t.string "imdb_id"
    t.string "title"
    t.string "language"
    t.boolean "adult"
    t.datetime "release_date"
    t.decimal "popularity"
    t.decimal "average_rating"
    t.integer "votes"
    t.bigint "production_company_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["production_company_id"], name: "index_movies_on_production_company_id"
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

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.date "date_of_birth"
    t.string "username"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
