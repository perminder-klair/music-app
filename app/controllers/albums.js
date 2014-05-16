'use strict';

var path = require('path');
var request = require('request');

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
 * List all
 */
exports.index = function(req, res) {
  request('http://api.imp3songs.com/api/album', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body); // Print the google web page.
        var data = JSON.parse(body);
        var albums = data.data.album;
        var todos = [{
          title: 'Todo One',
        }, {
          title: 'Todo Two',
        }, {
          title: 'Todo Three',
        }, {
          title: 'Todo Four',
        }];

        res.render('albums', {
          title: 'Express Music',
          todos: todos,
          albums: albums
        });
    }
  })

  
};
