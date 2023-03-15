const jwt = require('jsonwebtoken')
const privateKey = require('./private_key')

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
//Vérification de  la fourniture du jeton  dans l'entête de la requête
  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification.`
    return res.status(401).json({ message })
  }
  /* L'échange du jeton avec l'API REST se fait  via le format suivant : 
  authoprization: Bearer <JWT> . */
  const token = authorizationHeader.split(' ')[1] // <-- Le split ici  nous permet de nous débarasser du Bearer pour extraire uniquement le jeton juste après l'espace
  
  //Verify est un complément de sign -> Voir login.js --> partie token --> jwt.sign
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if(error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }

    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } 
    //Si tout se passe bien ,  nous laissons notre utilisateur passer 
    else {
      next()
    }
  })
}