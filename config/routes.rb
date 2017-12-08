Rails.application.routes.draw do

  scope '/api' do
    post 'authenticate' => 'user_token#create'
    
    resources :users do
      resources :ratings, only: [:show, :index]
      resources :followers, controller: "users"
      resources :followings, controller: "users"
      post '/recommend', to: 'recommendations#create'
      get '/follow', to: 'users#follow'
      get '/unfollow', to: 'users#unfollow'
    end

    resource :user do
      resources :followers, controller: "users"
      resources :followings, controller: "users"
      resources :watchlist, controller: "movies"
      resources :ratings
      resources :recommendations, only: [:index, :show]
      get '/recommendations/status/:status', to: 'recommendations#index'
      get '/get_new_recommendations', to: 'movies#get_new_recommendations'
    end
    
    resources :movies do
      resources :ratings, only: [:show, :index]
      resources :recommendations
      get '/add_to_watchlist', to: 'movies#add_to_watchlist'
      get '/remove_from_watchlist', to: 'movies#remove_from_watchlist'
    end
    get '/movies/sort_by/:criteria', to: 'movies#index'
    get '/movies/genre/:genre', to: 'movies#index'
    
    resources :recommendations, only:[:index, :show] do
      patch '/rate', to: 'recommendations#update'
    end
    resources :genres

    # we don;t need these, do we?
    resources :ratings, only: [:show, :index]
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
