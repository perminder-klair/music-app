'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 9000,
    apiUrl: 'http://imp3songs.dev/api/',
    apiMusicUrl: 'http://imp3songs.dev/music/',
    apiToken: '1234',
    siteTitle: 'iMp3Songs.com'
};