import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import PostController from "../controllers/post";

const router = Router();

function postRouter(root) {
  root.use("/posts", router);
  router.use(auth.isLogin);

  router.post("/write", PostController.write);
}

export default postRouter;
