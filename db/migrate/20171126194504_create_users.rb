class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :FirstName
      t.string :LastMame
      t.date :DateOfBirth
      t.string :UserName, null: false
      t.string :Email, null: false
      t.string :password_digest
      t.date :JoiningDate, null: false, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamps
    end

    add_index :users, :UserName, unique: true
    add_index :users, :Email, unique: true
  end
end
