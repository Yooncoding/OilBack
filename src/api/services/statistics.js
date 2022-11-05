import CustomError from "../../utils/customError";
import PostService from "./post";

const StatisticsService = {
  getStatistics: async (userId, tab) => {
    const posts = await PostService.findPostsForPeriod(userId, tab);
    if (posts.length === 0) throw new CustomError("NOT_EXIST_POST", 404, `${tab}일동안 제출한 일기가 없습니다.`);

    const positive_graph = [];
    const negative_graph = [];
    const neutral_graph = [];

    posts.forEach((post) => {
      positive_graph.push({ x: post.yyyymmdd, y: post.positive });
      negative_graph.push({ x: post.yyyymmdd, y: post.negative });
      neutral_graph.push({ x: post.yyyymmdd, y: post.neutral });
    });

    const data = [
      { id: "기쁨", color: "hsl(211, 70%, 50%)", data: positive_graph },
      { id: "중립", color: "hsl(62, 70%, 50%)", data: negative_graph },
      { id: "슬픔", color: "hsl(339, 70%, 50%)", data: neutral_graph },
    ];

    return data;
  },
};

export default StatisticsService;
