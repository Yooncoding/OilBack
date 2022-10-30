import User from "../../models/User";
import CustomError from "../../utils/customError";
import bcrypt from "bcrypt";

const UserService = {
  deleteAccount: async (userId, email, password) => {
    const user = await UserService.findById(userId);
    if (user.email != email) throw new CustomError("EMAIL_IS_WRONG", 401, "로그인된 정보와 이메일이 일치하지 않습니다.");

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new CustomError("PASSWORD_IS_WRONG", 401, "비밀번호가 일치하지 않습니다.");

    return await UserService.destroyPostById(userId);
  },

  findById: async (userId) => {
    return await User.findByPk(userId);
  },
  findByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  },
  findByNickname: async (nickname) => {
    return await User.findOne({ where: { nickname } });
  },
  createUser: async (email, nickname, password) => {
    return await User.create({ email, nickname, password });
  },
  updatePassword: async (password, email) => {
    return await User.update({ password }, { where: { email } });
  },
  destroyPostById: async (userId) => {
    return await User.destroy({ where: { id: userId } });
  },
};

export default UserService;
