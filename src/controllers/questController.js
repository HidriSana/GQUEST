const { models } = require('../db/sequelize')
const {loggedUser,findGuildByLoggedUser} = require ('../auth/loggedUser')

//Création de la quête
 async function createQuest(req, res){
    req.body.creator_id = loggedUser(req);
    req.body.status = "en_attente";
    await findGuildByLoggedUser(req).then(guild => req.body.guild_id = guild)
    models.quest.create(req.body)
      .then(quest => {
        const message = `La quête a bien été ajoutée`
        res.json({ message, data: quest})
      })
      .catch (error => {
        res.status(500).json(error)
      }
      )
  }
// Update de la quête
  async function updateQuest(req, res){
    models.quest.update(req.body, {where: {id: req.params.id}})
    .then(_ => {
      return models.quest.findByPk(req.params.id).then(quest => {
      if(quest === null) {
          const message = `Cette quête n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
        }

        const message = `La quête n° ${req.params.id} a bien été modifiée.`
        console.log(quest)
        res.json({message, data: quest})
      })
    })
    
    .catch (error => {
        console.log(error)
        res.status(500).json(error)
      }
      )
  }
//Begin quest :  Ceci n'est pas un update classique via formulaire . Il va modifier le statut de la quête, lui donner un userID , une date d'affectation et une date d'expiration
async function beginQuest(req, res) {
  
  req.body.status = "en_cours";
  req.body.affectation_date = Date.now();
  req.body.user_id = loggedUser(req);
  req.body.expiration = req.body.affectation_date + (24 * 3600 * 1000);
  models.quest.update(req.body, {where: {id: req.params.id}})
  .then(_ => {
    return models.quest.findByPk(req.params.id).then(quest => {
    if(quest === null) {
        const message = `Cette quête n'existe pas. Réessayez avec un autre identifiant.`
      return res.status(404).json({ message })
      }
      
      const message = `La quête n° ${req.params.id} a bien été modifiée.`
      console.log(quest)
      res.json({message, data: quest})
    })
  })
  
  .catch (error => {
      console.log(error)
      res.status(500).json(error)
    }
    )
}

//Finish quest :  Même principe que le beginQuest, mais va uniquement update la statut de la quête en terminée
async function finishQuest(req, res) {
  
  req.body.status = "terminée";
  if (req.body.user_id === !loggedUser(req)) {
    console.log(loggedUser(req))
    const message = `Cette quête ne vous appartient pas.`
    return res.status(401).json({ message })
  } else {
  models.quest.update(req.body, {where: {id: req.params.id}})
  .then(_ => {
    return models.quest.findByPk(req.params.id).then(quest => {
    if(quest === null) {
        const message = `Cette quête n'existe pas. Réessayez avec un autre identifiant.`
      return res.status(404).json({ message })
      }
   
      
      const message = `La quête n° ${req.params.id} a bien été modifiée.`
      res.json({message, data: quest})
  })
  })
  
  .catch (error => {
      console.log(error)
      res.status(500).json(error)
    }
    )
}}



//  Trouver la quête
async function findQuest(req, res){
  models.quest.findByPk(req.params.id)
  .then(quest => {
    if(quest === null) {
      const message = `Cette quête n'existe pas. Réessayez avec un autre identifiant.`
      return res.status(404).json({ message })
    }
    const message = `La quête n° ${models.quest.id} a bien été trouvée.`
      res.json({ message, data: quest })
  }
  )
  .catch (error => {
    res.status(500).json(error)
  }
  )
}
//Trouver toutes les quêtes 
async function findAllQuestsByGuild(req,res) {
  models.quest.findAll({where: {guild_id: req.params.guild_id}
    ,include: {
      model : models.user,
      attributes: ['firstname','lastname']
    }})
  .then(quests => {
    
    const message = 'Toutes les quêtes ont été récupérées avec succès'
    res.json({ message, data: quests })
  }
  )
  .catch (error => {
      res.status(500).json(error)
})
}
//La suppression d'une quête : ATTENTION! Suppression de la BDD
async function deleteQuest(req,res) {
  
  models.quest.destroy({ where: { id: req.params.id } })
    .then(_ => {
          const message = `La quête avec l'identifiant n°${req.params.id} a bien été supprimée.`
          res.json({message})
        })
      
    .catch (error => {
      console.log(error)
      res.status(500).json(error)
})
}

  module.exports = {createQuest, updateQuest, findQuest, findAllQuestsByGuild, deleteQuest, beginQuest, finishQuest}
