import express from "express";
import cors from "cors";
import routes from "../api/routes";
import config from "../config";

export default (app) => {
  // middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // router
  app.use(config.api.prefix, routes());

  // error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ success: false, message: err.message });
  });
};
