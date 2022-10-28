import Post from "../../models/Post";

const PostService = {
  write: async (userId, title, content, weather) => {
    return await PostService.createPost(userId, title, content, weather);
  },

  createPost: async (userId, title, content, weather) => {
    return await Post.create({ userId, title, content, weather });
  },
};

export default PostService;
