'use strict';

module.exports = (sequelize, DataTypes) => {
  const booting = sequelize.define('booting', {
    team1_leader_studentId: {
      type: DataTypes.STRING,
    },
    team2_leader_studentId: {
      type: DataTypes.STRING,
    },
  });
  return booting;
};
