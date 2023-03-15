const {user} = require ('../models/users')
const bcrypt = require('bcrypt');


module.exports = (app) => {
  app.post('/login', (req, res) => {
  
    const authenticateUserWithemail = (user) => {
    //Login avec email, on compare donc l'email inséré pour se logger aux emails dans la base de donnée. findOne de Sequelize va trouver la première saisie correspondant aux conditions, ici une adresse mail valide
        user.findOne({ where: { email: req.body.email } }).then(user => {
          //si aucun email ne correspond, message d'erreur
          if(!user) {
            const message = `L'adresse mail saisie est incorrecte`
            return res.status(404).json({ message })
          }
          //S'il retrouve l'utilisateur par son mail, on va comparer le mot de passe saisi par l'utilisateur au mot de passe correspondant à l'adresse de login
           return bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
            if(!isPasswordValid) {
              const message = `Le mot de passe est incorrect.`
              return res.status(401).json({message})
            
            }
              const message = `Vous êtes maintenant connecté`;
              return res.json({ message, data: user, token })
            })
        })
        .catch(error => {
          const message = `Vous n'avez pas pu être connecté. Réessayez dans quelques instants.`
          res.status(500).json({ message, data: error })
      })
    }
    })
  }