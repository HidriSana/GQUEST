const { models } = require('../db/sequelize')

 const pendingRequest = (req,res) => {
    models.demand.create(req.body)
        .then(demand => {
          const message = `Votre demande d'adhésion a bien été envoyée aux administrateurs de la guilde. Elle est en attente d'approbation.`
          res.json({ message, data: demand})
          
        .catch(error => {
            const message = "Votre demande n'a pas pu être envoyée"
            res.status(500).json({message, data: error})
          })  
        })
        
}

const acceptedRequest = (req,res) => {
  models.user.findOne({where: {id: req.body.user_id}})
  .then(user=> {
    if(user) {
      models.user.update({guild_id : req.body.guild_id},
        {where: { id : user.id}}).then(() => {
        req.body.status = "Accepted";
        models.demand.update(req.body,
          {where: {id: req.body.id}})
        .then(demand => {
        const guildName = models.guild.guild;
        const message = `Votre demande d'adhésion a bien été acceptée. Vous faites maintenant partie de la guilde ${guildName}`;
        res.json({ message, data: demand.status})
      
        
      }).catch(error => {
        const message = "Votre demande n'a pas pu être envoyée"
        res.status(500).json({message, data: error})
      })  
    })
  }}
  )}
     
  

const  findDemandsByGuild = (req,res) => {
  models.demand.findAll({
    where: {guild_id: req.params.guild_id}
    ,include: {
      model : models.user,
      attributes: ['firstname','lastname']
    }
    
    })
  .then(demands => {
        res.json(demands)
  }
  )
  .catch (error => {
      res.status(500).json(error)
})
}
 
module.exports = {pendingRequest, acceptedRequest, findDemandsByGuild}