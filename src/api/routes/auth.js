import { Router } from "express";
import AuthController from "../controllers/auth";
import { AuthValidator } from "../middlewares/validators/validation";

const router = Router();

function authRouter(root) {
  root.use("/auth", router);

  router.post("/register", AuthValidator.register, AuthController.register);
  router.post("/login", AuthController.login);
  router.post("/email-key", AuthValidator.postEmailKey, AuthController.postEmailKey);
}

export default authRouter;
