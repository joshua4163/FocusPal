import axios from 'axios';

const API_URL = "https://masdlw1jvk.execute-api.us-east-1.amazonaws.com/prod/logActivityFunction";
const GET_LOGS_URL = "https://masdlw1jvk.execute-api.us-east-1.amazonaws.com/prod/getLogs";
const PREDICT_URL = "https://5q25d50215.execute-api.us-east-1.amazonaws.com/dev/predict";

export const logActivity = async (activityData) => {
  try {
    const res = await axios.post(API_URL, activityData);
    return res.data;
  } catch (err) {
    console.error("❌ API Error:", err.response?.data || err.message);
    throw err;
  }
};

export const fetchLogsWithPredictions = async () => {
  const res = await axios.get(GET_LOGS_URL);
  const logs = res.data.logs;

  const logsWithPredictions = await Promise.all(
    logs.map(async (log) => {
      try {
        const features = [
          30, // static 30 seconds for now
          log.timeOfDay === 'day' ? 0 : 1,
          log.url.includes("youtube") ? 0 : 1 // simple urlType classification
        ];
        const predictionRes = await fetch(PREDICT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/csv" },
          body: features.join(",")
        });
        const data = await predictionRes.json();
        return { ...log, prediction: data.prediction || "Unknown" };
      } catch (error) {
        return { ...log, prediction: "Prediction Failed" };
      }
    })
  );

  return logsWithPredictions;
};
