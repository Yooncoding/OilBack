import { verify } from "jsonwebtoken";
import CustomError from "../../../utils/customError";
import config from "../../../config";
import UserService from "../../services/user";

const auth = {
  isLogin: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new CustomError("UNAUTHENTICATED", 401, "로그인이 필요합니다.");
      const token = authorization.split(" ");
      const user = await tokenVerify(token);
      req.user = { id: user.id, email: user.email, nickname: user.nickname };
      next();
    } catch (err) {
      next(err);
    }
  },
};

async function tokenVerify(token) {
  if (token[0] !== "Bearer" && token[0] !== "Token") throw new CustomError("TOKEN_IS_WRONG", 403, "잘못된 토큰입니다.");

  const { id } = verify(token[1], config.jwt_secret);
  const user = await UserService.findById(id);
  if (!user) throw new CustomError("USER_NOT_EXIST", 404, "탈퇴한 회원입니다.");

  return user;
}

export default auth;
