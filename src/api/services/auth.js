import User from "../../models/User";
import CustomError from "../../utils/customError";
import AuthDto from "../dto/auth";
import bcrypt from "bcrypt";
import { generateKey, sendKeyByEmail } from "../../utils/nodemailer";

const AuthService = {
  register: async (email, password, nickname) => {
    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) throw new CustomError("EXIST_EMAIL", 409, `${email}은 이미 존재하는 이메일입니다.`);

    const existNickname = await User.findOne({ where: { nickname } });
    if (existNickname) throw new CustomError("EXIST_NICKNAME", 409, `${nickname}은 이미 존재하는 이메일입니다.`);

    const user = await User.create({ email, nickname, password });
    const data = AuthDto.register(user);

    return data;
  },

  login: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new CustomError("REQUIRED_REGISTER", 401, "가입되지 않은 이메일입니다.");

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new CustomError("PASSWORD_IS_WRONG", 401, "비밀번호가 일치하지 않습니다.");

    const data = AuthDto.login(user);

    return data;
  },

  postEmailKey: async (email) => {
    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) throw new CustomError("EXIST_EMAIL", 409, `${email}은 이미 존재하는 이메일입니다.`);

    const key = generateKey();
    await sendKeyByEmail(email, key);
    const salt = bcrypt.genSaltSync();
    const encryptedKey = bcrypt.hashSync(key, salt);

    return encryptedKey;
  },

  putEmailKey: async (key, emaliKey) => {
    if (!emaliKey) throw new CustomError("NOT_COOKIE", 404, "인증번호 전송을 누르지 않아 쿠키가 없습니다.");

    const result = await bcrypt.compare(key, emaliKey);
    if (!result) throw new CustomError("KEY_IS_WRONG", 400, "인증번호가 일치하지 않습니다.");

    return result;
  },

  checkEmail: async (email) => {
    const existEmail = await User.findOne({ where: { email } });
    if (!existEmail) throw new CustomError("NOT_EXIST_EMAIL", 404, `${email}은 가입되지 않은 회원입니다.`);

    return true;
  },

  putPassword: async (email, password) => {
    const existEmail = await User.findOne({ where: { email } });
    if (!existEmail) throw new CustomError("NOT_EXIST_EMAIL", 404, `${email}은 가입되지 않은 회원입니다.`);

    const salt = bcrypt.genSaltSync();
    const encryptedPwd = bcrypt.hashSync(password, salt);
    await User.update({ password: encryptedPwd }, { where: { email } });

    return true;
  },
};

export default AuthService;
