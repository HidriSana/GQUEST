const { models } = require('../db/sequelize')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')


  
async function login(req,res){
    //Login avec email, on compare donc l'email inséré pour se logger aux emails dans la base de donnée. findOne de Sequelize va trouver la première saisie correspondant aux conditions, ici une adresse mail valide
        await models.user.findOne({ where: { email: req.body.email } })
        .then(user => {
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
            //sign du module jsonwebtoken 
              const accessToken= jwt.sign(
                {
                  userId: user.id,
                  admin: user.admin
                },
                privateKey,
                {expiresIn: '24h'}
              );

              const profile = user.firstname + ' ' + user.lastname
              const message = `Bonjour ${profile} `;
              return res.json({ message, access: accessToken})
            })
        })
        .catch(error => {
          const message = `Vous n'avez pas pu être connecté.`
          res.status(500).json({ message, data: error })
      })
      
        }
  
        module.exports = {login}