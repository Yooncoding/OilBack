import SearchHistory from "../../models/SearchHisotry";

const LogService = {
  findByUserId: async (userId) => {
    return await SearchHistory.findAll({ where: { userId }, limit: 5 });
  },
};

export default LogService;
