import React from 'react';
import { useOSStore } from '../../store/os';

const backgrounds = [
  { id: 'vanta-net', name: 'Neural Net (Cyan)', type: 'Vanta.js' },
  { id: 'vanta-fog', name: 'Nebula Fog', type: 'Vanta.js' },
  { id: 'vanta-globe', name: 'Cyber Globe', type: 'Vanta.js' },
  { id: 'particles', name: 'Quantum Particles', type: 'tsParticles' },
];

export const CustomizationApp: React.FC = () => {
  const { activeBackground, setBackground } = useOSStore();

  return (
    <div className="h-full w-full p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-mono text-cyan-glow mb-6">System Aesthetics</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-4 border-b border-white/10 pb-2">Holographic Backgrounds</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setBackground(bg.id)}
                  className={`p-4 rounded-xl text-left transition-all relative overflow-hidden group ${
                    activeBackground === bg.id
                      ? 'bg-cyan-glow/20 border-cyan-glow shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-white/5 border-transparent hover:bg-white/10 border'
                  } border`}
                >
                  <div className="relative z-10">
                    <div className="font-bold text-white mb-1">{bg.name}</div>
                    <div className="text-xs text-white/50 font-mono">{bg.type}</div>
                  </div>
                  {activeBackground === bg.id && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-glow shadow-[0_0_8px_#00f0ff]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl mt-8">
            <h4 className="text-yellow-500 font-mono text-sm mb-2">! SYSTEM NOTICE</h4>
            <p className="text-sm text-white/70">
              Applying new background environments requires computational reallocation.
              Visual artifacts may appear temporarily during initialization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
