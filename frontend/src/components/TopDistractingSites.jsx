// TopDistractingSites.jsx (Futuristic Bolt Style)
import React from 'react';

const TopDistractingSites = ({ logs = [] }) => {
  const distractionCounts = {};
  logs.forEach(log => {
    if (log.distraction === 1) {
      const domain = log.domain || (() => {
        try {
          const hostname = new URL(log.url).hostname;
          return hostname.replace('www.', '').split('.')[0];
        } catch {
          return 'Unknown';
        }
      })();
      distractionCounts[domain] = (distractionCounts[domain] || 0) + 1;
    }
  });

  const topDistracting = Object.entries(distractionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-2xl border border-gray-700 rounded-2xl p-8 max-w-md w-full text-center text-white animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-pink-400 mb-4">
          🚫 Top Distracting Sites
        </h2>

        {topDistracting.length === 0 ? (
          <p className="text-gray-300 text-lg">No distractions detected! 🎉</p>
        ) : (
          <ul className="space-y-2 text-lg">
            {topDistracting.map(([domain, count], idx) => (
              <li
                key={domain}
                className="bg-gray-700/60 hover:bg-pink-500/20 transition-colors px-4 py-2 rounded-xl font-mono text-pink-300"
              >
                #{idx + 1} <span className="font-semibold">{domain}</span> — {count} distractions
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopDistractingSites;
