import responseDto from "../../utils/customResponse";
import UserService from "../services/user";
import AuthService from "../services/auth";

const UserContoller = {
  deleteAccount: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { email, password } = req.body;
      await UserService.deleteAccount(id, email, password);

      res.status(200).json(responseDto({ suc: true, mes: "회원탈퇴 완료. 로그인페에지로 이동" }));
    } catch (err) {
      next(err);
    }
  },

  putPassword: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { password } = req.body;
      await UserService.putPassword(id, password);

      res.status(200).json(responseDto({ suc: true, mes: "비밀번호 변경 완료" }));
    } catch (err) {
      next(err);
    }
  },

  putNickname: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { nickname } = req.body;
      await UserService.putNickname(id, nickname);

      res.status(200).json(responseDto({ suc: true, mes: "닉네임 변경 완료" }));
    } catch (err) {
      next(err);
    }
  },
};

export default UserContoller;
