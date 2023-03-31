const { models } = require('../db/sequelize')

const findGuild = models.guilds.findOne({where: {guild}})
 
if (guild === null) {
   const message = "Cette guilde n'existe pas";
   res.json({message, data: error})
 } else {
   const message = "Votre demande n'a pas pu être envoyée à cette guilde. ";
   res.status(500).json({message, data: error})
 }

 module.exports = findGuild