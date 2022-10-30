import PostService from "./post";

const CalendarService = {
  getCalendar: async (userId, year, month) => {
    const data = await PostService.findPostsForCalendar(userId, year, month);
    return data;
  },
};

export default CalendarService;
