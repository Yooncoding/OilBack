import Sequelize from "sequelize";
export default class PostImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        image_name: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: "post-image-default.png",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "post_image",
        freezeTableName: true,
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
}
