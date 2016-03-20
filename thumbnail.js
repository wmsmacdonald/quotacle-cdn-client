
module.exports = function thumbnail(quoteId, pool, cdnSocket, callback) {
  pool = pool || require('./conf/db');


  pool.getConnection(function (err, connection) {
    if (err) callback(err);

    var query = "select thumbnail_data_uri from quotes where id=" + quoteId;
    connection.query(query, function (err, rows, fields, duration) {

      if (err) callback(err);
      if (rows.length === 0) callback('quoteId does not match existing quote');

      if (rows[0].thumbnail_data_uri === null) {
        cdnSocket

      }


      connection.release();
      callback(err, rows);
    });
  });
};