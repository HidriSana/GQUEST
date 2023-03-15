const { models } = require('../db/sequelize')
const auth = require('../auth/auth') //Toute nouvelle route décalarée doit passer dans les méthodes de décalartion d'un point de terminaison


module.exports = (app) => {

  //Express permettant de passer un middleware en deuxième argument 
    app.post('/createuser', auth, (req, res) => {
      models.user.create(req.body)
        .then(user => {
          const message = `Le compte utilisateur a bien été crée.`
          res.json({ message, data: user})
        })
    })
}