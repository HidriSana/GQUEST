const { models } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize') // Ceux-ci sont des modules de sequelize pour récupérer les messages d'erreur des validateurs ici


const updateUser = (req,res) => {
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
       //Gestion des erreurs
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({message: error.message, data: error})
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({message: error.message, data: error})
        }
        const message = "Le profil utilisateur n'a pas pu être mise à jour.  Réessayez dans quelques instants"
        res.status(500).json({message, data: error})
      })
    }
    )
}

const findUserDetailsById = (req,res) => {
    models.user.findByPk(req.params.id)
    .then(user => {
      if (user) {
        return res.status(200).json({
          firstname : user.firstname,
          lastname : user.lastname
        })
      } else {
        return res.status(404).json({
          message : "Utilisateur non existant"
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        error : error
      })
    })
}

module.exports = {updateUser, findUserDetailsById}