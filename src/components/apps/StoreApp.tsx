import React from 'react';
import { ShoppingCart, Download, Star } from 'lucide-react';

const mockApps = [
  { id: '1', name: 'Neural Codec', author: 'MindOS Core', rating: 4.8, type: 'System', color: 'text-cyan-glow', installed: true },
  { id: '2', name: 'Quantum RSS', author: 'HoloDev', rating: 4.5, type: 'Network', color: 'text-magenta-glow', installed: true },
  { id: '3', name: 'Memory Defrag', author: 'SysAdmin', rating: 4.9, type: 'Utility', color: 'text-emerald-400', installed: false },
  { id: '4', name: 'Holo-Terminal', author: 'MindOS Core', rating: 4.7, type: 'Dev', color: 'text-orange-400', installed: false },
];

export const StoreApp: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col bg-base-100/30">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-base-200/50 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <ShoppingCart className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">Nexus Store</h2>
            <p className="text-xs text-white/50 font-mono">Expand your neural capabilities</p>
          </div>
        </div>
      </div>

      {/* App Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <h3 className="text-sm font-mono text-white/40 uppercase mb-4">Recommended Modules</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockApps.map((app) => (
            <div key={app.id} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between group">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-base-300 flex items-center justify-center border border-white/5 ${app.color}`}>
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white/90">{app.name}</h4>
                  <div className="text-xs text-white/50">{app.author} • {app.type}</div>
                </div>
              </div>

              <button
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1 ${
                  app.installed
                    ? 'bg-white/10 text-white/50 cursor-default'
                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white border border-blue-500/50'
                }`}
              >
                {app.installed ? (
                  <span>Installed</span>
                ) : (
                  <>
                    <Download className="w-3 h-3" />
                    <span>GET</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
