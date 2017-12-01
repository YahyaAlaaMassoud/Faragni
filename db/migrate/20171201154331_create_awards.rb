class CreateAwards < ActiveRecord::Migration[5.1]
  def change
    create_table :awards do |t|
      t.string :name
      t.text :description
      t.integer :year

      t.timestamps
    end
  end
end
