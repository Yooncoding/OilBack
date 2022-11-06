import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import UserController from "../controllers/user";

const router = Router();

function userRouter(root) {
  root.use("/users", router);
  router.use(auth.isLogin);

  router.put("/password", UserController.putPassword);
  router.put("/nickname", UserController.putNickname);
  router.delete("/account", UserController.deleteAccount);
}

export default userRouter;
