const { models } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize') // Ceux-ci sont des modules de sequelize pour récupérer les messages d'erreur des validateurs ici


//La transaction dan sequelize se charge de la création du user et de la guilde en même temps. Dans la managed version, elle s'occupe systématiquement du rollback si l'une des étapes échoue
async function newUserAndGuild(req,res) {
    //Ceci est la transaction : Création d'un user sans guilde qui va lui créer une guilde 
    try {
        await models.user.create (
            {
                
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    email: req.body.email,
                    password: req.body.password,
                    admin: true,
                    guild: {
                        guild: req.body.guild
                    } 
                
            },
            {
                include: [models.guild] 
            }
            )
    
        const message = `Le compte utilisateur a bien été créé. Vous serez par défaut  l'admin de la guilde, mais ceci pourra être changé dans les paramètres plus tard`;
        res.json({ message})
      }
      catch(error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({message: error.message, data: error})
          }
          if (error instanceof UniqueConstraintError) {
            return res.status(400).json({message: error.message, data: error})
          }
          const message = "L'utilisateur n'a pas pu être créé. Réessayez dans quelques instants."
          res.status(500).json({message, data: error})
      }
    
}

async function newUserNotGuild (req,res) {
    try {
      await models.demand.create (
              
          {     
                  status: "Pending",
                   user: {
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    email: req.body.email,
                    password: req.body.password,
                    admin: false,
                  },
                    guild_id :  req.body.foundGuild
      
              
          },
          {
              include: [models.user] 
          }
          )

      const message = `Le compte utilisateur a bien été créé. Votre demande d'adhésion a été envoyée à l'administrateur de la guilde`;
      res.json({ message})
    }
        
        //Gestion des erreurs
    catch(error) {
          if (error instanceof ValidationError) {
            return res.status(400).json({message: error.message, data: error})
          }
          if (error instanceof UniqueConstraintError) {
            return res.status(400).json({message: error.message, data: error})
          }
          const message = "L'utilisateur n'a pas pu être créé. Réessayez dans quelques instants."
          res.status(500).json({message, data: error})
        }
    } 


module.exports = {newUserAndGuild, newUserNotGuild}

