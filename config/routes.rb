Rails.application.routes.draw do
  root to: 'subtitle_forms#index'
  get 'subtitle_forms', :to => 'subtitle_forms#index'
  resource :subtitle_form, only: [:index, :update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
