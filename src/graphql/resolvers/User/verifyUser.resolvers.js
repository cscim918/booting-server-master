const models = require('../../../models');

const { MATCH_STATUS } = require('../../../utils/constant');

const resolvers = {
  Mutation: {
    verifyUser: async (_, args, {}) => {
      const {
        studentId,
      } = args;
      try {
        const existUser = await models.user.findOne({
          where: {
            studentId,
          },
        });
        if (existUser.isMatched === MATCH_STATUS.FAIL) {
          const updatedUser = await models.user.update(
            {
              isMatched: MATCH_STATUS.READY,
            },
            { where: { studentId: existUser.studentId } }
          );
          return {
            ok: true,
            message: '유저 인증이 완료되었습니다.',
          };
        }
        return {
          ok: true,
          message: '이미 인증이 완료되었습니다.',
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          message: '인증 확인에 실패하였습니다.',
        };
      }
    },
  },
};

module.exports = resolvers;
