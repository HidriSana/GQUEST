const {updateUser} = require('../controllers/userController')

module.exports = (app) =>{
     app.put('/:id', (req, res) => {
       return updateUser(req,res)
   });
}
