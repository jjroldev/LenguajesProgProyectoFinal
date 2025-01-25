class CreateMovies < ActiveRecord::Migration[8.0]
  def change
    create_table :movies, id: false do |t|
      t.string :movie_id, primary_key: true
      t.boolean :adult, default: false
      t.string :backdrop_path
      t.json :genre_ids
      t.string :original_language
      t.string :original_title
      t.text :overview
      t.float :popularity
      t.string :poster_path
      t.date :release_date
      t.string :title
      t.boolean :video, default: false
      t.float :vote_average
      t.integer :vote_count
    
      t.timestamps
    
    end
  end
end
