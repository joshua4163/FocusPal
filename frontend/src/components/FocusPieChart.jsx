import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { Zap, Brain } from 'lucide-react';

const FuturisticPieChart = ({ focusCount = 72, distractionCount = 28 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [scanline, setScanline] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [rotate, setRotate] = useState(false);
  
  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => setAnimate(true), 100);
    
    // Start scanning effect after pie is displayed
    const scanTimer = setTimeout(() => setScanline(true), 1500);
    
    // Start pulsing effect
    const pulseTimer = setTimeout(() => setPulse(true), 2000);
    
    // Start rotation effect
    const rotateTimer = setTimeout(() => setRotate(true), 2500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(scanTimer);
      clearTimeout(pulseTimer);
      clearTimeout(rotateTimer);
    };
  }, []);

  const data = [
    { name: 'Focus', value: focusCount, color: '#00f5ff' },
    { name: 'Distraction', value: distractionCount, color: '#ff00e5' }
  ];

  // Animation settings for the pie
  const animationProps = animate 
    ? { 
        animationDuration: 1200, 
        animationEasing: 'ease-out',
        endAngle: 360 
      } 
    : { endAngle: 0 };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Custom active shape for the selected sector
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 15}
          outerRadius={outerRadius + 18}
          fill={fill}
          opacity={0.3}
        />
        <text x={cx} y={cy - 15} dy={8} textAnchor="middle" fill="#ffffff" fontSize={18} fontWeight="bold">
          {payload.name}
        </text>
        <text x={cx} y={cy + 15} textAnchor="middle" fill="#ffffff" fontSize={24} fontWeight="bold">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  };

  return (
    <div className="relative bg-black bg-opacity-90 p-6 rounded-xl border border-cyan-500 shadow-xl w-full max-w-md overflow-hidden">
      {/* Futuristic background effects */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-600 opacity-20 rounded-full blur-3xl"></div>
      
      {/* Circuit grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3lhbiIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PHJlY3QgZmlsbD0idXJsKCNncmlkKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
      
      {/* Scan line effect */}
      <div className={`absolute left-0 h-px w-full bg-cyan-400 opacity-70 top-0 transform transition-transform duration-3000 ease-in-out ${scanline ? 'translate-y-full' : 'translate-y-0'}`}></div>
      
      {/* Header with animated text */}
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-bold text-xl mb-6 tracking-wider text-center font-mono relative">
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`}>C</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.1s' }}>O</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.2s' }}>G</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.3s' }}>N</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.4s' }}>I</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.5s' }}>T</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.6s' }}>I</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.7s' }}>V</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.8s' }}>E</span>
        <span className="mx-2"></span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.9s' }}>D</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '1.0s' }}>I</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '1.1s' }}>S</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '1.2s' }}>T</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '1.3s' }}>R</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '1.4s' }}>I</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '1.5s' }}>B</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '1.6s' }}>U</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '1.7s' }}>T</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '1.8s' }}>I</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '1.9s' }}>O</span>
        <span className={`inline-block ${pulse ? 'animate-pulse' : ''}`} style={{ animationDelay: '2.0s' }}>N</span>
      </h2>
      
      <div className={`relative ${rotate ? 'animate-spin-slow' : ''}`}>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              {...animationProps}
              stroke="rgba(0,0,0,0.3)"
              strokeWidth={1}
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Neural network animation overlay - more dynamic now */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 300 300">
            <line x1="50" y1="50" x2="250" y2="250" stroke="cyan" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.1;0.8;0.1" dur="3s" repeatCount="indefinite" />
              <animate attributeName="strokeWidth" values="0.5;1.5;0.5" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="250" y1="50" x2="50" y2="250" stroke="magenta" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="strokeWidth" values="0.5;1.5;0.5" dur="1.8s" repeatCount="indefinite" />
            </line>
            <circle cx="150" cy="150" r="5" fill="white" opacity="0.5">
              <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            
            {/* Additional neural network nodes */}
            <circle cx="50" cy="50" r="3" fill="cyan" opacity="0.7">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="250" cy="50" r="3" fill="magenta" opacity="0.7">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="250" r="3" fill="cyan" opacity="0.7">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="250" cy="250" r="3" fill="magenta" opacity="0.7">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        
        {/* Radar scanning effect */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 300 300">
            <circle cx="150" cy="150" r="100" fill="none" stroke="cyan" strokeWidth="1" opacity="0.2" />
            <path 
              d="M150,150 L250,150" 
              stroke="cyan" 
              strokeWidth="2" 
              opacity="0.7"
              transform={`rotate(${rotate ? 360 : 0}, 150, 150)`}
              style={{ transformOrigin: 'center', transition: 'transform 4s linear infinite' }}
            >
              <animateTransform 
                attributeName="transform"
                type="rotate"
                from="0 150 150"
                to="360 150 150"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </div>
      
      {/* Interactive Legend with futuristic styling */}
      <div className="flex justify-center space-x-8 mt-4">
        <div 
          className="flex items-center transform transition-transform hover:scale-110 cursor-pointer" 
          onClick={() => setActiveIndex(0)}
        >
          <div className="w-4 h-4 rounded-full bg-cyan-400 mr-2 relative">
            {activeIndex === 0 && (
              <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-50"></div>
            )}
          </div>
          <div className="flex items-center">
            <Brain size={16} className="text-cyan-400 mr-1" />
            <span className="text-cyan-300 font-mono relative">
              FOCUS
              {activeIndex === 0 && (
                <span className="absolute -bottom-1 left-0 w-full h-px bg-cyan-400"></span>
              )}
            </span>
          </div>
        </div>
        
        <div 
          className="flex items-center transform transition-transform hover:scale-110 cursor-pointer"
          onClick={() => setActiveIndex(1)}
        >
          <div className="w-4 h-4 rounded-full bg-pink-500 mr-2 relative">
            {activeIndex === 1 && (
              <div className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-50"></div>
            )}
          </div>
          <div className="flex items-center">
            <Zap size={16} className="text-pink-400 mr-1" />
            <span className="text-pink-300 font-mono relative">
              DISTRACTION
              {activeIndex === 1 && (
                <span className="absolute -bottom-1 left-0 w-full h-px bg-pink-500"></span>
              )}
            </span>
          </div>
        </div>
      </div>
      
      {/* Data Processing Animation */}
      <div className="mt-6 pt-2 border-t border-gray-800">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-gray-500">DATA PROCESSING</span>
          <span className="text-cyan-400 animate-pulse">LIVE</span>
        </div>
        
        {/* Dynamic processing bars */}
        <div className="mt-2 flex space-x-1">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="h-1 bg-cyan-500 rounded-full flex-1"
              style={{ 
                opacity: Math.random() * 0.7 + 0.3,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      
      {/* Decorative bottom line */}
      <div className="relative h-1 w-full mt-4 bg-gray-800 overflow-hidden rounded-full">
        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 w-full">
          <div className="absolute top-0 left-0 w-20 h-full bg-white opacity-30" style={{
            animation: 'shimmer 2s infinite',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            transform: 'skewX(-20deg)'
          }}></div>
        </div>
      </div>
      
      
      {/* Time indicator */}
      <div className="flex justify-between items-center mt-2 text-xs font-mono text-gray-500">
        <span>SYS.{Math.floor(Math.random() * 900) + 100}</span>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

// Add the CSS animation
const css = `
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-20deg);
  }
  100% {
    transform: translateX(400%) skewX(-20deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 30s linear infinite;
}
`;

// Add the style tag to the document
if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.appendChild(document.createTextNode(css));
  document.head.appendChild(styleTag);
}

export default FuturisticPieChart;