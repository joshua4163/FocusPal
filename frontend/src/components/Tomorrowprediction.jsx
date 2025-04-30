import React, { useEffect, useState } from "react";
import { getPrediction } from "../api/getPrediction";
import { Brain, ZapOff } from "lucide-react";
import { motion } from "framer-motion";

const TomorrowPrediction = () => {
  const [label, setLabel] = useState("Loading...");

  useEffect(() => {
    getPrediction().then(setLabel);
  }, []);

  const isFocus = label === "Focus";
  const isDistraction = label === "Distraction";

  const color = isFocus ? "from-green-500 to-emerald-600" :
                isDistraction ? "from-red-500 to-rose-600" :
                "from-gray-400 to-gray-500";

  const Icon = isFocus ? Brain : isDistraction ? ZapOff : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-4 p-4 rounded-xl bg-gradient-to-r ${color} text-white shadow-lg flex items-center gap-3`}
    >
      {Icon && <Icon className="w-6 h-6 animate-pulse" />}
      <div className="text-sm font-semibold">
        🔮 Tomorrow looks like: <span className="underline">{label}</span>
      </div>
    </motion.div>
  );
};

export default TomorrowPrediction;
