import Sequelize from "sequelize";
import config from "../config";
import User from "./User";
import Post from "./Post";

export function init() {
  const sequelize = new Sequelize(config.mysql);
  // init
  User.init(sequelize);
  Post.init(sequelize);

  // asscociate
  User.hasMany(Post, { foreignKey: "userId", targetKey: "id" });
  Post.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

  return sequelize;
}
