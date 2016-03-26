var pool = require('./conf/db_connection_pool');
//var cdnClient = require('.');
var testing = require('testing');
var assetGenerator = require('./asset_generator');


var tests = [
  test_databaseConnection,
  test_assetGeneratorConnection,
  test_assetGeneratorConnectionWrongKey
];
testing.run(tests, 10000, function(err, result) {
  console.log('Failures: %d', result.failures);
});

function test_databaseConnection(callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      testing.failure(callback);
    }
    else {
      testing.success(callback);
    }
    connection.release();
  });
}

function test_assetGeneratorConnection(callback) {
  assetGenerator.connect(undefined, function(err) {
    if (err) {
      console.log(err);
      return testing.failure(callback);
    }

    testing.success(callback);
  });
}

function test_assetGeneratorConnectionWrongKey(callback) {
  assetGenerator.connect('wrongkey', function(err) {
    if (err === 'Socket authentication failed') {
      return testing.success(callback);
    }
    else {
      testing.failure(callback);
    }
  });
}

function test_getExistingImageUri() {
  cdnClient.image(1, function(err, dataUri) {
    if (err || !dataUri) {
      testing.failure('Could not retrieve data-uri from test image id');
    }
    else {
      testing.failure('Received data-uri from test image id');
    }
  });
}

function test_getNonExistingImageUri() {
  cdnClient.image(Number.MAX_SAFE_INTEGER, function(err, dataUri) {
    if (err || !dataUri) {
      testing.failure('Could not retrieve data-uri from test image id');
    }
    else {
      testing.success('Received data-uri from test image id');
    }
  });
}


