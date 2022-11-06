import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import UserController from "../controllers/user";
import { UserValidator } from "../middlewares/validators/validation";

const router = Router();

function userRouter(root) {
  root.use("/users", router);
  router.use(auth.isLogin);

  router.put("/password", UserValidator.putPassword, UserController.putPassword);
  router.put("/nickname", UserValidator.putNickname, UserController.putNickname);
  router.delete("/account", UserController.deleteAccount);
}

export default userRouter;
