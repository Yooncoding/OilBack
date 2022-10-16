import { Router } from "express";
import AuthController from "../controllers/auth";
import { AuthValidator } from "../middlewares/validators/validation";

const router = Router();

function authRouter(root) {
  root.use("/auth", router);

  router.post("/register", AuthValidator.register, AuthController.register);
  router.post("/login", AuthController.login);
  router.post("/email-key", AuthValidator.postEmailKey, AuthController.postEmailKey);
  router.put("/check/email-key", AuthController.checkEmailKey);
  router.get("/check/email", AuthController.checkEmail);
  router.put("/password", AuthValidator.putPassword, AuthController.putPassword);
  router.get("/logout", AuthController.logout);
}

export default authRouter;
