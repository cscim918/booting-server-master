const models = require('../../../models');

const resolvers = {
  Mutation: {
    addTeam: async (_, args) => {
      try {
        const { leader_no, member1_no, member2_no} = args;
        const createTeam = await models.team.create({
          leader_no,
          member1_no,
          member2_no
        })
        return {
          ok: true,
          team: createTeam,
          message: `팀이 생성되었습니다.`
        }
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          team: null,
          message: '팀 생성 오류',
        };
      }
    },
  },
};

module.exports = resolvers;
