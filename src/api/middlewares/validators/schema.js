import DateExtension from "@joi/date";
import JoiImport from "joi";

const joi = JoiImport.extend(DateExtension);

const schema = {
  email: joi.string().email().min(6).required(),
  nickname: joi
    .string()
    .regex(/^[가-힣|a-z|A-Z|0-9|]{2,8}$/)
    .required(),
  password: joi
    .string()
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/)
    .required(),
  type: joi.string().valid("register", "password").required(),
  title: joi.string().min(2).max(20).required(),
  content: joi.string().min(8).max(700).required(),
  weather: joi.string().min(2).max(20).required(),

  q: joi.string().min(2).required(),
  page: joi.number().integer().min(0),

  y: joi.date().format("YYYY"),
  m: joi.date().format("MM"),

  tab: joi.number().integer().valid(7, 30, 100, 365).required(),
};

export default schema;
