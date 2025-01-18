class User < ApplicationRecord
  store :favorites, accessors: [:favorite_items], coder: JSON
end
