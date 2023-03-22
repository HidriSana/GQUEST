const { models } = require('../db/sequelize')

module.exports = (app) => {

    app.post('/createguild', (req, res) => {
      models.guild.create(req.body)
        .then(guild => {
          const message = `Vous êtes à présent l'administrateur par défaut de ${guild}. Vous pourrez changer cela ultérieurement dans les paramètres`
          res.json({ message, data: guild})
        })
    })
}
 