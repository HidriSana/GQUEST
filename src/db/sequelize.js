const { Sequelize, DataTypes } = require('sequelize')
const {initModels} = require('../models/init-models')
  
const sequelize = new Sequelize('gquest_clean', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})
  
models = initModels(sequelize)


const initDb = () => {
  return sequelize.sync()
}

module.exports = {initDb, models,sequelize}