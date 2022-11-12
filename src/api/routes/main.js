import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import MainController from "../controllers/main";
import { MainValidtor } from "../middlewares/validators/validation";

const router = Router();

function mainRouter(root) {
  root.use("/main", router);
  router.use(auth.isLogin);

  router.get("/", MainValidtor.getMain, MainController.getMain);
  router.get("/test", MainController.test);
}

export default mainRouter;
