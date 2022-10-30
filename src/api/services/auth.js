import UserService from "./user";
import CustomError from "../../utils/customError";
import AuthDto from "../dto/auth";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { generateKey, sendKeyByEmail } from "../../utils/nodemailer";
import config from "../../config";

const AuthService = {
  register: async (email, password, nickname) => {
    const existEmail = await UserService.findByEmail(email);
    if (existEmail) throw new CustomError("EXIST_EMAIL", 409, `${email}은 이미 존재하는 이메일입니다.`);

    const existNickname = await UserService.findByNickname(nickname);
    if (existNickname) throw new CustomError("EXIST_NICKNAME", 409, `${nickname}은 이미 존재하는 닉네임입니다.`);

    const user = await UserService.createUser(email, nickname, password);
    const data = AuthDto.userInfo(user);

    return data;
  },

  login: async (email, password) => {
    const user = await UserService.findByEmail(email);
    if (!user) throw new CustomError("REQUIRED_REGISTER", 401, "가입되지 않은 이메일입니다.");

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new CustomError("PASSWORD_IS_WRONG", 401, "비밀번호가 일치하지 않습니다.");

    const loginInfo = {
      token: jwt.sign({ id: user.id }, config.jwt_secret),
      user: AuthDto.userInfo(user),
    };

    return loginInfo;
  },

  postEmailKey: async (email, type) => {
    const existEmail = await UserService.findByEmail(email);
    if (existEmail & (type === "register")) throw new CustomError("EXIST_EMAIL", 409, `${email}은 이미 존재하는 이메일입니다.`);
    if (!existEmail & (type === "password")) throw new CustomError("NOT_EXIST_EMAIL", 404, `${email}은 가입되지 않은 회원입니다.`);

    const key = generateKey();
    await sendKeyByEmail(email, key);

    return key;
  },

  checkEmailKey: async (key, emaliKey) => {
    if (!emaliKey) throw new CustomError("NOT_COOKIE", 404, "인증번호 전송을 누르지 않아 쿠키가 없습니다.");

    const result = await bcrypt.compare(key, emaliKey);
    if (!result) throw new CustomError("KEY_IS_WRONG", 400, "인증번호가 일치하지 않습니다.");

    return result;
  },

  checkEmail: async (email) => {
    const existEmail = await UserService.findByEmail(email);
    if (!existEmail) throw new CustomError("NOT_EXIST_EMAIL", 404, `${email}은 가입되지 않은 회원입니다.`);

    return true;
  },

  putPassword: async (email, password) => {
    const existEmail = await UserService.findByEmail(email);
    if (!existEmail) throw new CustomError("NOT_EXIST_EMAIL", 404, `${email}은 가입되지 않은 회원입니다.`);

    const salt = bcrypt.genSaltSync();
    const encryptedPwd = bcrypt.hashSync(password, salt);
    await UserService.updatePassword(encryptedPwd, email);

    return true;
  },
};

export default AuthService;
