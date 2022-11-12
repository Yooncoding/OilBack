import joi from "joi";
import schema from "./schema";
import CustomError from "../../../utils/customError";

const AuthValidator = {
  register: (req, res, next) => {
    const value = joi
      .object({
        email: schema.email,
        password: schema.password,
        nickname: schema.nickname,
      })
      .validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },

  postEmailKey: (req, res, next) => {
    const value = joi.object({ email: schema.email, type: schema.type }).validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },

  putPassword: (req, res, next) => {
    const value = joi.object({ email: schema.email, password: schema.password }).validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

const PostValidator = {
  write: (req, res, next) => {
    const value = joi.object({ title: schema.title, content: schema.content, weather: schema.weather }).validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },

  searchPosts: (req, res, next) => {
    const value = joi.object({ q: schema.q, page: schema.page }).validate(req.query);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },

  putPost: (req, res, next) => {
    const value = joi.object({ title: schema.title, content: schema.content, weather: schema.weather }).validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

const MainValidtor = {
  getMain: (req, res, next) => {
    const value = joi.object({ page: schema.page }).validate(req.query);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

const CalendarValidator = {
  getCalendar: (req, res, next) => {
    const value = joi.object({ y: schema.y, m: schema.m }).validate(req.query);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};
const StatisticsValidator = {
  getStatistics: (req, res, next) => {
    const value = joi.object({ tab: schema.tab }).validate(req.query);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};
const UserValidator = {
  putPassword: (req, res, next) => {
    const value = joi.object({ password: schema.password }).validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },

  putNickname: (req, res, next) => {
    const value = joi.object({ nickname: schema.nickname }).validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

export { AuthValidator, PostValidator, MainValidtor, CalendarValidator, StatisticsValidator, UserValidator };
