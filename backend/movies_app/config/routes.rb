Rails.application.routes.draw do
  resources :movies do
    collection do
      get 'populars'
      get 'top_rated'
      get 'genre/:id', to: 'movies#by_genre', as: 'by_genre'
      get 'buscar/:name', to: 'movies#search_by_name', as: 'search_by_name'
    end
  end

  resources :users do
    collection do
      post 'add_favorite', to: 'users#add_favorite'
      get 'favorites', to: 'users#favorites'
      delete 'remove_favorite', to: 'users#remove_favorite'
      delete 'destroy_by_email', to: 'users#destroy_by_email'
    end
  end
end
