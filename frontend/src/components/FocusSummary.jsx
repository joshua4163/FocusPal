import React, { useState, useEffect } from 'react';
import { Activity, ZapOff, Brain, Gauge, AlertCircle } from 'lucide-react';

const FuturisticFocusDashboard = ({ focusPercent = 72, distractionPercent = 28 }) => {
  const [animate, setAnimate] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [scanline, setScanline] = useState(0);
  const [dataPoints, setDataPoints] = useState([]);
  
  // Generate random data points for the background graph
  useEffect(() => {
    const points = Array.from({ length: 20 }, () => Math.random() * 50 + 25);
    setDataPoints(points);
  }, []);
  
  // Trigger initial animations
  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
    
    // Set up recurring pulse effect
    const pulseInterval = setInterval(() => {
      setPulseEffect(prev => !prev);
    }, 2000);
    
    // Set up scanline animation
    const scanInterval = setInterval(() => {
      setScanline(prev => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    
    return () => {
      clearInterval(pulseInterval);
      clearInterval(scanInterval);
    };
  }, []);

  // Status indicator based on focus level
  const getStatusText = () => {
    if (focusPercent >= 80) return "OPTIMAL";
    if (focusPercent >= 60) return "NOMINAL";
    if (focusPercent >= 40) return "MODERATE";
    return "CRITICAL";
  };

  return (
    <div className="relative bg-gray-900 p-6 rounded-xl border border-cyan-500 shadow-lg overflow-hidden">
      {/* Dynamic background glow */}
      <div className={`absolute -top-20 -left-20 w-60 h-60 bg-cyan-500 opacity-20 rounded-full blur-3xl transition-all duration-1000 ${pulseEffect ? 'scale-110' : 'scale-100'}`}></div>
      <div className={`absolute -bottom-20 -right-20 w-60 h-60 bg-purple-600 opacity-20 rounded-full blur-3xl transition-all duration-1000 ${pulseEffect ? 'scale-100' : 'scale-110'}`}></div>
      
      {/* Scanline effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-cyan-400 to-transparent opacity-10 z-10 pointer-events-none"
        style={{ 
          height: '2px', 
          top: `${scanline}%`, 
          transform: 'translateY(-50%)'
        }}
      ></div>
      
      {/* Hexagonal grid background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NiIgaGVpZ2h0PSI0OCI+PHBhdGggZD0iTTAgMTIgTDIyIDAgTDQzIDEyIEw0MyAzNiBMMjIgNDggTDAgMzYgWiIgc3Ryb2tlPSIjMjAzMDQwIiBmaWxsPSJub25lIiBzdHJva2Utb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-20"></div>
      
      {/* Header with animated "scanning" effect */}
      <div className="relative mb-4">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-bold text-xl tracking-wider mb-1">NEURAL FOCUS METRICS</h2>
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${pulseEffect ? 'bg-cyan-400' : 'bg-cyan-600'} mr-2`}></div>
          <p className="text-cyan-300 text-xs tracking-widest">SYSTEM STATUS: {getStatusText()}</p>
        </div>
      </div>
      
      {/* Time indicator */}
      <div className="absolute top-6 right-6 text-cyan-400 text-xs font-mono opacity-80">
        T:{Math.floor(Date.now()/1000).toString().slice(-8)}
      </div>
      
      {/* Main dashboard grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Focus Card - Spans 7 columns */}
        <div className="col-span-7 relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-lg border border-cyan-800 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-5"></div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Brain className={`${pulseEffect ? 'text-cyan-400' : 'text-cyan-500'} mr-2 transition-colors duration-1000`} size={18} />
              <h3 className="text-cyan-400 font-semibold tracking-wider">FOCUS METRICS</h3>
            </div>
            <span className={`text-xs ${pulseEffect ? 'text-cyan-300' : 'text-cyan-400'} font-mono transition-colors duration-1000 flex items-center`}>
              <span className={`inline-block w-1 h-1 rounded-full ${pulseEffect ? 'bg-cyan-300' : 'bg-cyan-500'} mr-1`}></span>
              MONITORING
            </span>
          </div>
          
          {/* Focus meter with animated fill */}
          <div className="relative h-16 bg-gray-800 bg-opacity-50 rounded-md mb-3 overflow-hidden">
            <div 
              className={`absolute bottom-0 left-0 bg-gradient-to-r from-cyan-600 via-cyan-400 to-blue-400 h-full transition-all duration-1500 ease-out rounded-sm ${animate ? 'opacity-100' : 'opacity-0'}`} 
              style={{ width: `${focusPercent}%` }}
            >
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" 
                style={{ 
                  transform: `translateX(${pulseEffect ? '100%' : '-100%'})`,
                  transition: 'transform 1500ms ease-in-out'
                }}
              ></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <div>
                <p className="text-white text-3xl font-bold font-mono">{focusPercent}<span className="text-lg">%</span></p>
                <p className="text-cyan-300 text-xs">NEURAL EFFICIENCY</p>
              </div>
              <Gauge className={`text-cyan-300 opacity-80 ${pulseEffect ? 'rotate-12' : '-rotate-12'} transition-transform duration-1000`} size={32} />
            </div>
          </div>
          
          {/* Visualizer */}
          <div className="h-10 flex items-end space-x-1">
            {dataPoints.map((height, index) => (
              <div 
                key={index}
                className="bg-cyan-500 rounded-sm w-full"
                style={{ 
                  height: `${animate ? height : 0}%`,
                  opacity: 0.5 + (index % 3) * 0.2,
                  transition: `height 1000ms ${index * 50}ms ease-out`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Distraction Card - Spans 5 columns */}
        <div className="col-span-5 relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-lg border border-purple-800 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-5"></div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <AlertCircle className={`${pulseEffect ? 'text-purple-400' : 'text-purple-500'} mr-2 transition-colors duration-1000`} size={18} />
              <h3 className="text-purple-400 font-semibold tracking-wider">DISTRACTION</h3>
            </div>
            <span className={`text-xs ${pulseEffect ? 'text-purple-300' : 'text-purple-400'} font-mono transition-colors duration-1000 flex items-center`}>
              <span className={`inline-block w-1 h-1 rounded-full ${pulseEffect ? 'bg-purple-300' : 'bg-purple-500'} mr-1`}></span>
              ANALYSIS
            </span>
          </div>
          
          {/* Distraction meter with animated fill */}
          <div className="relative h-16 bg-gray-800 bg-opacity-50 rounded-md mb-3 overflow-hidden">
            <div 
              className={`absolute bottom-0 left-0 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-400 h-full transition-all duration-1500 ease-out rounded-sm ${animate ? 'opacity-100' : 'opacity-0'}`} 
              style={{ width: `${distractionPercent}%` }}
            >
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" 
                style={{ 
                  transform: `translateX(${!pulseEffect ? '100%' : '-100%'})`,
                  transition: 'transform 1500ms ease-in-out'
                }}
              ></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <div>
                <p className="text-white text-3xl font-bold font-mono">{distractionPercent}<span className="text-lg">%</span></p>
                <p className="text-purple-300 text-xs">INTERFERENCE</p>
              </div>
              <ZapOff className={`text-purple-300 opacity-80 ${pulseEffect ? 'rotate-12' : '-rotate-12'} transition-transform duration-1000`} size={28} />
            </div>
          </div>
          
          {/* Status indicators */}
          <div className="grid grid-cols-2 gap-2">
            <div className={`flex items-center text-xs p-1 rounded bg-gray-800 bg-opacity-50 border ${pulseEffect ? 'border-purple-500' : 'border-gray-700'} transition-colors duration-500`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${pulseEffect ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
              <span className="text-purple-200">INT:${Math.round(distractionPercent/2)}.4</span>
            </div>
            <div className={`flex items-center text-xs p-1 rounded bg-gray-800 bg-opacity-50 border ${!pulseEffect ? 'border-purple-500' : 'border-gray-700'} transition-colors duration-500`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${!pulseEffect ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
              <span className="text-purple-200">SYS:${Math.round(distractionPercent/3)}.1</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom status bar */}
      <div className="mt-4 flex justify-between items-center text-xs text-cyan-300 font-mono">
        <div className="flex items-center">
          <div className={`w-1 h-1 rounded-full ${pulseEffect ? 'bg-cyan-400' : 'bg-cyan-600'} mr-1`}></div>
          <span>NEURAL LINK ACTIVE</span>
        </div>
        <div className="flex space-x-4">
          <span className="text-gray-500">SYS.0842.{Math.floor(Math.random() * 1000)}</span>
          <span>v3.4.2</span>
        </div>
      </div>
    </div>
  );
};

export default FuturisticFocusDashboard;