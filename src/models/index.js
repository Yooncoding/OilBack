import Sequelize from "sequelize";
import config from "../config";
import User from "./User";
import Post from "./Post";
import PostImage from "./PostImage";
import SearchHistory from "./SearchHisotry";

export function init() {
  const sequelize = new Sequelize(config.mysql);
  // init
  User.init(sequelize);
  Post.init(sequelize);
  PostImage.init(sequelize);
  SearchHistory.init(sequelize);

  // asscociate
  User.hasMany(Post, { foreignKey: "userId", targetKey: "id" });
  Post.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

  return sequelize;
}
