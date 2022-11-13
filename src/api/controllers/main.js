import responseDto from "../../utils/customResponse";
import MainService from "../services/main";
import getConnection from "../../utils/rds";

const MainController = {
  getMain: async (req, res, next) => {
    try {
      const { id } = req.user;
      const page = req.query.page ? req.query.page : 0;
      const posts = await MainService.getMain(id, page);

      res.status(200).json(responseDto({ suc: true, mes: "메인 페이지 작성글 피드", data: posts }));
    } catch (err) {
      next(err);
    }
  },
};

export default MainController;
