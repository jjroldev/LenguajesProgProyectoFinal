class CreateMovies < ActiveRecord::Migration[8.0]
  def change
    create_table :movies do |t|
      t.boolean :adult
      t.string :backdrop_path
      t.integer :budget
      t.string :homepage
      t.string :imdb_id
      t.string :original_language
      t.string :original_title
      t.text :overview
      t.float :popularity
      t.string :poster_path
      t.date :release_date
      t.integer :revenue
      t.integer :runtime
      t.string :status
      t.string :tagline
      t.string :title
      t.boolean :video
      t.float :vote_average
      t.integer :vote_count

      t.timestamps
    end
  end
end
