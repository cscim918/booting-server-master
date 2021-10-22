'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.team = require('./team')(sequelize, Sequelize);
db.booting = require('./booting')(sequelize, Sequelize);
db.TeamUser = require('./TeamUser')(sequelize, Sequelize);

// Team.associate = (models) => {
//   Team.belongsToMany(models.User, {
//     through: models.TeamUser,
//     foreignKey: {
//       name: 'teamId',
//       field: 'team_id',
//     },
//   });
//   Team.belongsTo(models.User, {
//     foriegnKey: 'leader',
//   });
// };

// User.associate = (models) => {
//   // N:M
//   User.belongsToMany(models.Team, {
//     through: models.TeamUser,
//     foreignKey: {
//       name: 'userId',
//       field: 'user_id',
//     },
//   });
// };

module.exports = db;
