import SearchHistory from "../../models/SearchHisotry";

const LogService = {
  findByUserId: async (userId) => {
    return await SearchHistory.findAll({ where: { userId }, limit: 5 });
  },
  createLog: async (userId, q) => {
    return await SearchHistory.create({ userId, log: q });
  },
};

export default LogService;
