var gulp = require('gulp');
var config = require('./app/config/config');
var LIVERELOAD_PORT = 35729;

// Let's make things more readable by
// encapsulating each part's setup
// in its own method
function startExpress() {
    var express = require('express');

    // Set default node environment to development
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    // Setup Express
    var app = express();
    app.use(require('connect-livereload')());
    require('./app/config/express')(app);
    require('./app/routes')(app);

    // Start server
    app.listen(config.port, config.ip, function () {
        console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
    });

    // Expose app
    exports = module.exports = app;
}

// We'll need a reference to the tinylr
// object to send notifications of file changes
var lr;
function startLivereload() {

    lr = require('tiny-lr')();
    lr.listen(LIVERELOAD_PORT);
}

// Notifies livereload of changes detected
// by `gulp.watch()`
function notifyLivereload(event) {

    // `gulp.watch()` events provide an absolute path
    // so we need to make it relative to the server root
    var fileName = require('path').relative(config.port, event.path);

    lr.changed({
        body: {
            files: [fileName]
        }
    });
}

// Default task that will be run
// when no parameter is provided
// to gulp
gulp.task('default', function () {

    console.log('Gulp and running!')
    startExpress();
    startLivereload();
    gulp.watch('*.ejs', notifyLivereload);
});