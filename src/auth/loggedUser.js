const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
const { findGuildByUser } = require('../controllers/guildController');

function loggedUser(req){
    const token = req.headers.authorization.split(' ')[1] 
        let userId;
        if (token){
            jwt.verify(
                token, 
                privateKey, 
                (error, decodedToken) => {
                if(!error) {
                    userId = decodedToken.userId                
                }
                })
        }
    return userId
}

async function findGuildByLoggedUser(req) {
    userId = loggedUser(req)
    
    await findGuildByUser(userId).then(
        guild => {console.log(guild)}
    )
}
module.exports = {loggedUser,findGuildByLoggedUser}