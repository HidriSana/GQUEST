const { Sequelize, DataTypes } = require('sequelize')
const {initModels} = require('../models/init-models')
  
const sequelize = new Sequelize('gquest', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})
  
models = initModels(sequelize)


const initDb = () => {
  return sequelize.sync({alter : true})
}

module.exports = {initDb, models, sequelize}