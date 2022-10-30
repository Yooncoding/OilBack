import { Router } from "express";
import authRouter from "./auth";
import postRouter from "./post";
import mainRouter from "./main";
import calendarRouter from "./calendar";

const rootRouter = Router();

export default () => {
  authRouter(rootRouter);
  postRouter(rootRouter);
  mainRouter(rootRouter);
  calendarRouter(rootRouter);

  return rootRouter;
};
