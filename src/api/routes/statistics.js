import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import StatisticsContoller from "../controllers/statistics";
import { StatisticsValidator } from "../middlewares/validators/validation";

const router = Router();

function statisticsRouter(root) {
  root.use("/statistics", router);
  router.use(auth.isLogin);

  router.get("/", StatisticsValidator.getStatistics, StatisticsContoller.getStatistics);
}

export default statisticsRouter;
