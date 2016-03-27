var path      = require("path");
var Sequelize = require("sequelize");
var config    = require(path.join(__dirname, '..', 'conf', 'secrets', 'db_conf.json'));
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

var model = sequelize.import(path.join(__dirname, 'asset.js'));

db[model.name] = model;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;