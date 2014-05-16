'use strict';

var index = require('./controllers/index'),
    albums = require('./controllers/albums');

/**
 * Application routes
 */
module.exports = function (app) {

    app.route('/')
        .get(index.index);

    app.route('/albums')
        .get(albums.index);

    app.route('/albums/:genreId')
        .get(albums.index);

    app.route('/album/:id')
        .get(albums.view);

    // All undefined api routes should return a 404
    app.route('/*')
        .get(function (req, res) {
            res.send(404);
        });
};