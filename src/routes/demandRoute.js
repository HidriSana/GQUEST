const {pendingRequest, acceptedRequest, refusedRequest, findDemandsByGuild} = require ('../controllers/demandController')
const {verifyJWT} = require('../auth/auth')
const {verifyRole} = require ('../auth/verifyRole')

module.exports = (app) =>{
     app.post('/membership-request',[verifyJWT], (req, res) => {
        return pendingRequest(req,res)
         });
     app.put('/accept-request', [verifyJWT,verifyRole], (req, res) => {
      return acceptedRequest(req,res)
         });
      app.put('/refuse-request', [verifyJWT,verifyRole], (req, res) => {
         return refusedRequest(req,res)
            });
      app.get('/find-request/:guild_id', [verifyJWT,verifyRole], (req, res) => {
         return findDemandsByGuild(req,res)
         });
      
}

