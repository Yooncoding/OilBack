import CustomError from "../../../utils/customError";

const auth = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      const error = new CustomError("UNAUTHENTICATED", 401, "로그인이 필요합니다.");
      next(error);
    }
  },
};

export default auth;
