const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quests', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expiration: {
      type: 'TIMESTAMP',
      allowNull: false,
    },
    affectation_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })
};
