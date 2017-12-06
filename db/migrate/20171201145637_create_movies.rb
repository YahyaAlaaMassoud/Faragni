class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :imdbID
      t.string :imdbVotes
      t.decimal :imdbRating
      t.string :Title
      t.string :Language
      t.string :TagLine
      t.date :ReleaseDate
      t.attachment :Poster
      t.boolean :Adult 
      t.decimal :Popularity
      t.string :Actors
      t.string :BoxOffice
      t.string :Country
      t.string :Director
      t.decimal :Metascore
      t.text :Plot
      t.string :Runtime
      t.string :Website
      t.string :Writer
      t.integer :Year
      t.belongs_to :production_company, index: true
      t.timestamps
    end
  end
end
