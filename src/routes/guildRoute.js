const {findGuild,createGuild} = require ('../controllers/guildController')

module.exports = (app) =>{
     app.get('/find-guild/:guild', (req, res) => {
        return findGuild(req,res)
     });

     app.post('/createguild', (req, res) => {
      return createGuild(req,res)
})
}
