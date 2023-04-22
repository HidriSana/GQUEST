const {updateUser,findUserDetailsById} = require('../controllers/userController')

module.exports = (app) =>{
    app.put('/update-user/:id', (req, res) => {
       return updateUser(req,res)
     });
    app.get('/getUserDetailsById/:id' , (req,res) => {
      return findUserDetailsById(req,res)
    }) 
    
}
