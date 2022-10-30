import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import UserContoller from "../controllers/user";

const router = Router();

function userRouter(root) {
  root.use("/users", router);
  router.use(auth.isLogin);

  router.delete("/account", UserContoller.deleteAccount);
}

export default userRouter;
