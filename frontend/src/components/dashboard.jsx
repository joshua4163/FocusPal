import React, { useEffect, useState } from "react";
import { fetchLogsWithPredictions } from "../api";
import DashboardCharts from "./DashboardCharts";
import LoadingSpinner from "./LoadingSpinner"; // Assume we have this component

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedLogs = await fetchLogsWithPredictions();
        setLogs(fetchedLogs);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
        <button 
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-300">
        Productivity Dashboard
      </h1>
      <DashboardCharts logs={logs} />
    </div>
  );
}