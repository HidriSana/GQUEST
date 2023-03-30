const {verifyJwt} = require ('../controllers/registerController')

module.exports = (app) =>{
  app.use(function(req, res, next) {
    res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.post('/auth', (req, res) => {
      return verifyJwt(req,res)
  });
}
