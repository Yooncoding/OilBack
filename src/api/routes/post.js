import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import PostController from "../controllers/post";
import { PostValidator } from "../middlewares/validators/validation";
import postImageUpload from "../middlewares/multer";

const router = Router();

function postRouter(root) {
  root.use("/posts", router);
  router.use(auth.isLogin);

  router.get("/search/logs", PostController.getSearchLogs);
  router.delete("/search/logs/:logId", PostController.deleteSearchLog);
  router.get("/search/result", PostValidator.searchPosts, PostController.searchPosts);
  router.post("/write", postImageUpload.single("image"), PostValidator.write, PostController.write);
  router.get("/:postId", PostController.getPost);
  router.delete("/:postId", PostController.deletePost);
  router.put("/:postId", postImageUpload.single("image"), PostValidator.putPost, PostController.putPost);
}

export default postRouter;
