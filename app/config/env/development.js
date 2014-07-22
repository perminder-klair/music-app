'use strict';

module.exports = {
    env: 'development',
    ip: process.env.IP ||
        '0.0.0.0',//'127.0.0.1',
    port: process.env.PORT ||
        9000
};