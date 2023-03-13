const { Sequelize, DataTypes } = require('sequelize')
const {initModels} = require('../models/init-models')
  
const sequelize = new Sequelize('gquest_clean', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
initModels(sequelize)

const initDb = () => {
  return sequelize.sync({force: true})
}

module.exports = {initDb}