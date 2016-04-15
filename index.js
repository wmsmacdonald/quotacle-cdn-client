var path = require('path');
var Sequelize = require("sequelize");
var optional = require('optional');
var dbConf = require('./secrets/db_conf');

module.exports = function(host, database, username, password) {
  host = host || dbConf.host;
  database = database || dbConf.database;
  username = username || dbConf.username;
  password = password || dbConf.password;

  var conf = {
    host: host,
    dialect: 'mysql',
    dialectOptions: {
      flags: '-FOUND_ROWS'
    },

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  };

  var sequelize = new Sequelize(database, username, password, conf);

  var asset = sequelize.import(path.join(__dirname, 'asset.js'));

  return {
    getAsset: function getAsset(id, callback) {
      asset.findOne({ where: { id: id } }).then(function(asset) {
        callback(asset);
      });
    },
    createAsset: function createAsset(url, callback) {
      asset.create({ url: url, createdAt: new Date(), updatedAt: new Date()}).then(function(asset) {
        callback(asset);
      })
    },
    deleteAsset: function deleteAsset(id, callback) {
      asset.destroy({ where: { id: id } }).then(function(asset) {
        callback(asset);
      });
    }
  }
};