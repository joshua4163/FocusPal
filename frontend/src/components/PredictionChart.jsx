import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4ade80', '#f87171', '#60a5fa']; // green, red, blue

const PredictionChart = ({ logs }) => {
  const counts = { focus: 0, distraction: 0, unknown: 0 };

  logs.forEach((log) => {
    let prediction = 'unknown';

    if (log.url) {
      if (log.url.includes('youtube') || log.url.includes('instagram') || log.url.includes('netflix')) {
        prediction = 'distraction';
      } else {
        prediction = 'focus';
      }
    }

    if (prediction === "focus") counts.focus++;
    else if (prediction === "distraction") counts.distraction++;
    else counts.unknown++;
  });

  const data = [
    { name: 'Focus', value: counts.focus },
    { name: 'Distraction', value: counts.distraction },
    { name: 'Unknown', value: counts.unknown },
  ];

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold text-blue-300 mb-4">Prediction Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;
