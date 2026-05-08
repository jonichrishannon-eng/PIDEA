import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ContentEntry {
  id: string;
  data: {
    title: string;
    description?: string;
    date: Date;
    important: boolean;
  };
  collection: string;
}

interface TimelineAppProps {
  entries: ContentEntry[];
}

export const TimelineApp: React.FC<TimelineAppProps> = ({ entries }) => {
  // Filter only important entries and sort chronologically
  const timelineEvents = useMemo(() => {
    return entries
      .filter(entry => entry.data.important)
      .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  }, [entries]);

  if (timelineEvents.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 h-full text-white/50">
        <h3 className="font-mono text-lg mb-2 text-magenta-glow">No Critical Events</h3>
        <p className="text-sm">Mark items as `important: true` in your markdown to build the timeline.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto p-8 bg-base-100/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-mono text-cyan-glow mb-12 text-center tracking-widest">CHRONICLES</h2>

        <div className="relative">
          {/* Main vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-glow/50 via-magenta-glow/50 to-transparent" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={event.id}
                  className={`flex items-center w-full ${isEven ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="glass-panel p-6 rounded-xl hover:glass-panel-active transition-all group">
                      <div className={`text-xs font-mono mb-2 ${isEven ? 'text-cyan-glow' : 'text-magenta-glow'}`}>
                        {new Date(event.data.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-glow transition-all">{event.data.title}</h3>
                      {event.data.description && (
                        <p className="text-white/70 text-sm leading-relaxed">{event.data.description}</p>
                      )}
                      <div className="mt-4 text-[10px] uppercase tracking-wider text-white/30 font-mono">
                        SRC: {event.collection}
                      </div>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-base-100 border-2 border-cyan-glow shadow-[0_0_10px_#00f0ff] z-10" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
