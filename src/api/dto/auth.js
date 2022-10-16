const AuthDto = {
  register: (user) => {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };
  },

  login: (user) => {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };
  },
};

export default AuthDto;
