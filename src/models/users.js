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
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      //Validate est un validateur de Sequelize. Le format valide:{msg: ""} est simple et permet de poser des contraintes aux utilisateurs avec un message à l'appui
      validate:  {
        isEmail: true, 
        notNull: {msg: "Ce champ ne peut être vide"}
      },
      //unique est aussi une contrainte de sequelize qui oblige l'unicité de l'adresse mail lors de l'authentitification  , dans ce cas précis car l'adresse mail servira de login
      unique: {msg: "Cette adresse mail est déjà utilisée"}
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    
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

