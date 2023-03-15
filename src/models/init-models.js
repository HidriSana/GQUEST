const DataTypes = require("sequelize").DataTypes;
const _difficulties = require("./difficulties");
const _guilds = require("./guilds");
const _points = require("./points");
const _quests = require("./quests");
const _roles = require("./roles");
const _statuses = require("./statuses");
const _users = require("./users");

function initModels(sequelize) {
  const difficulty = _difficulties(sequelize, DataTypes);
  const guild = _guilds(sequelize, DataTypes);
  const points = _points(sequelize, DataTypes);
  const quest = _quests(sequelize, DataTypes);
  const role = _roles(sequelize, DataTypes);
  const status = _statuses(sequelize, DataTypes);
  const user = _users(sequelize, DataTypes);

  role.hasOne(user, {
    foreignKey: {
      name: 'role_id'
    }
  })
  
  guild.hasMany(user, {
    foreignKey: {
      name: 'guild_id'
    }
  })
  
  user.belongsTo(guild, {
    foreignKey: {
      name: 'guild_id'
    }
  })

  guild.hasMany(quest, {
    foreignKey: {
      name: 'guild_id'
    }
    })

    quest.belongsTo(guild, {
      foreignKey: {
        name: 'guild_id'
      }
    })

    user.hasMany(quest, {
      foreignKey: {
        name: 'user_id'
      }
    })

    quest.belongsTo(user, {
      foreignKey: {
        name: 'user_id'
      }
    })

    status.hasMany(quest, {
      foreignKey: {
        name: 'status_id'
      }
    })

    user.hasOne(quest, {
      foreignKey: {
        name: 'creator_id'
      }
    })

    points.hasMany(quest, {
      foreignKey: {
        name: 'points_id'
      }
    })


  return {
    difficulty,
    guild,
    points,
    quest,
    role,
    status,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
