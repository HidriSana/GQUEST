const {createQuest} = require('../controllers/questController')
const {verifyJWT} = require('../auth/auth')
const {verifyRole} = require ('../auth/verifyRole')



module.exports = (app) => {
     app.post('/create-quest',[verifyJWT,verifyRole] , (req, res) => {
        
       return createQuest(req,res)
   });
}
