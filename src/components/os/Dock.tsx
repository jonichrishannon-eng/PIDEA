import React from 'react';
import { useOSStore } from '../../store/os';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Target,
  Trophy,
  Award,
  Heart,
  User,
  Lightbulb,
  Rocket,
  Clock,
  Settings,
  Palette
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const apps = [
  { id: 'memories', title: 'Memories', icon: BrainCircuit, color: 'text-cyan-400' },
  { id: 'motivation', title: 'Motivation', icon: Target, color: 'text-red-400' },
  { id: 'accomplishments', title: 'Accomplishments', icon: Trophy, color: 'text-yellow-400' },
  { id: 'awards', title: 'Awards', icon: Award, color: 'text-amber-300' },
  { id: 'honnies', title: 'Honnies', icon: Heart, color: 'text-pink-400' },
  { id: 'about', title: 'About Me', icon: User, color: 'text-blue-400' },
  { id: 'innovations', title: 'Innovations', icon: Lightbulb, color: 'text-emerald-400' },
  { id: 'future', title: 'Future Plans', icon: Rocket, color: 'text-purple-400' },
  { id: 'timeline', title: 'Timeline', icon: Clock, color: 'text-orange-400', isSpecial: true },
  { id: 'customization', title: 'Customization', icon: Palette, color: 'text-indigo-400', isSpecial: true },
  { id: 'settings', title: 'Settings', icon: Settings, color: 'text-gray-400', isSpecial: true },
];

export const Dock: React.FC = () => {
  const { openApp, windows } = useOSStore();

  return (
    <div className="glass-panel-active rounded-2xl p-2 px-3 flex items-center space-x-2 z-50 mb-2">
      {apps.map((app, index) => {
        const isOpen = windows.some(w => w.id === app.id && w.isOpen);
        const Icon = app.icon;

        return (
          <React.Fragment key={app.id}>
            {app.id === 'timeline' && <div className="w-px h-8 bg-white/20 mx-1" />}

            <div className="relative group flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.2, y: -10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => openApp(app.id, app.title, app.id)}
                className={twMerge(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200",
                  "bg-base-300/80 border border-white/10 hover:border-cyan-glow/50",
                  "shadow-lg hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                )}
              >
                <Icon className={twMerge("w-6 h-6", app.color)} />
              </motion.button>

              {/* App Label Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-base-200 border border-white/10 px-3 py-1 rounded text-xs whitespace-nowrap pointer-events-none">
                {app.title}
              </div>

              {/* Open Indicator */}
              {isOpen && (
                <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-cyan-glow shadow-[0_0_5px_rgba(0,240,255,1)]" />
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
