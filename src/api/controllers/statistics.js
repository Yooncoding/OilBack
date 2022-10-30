import responseDto from "../../utils/customResponse";
import StatisticsService from "../services/statistics";

const StatisticsContoller = {
  getStatistics: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { tab } = req.query;
      const data = await StatisticsService.getStatistics(id, tab);

      res.status(200).json(responseDto({ suc: true, mes: `${tab}일동안 평균 기록`, data }));
    } catch (err) {
      next(err);
    }
  },
};

export default StatisticsContoller;
