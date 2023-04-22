const {pendingRequest, acceptedRequest, findDemandsByGuild} = require ('../controllers/demandController')

module.exports = (app) =>{
     app.post('/membership-request', (req, res) => {
        return pendingRequest(req,res)
         });
     app.put('/accept-request', (req, res) => {
      return acceptedRequest(req,res)
         });
      app.get('/find-request/:guild_id', (req, res) => {
         return findDemandsByGuild(req,res)
         });
}

