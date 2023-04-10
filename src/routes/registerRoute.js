const {newUserAndGuild, newUserNotGuild} = require ('../controllers/registerController')

module.exports = (app) =>{
     app.post('/create-user-and-guild', (req, res) => {
        return newUserAndGuild(req,res)
     });
     
     app.post('/create-user-not-guild', (req, res) => {
      return newUserNotGuild(req,res)
   });
}
