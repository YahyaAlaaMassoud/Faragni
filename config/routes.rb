Rails.application.routes.draw do


  scope '/api' do
    resources :users do
      resources :ratings
      # recommend action
    end

    resource :user do
      resources :followers, controller: "users"
      resources :following, controller: "users"
      resources :watchlist, controller: "movies"
      resources :ratings
      resources :recommendations # this should have a status pramater
    end
    resources :movies do
      resources :ratings
      resources :recommendations
    end
    resources :recommendations do
      
    end
    resources :genres
    resources :ratings
    # resources :watchlists


    # one day, i am gonna grow wings
    # resources :tags
    # resources :jobs
    # resources :awards
    # resources :cast_members
    # resources :production_companies
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
