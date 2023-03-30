const { models } = require('../db/sequelize')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')


//Vérification  si token existe . Méthode moins sécurisée que 'Bearer ' mais se mettra sûrement en place si le temps y est 
const verifyJwt = (req, res, next) => {
    let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Vous n'avez pas de token!"
    });
  }

  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Vous n'avez pas l'authorisation de faire ça!"
      });
    }
    req.userId = decoded.id; // On va récupérer uniquement l'ID   de l'utilisateur dans le token. Aucun besoin de récupérer tout le token
    next();
  });
};

isAdmin = (req, res, next) => {
    models.user.findByPk(req.userId).then(user => {
      
          if (user.admin) { //N'oublions pas que dans ce cas précis,  admin est booléen dans mon modèle user : par défaut false,
            next();
            return;
          }
        })

        res.status(403).send({
          message: "Vous n'êtes pas admin!"
        });
        return;
      };

const authJwt = {
    verifyJwt: verifyJwt,
    isAdmin: isAdmin,
}

module.exports = authJwt