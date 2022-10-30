import { Router } from "express";
import authRouter from "./auth";
import postRouter from "./post";
import mainRouter from "./main";
import calendarRouter from "./calendar";
import userRouter from "./user";

const rootRouter = Router();

export default () => {
  authRouter(rootRouter);
  postRouter(rootRouter);
  mainRouter(rootRouter);
  calendarRouter(rootRouter);
  userRouter(rootRouter);

  return rootRouter;
};
