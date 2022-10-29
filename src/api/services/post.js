import Post from "../../models/Post";
import moment from "moment";
import CustomError from "../../utils/customError";
import analyzeSentiment from "../../utils/clova";

const PostService = {
  write: async (userId, title, content, weather) => {
    const convertedToday = moment().subtract(4, "h").format("YYYY-MM-DD");
    const post = await PostService.findTodayPostByUser(userId, convertedToday);
    if (post) throw new CustomError("EXIST_TODAY_POST", 400, "오늘 이미 제출된 일기가 있습니다. (오늘 기준 -> TODAY 04:00 ~ TOMMORW 03:59)");

    const result = await analyzeSentiment(content);
    const sentimentInfo = JSON.parse(result);
    const sentimentData = {
      sentiment: sentimentInfo.document.sentiment,
      negative: sentimentInfo.document.confidence.negative,
      positive: sentimentInfo.document.confidence.positive,
      neutral: sentimentInfo.document.confidence.neutral,
    };

    return await PostService.createPost(userId, title, content, weather, convertedToday, sentimentData);
  },

  findTodayPostByUser: async (userId, convertedToday) => {
    return await Post.findOne({ where: { userId, yyyymmdd: convertedToday } });
  },

  createPost: async (userId, title, content, weather, convertedToday, sentimentData) => {
    return await Post.create({
      userId,
      title,
      content,
      weather,
      yyyymmdd: convertedToday,
      sentiment: sentimentData.sentiment,
      negative: sentimentData.negative,
      positive: sentimentData.positive,
      neutral: sentimentData.neutral,
    });
  },
};

export default PostService;
