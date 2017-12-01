class CreateMovieCasts < ActiveRecord::Migration[5.1]
  def change
    create_table :movie_casts do |t|
      t.belongs_to :movie, index: true
      t.belongs_to :cast_member, index: true
      t.belongs_to :job, index: true
      t.string :role      
      t.timestamps
    end
  end
end
