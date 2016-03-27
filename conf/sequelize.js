var Sequelize = require('sequelize');
var path = require('path');

var conf = require(path.join('secrets', 'db_conf.json'));

var sequelize = new Sequelize(conf.database, conf.username, conf.password, {
  host: conf.host,
  dialect: 'mysql',
  dialectOptions: {
    flags: '-FOUND_ROWS'
  },

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;