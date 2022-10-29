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
};

export default PostController;
