#!/usr/bin/env node

var pool = require('./conf/db');
var thumbnail = require('./thumbnail');
var cdnSocket = require('cdn_socket');

module.exports = {
  thumbnail: function(quoteId, callback) {
    thumbnail(quoteId, pool, cdnSocket, callback);
  }
};