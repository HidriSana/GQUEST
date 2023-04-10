const { models } = require('../db/sequelize')


    
     const createGuild = (req, res) =>{
      models.guild.create(req.body)
        .then(guild => {
          const message = `Vous êtes à présent l'administrateur par défaut de ${guild}. Vous pourrez changer cela ultérieurement dans les paramètres`
          res.json({ message, data: guild})
        })
        .catch (error => {
          res.status(500).json(error)
        }

        )
    }
    function findGuild(req,res) {
       models.guild.findOne({where: {guild: req.params.guild}})
       .then(guild =>{
        res.status(200).json(guild)
       })
       .catch(error => {
        res.status(500).json(error)
       })
    }
  

 
module.exports = {createGuild,findGuild}
