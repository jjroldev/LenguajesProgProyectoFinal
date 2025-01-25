class User < ApplicationRecord
  has_and_belongs_to_many :movies

  validates :email, presence: true, uniqueness: true
  validates :name, :last_name, presence: true
end
