import { Router } from "express";
import authRouter from "./auth";

const rootRouter = Router();

export default () => {
  authRouter(rootRouter);

  return rootRouter;
};
