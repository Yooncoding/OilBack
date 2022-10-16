import User from "../../models/User";
import CustomError from "../../utils/customError";
import AuthDto from "../dto/auth";

const AuthService = {
  register: async (email, password, nickname) => {
    try {
      const existEmail = await User.findOne({ where: { email } });
      if (existEmail) throw new CustomError("EXIST_EMAIL", 409, `${email}은 이미 존재하는 이메일입니다.`);

      const existNickname = await User.findOne({ where: { nickname } });
      if (existNickname) throw new CustomError("EXIST_NICKNAME", 409, `${nickname}은 이미 존재하는 이메일입니다.`);

      const user = await User.create({ email, nickname, password });
      const data = AuthDto.register(user);

      return data;
    } catch (err) {
      throw err;
    }
  },
};

export default AuthService;
