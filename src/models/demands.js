const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('demand', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    //Va être   un statuit , en attente, validé, ou refusé. Cela dépendra
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  })
  };