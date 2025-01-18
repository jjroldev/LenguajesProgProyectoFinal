Rails.application.routes.draw do

  namespace :api do
    resources :movies do
      member do
        patch 'update_completed'
      end
    end
  end

end
