import responseDto from "../../utils/customResponse";
import PostServcie from "../services/post";

const PostController = {
  write: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { title, content, weather } = req.body;
      const data = await PostServcie.write(id, title, content, weather);

      res.status(201).json(responseDto({ suc: true, mes: "오늘의 일기 제출 완료", data }));
    } catch (err) {
      next(err);
    }
  },
};

export default PostController;
