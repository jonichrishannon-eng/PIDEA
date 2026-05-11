import React, { useState } from 'react';
import { Rss, Plus, ExternalLink, RefreshCw } from 'lucide-react';

export const RSSApp: React.FC = () => {
  const [url, setUrl] = useState('');
  const [feeds, setFeeds] = useState([
    { id: 1, title: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
    { id: 2, title: 'Hacker News', url: 'https://news.ycombinator.com/rss' }
  ]);

  const handleAddFeeds = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setFeeds([...feeds, { id: Date.now(), title: new URL(url).hostname, url }]);
      setUrl('');
    }
  };

  return (
    <div className="flex h-full w-full bg-base-100/30">

      {/* Sidebar - Feed List */}
      <div className="w-1/3 min-w-[250px] border-r border-white/10 bg-base-200/50 backdrop-blur-sm flex flex-col">
        <div className="p-4 border-b border-white/5 flex items-center space-x-2">
          <Rss className="w-5 h-5 text-orange-400" />
          <h2 className="font-mono text-sm text-orange-400 tracking-widest uppercase">RSS Core</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {feeds.map(feed => (
            <button key={feed.id} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-white/80 transition-colors truncate flex items-center justify-between group">
              <span className="truncate">{feed.title}</span>
              <ExternalLink className="w-3 h-3 text-white/30 opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5 bg-base-300/30">
          <form onSubmit={handleAddFeeds} className="flex space-x-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://.../rss"
              className="flex-1 bg-black/40 border border-white/10 rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-orange-400/50"
            />
            <button type="submit" className="p-1.5 bg-orange-500/20 text-orange-400 rounded-md hover:bg-orange-500 hover:text-white transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Content - Feed Reader Placeholder */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-white/50">
        <RefreshCw className="w-12 h-12 text-white/20 mb-4 animate-[spin_4s_linear_infinite]" />
        <h3 className="text-xl font-mono text-white/70 mb-2">Initialize Data Stream</h3>
        <p className="text-sm max-w-md">Select a feed source from the left panel to synchronize external data packets into the neural network.</p>
      </div>

    </div>
  );
};
