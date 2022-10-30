import CustomError from "../../utils/customError";
import PostService from "./post";

const StatisticsService = {
  getStatistics: async (userId, tab) => {
    const posts = await PostService.findPostsForPeriod(userId, tab);
    if (!posts) throw new CustomError("NOT_EXIST_POST", 404, `${tab}일동안 제출한 일기가 없습니다.`);

    let positiveSum = 0;
    let negativeSum = 0;
    let neutralSum = 0;
    let cnt = 0;
    posts.forEach((post) => {
      positiveSum += post.positive;
      negativeSum += post.negative;
      neutralSum += post.neutral;
      cnt += 1;
    });

    const sentiment = Math.max(positiveSum, negativeSum, neutralSum);

    const data = {
      userId,
      positive: positiveSum / cnt,
      negative: negativeSum / cnt,
      neutral: neutralSum / cnt,
      sentiment,
    };

    return data;
  },
};

export default StatisticsService;
