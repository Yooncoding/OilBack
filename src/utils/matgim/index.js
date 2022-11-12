import request from "request-promise-native";
import config from "../../config";

const api_key = config.matgim.api_key;

const exportWords = async function (document) {
  const options = {
    method: "POST",
    url: "https://api.matgim.ai/api-keyword",
    headers: {
      "x-api-key": [api_key],
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ document: document }),
  };

  const result = await request(options);
  return result;
};

export default exportWords;
