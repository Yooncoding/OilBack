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

  putPassword: async (userId, password) => {
    const user = await UserService.findById(userId);
    if (!user) throw new CustomError("INVALID_ACCESS", 403, "비정상적인 접근입니다.");

    const salt = bcrypt.genSaltSync();
    const encryptedPwd = bcrypt.hashSync(password, salt);
    await UserService.updatePasswordById(encryptedPwd, userId);

    return true;
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
  updatePasswordById: async (password, userId) => {
    return await User.update({ password }, { where: { id: userId } });
  },
  destroyPostById: async (userId) => {
    return await User.destroy({ where: { id: userId } });
  },

  putNickname: async (email, nickname) => {
    const existNickname = await UserService.findByNickname(nickname);
    if (existNickname) throw new CustomError("EXIST_NICKNAME", 409, `${nickname}은 이미 존재하는 닉네임입니다.`);

    return await User.update({ nickname }, { where: { email } });
  },
};

export default UserService;
