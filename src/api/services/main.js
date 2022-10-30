import PostService from "./post";

const MainService = {
  getMain: async (userId, page) => {
    const posts = await PostService.findPostsByUserId(userId, page);
    return posts;
  },
};

export default MainService;
