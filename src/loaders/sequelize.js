import * as Model from "../models";

export default async () => {
  const sequelize = Model.init();
  await sequelize
    .sync({ force: false })
    .then(() => {
      console.log("    ################################################");
      console.log("    › SEQUELIZE LOADED");
    })
    .catch((err) => {
      console.error(err);
    });
};
