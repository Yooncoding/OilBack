import User from "../../models/User";

const UserService = {
  findById: async (userId) => {
    return await User.findByPk(userId);
  },
  findByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  },
  findByNickname: async (nickname) => {
    return await User.findOne({ where: { nickname } });
  },
  createUser: async (email, nickname, password) => {
    return await User.create({ email, nickname, password });
  },
  updatePassword: async (password, email) => {
    return await User.update({ password }, { where: { email } });
  },
};

export default UserService;
