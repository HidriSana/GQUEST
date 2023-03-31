const {pendingRequest} = require ('../controllers/demandController')

module.exports = (app) =>{
     app.post('/membership-request', (req, res) => {
        return pendingRequest(req,res)
     });
}

