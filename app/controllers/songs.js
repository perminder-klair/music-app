'use strict';

var path = require('path'),
    async = require('async'),
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
 * Update song counter
 */
exports.counter = function (req, res) {
    var options = {
        url: config.apiUrl + 'song/counter/' + req.params.keyId,
        qs: {
            'access-token': config.apiToken
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json({success: true, result: body});
        } else {
            console.log("Error rendering requested page");
            res.status(404);
            res.send(404);
        }
    });

};