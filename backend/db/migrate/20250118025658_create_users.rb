class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.text :favorites

      t.timestamps
    end
  end
end