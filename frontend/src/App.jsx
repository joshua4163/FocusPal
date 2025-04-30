import React, { useState, useEffect } from 'react';
import { fetchLogs } from './utils/fetchlogs';
import FocusSummary from './components/FocusSummary';
import LogsTable from './components/LogsTable';
import FocusPieChart from './components/FocusPieChart';
import TopDistractingSites from './components/TopDistractingSites';
import TomorrowPrediction from "./components/Tomorrowprediction";

export default function App() {
  const [logs, setLogs] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [showAllLogs, setShowAllLogs] = useState(false);

  useEffect(() => {
    loadLogs();
    const interval = setInterval(loadLogs, 30000);
    return () => clearInterval(interval);
  }, []);

  async function loadLogs() {
    const fetchedLogs = await fetchLogs();
    const sortedLogs = [...fetchedLogs].sort((a, b) =>
      new Date(b.createdAt || b.lastVisitedAt) - new Date(a.createdAt || a.lastVisitedAt)
    );
    setLogs(sortedLogs);
    setLastUpdated(new Date().toLocaleString());
  }

  const focusLogs = logs.filter(log => log.focus === 1).length;
  const distractionLogs = logs.filter(log => log.distraction === 1).length;
  const totalLogs = focusLogs + distractionLogs;

  const focusPercent = totalLogs ? ((focusLogs / totalLogs) * 100).toFixed(1) : 0;
  const distractionPercent = totalLogs ? ((distractionLogs / totalLogs) * 100).toFixed(1) : 0;

  const displayedLogs = showAllLogs ? logs : logs.slice(0, 50);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#c5c8c6] font-mono p-6">
      <div className="max-w-6xl mx-auto border border-[#333] rounded-xl shadow-[0_0_30px_#00ffff15] p-6 bg-[#252526]">
        <h1 className="text-2xl text-center text-[#9cdcfe] mb-2 tracking-tight">
          🧠 FocusPal Neural Console
        </h1>

        <p className="text-sm text-center text-[#6a9955] mb-4">
          Last synced: <span className="text-white">{lastUpdated}</span>
        </p>

        <div className="border border-[#333] rounded-lg p-4 mb-6 shadow-inner bg-[#1e1e1e]/60">
          <FocusSummary focusPercent={focusPercent} distractionPercent={distractionPercent} />
        </div>

        <div className="border border-[#333] rounded-lg p-4 mb-6 shadow-inner bg-[#1e1e1e]/60">
          <FocusPieChart focusCount={focusLogs} distractionCount={distractionLogs} />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            className="bg-[#007acc] hover:bg-[#0088cc] text-white px-4 py-2 rounded-md transition shadow-md"
            onClick={() => setShowAllLogs(!showAllLogs)}
          >
            {showAllLogs ? "Show Last 50 Logs" : "Show All Logs"}
          </button>
          <button
            className="bg-[#d16969] hover:bg-[#c85858] text-white px-4 py-2 rounded-md transition shadow-md"
            onClick={() => localStorage.removeItem('focuspal_gemini_cache')}
          >
            Clear AI Cache
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto border border-[#333] rounded-xl bg-[#1e1e1e] shadow-inner p-4">
          <LogsTable logs={displayedLogs} />
        </div>
        <TomorrowPrediction />

        <div className="mt-6">
          <TopDistractingSites logs={logs} />
        </div>
      </div>
    </div>
  );
}
