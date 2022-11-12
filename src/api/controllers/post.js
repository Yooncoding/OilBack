import responseDto from "../../utils/customResponse";
import PostServcie from "../services/post";

const PostController = {
  write: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { title, content, weather } = req.body;
      const image = req.file ? req.file.location : null;

      const data = await PostServcie.write(id, title, content, weather, image);

      res.status(201).json(responseDto({ suc: true, mes: "오늘의 일기 제출 완료", data }));
    } catch (err) {
      next(err);
    }
  },

  getPost: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { postId } = req.params;
      const post = await PostServcie.getPost(id, postId);

      res.status(200).json(responseDto({ suc: true, mes: "일기 상세 보기", data: post }));
    } catch (err) {
      next(err);
    }
  },

  deletePost: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { postId } = req.params;
      await PostServcie.deletePost(id, postId);

      res.status(200).json(responseDto({ suc: true, mes: "일기 삭제 완료" }));
    } catch (err) {
      next(err);
    }
  },

  putPost: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { postId } = req.params;
      const { title, content, weather } = req.body;
      const image = req.file ? req.file.location : null;

      await PostServcie.putPost(id, postId, title, content, weather, image);

      res.status(201).json(responseDto({ suc: true, mes: "오늘의 일기 수정 완료" }));
    } catch (err) {
      next(err);
    }
  },

  searchPosts: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { q } = req.query;
      const page = req.query.page ? req.query.page : 0;

      const posts = await PostServcie.searchPost(id, q, page);

      res.status(200).json(responseDto({ suc: true, mes: "일기 검색 결과", data: posts }));
    } catch (err) {
      next(err);
    }
  },

  getSearchLogs: async (req, res, next) => {
    try {
      const { id } = req.user;
      const logs = await PostServcie.getSearchLogs(id);

      res.status(200).json(responseDto({ suc: true, mes: "일기 검색 페이지 내 검색 기록", data: logs }));
    } catch (err) {
      next(err);
    }
  },

  deleteSearchLog: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { logId } = req.params;
      await PostServcie.deleteSearchLog(id, logId);

      res.status(200).json(responseDto({ suc: true, mes: "검색 기록 삭제 완료" }));
    } catch (err) {
      next(err);
    }
  },
};

export default PostController;
