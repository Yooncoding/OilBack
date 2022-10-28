import Sequelize from "sequelize";
export default class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        weather: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        neutral: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        negative: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        positive: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        sentiment: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        yyyymmdd: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "post",
        freezeTableName: true,
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
}
