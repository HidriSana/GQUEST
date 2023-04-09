const {findGuild} = require ('../controllers/findGuild')


module.exports = (app) =>{
     app.get('/find-guild', (req, res) => {
        return findGuild(req,res)
     });
}
