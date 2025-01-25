Rails.application.routes.draw do
  resources :movies do
    collection do
      get 'populars'
      get 'top_rated'
      get 'genre/:id', to: 'movies#by_genre', as: 'by_genre'
    end
  end

  resources :users do
    collection do
      post 'add_favorite', to: 'users#add_favorite'
      get 'favorites', to: 'users#favorites'
    end
  end
end
