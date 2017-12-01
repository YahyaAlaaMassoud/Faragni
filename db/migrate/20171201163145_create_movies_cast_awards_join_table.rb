class CreateMoviesCastAwardsJoinTable < ActiveRecord::Migration[5.1]
  def change
    create_join_table :movie_casts, :awards, table_name: :awards_winners do |t|
      t.index :movie_cast_id
      t.index :award_id
    end
  end
end
