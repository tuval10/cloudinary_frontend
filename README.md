# README

This is a server which is using the gem https://github.com/tuval10/cloudinary-subtitle-embedder

## Ruby version
Use ruby-2.4.1.

if you are using rvm:
```
rvm install ruby-2.4.1
rvm use ruby-2.4.1
gem install bundler
```

## Database creation
No database needed. 


## Deployment instructions
##### 1) git clone https://github.com/tuval10/cloudinary_frontend.git
##### 2) install dependencies (overwrite files when you run it - by pressing 'a' in [Ynaqdhm])
```
bundle install
rails webpacker:install
rails webpacker:install:react
rails generate react:install
```
##### 3) run "rails s" and go to localhost:3000

