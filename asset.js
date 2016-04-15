module.exports = function(sequelize, DataType) {
  var Asset = sequelize.define('asset', {
    id: {
      type: DataType.BIGINT(20),
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataType.TEXT
    }
  });

  return Asset;
};