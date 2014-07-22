'use strict';

var path = require('path'),
    request = require('request'),
    config = require('../config/config');

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function (req, res) {
    var stripped = req.url.split('.')[0];
    var requestedView = path.join('./', stripped);
    res.render(requestedView, function (err, html) {
        if (err) {
            console.log("Error rendering partial '" + requestedView + "'\n", err);
            res.status(404);
            res.send(404);
        } else {
            res.send(html);
        }
    });
};

/**
 * List all
 */
exports.index = function (req, res) {
    var options = {
        url: config.apiUrl + 'albums',
        qs: {
            'access-token': config.apiToken,
            'limit': 15,
            'expand': 'artist'
        }
    };
    
    //pagination
    if (typeof req.query.page !== 'undefined') {
        options['qs']['page'] = req.query.page;
    }
    
    //if genre is specified
    if (typeof req.params.genreId !== 'undefined') {
        options['qs']['find'] = {
            genre_id: req.params.genreId
        };
    }

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            
            var pagination = {
                totalCount: response.headers['x-pagination-total-count'],
                pageCount: response.headers['x-pagination-page-count'],
                currentPage: response.headers['x-pagination-current-page'],
                perPage: response.headers['x-pagination-per-page']
            };
            //console.log(pagination);
            
            var albums = JSON.parse(body);

            res.render('albums', {
                title: 'Albums - ' + config.siteTitle,
                albums: albums,
                pagination: pagination
            });
        } else {
            console.log("Error rendering requested page");
            res.status(404);
            res.send(404);
        }
    });

};

/**
 * View
 * @param req
 * @param res
 */
exports.view = function (req, res) {

    console.log(req.params.id);
    var options = {
        url: config.apiUrl + 'albums/' + req.params.id,
        qs: {
            'access-token': config.apiToken,
            'expand': 'songs,genre,artist'
        }
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var album = JSON.parse(body);

            res.render('album', {
                title: album.title + ' by ' + album.artist.title + ' - ' + config.siteTitle,
                album: album
            });
        } else {
            console.log("Error rendering requested page");
            res.status(404);
            res.send(404);
        }
    });

};