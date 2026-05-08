import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Command } from 'lucide-react';

export const TopBar: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full h-8 glass-panel border-b border-white/5 flex items-center justify-between px-4 text-xs font-mono tracking-wider z-50">
      {/* Left side: OS Title */}
      <div className="flex items-center space-x-4">
        <Command className="w-4 h-4 text-cyan-glow" />
        <span className="font-bold text-white/90">MindOS</span>
        <div className="hidden sm:flex space-x-4 text-white/60">
          <span className="hover:text-cyan-glow cursor-pointer transition-colors">File</span>
          <span className="hover:text-cyan-glow cursor-pointer transition-colors">Edit</span>
          <span className="hover:text-cyan-glow cursor-pointer transition-colors">View</span>
          <span className="hover:text-cyan-glow cursor-pointer transition-colors">Go</span>
        </div>
      </div>

      {/* Right side: System Status */}
      <div className="flex items-center space-x-6 text-white/80">
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-[10px] text-cyan-glow">SYS_LOAD:</span>
          <span>14%</span>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-[10px] text-magenta-glow">MEM:</span>
          <span>2.4GB</span>
        </div>
        <div className="flex items-center space-x-4">
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
          <span className="font-semibold">{formatDate(time)} {formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};
