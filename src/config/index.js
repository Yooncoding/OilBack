import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  // port
  port: parseInt(process.env.PORT),

  // database
  mysql: {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    timezone: "+09:00",
    dialect: "mysql",
    logging: false,
  },

  rds: {
    database: process.env.RDS_DATABASE,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOST,
  },

  // cookie
  cookie_secret: process.env.COOKIE_SECRET,
  jwt_secret: process.env.JWT_SECRET,

  // mail
  mailOption: {
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  },

  clova: {
    id: process.env.CLOVA_ID,
    secret: process.env.CLOVA_SECRET,
  },

  aws: {
    region: "ap-northeast-2",
    accessKeyId: process.env.AWS_S3_KEY_ID,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  },

  // api
  api: { prefix: "/api" },
};
