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

  postEmailKey: async (req, res, next) => {
    try {
      const { email } = req.body;
      const key = await AuthService.postEmailKey(email);

      res
        .cookie("emailKey", key, { expriensIn: "10m" })
        .status(201)
        .json(responseDto({ suc: true, data: key }));
    } catch (err) {
      next(err);
    }
  },

  putEmailKey: async (req, res, next) => {
    try {
      const { key } = req.body;
      const { emailKey } = req.cookies;

      await AuthService.putEmailKey(key, emailKey);

      res
        .clearCookie("emailKey")
        .status(200)
        .json(responseDto({ suc: true }));
    } catch (err) {
      next(err);
    }
  },

  putPassword: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      await AuthService.putPassword(email, password);

      res.status(200).json(responseDto({ suc: true }));
    } catch (err) {
      next(err);
    }
  },
};

export default AuthController;
