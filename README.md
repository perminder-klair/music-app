# Music Client App

Music App based on NodeJs for iMp3Songs.com API.

## To install required dependencies, type in terminal:

    npm install
    bower install

## Config app settings, by editing file:

    app/config/env/all.js

Please update `apiToken` with your api token provided by iMp3Songs api.

## To run app, type in terminal:

    node server.js


## Heroku

### Set environment

    heroku config:set NODE_ENV=production
    
## PM2 deployment

    pm2 deploy ecosystem.json production update