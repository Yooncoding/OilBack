import express from "express";
import config from "./config";
import loader from "./loaders";

async function startServer() {
  const app = express();

  // loader
  await loader(app);

  // port binding
  app
    .listen(config.port, () => {
      console.log(`
    ################################################
    🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
    `);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
