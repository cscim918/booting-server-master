const models = require('../../../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const resolvers = {
  Query: {
    filtering: async (_, args) => {
      try {
        const { age1, age2, filter, major, mbti } = args;
        const filteredUser = await models.user.findAll({
          where: {
                major: {
                  [Op.or]: [{ [Op.eq]: major} , {[Op.ne]: filter}]
                },
                age: {
                  [Op.and]: [{ [Op.gte]: age1} , {[Op.lte]: age2 }]
                },
                mbti: {
                  [Op.or]: [{[Op.eq]: mbti}, {[Op.like]: "%"}] 
                },
          },
          order: Sequelize.literal('random()'),
          limit: 2,
        });
        return {
          ok: true,
          user: filteredUser,
          message: `필터링을 불러왔습니다.`
        };
      } catch {
        return {
          ok: false,
          message: '필터링에 실패했습니다.',
        };
      }
    },
  },
};

module.exports = resolvers;
