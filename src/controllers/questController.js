const { models } = require('../db/sequelize')
const {loggedUser,findGuildByLoggedUser} = require ('../auth/loggedUser')


 async function createQuest(req, res){
    req.body.creator_id = loggedUser(req);
    await findGuildByLoggedUser(req).then(r =>  req.body.guild_id = r )
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

  module.exports = {createQuest}
