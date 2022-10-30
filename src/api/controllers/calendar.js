import responseDto from "../../utils/customResponse";
import CalendarService from "../services/calendar";

const CalendarController = {
  getCalendar: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { y, m } = req.query;
      const data = await CalendarService.getCalendar(id, y, m);

      res.status(200).json(responseDto({ suc: true, mes: "선택한 년월 일기 조회", data }));
    } catch (err) {
      next(err);
    }
  },
};

export default CalendarController;
