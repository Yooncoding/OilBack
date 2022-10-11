import { Router } from "express";
const router = Router();

function authRouter(root) {
  root.use("/auth", router);

  /**
   * TEST router
   */
  router.get("/", (req, res) => {
    res.send("hello");
  });
}

export default authRouter;
