const { models } = require('../db/sequelize')
const {loggedUser} = require ('../auth/loggedUser')

//Création de la quête
 async function createQuest(req, res){
    req.body.creator_id = loggedUser(req);
    //req.body.guild_id = findGuildByLoggedUser(req)
    console.log(req.body)
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
      return models.quest.findByPk(id)
    .then(quest => {
      if(quest === null) {
          const message = `Cette quête n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
        }

        const message = `La quête n° ${models.quest.id} a bien été modifiée.`
        res.json({message, data: quest})
      })
    })
    .catch (error => {
        res.status(500).json(error)
      }
      )
  }
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

async function findAllQuests(req,res) {
  models.quest.findAll()
  .then(quests => {
    
    const message = 'Toutes les quêtes ont été récupérées avec succès'
    res.json({ message, data: quests })
  }
  )
  .catch (error => {
      res.status(500).json(error)
})
}


  module.exports = {createQuest, updateQuest, findQuest, findAllQuests}
