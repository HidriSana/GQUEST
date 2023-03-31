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
 
module.exports = {pendingRequest}