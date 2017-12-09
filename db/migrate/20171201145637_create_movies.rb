class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :imdbID
      t.string :imdbVotes, null: true
      t.decimal :imdbRating, null: true
      t.string :Title
      t.string :Language, null: true
      t.string :TagLine, null: true
      t.date :ReleaseDate, null: true
      t.attachment :Poster
      t.boolean :Adult, null: true
      t.decimal :Popularity, null: true
      t.string :Actors, null: true
      t.string :BoxOffice, null: true
      t.string :Country, null: true
      t.string :Director, null: true
      t.decimal :Metascore, null: true
      t.text :Plot, null: true
      t.string :Runtime, null: true
      t.string :Website, null: true
      t.string :Writer, null: true
      t.integer :Year, null: true
      # t.belongs_to :production_company, null: true
      t.timestamps
    end
    add_index :movies, :imdbID, unique: true
  end
end
