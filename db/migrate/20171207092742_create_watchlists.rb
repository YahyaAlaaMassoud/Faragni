class CreateWatchlists < ActiveRecord::Migration[5.1]
  def change
    create_table :watchlists do |t|
      t.belongs_to :movie, index: true
      t.belongs_to :user, index: true
      t.timestamps
    end
  end
end
