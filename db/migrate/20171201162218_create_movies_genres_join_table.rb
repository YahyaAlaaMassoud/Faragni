class CreateMoviesGenresJoinTable < ActiveRecord::Migration[5.1]
  def change
    create_join_table :movies, :genres do |t|
      t.index :movie_id
      t.index :genre_id 
    end
  end
end
