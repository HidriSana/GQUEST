const express = require('express')
const morgan = require('morgan') //Middleware pour afficher le type de la requête entrante , son URL, ainsi que le code de statut
const favicon = require('serve-favicon')  //Middleware pour mettre la favicon en cache  
const bodyParser = require('body-parser') // Node.js body parsing middleware 
const sequelize = require('sequelize')
const app = express()
const port = 5000

app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())



app.listen(port, () => console.log(`Notre application est démarrée sur : http://localhost:${port}`))
