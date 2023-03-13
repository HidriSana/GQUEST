const DataTypes = require("sequelize").DataTypes;
const _difficulties = require("./difficulties");
const _guilds = require("./guilds");
const _points = require("./points");
const _quests = require("./quests");
const _roles = require("./roles");
const _statuses = require("./statuses");
const _users = require("./users");

function initModels(sequelize) {
  const difficulties = _difficulties(sequelize, DataTypes);
  const guilds = _guilds(sequelize, DataTypes);
  const points = _points(sequelize, DataTypes);
  const quests = _quests(sequelize, DataTypes);
  const roles = _roles(sequelize, DataTypes);
  const statuses = _statuses(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  roles.hasOne(users, {
    foreignKey: {
      name: 'role_id'
    }
  })
  
  guilds.hasMany(users, {
    foreignKey: {
      name: 'guild_id'
    }
  })
  
  users.belongsTo(guilds, {
    foreignKey: {
      name: 'guild_id'
    }
  });   

  return {
    difficulties,
    guilds,
    points,
    quests,
    roles,
    statuses,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
