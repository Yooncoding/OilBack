import expressLoader from "./express";
import sequelizeLoader from "./sequelize";
import jobLoader from "./job";

export default async (app) => {
  await sequelizeLoader();
  expressLoader(app);
  jobLoader();
};
