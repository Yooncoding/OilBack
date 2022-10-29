import request from "request-promise-native";
import config from "../../config";

const client_id = config.clova.id;
const client_secret = config.clova.secret;

const analyzeSentiment = async function (content) {
  const options = {
    method: "POST",
    url: "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze",
    headers: {
      "X-NCP-APIGW-API-KEY-ID": client_id,
      "X-NCP-APIGW-API-KEY": client_secret,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: content }),
  };

  const result = await request(options);
  return result;
};

export default analyzeSentiment;
