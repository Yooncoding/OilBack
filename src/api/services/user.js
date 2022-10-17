import User from "../../models/User";

const UserService = {
  findById: async (userId) => {
    return await User.findByPk(userId);
  },
};

export default UserService;
