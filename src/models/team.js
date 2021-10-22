'use strict';

module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    leader_no: {
      type: DataTypes.STRING,
    },
    member1_no: {
      type: DataTypes.STRING,
    },
    member2_no: {
      type: DataTypes.STRING,
    },
  });

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
  return Team;
};
