import passport from "passport";
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

  login: async (req, res, next) => {
    passport.authenticate("local", { session: false }, (authError, user) => {
      if (authError) return next(authError);

      req.login(user, (loginError) => {
        if (loginError) return next(loginError);

        res.status(201).json(responseDto({ suc: true, mes: "로그인 성공" }));
      });
    })(req, res, next);
  },
};

export default AuthController;
