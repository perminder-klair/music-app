'use strict';

var express = require('express'),
    //favicon = require('serve-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    sass = require('node-sass'),
    config = require('./config');

/**
 * Express configuration
 */
module.exports = function (app) {
    var env = app.get('env');

    if ('development' === env) {
        // Disable caching of scripts for easier testing
        app.use(function noCache(req, res, next) {
            if (req.url.indexOf('/assets/js/') === 0) {
                res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.header('Pragma', 'no-cache');
                res.header('Expires', 0);
            }
            next();
        });

        app.use(express.static(path.join(config.root, '.tmp')));

        app.use(
            sass.middleware({
                src: config.root + '/app', //where the sass files are
                //dest: config.root + '/app/css', //where css should go
                debug: true,
                outputStyle: 'compressed',
                prefix:  '/css'
            })
        );
    }

    if ('production' === env) {
        app.use(compression());
        //app.use(favicon(path.join(config.root,'favicon.ico')));
    }

    app.use(express.static(path.join(config.root, 'app')));
    app.set('views', config.root + '/app/views');

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');
    app.use(morgan('dev'));
    app.use(bodyParser());
    app.use(methodOverride());

    // Error handler - has to be last
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }
};