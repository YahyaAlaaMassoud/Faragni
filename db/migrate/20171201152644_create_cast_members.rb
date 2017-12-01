class CreateCastMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :cast_members do |t|
      t.string :first_name
      t.string :last_name
      t.integer :age
      t.decimal :popularity
      t.datetime :date_of_birth
      t.datetime :date_of_death
      t.text :biography

      t.timestamps
    end
  end
end
