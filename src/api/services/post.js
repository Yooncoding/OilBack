import Post from "../../models/Post";
import moment from "moment";
import CustomError from "../../utils/customError";
import analyzeSentiment from "../../utils/clova";
import PostImage from "../../models/PostImage";
import Sequelize from "sequelize";
import LogService from "./log";
import PostDto from "../dto/post";

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

    const newPost = await PostService.createPost(userId, title, content, weather, convertedToday, sentimentData, image);
    return PostDto.postInfo(newPost);
  },

  getPost: async (userId, postId) => {
    const post = await PostService.findPostById(userId, postId);
    if (!post) throw new CustomError("INVALID_ACCESS", 403, "비정상적인 접근입니다.");
    if (post.deletedAt) throw new CustomError("NOT_EXIST_POST", 404, "삭제된 심부름입니다.");

    return PostDto.postInfo(post);
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

  searchPost: async (userId, q, filter, page) => {
    const op = Sequelize.Op;
    if (q) q = q.trim();

    let splitedWord = q.split(" "); // 띄어쓰기별 단어 분리
    let combinedWord = ""; // 띄어쓰기 합치기
    splitedWord.forEach((word) => {
      combinedWord += word;
    });

    const PAGE_SIZE = 10; // 10개씩 pagination
    const offset = page * PAGE_SIZE;

    const posts = await Post.findAll({
      where: {
        userId,
        [filter]: { [op.or]: [{ [op.like]: "%" + q + "%" }, { [op.like]: "%" + combinedWord + "%" }, { [op.regexp]: splitedWord.join("|") }] },
      },
      order: [["yyyymmdd", "desc"]],
      offset: offset,
      limit: PAGE_SIZE,
    }).then(await LogService.createLog(userId, q));

    const filteredPosts = [];
    posts.map((post) => {
      filteredPosts.push(PostDto.postInfo(post));
    });

    return filteredPosts;
  },

  getSearchLogs: async (userId) => {
    const logs = await LogService.findByUserId(userId);
    return logs;
  },

  deleteSearchLog: async (userId, logId) => {
    return await LogService.destroyLogById(userId, logId);
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

  findPostsByUserId: async (userId, page) => {
    const PAGE_SIZE = 10; // 10개씩 pagination
    const offset = page * PAGE_SIZE;

    const posts = await Post.findAll({
      where: { userId },
      order: [["yyyymmdd", "desc"]],
      offset: offset,
      limit: PAGE_SIZE,
    });
    const filteredPosts = [];
    posts.map((post) => {
      filteredPosts.push(PostDto.postInfo(post));
    });

    return filteredPosts;
  },

  findPostsForCalendar: async (userId, year, month) => {
    const op = Sequelize.Op;
    year = year ? year : moment().format("YYYY");
    month = month ? month : moment().format("MM");
    const MONTHSTART = moment(`${year}-${month}`).startOf("month").format("YYYY-MM-DD");
    const MONTHEND = moment(`${year}-${month}`).endOf("month").format("YYYY-MM-DD");

    const posts = await Post.findAll({ where: { yyyymmdd: { [op.gte]: MONTHSTART, [op.lte]: MONTHEND }, userId } });
    const filteredPosts = [];
    posts.map((post) => {
      filteredPosts.push(PostDto.postInfo(post));
    });

    return filteredPosts;
  },

  findPostsForPeriod: async (userId, tab) => {
    const op = Sequelize.Op;
    const days = parseInt(tab);
    const START = moment().subtract(days, "d").format("YYYY-MM-DD");
    const END = moment().format("YYYY-MM-DD");

    const posts = await Post.findAll({ where: { yyyymmdd: { [op.gt]: START, [op.lte]: END }, userId } });

    return posts;
  },
};

export default PostService;
