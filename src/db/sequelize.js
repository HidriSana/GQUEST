const { Sequelize, DataTypes } = require('sequelize')
//const RoleModel = require('../models/role')
  
const sequelize = new Sequelize('gquest', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  

