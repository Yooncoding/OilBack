import Post from "../../models/Post";
import moment from "moment";
import CustomError from "../../utils/customError";
import analyzeSentiment from "../../utils/clova";
import PostImage from "../../models/PostImage";

const PostService = {
  write: async (userId, title, content, weather, image) => {
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

    return await PostService.createPost(userId, title, content, weather, convertedToday, sentimentData, image);
  },

  getPost: async (userId, postId) => {
    const post = await PostService.findPostById(userId, postId);
    if (!post) throw new CustomError("INVALID_ACCESS", 403, "비정상적인 접근입니다.");
    if (post.deletedAt) throw new CustomError("NOT_EXIST_POST", 404, "삭제된 심부름입니다.");

    return post;
  },

  deletePost: async (userId, postId) => {
    const post = await PostService.findPostById(userId, postId);
    if (!post) throw new CustomError("INVALID_ACCESS", 403, "비정상적인 접근입니다.");

    return await PostService.destroyPostById(userId, postId);
  },

  putPost: async (userId, postId, title, content, weather, image) => {
    const convertedToday = moment().subtract(4, "h").format("YYYY-MM-DD");
    const post = await PostService.findPostById(userId, postId);
    if (!post) throw new CustomError("INVALID_ACCESS", 403, "비정상적인 접근입니다.");
    if (post.yyyymmdd != convertedToday) throw new CustomError("NO_POST_TO_EDIT", 400, "오늘 작성한 일기만 수정할 수 있습니다. (오늘 기준 -> TODAY 04:00 ~ TOMMORW 03:59)");

    const result = await analyzeSentiment(content);
    const sentimentInfo = JSON.parse(result);
    const sentimentData = {
      sentiment: sentimentInfo.document.sentiment,
      negative: sentimentInfo.document.confidence.negative,
      positive: sentimentInfo.document.confidence.positive,
      neutral: sentimentInfo.document.confidence.neutral,
    };

    return await PostService.updatePost(userId, postId, title, content, weather, convertedToday, sentimentData, image);
  },

  findPostById: async (userId, postId) => {
    return await Post.findOne({ where: { userId, id: postId }, include: [{ model: PostImage }], paranoid: false });
  },

  findTodayPostByUser: async (userId, convertedToday) => {
    return await Post.findOne({ where: { userId, yyyymmdd: convertedToday } });
  },

  destroyPostById: async (userId, postId) => {
    return await Post.destroy({ where: { userId, id: postId } });
  },

  createPost: async (userId, title, content, weather, convertedToday, sentimentData, image) => {
    return await Post.create(
      {
        userId,
        title,
        content,
        weather,
        yyyymmdd: convertedToday,
        sentiment: sentimentData.sentiment,
        negative: sentimentData.negative,
        positive: sentimentData.positive,
        neutral: sentimentData.neutral,
        post_image: { image_url: image },
      },
      { include: { model: PostImage } }
    );
  },

  updatePost: async (userId, postId, title, content, weather, convertedToday, sentimentData, image) => {
    return await Post.update(
      {
        userId,
        title,
        content,
        weather,
        yyyymmdd: convertedToday,
        sentiment: sentimentData.sentiment,
        negative: sentimentData.negative,
        positive: sentimentData.positive,
        neutral: sentimentData.neutral,
      },
      { where: { id: postId } }
    ).then(await PostImage.update({ image_url: image }, { where: { postId } }));
  },
};

export default PostService;
