const jwt = require('jsonwebtoken')
const privateKey = require('./private_key')

 const verifyJWT= (req, res, next) => {
  const authorizationHeader = req.headers.authorization
//Vérification de  la fourniture du jeton  dans l'entête de la requête
  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification.`
    return res.status(401).json({ message })
  }
  /* L'échange du jeton avec l'API REST se fait  via le format suivant : 
  authorization: Bearer <JWT> . */
  const token = authorizationHeader.split(' ')[1] // <-- Le split ici  nous permet de nous débarasser du Bearer pour extraire uniquement le jeton juste après l'espace
  
  //Verify est un complément de sign -> Voir login.js --> partie token --> jwt.sign
 jwt.verify(
    token, 
    privateKey, 
    (error, decodedToken) => {
      if(error) {
        const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
        return res.status(401).json({ message, data: error })
      }
      //Je vérifie l'id de l'utilisateur et s'il est admin ou pas. Ceci va me permettre de restreindre l'accès à certaines actions aux utilisateurs dont la valeur d'admin est false. 
      req.body.userId = decodedToken.userId, 
      req.body.admin = decodedToken.admin
      //Si tout se passe bien ,  nous laissons notre utilisateur passer 
      next()
    })
}


module.exports = {verifyJWT}