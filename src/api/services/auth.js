import User from "../../models/User";
import CustomError from "../../utils/customError";
import AuthDto from "../dto/auth";
import bcrypt from "bcrypt";

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

  login: async (email, password) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new CustomError("REQUIRED_REGISTER", 401, "가입되지 않은 이메일입니다.");

      const result = await bcrypt.compare(password, user.password);
      if (!result) throw new CustomError("PASSWORD_IS_WRONG", 401, "비밀번호가 일치하지 않습니다.");

      const data = AuthDto.login(user);

      return data;
    } catch (err) {
      throw err;
    }
  },
};

export default AuthService;
