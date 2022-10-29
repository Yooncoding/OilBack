import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import PostController from "../controllers/post";
import { PostValidator } from "../middlewares/validators/validation";

const router = Router();

function postRouter(root) {
  root.use("/posts", router);
  router.use(auth.isLogin);

  router.post("/write", PostValidator.write, PostController.write);
  router.get("/:postId", PostController.getPost);
  router.delete("/:postId", PostController.deletePost);
}

export default postRouter;
