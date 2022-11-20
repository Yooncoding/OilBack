import express from "express";
import config from "./config";
import loader from "./loaders";
import logger from "./utils/logger";

async function startServer() {
  const app = express();

  await loader(app);

  app
    .listen(config.port, () => {
      console.log(`
    ################################################
    🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
    `);
    })
    .on("error", (err) => {
      logger.error(err);
      process.exit(1);
    });
}

startServer();
