import React, { useState, useEffect } from "react";
import { getPrediction } from "../api"; // ✅ Make sure the path is correct

export default function Predictor() {
  const [duration, setDuration] = useState(30);
  const [timeOfDay, setTimeOfDay] = useState(0); // 0: day, 1: evening
  const [urlType, setUrlType] = useState(1); // 1: productive, 0: distracting
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-fill from chrome extension data (if available)
  useEffect(() => {
    if (window.chrome?.storage) {
      chrome.storage.local.get(["latestActivity"], ({ latestActivity }) => {
        if (latestActivity) {
          console.log("🧠 Auto-filled:", latestActivity);
          setDuration(latestActivity.duration || 30);
          setTimeOfDay(latestActivity.timeOfDay === "evening" ? 1 : 0);
          setUrlType(latestActivity.url?.includes("youtube") ? 0 : 1);
          handlePredict(); // Auto predict after filling
        }
      });
    }
  }, []);

  const handlePredict = async () => {
    setLoading(true);
    const features = [duration, timeOfDay, urlType];
    const prediction = await getPrediction(features);
    setResult(prediction.replace(/\n/g, "").trim());
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-300">
        🧠 Predict Focus Level
      </h2>
      <div className="space-y-4">
        {/* Inputs */}
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(+e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Duration (seconds)"
        />
        <select
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(+e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value={0}>Day</option>
          <option value={1}>Evening</option>
        </select>
        <select
          value={urlType}
          onChange={(e) => setUrlType(+e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value={1}>Productive</option>
          <option value={0}>Distracting</option>
        </select>

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {/* Result */}
        {result && (
          <p className="mt-4 text-lg">
            🔮 <strong>Prediction:</strong> {result}
          </p>
        )}
      </div>
    </div>
  );
}
