'use strict';

var path = require('path'),
    request = require('request'),
    config = require('../config/config');

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function(err, html) {
    if(err) {
      console.log("Error rendering partial '" + requestedView + "'\n", err);
      res.status(404);
      res.send(404);
    } else {
      res.send(html);
    }
  });
};

/**
 * Send our single page app
 */
exports.index = function(req, res) {
    var options = {
        url: config.apiUrl + 'genres',
        qs: {'access-token': config.apiToken}
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var genres = JSON.parse(body);

            res.render('index', {
                title: 'Home - ' + config.siteTitle,
                genres: genres
            });
        } else {
            console.log("Error rendering requested page");
            res.status(404);
            res.send(404);
        }
    });
};
