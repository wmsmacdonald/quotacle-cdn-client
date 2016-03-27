var path = require('path');
var asset = require('./models').asset;

module.exports = {
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
};