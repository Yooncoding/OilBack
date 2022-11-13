import * as schedule from "node-schedule";
import logger from "../utils/logger";
import getConnection from "../utils/rds";
import PostService from "../api/services/post";
import moment from "moment";
import exportWords from "../utils/matgim";

const jobs = {
  insertSentiment: schedule.scheduleJob("55 59 3 * * *", async () => {
    try {
      const convertedToday = moment().subtract(4, "h").format("YYYY-MM-DD");
      const posts = await PostService.findTodayPost(convertedToday);
      let neutral_cnt = 0;
      let negative_cnt = 0;
      let positive_cnt = 0;
      let neutral_sum = 0;
      let negative_sum = 0;
      let positive_sum = 0;

      posts.forEach((post) => {
        neutral_sum += post.neutral;
        negative_sum += post.negative;
        positive_sum += post.positive;
        if (post.sentiment === "neutral") neutral_cnt++;
        else if (post.sentiment === "negative") negative_cnt++;
        else if (post.sentiment === "positive") positive_cnt++;
      });

      const total_cnt = neutral_cnt + negative_cnt + positive_cnt;
      const neutral = neutral_sum / total_cnt;
      const negative = negative_sum / total_cnt;
      const positive = positive_sum / total_cnt;

      const conn = await getConnection();

      const query = `
      INSERT INTO sentiment(yyyymmdd, neutral, negative, positive, neutral_cnt, negative_cnt, positive_cnt, total_cnt) 
      VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [convertedToday, neutral, negative, positive, neutral_cnt, negative_cnt, positive_cnt, total_cnt];
      await conn.execute(query, values);
      conn.release();
      logger.info(`${convertedToday}: INSERT SENTIMENT SCHEDULING SUCCESS`);
    } catch (err) {
      logger.error(err);
    }
  }),

  insertWords: schedule.scheduleJob("50 59 3 * * *", async () => {
    try {
      let cnt = 0;
      const convertedToday = moment().subtract(4, "h").format("YYYY-MM-DD");
      const posts = await PostService.findTodayPost(convertedToday);

      posts.forEach(async (post) => {
        logger.info(`${convertedToday} # ${cnt}: INSERT KEYWORDS SCHEDULING`);
        cnt += 1;
        const document = await exportWords(post.content);
        const { sentences } = JSON.parse(document);
        sentences.forEach(async (sentence) => {
          const keywords = sentence.keywords;
          keywords.forEach(async (keyword) => {
            const conn = await getConnection();
            const selectQuery = `
            SELECT * FROM words WHERE yyyymmdd=? AND word=?`;
            const selectValues = [convertedToday, keyword.word];
            const [row] = await conn.execute(selectQuery, selectValues);
            const word = row[0];

            if (word) {
              const updateQuery = `
              UPDATE words SET cnt=? WHERE yyyymmdd=? AND word=?`;
              const updateValues = [word.cnt + keyword.freq, convertedToday, keyword.word];
              await conn.execute(updateQuery, updateValues);
            } else {
              const insertQuery = `
              INSERT INTO words(yyyymmdd, word, cnt) VALUES(?, ?, ?)`;
              const insertValues = [convertedToday, keyword.word, keyword.freq];
              await conn.execute(insertQuery, insertValues);
            }
            conn.release();
          });
        });
      });
    } catch (err) {
      logger.error(err);
    }
  }),
};

export default jobs;
