var testing = require('testing');
var cdnClient = require('./');
var process = require('process');

var tests = [
  test_createGetDeleteAsset
];
testing.run(tests, 10000, function(err, result) {
  console.log('Failures: %d', result.failures);
  process.exit(0);
});

function test_createGetDeleteAsset(callback) {
  var cdnClient = require('./')();
  cdnClient.createAsset('http://www.example.com', function(asset) {
    testing.assertEquals(asset.url, 'http://www.example.com');
    cdnClient.getAsset(asset.id, function(fetchedAsset) {
      testing.assertEquals(asset.url, fetchedAsset.url);
      testing.assertEquals(asset.id, fetchedAsset.id);
      cdnClient.deleteAsset(asset.id, function() {
        callback();
      });
    });
  });
}

