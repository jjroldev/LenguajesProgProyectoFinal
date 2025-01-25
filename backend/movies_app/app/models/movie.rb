class Movie < ApplicationRecord
  has_and_belongs_to_many :users
  validates :movie_id, presence: true, uniqueness: true
  validates :title, :release_date, presence: true
end
