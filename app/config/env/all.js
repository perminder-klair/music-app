'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 5000,
    //apiUrl: 'http://imp3songs.dev/api/',
    apiUrl: 'http://api2.imp3songs.com/api/',
    apiToken: '1234',
    siteTitle: 'iMp3Songs.in'
};