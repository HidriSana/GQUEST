const { models } = require('../db/sequelize')



module.exports = (app) => {

  //Express permettant de passer un middleware en deuxième argument 
    app.post('/createuser', (req, res) => {
      models.user.create(req.body)
        .then(user => {
          const message = `Le compte utilisateur a bien été crée.`
          res.json({ message, data: user})
        })
    })
}