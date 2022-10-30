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
    let filteredPosts = [];
    posts.forEach((post) => {
      positiveSum += post.positive;
      negativeSum += post.negative;
      neutralSum += post.neutral;
      cnt += 1;

      filteredPosts.push({
        positive: post.positive,
        negative: post.negative,
        neutral: post.neutral,
        yyyymmdd: post.yyyymmdd,
      });
    });

    const max = Math.max(positiveSum, negativeSum, neutralSum);
    let maxSentiment = "";
    if (max === positiveSum) maxSentiment = "positive";
    if (max === negativeSum) maxSentiment = "negative";
    if (max === neutralSum) maxSentiment = "neutral";

    const data = {
      filteredPosts,
      positiveAvg: positiveSum / cnt,
      negativeAvg: negativeSum / cnt,
      neutralAvg: neutralSum / cnt,
      maxSentiment,
      cnt,
      userId,
    };

    return data;
  },
};

export default StatisticsService;
