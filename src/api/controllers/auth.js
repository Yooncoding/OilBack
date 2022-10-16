import responseDto from "../../utils/customResponse";
import AuthService from "../services/auth";

const AuthController = {
  register: async (req, res, next) => {
    try {
      const { email, password, nickname } = req.body;
      const data = await AuthService.register(email, password, nickname);
      res.status(201).json(responseDto({ suc: true, data }));
    } catch (err) {
      next(err);
    }
  },
};

export default AuthController;
