import expressLoader from "./express";
import sequelizeLoader from "./sequelize";

export default async (app) => {
  await sequelizeLoader();
  expressLoader(app);
};
