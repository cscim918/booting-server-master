const models = require('../../../models');
const { Op } = require('sequelize');

const resolvers = {
  Query: {
    checkBooting: async (_, args) => {
      const { studentId } = args;
      const existBooting = await models.booting.findAll({
        where: {
          [Op.or]: [
            // {participant1_studentId: {[Op.eq]:studentId}},
            // {participant2_studentId: {[Op.eq]:studentId}},
            // {participant3_studentId: {[Op.eq]:studentId}},
            // {participant4_studentId: {[Op.eq]:studentId}}
            {team1_leader_studentId: {[Op.eq]: studentId}},
            {team2_leader_studentId: {[Op.eq]: studentId}},
          ]
        },
      });
      if (!existBooting) {
        return {
          ok: false,
          message: '해당되는 유저의 매칭 정보가 없습니다.',
        };
      } else {
      }
      return {
        ok: true,
        booting: existBooting,
        message: `매칭 정보가 조회되었습니다.`,
      };
    },
  },
};

module.exports = resolvers;

