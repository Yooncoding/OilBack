import jobs from "../jobs";

export default () => {
  jobs.insertSentiment;
  jobs.insertWords;
  console.log("    › JOB LOADED");
};
