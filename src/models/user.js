'use strict';

import { MATCH_STATUS } from '../../src/utils/constant';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    studentId: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    major: {
      type: DataTypes.STRING,
    },
    mbti: {
      type: DataTypes.STRING,
    },
    kakaoId: {
      type: DataTypes.STRING,
    },
    isMatched: {
      type: DataTypes.ENUM([
        MATCH_STATUS.FAIL,
        MATCH_STATUS.READY,
        MATCH_STATUS.SUCCESS,
      ]),
      defaultValue: MATCH_STATUS.FAIL,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 3,
      },
    },
  });
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
  return User;
};
