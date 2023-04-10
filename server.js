const express = require('express')
const cors = require('cors') // installé après une erreur cross-origin , pour autoriser les requêtes inter-origine
const morgan = require('morgan') //Middleware pour afficher le type de la requête entrante , son URL, ainsi que le code de statut
const favicon = require('serve-favicon')  //Middleware pour mettre la favicon en cache  
const bodyParser = require('body-parser') // Node.js body parsing middleware 
const sequelize = require('./src/db/sequelize')
//const corsOptions = require('./src/cors/corsOptions')

const app = express()
const port = 5000

app
.use(favicon(__dirname + '/favicon.ico'))
.use(cors())
.use(morgan('dev'))
.use(bodyParser.json())



sequelize.initDb();

app.get('/createuser', (req, res) => {
    res.json('Inscription')
  })

require('./src/routes/userRoute')(app)
require('./src/controllers/login')(app)
require('./src/routes/guildRoute')(app)
require('./src/routes/registerRoute')(app)
require('./src/routes/authRoute')(app)
require('./src/routes/demandRoute')(app)




app.listen(port, () => console.log(`Notre application est démarrée sur : http://localhost:${port}`))
