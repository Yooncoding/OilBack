import responseDto from "../../utils/customResponse";
import UserService from "../services/user";

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
};

export default UserContoller;
