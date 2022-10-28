import { Router } from "express";
import authRouter from "./auth";
import postRouter from "./post";

const rootRouter = Router();

export default () => {
  authRouter(rootRouter);
  postRouter(rootRouter);

  return rootRouter;
};
