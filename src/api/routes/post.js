import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import PostController from "../controllers/post";
import { PostValidator } from "../middlewares/validators/validation";
import postImageUpload from "../middlewares/multer";

const router = Router();

function postRouter(root) {
  root.use("/posts", router);
  router.use(auth.isLogin);

  router.post("/write", postImageUpload.single("image"), PostValidator.write, PostController.write);
  router.get("/:postId", PostController.getPost);
  router.delete("/:postId", PostController.deletePost);
  router.put("/:postId", postImageUpload.single("image"), PostController.putPost);
}

export default postRouter;
