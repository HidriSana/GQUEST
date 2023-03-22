const { models } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize') // Ceux-ci sont des modules de sequelize pour récupérer les messages d'erreur des validateurs ici


module.exports = (app) => {
  //Création du profil utilisateur quand celui-ci s'inscrit
    app.post('/createuser', (req, res) => {
      models.user.create(req.body)
        .then(user => {
          const message = `Le compte utilisateur a bien été crée.`
          res.json({ message, data: user})
        })
        //Gestion des erreurs
        .catch(error => {
          if (error instanceof ValidationError) {
            return res.statut(400).json({message: error.message, data: error})
          }
          if (error instanceof UniqueConstraintError) {
            return res.statut(400).json({message: error.message, data: error})
          }
          const message = "L'utilisateur n'a pas pu être créé. Réessayez dans quelques instants."
          res.status(500).json({message, data: error})
    })
    })
    //Mise à jour du profil utilisateur  déjà existant
    app.put('/:id', (req, res) => {
      const id = req.params.id
      models.user.update(req.body, {
        where: {id: id}
      })
      .then(_  => {
       return models.user.findByPk(id).then(user => {
          const profile = user.firstname + ' ' + user.lastname
          const message = `Le profil de ${profile} a bien été mis à jour`
          res.json ({message, data: user})
        })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.statut(400).json({message: error.message, data: error})
        }
        if (error instanceof UniqueConstraintError) {
          return res.statut(400).json({message: error.message, data: error})
        }
        const message = "Le profil utilisateur n'a pas pu être mise à jour.  Réessayez dans quelques instants"
        res.status(500).json({message, data: error})
      })
    }
    )
}