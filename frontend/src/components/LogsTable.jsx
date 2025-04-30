// LogsTable.jsx (Upgraded Bolt Style)
import React from 'react';

export default function LogsTable({ logs }) {
  if (!logs.length) {
    return <p className="text-[#6a9955] text-center">Loading logs...</p>;
  }

  const getFocusStatus = (log) => {
    if (log.focus === 1 || log.focus === "1") {
      return "Focus";
    } else if (log.distraction === 1 || log.distraction === "1") {
      return "Distraction";
    } else {
      return "Unknown";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-[#c5c8c6]">
        <thead>
          <tr className="border-b border-[#444] text-[#9cdcfe]">
            <th className="py-2 px-4 text-left">Domain</th>
            <th className="py-2 px-4 text-left">Focus / Distraction</th>
            <th className="py-2 px-4 text-left">Duration (sec)</th>
            <th className="py-2 px-4 text-left">Last Visited</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => {
            const duration = log.totalTimeMs ? Math.round(log.totalTimeMs / 1000) : "-";
            const time = new Date(log.createdAt || log.lastVisitedAt).toLocaleString();
            const status = getFocusStatus(log);

            return (
              <tr
                key={index}
                className={`border-b border-[#333] ${
                  status === 'Focus' ? 'bg-[#002b36]' : status === 'Distraction' ? 'bg-[#300b0b]' : 'bg-[#1e1e1e]'}`}
              >
                <td className="py-2 px-4">{log.domain || "Unknown"}</td>
                <td className="py-2 px-4 font-semibold">
                  {status === "Focus" ? (
                    <span className="text-[#4ec9b0]">Focus</span>
                  ) : status === "Distraction" ? (
                    <span className="text-[#d16969]">Distraction</span>
                  ) : (
                    <span className="text-gray-400">Unknown</span>
                  )}
                </td>
                <td className="py-2 px-4">{duration}</td>
                <td className="py-2 px-4">{time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}