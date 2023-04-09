const { models } = require('../db/sequelize')

async function findGuild(req) {
return await models.guild.findOne({where: {guild: req.body.guild}})
}
 module.exports = {findGuild}