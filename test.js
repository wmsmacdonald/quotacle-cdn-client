var pool = require('./conf/db_connection_pool');
var cdnClient = require('.');
var testing = require('testing');
var assetGenerator = require('./asset_generator');


var tests = [test_database, test_assetGeneratorConnection]//, test_getExistingImageUri, test_getNonExistingImageUri];
testing.run(tests, 10000);

function test_database() {
  pool.getConnection(function (err, connection) {
    if (err) {
      testing.failure('Could not connect to the database');
    }
    else {
      testing.success('Connected to the database');
      connection.release();
    }
  });
}

function test_assetGeneratorConnection() {
  assetGenerator.connect(undefined, function(err) {
    if (err) {
      return testing.failure(err);
    }

    testing.success('Connected to asset generator');
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


