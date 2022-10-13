import * as Model from "../models";
import logger from "../utils/logger";

export default async () => {
  const sequelize = Model.init();
  await sequelize
    .sync({ force: false })
    .then(() => {
      console.log("    ################################################");
      console.log("    › SEQUELIZE LOADED");
    })
    .catch((err) => {
      logger.error(err);
    });
};
