class CreateProductionCompanies < ActiveRecord::Migration[5.1]
  def change
    create_table :production_companies do |t|
      t.string :company_name
      t.text :description
      t.string :headquarters
      
      t.timestamps
    end
  end
end
