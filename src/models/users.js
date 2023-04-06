const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    
    lastname: {
      type: DataTypes.STRING(255),
      allowNull: false,
       //Validate est un validateur de Sequelize. Le format validate :{msg: ""} est simple et permet de poser des contraintes aux utilisateurs avec un message à l'appui
       validate: {
        notNull: {msg: "Vous devez saisir un nom"},//N'autorise pas de champ vide
        notEmpty: {msg: "Vous devez saisir un nom"} //N'autorise pas un format de "string" vide ou ne contenant que des espaces, par contre , autorise un espace entre deux caractères. TEST OK!
      }
      },
    
    firstname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {msg: "Vous devez saisir un prénom"}
      }
    },
    
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate:  {
        isEmail: {msg : "Format de mail incorrect"}, 
        notNull: {msg: "Ce champ ne peut être vide"}
      },
      //unique est aussi une contrainte de sequelize qui oblige l'unicité de l'adresse mail lors de l'authentitification  , dans ce cas précis car l'adresse mail servira de login
      unique: {msg: "Cette adresse mail est déjà utilisée"}
    },
    
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      //Les conditions de validation de ce mot de passe  est un choix personnel et indiqué par le message d'erreur ci-dessous. J'ai imposé le maximum de caractères pour ne pas me trouver avec des kilomètres de mot de passe.  Test : OK! 
      validate:  {
        validatePassword: function(password) {
                      if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password))) {
                          throw new Error('Le mot de passe doit contenur 8 caractères au minimum, 12 au maximum, incluant au moins une majuscule, un chiffre et un caractère spécial.');
                      }
                  }
              },
    },

    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
    
    
},

//Ce hook permet de gérer le comportement de la création d'un compte utilisateur. Le beforeCreate, comme son nom l'indique, hashe  le mot de pass avant même la création 
{
hooks: {
  beforeCreate: async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSaltSync(10, 'a');
    user.password = bcrypt.hashSync(user.password, salt);
  }
  },
  beforeUpdate:async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSaltSync(10, 'a');
    user.password = bcrypt.hashSync(user.password, salt);
    }
  }
}}
)
};

