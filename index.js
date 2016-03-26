var assetGenerator = require('./asset_generator');
var getAsset = require('./get_asset');

module.exports = {
  // both return object with 'data_uri' property
  getImage: getAsset.getImage,
  createThumbnail: assetGenerator.createThumbnail,

  // both return object with 'url' property
  getVideoClip: getAsset.getVideoClip,
  createVideoClip: assetGenerator.createVideoClip
};