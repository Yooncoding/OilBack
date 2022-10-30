import { Router } from "express";
import authRouter from "./auth";
import postRouter from "./post";
import mainRouter from "./main";
import calendarRouter from "./calendar";
import userRouter from "./user";
import statisticsRouter from "./statistics";

const rootRouter = Router();

export default () => {
  authRouter(rootRouter);
  postRouter(rootRouter);
  mainRouter(rootRouter);
  calendarRouter(rootRouter);
  userRouter(rootRouter);
  statisticsRouter(rootRouter);

  return rootRouter;
};
