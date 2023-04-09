const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guild', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    guild: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {msg: "Cette guilde existe déjà"}
    },
    
  })
  };

