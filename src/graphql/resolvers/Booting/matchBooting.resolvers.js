const models = require('../../../models');

const resolvers = {
  Mutation: {
    matchBooting: async (_, args, {}) => {
      const { team1_leader_studentId, team2_leader_studentId } = args;
      try {
        // const existedUser = await models.user.findOne({
        //   where: { studentId: team1_leader_studentId },
        // });
        // const existedUser2 = await models.user.findOne({
        //   where: { studentId: team2_leader_studentId },
        // });
        // if(existedUser.count >= 3 || existedUser2.count >=3){
        //   return {
        //     ok: false,
        //     booting: null,
        //     message: '매칭 신청횟수가 3회를 초과했습니다.',
        //   };
        // }
        const existBooting = await models.booting.findOne({
          where: { team1_leader_studentId, team2_leader_studentId },
        });
        if (existBooting) {
          return {
            ok: true,
            booting: existBooting,
            message: `이미 매칭된 적이 있습니다.`,
          };
        }
        const createBooting = await models.booting.create({
          team1_leader_studentId,
          team2_leader_studentId,
        });
        await models.user.update(
          {
            count: existedUser.count + 1,
          },
          {
            where: {
              studentId: team1_leader_studentId,
            },
          }
        );
        await models.user.update(
          {
            count: existedUser2.count + 1,
          },
          {
            where: {
              studentId: team2_leader_studentId,
            },
          }
        );
        return {
          ok: true,
          booting: createBooting,
          message: `매칭에 성공하였습니다.`,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          user: null,
          message: '매칭에 실패하였습니다.',
        };
      }
    },
  },
};

module.exports = resolvers;
