Rails.application.routes.draw do
  resources :tags
  resources :jobs
  resources :awards
  resources :cast_members
  resources :casts
  resources :genres
  resources :production_companies
  resources :movies
  scope '/api' do
    resources :users
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
