const {login} = require('../controllers/login')

module.exports = (app) =>{
     app.post('/login', (req, res) => {
       return login(req,res)
   });
}