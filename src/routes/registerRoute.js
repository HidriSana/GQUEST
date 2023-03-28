const {newUserAndGuild, newUserNoGuild} = require ('../controllers/registerController')

module.exports = (app) =>{
     app.post('/create-user-and-guild', (req, res) => {
        return newUserAndGuild(req,res)
     });
     
     app.post('/create-user-no-guild', (req, res) => {
      return newUserNoGuild(req,res)
   });
}
