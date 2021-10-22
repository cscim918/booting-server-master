const models = require('../../../models');
const bcrypt = require('bcrypt');

const resolvers = {
  Mutation: {
    certifyUser: async (_, args, {}) => {
      const { studentId, name, password, age, major, mbti, kakaoId } = args;
      try {
        const existUser = await models.user.findOne({
          where: {
            studentId,
          },
        });
        if (existUser) {
          return {
            ok: false,
            message: `이미 존재하는 유저입니다.`
          }
        } else {
          const hashPassword = await bcrypt.hash(password, 10);
          const createUser = await models.user.create({
            studentId,
            name,
            password: hashPassword,
            age,
            major,
            mbti,
            kakaoId
          });
          if (createUser) {
            return {
              ok: true,
              user: createUser,
              message: `가입 요청이 완료되었습니다.`
            };
          }
        }
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          message: '유저 인증 요청에 실패하였습니다.',
        };
      }
    },
  },
};

module.exports = resolvers;