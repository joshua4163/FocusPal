import React from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { getPrediction } from '../api';

const COLORS = ['#00C49F', '#FF6384'];

// Broader list of known distracting domains
const DISTRACTING_DOMAINS = [
  'youtube.com',
  'facebook.com',
  'instagram.com',
  'tiktok.com',
  'netflix.com',
  'twitter.com',
  'reddit.com',
  'discord.com',
];

function classifyLog(log) {
  const domain = log.url.toLowerCase();
  return DISTRACTING_DOMAINS.some(d => domain.includes(d)) ? 'distraction' : 'focus';
}

export default function DashboardCharts({ logs }) {
  const pieData = [
    { name: 'Focus', value: logs.filter(log => classifyLog(log) === 'focus').length },
    { name: 'Distraction', value: logs.filter(log => classifyLog(log) === 'distraction').length }
  ];

  const groupedByUrl = logs.reduce((acc, log) => {
    acc[log.url] = (acc[log.url] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(groupedByUrl).map(([url, count]) => ({
    url,
    count
  }));

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-300">🧠 Focus vs Distraction</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie dataKey="value" data={pieData} outerRadius={80} label>
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-300">🌐 Top Visited URLs</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="url" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#FFB347" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 col-span-1 md:col-span-2"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-300">🧪 Test ML Prediction</h2>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
          onClick={async () => {
            try {
              const sampleInput = [30, 1, 0]; // Example input
              const result = await getPrediction(sampleInput);
              alert(`🧠 Prediction: ${result}`);
            } catch (err) {
              console.error('❌ Prediction failed', err);
              alert('Prediction failed. Check console.');
            }
          }}
        >
          Run Test Prediction
        </button>
      </motion.div>
    </div>
  );
}
