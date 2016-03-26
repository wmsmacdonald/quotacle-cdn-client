var pool = require('./conf/db_connection_pool');

module.exports = {
  getImage: function getImage(assetId, callback) {
    pool.getConnection(function (err, connection) {
      if (err) return callback(err);

      var query = "SELECT data_uri FROM images WHERE id = " + assetId;
      connection.query(query, function (err, rows, fields, duration) {
        if (err) return callback(err);
        if (rows.length === 0) return callback('Asset id does not exist');

        connection.release();
        callback(false, {
          data_uri: rows[0].data_uri
        });
      });
    });
  },
  getVideoClip: function getVideoClip(assetId, callback) {
    pool.getConnection(function (err, connection) {
      if (err) return callback(err);

      var query = "SELECT data_uri FROM videos WHERE id = " + assetId;
      connection.query(query, function (err, rows, fields, duration) {
        if (err) return callback(err);
        if (rows.length === 0) return callback('Asset id does not exist');

        connection.release();
        callback(false, {
          url: rows[0].url
        });
      });
    });
  }
};