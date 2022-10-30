import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import StatisticsContoller from "../controllers/statistics";

const router = Router();

function statisticsRouter(root) {
  root.use("/statistics", router);
  router.use(auth.isLogin);

  router.get("/", StatisticsContoller.getStatistics);
}

export default statisticsRouter;
