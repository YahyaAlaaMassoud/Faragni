class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :imdb_id
      t.string :title
      t.string :language
      t.boolean :adult
      t.datetime :release_date
      t.decimal :popularity
      t.decimal :average_rating
      t.integer :votes
      t.belongs_to :production_company, index: true

      t.timestamps
    end
  end
end
