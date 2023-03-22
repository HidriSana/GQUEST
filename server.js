const express = require('express')
const cors = require('cors') // installé après une erreur cross-origin , pour autoriser les requêtes inter-origine
const morgan = require('morgan') //Middleware pour afficher le type de la requête entrante , son URL, ainsi que le code de statut
const favicon = require('serve-favicon')  //Middleware pour mettre la favicon en cache  
const bodyParser = require('body-parser') // Node.js body parsing middleware 
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 5000

app
.use(favicon(__dirname + '/favicon.ico'))
.use(cors())
.use(morgan('dev'))
.use(bodyParser.json())

sequelize.initDb();

app.get('/', (req, res) => {
    res.json('Hello, traveler ! 👋')
  })

require('./src/controllers/userRoute')(app)
require('./src/controllers/login')(app)
require('./src/controllers/guildRoute')(app)


app.listen(port, () => console.log(`Notre application est démarrée sur : http://localhost:${port}`))
