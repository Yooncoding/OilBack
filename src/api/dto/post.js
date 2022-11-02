import moment from "moment";

const PostDto = {
  postInfo: (post) => {
    return {
      id: post.id,
      userId: post.userId,
      content: post.content,
      weather: post.weather,
      sentiment: post.sentiment,
      positive: post.positive,
      negative: post.negative,
      neutral: post.neutral,
      post_image: post.post_image,
      updatedAt: post.updatedAt,
      createdAt: post.createdAt,
      yyyymmdd: moment(post.yyyymmdd).format("YYYYMMDD").toString() + " " + moment(post.updatedAt).format("A").toString(),
    };
  },
};

export default PostDto;
