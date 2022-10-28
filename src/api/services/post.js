import Post from "../../models/Post";
import moment from "moment";
import CustomError from "../../utils/customError";

const PostService = {
  write: async (userId, title, content, weather) => {
    const convertedToday = moment().subtract(4, "h").format("YYYY-MM-DD");
    const post = await PostService.findTodayPostByUser(userId, convertedToday);
    if (post) throw new CustomError("EXIST_TODAY_POST", 400, "오늘 이미 제출된 일기가 있습니다. (오늘 기준 -> TODAY 04:00 ~ TOMMORW 03:59)");

    return await PostService.createPost(userId, title, content, weather, convertedToday);
  },

  findTodayPostByUser: async (userId, convertedToday) => {
    return await Post.findOne({ where: { userId, yyyymmdd: convertedToday } });
  },

  createPost: async (userId, title, content, weather, convertedToday) => {
    return await Post.create({
      userId,
      title,
      content,
      weather,
      yyyymmdd: convertedToday,
    });
  },
};

export default PostService;
