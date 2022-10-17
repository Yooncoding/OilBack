const AuthDto = {
  userInfo: (user) => {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };
  },
};

export default AuthDto;
