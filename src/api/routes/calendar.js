import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import CalendarController from "../controllers/calendar";
import { CalendarValidator } from "../middlewares/validators/validation";

const router = Router();

function calendarRouter(root) {
  root.use("/calendar", router);
  router.use(auth.isLogin);

  router.get("/", CalendarValidator.getCalendar, CalendarController.getCalendar);
}

export default calendarRouter;
