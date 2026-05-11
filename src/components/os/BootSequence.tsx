import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../store/os';
import { BrainCircuit } from 'lucide-react';

const bootSequenceLogs = [
  "INITIALIZING NEURAL KERNEL...",
  "LOADING SYNAPTIC DRIVERS [OK]",
  "ESTABLISHING SECURE CONNECTION...",
  "MOUNTING MEMORY VOLUMES [OK]",
  "STARTING WINDOW MANAGER...",
  "ACTIVATING HOLOGRAPHIC RENDERER...",
  "SYSTEM BOOT SEQUENCE COMPLETE."
];

export const BootSequence: React.FC = () => {
  const { hasBooted, completeBoot } = useOSStore();
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // If we have already booted, we don't need to show this again
    // unless they clear local storage.
    if (hasBooted) {
      setIsDone(true);
      return;
    }

    let currentLog = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev, bootSequenceLogs[currentLog]]);
      currentLog++;

      if (currentLog >= bootSequenceLogs.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => completeBoot(), 1000); // Wait for fade out
        }, 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [hasBooted, completeBoot]);

  if (hasBooted && isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12 relative"
          >
            <BrainCircuit className="w-24 h-24 text-cyan-glow drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-cyan-glow/30 rounded-full scale-[1.5]"
            />
          </motion.div>

          {/* Typewriter Logs */}
          <div className="w-full max-w-md h-48 overflow-hidden flex flex-col justify-end">
            <div className="flex flex-col items-start space-y-2 text-xs md:text-sm text-cyan-glow/80">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex space-x-2"
                >
                  <span className="text-white/50">[{new Date().toISOString().substring(11, 23)}]</span>
                  <span>{log}</span>
                </motion.div>
              ))}

              {/* Blinking Cursor */}
              {!isDone && (
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-4 bg-cyan-glow mt-2"
                />
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-12 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
             <motion.div
               className="h-full bg-cyan-glow shadow-[0_0_10px_#00f0ff]"
               initial={{ width: "0%" }}
               animate={{ width: logs.length === bootSequenceLogs.length ? "100%" : `${(logs.length / bootSequenceLogs.length) * 100}%` }}
               transition={{ duration: 0.4 }}
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
