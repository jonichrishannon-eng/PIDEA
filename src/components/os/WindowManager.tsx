import React from 'react';
import { useOSStore, type AppWindow } from '../../store/os';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// App Components
import { ContentApp } from '../apps/ContentApp';
import { CustomizationApp } from '../apps/CustomizationApp';
import { TimelineApp } from '../apps/TimelineApp';

// We receive global props passed from Astro down to the WindowManager
// so it can pass them to the respective apps.
export const WindowManager: React.FC<{ collections: any }> = ({ collections }) => {
  const windows = useOSStore(state => state.windows);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {windows.map(window => (
          <div key={window.id} className="pointer-events-auto">
            <Window window={window} collections={collections} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const Window: React.FC<{ window: AppWindow, collections: any }> = ({ window, collections }) => {
  const { closeApp, minimizeApp, focusApp } = useOSStore();
  const windowRef = React.useRef<HTMLDivElement>(null);
  const [isMaximized, setIsMaximized] = React.useState(false);

  if (window.isMinimized) return null;

  const handleDragStart = () => focusApp(window.id);

  // Router for rendering the correct app inside the window
  const renderAppContent = () => {
    switch (window.appType) {
      case 'customization':
        return <CustomizationApp />;
      case 'timeline':
        return <TimelineApp entries={collections.allEntries} />;
      case 'settings':
        return (
          <div className="p-8 text-center text-white/50">
            <h2 className="text-2xl font-mono text-cyan-glow mb-4">System Settings</h2>
            <p>Node configuration module currently offline.</p>
          </div>
        );
      default:
        // Handle content collections (Memories, Motivation, etc.)
        const appEntries = collections[window.appType] || [];
        return <ContentApp entries={appEntries} appTitle={window.title} />;
    }
  };

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized}
      dragConstraints={{ top: 0, left: 0, right: window.innerWidth - 200, bottom: window.innerHeight - 100 }}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onMouseDown={() => focusApp(window.id)}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
        width: isMaximized ? '100vw' : '800px',
        height: isMaximized ? 'calc(100vh - 80px)' : '500px',
        top: isMaximized ? '32px' : '10%',
        left: isMaximized ? '0' : 'auto',
      }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      style={{ zIndex: window.zIndex }}
      className={twMerge(
        "absolute rounded-xl overflow-hidden flex flex-col",
        "glass-panel shadow-2xl border-white/20 backdrop-blur-2xl bg-base-200/80",
        window.isFocused ? "border-cyan-glow/50 shadow-[0_0_30px_rgba(0,240,255,0.15)] ring-1 ring-cyan-glow/30" : "opacity-90 grayscale-[20%]"
      )}
    >
      {/* Window Header */}
      <div
        className="h-10 bg-base-300/60 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing border-b border-white/10"
        onDoubleClick={() => setIsMaximized(!isMaximized)}
      >
        <div className="flex space-x-2">
          <button onClick={(e) => { e.stopPropagation(); closeApp(window.id); }} className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-400 flex items-center justify-center group">
            <X className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); minimizeApp(window.id); }} className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 hover:bg-yellow-400 flex items-center justify-center group">
            <Minus className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }} className="w-3.5 h-3.5 rounded-full bg-green-500/80 hover:bg-green-400 flex items-center justify-center group">
            <Maximize2 className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100 p-0.5" />
          </button>
        </div>
        <div className="font-mono text-sm tracking-wider text-white/80 select-none">{window.title}</div>
        <div className="w-16" />
      </div>

      {/* Window Content */}
      <div className="flex-1 bg-transparent overflow-hidden relative">
         {renderAppContent()}
      </div>
    </motion.div>
  );
};
