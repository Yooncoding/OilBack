import { Router } from "express";
import authRouter from "./auth";
import postRouter from "./post";
import mainRouter from "./main";

const rootRouter = Router();

export default () => {
  authRouter(rootRouter);
  postRouter(rootRouter);
  mainRouter(rootRouter);

  return rootRouter;
};
