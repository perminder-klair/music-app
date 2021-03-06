'use strict';

var index = require('./controllers/index'),
    albums = require('./controllers/albums'),
    songs = require('./controllers/songs');

/**
 * Application routes
 */
module.exports = function (app) {

    app.route('/')
        .get(index.index);

    app.route('/albums')
        .get(albums.index);

    app.route('/albums/:genreId/:genreSlug')
        .get(albums.index);

    app.route('/album/:id/:artistName/:albumName')
        .get(albums.view);

    app.route('/singles')
        .get(albums.index);

    app.route('/song/counter/:keyId')
        .get(songs.counter);

    // All undefined api routes should return a 404
    app.route('/*')
        .get(function (req, res) {
            res.send(404);
        });
};