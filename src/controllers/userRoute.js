const { models } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/createuser', (req, res) => {
      models.users.create(req.body)
        .then(user => {
          const message = `Le compte utilisateur a bien été crée.`
          res.json({ message, data: user})
        })
    })
}