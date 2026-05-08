import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContentEntry {
  id: string;
  data: {
    title: string;
    description?: string;
    date: Date;
    important: boolean;
  };
  body: string;
  render?: () => Promise<{ Content: any }>;
}

interface ContentAppProps {
  entries: ContentEntry[];
  appTitle: string;
}

export const ContentApp: React.FC<ContentAppProps> = ({ entries, appTitle }) => {
  const [selectedEntry, setSelectedEntry] = useState<ContentEntry | null>(null);

  // Fallback for empty collections
  if (!entries || entries.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 h-full text-white/50">
        <div className="w-16 h-16 border-2 border-cyan-glow/20 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl text-cyan-glow/40">?</span>
        </div>
        <h3 className="font-mono text-lg mb-2">No Data Found</h3>
        <p className="text-sm">The {appTitle} neural pathway is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      {/* Sidebar List */}
      <div className="w-1/3 min-w-[250px] border-r border-white/10 bg-base-200/50 backdrop-blur-sm overflow-y-auto">
        <div className="p-4 border-b border-white/5">
          <h2 className="font-mono text-sm text-cyan-glow tracking-widest uppercase">{appTitle} DB</h2>
        </div>
        <div className="p-2 flex flex-col gap-2">
          {entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).map((entry) => (
            <button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className={`text-left p-3 rounded-lg transition-all ${
                selectedEntry?.id === entry.id
                  ? 'bg-cyan-glow/20 border border-cyan-glow/50'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <h4 className="font-semibold text-white/90 truncate">{entry.data.title}</h4>
              <p className="text-xs text-white/50 mt-1">{new Date(entry.data.date).toLocaleDateString()}</p>
              {entry.data.important && (
                <span className="inline-block mt-2 text-[10px] bg-magenta-glow/20 text-magenta-glow px-2 py-0.5 rounded font-mono">! IMPORTANT</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-base-100/30">
        {selectedEntry ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={selectedEntry.id}
            className="max-w-3xl mx-auto prose prose-invert prose-cyan"
          >
            <h1 className="text-3xl font-bold text-white mb-2">{selectedEntry.data.title}</h1>
            <div className="flex items-center gap-4 text-sm text-white/50 mb-8 border-b border-white/10 pb-4">
              <span>{new Date(selectedEntry.data.date).toLocaleDateString()}</span>
              {selectedEntry.data.important && <span className="text-magenta-glow">Critical Node</span>}
            </div>
            {selectedEntry.data.description && (
              <p className="text-lg text-white/80 italic mb-8 border-l-2 border-cyan-glow pl-4">
                {selectedEntry.data.description}
              </p>
            )}

            {/* The actual markdown content body */}
            <div className="whitespace-pre-wrap text-white/80 font-sans leading-relaxed">
               {/* In a real Astro+React setup, rendering MDX directly in React is tricky without hydration tricks.
                   We will pass the body text or rely on Astro injecting it if possible.
                   For now, we display the raw body text. */}
               {selectedEntry.body}
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex items-center justify-center text-white/30 font-mono">
            Select a record to view details
          </div>
        )}
      </div>
    </div>
  );
};
