import React from 'react';
import { BackgroundManager } from './BackgroundManager';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { WindowManager } from './WindowManager';

export const WebOS: React.FC<{ collections: any }> = ({ collections }) => {
  return (
    <div className="w-screen h-screen overflow-hidden text-white font-sans selection:bg-cyan-glow/30 selection:text-white">
      <BackgroundManager />
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        <div className="pointer-events-auto">
          <TopBar />
        </div>
        <div className="flex-1 relative pointer-events-auto">
          <WindowManager collections={collections} />
        </div>
        <div className="pointer-events-auto pb-4 flex justify-center">
          <Dock />
        </div>
      </div>
    </div>
  );
};
