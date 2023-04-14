const {createQuest, updateQuest, findQuest, findAllQuests} = require('../controllers/questController')
const {verifyJWT} = require('../auth/auth')
const {verifyRole} = require ('../auth/verifyRole')



module.exports = (app) => {
    //La création, modification et suppression des quêtes est du ressort des admins, d'où la double vérification, du  jeton et du role qu'il contient
   app.post('/create-quest',[verifyJWT,verifyRole] , (req, res) => {
        
       return createQuest(req,res)
    });

    app.put('/update-quest/:id',[verifyJWT,verifyRole], (req, res) => {
        
      return updateQuest(req,res)
   });


   // La simple récupération de la quête  n'exige pas d'être admin, on ne vérifiera que la détention d'un jeton valide
   app.get('/find-quest/:id', (req, res) => {
        
      return findQuest(req,res)
   });

   app.get('/quests', (req, res) => {
        
      return findAllQuests(req,res)
   });
}
