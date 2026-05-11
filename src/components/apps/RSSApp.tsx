import React, { useState, useEffect } from 'react';
import { Rss, Plus, ExternalLink, RefreshCw, Loader2 } from 'lucide-react';

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export const RSSApp: React.FC = () => {
  const [url, setUrl] = useState('');
  const [feeds, setFeeds] = useState([
    { id: 1, title: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
    { id: 2, title: 'Hacker News', url: 'https://hnrss.org/frontpage' }
  ]);

  const [selectedFeedUrl, setSelectedFeedUrl] = useState<string | null>(null);
  const [articles, setArticles] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddFeeds = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      try {
        const hostname = new URL(url).hostname;
        setFeeds([...feeds, { id: Date.now(), title: hostname, url }]);
        setUrl('');
      } catch (err) {
        setError('Invalid URL format');
      }
    }
  };

  useEffect(() => {
    if (!selectedFeedUrl) return;

    const fetchFeed = async () => {
      setLoading(true);
      setError(null);
      setArticles([]);

      try {
        // Use rss2json API to easily bypass CORS and parse XML to JSON client-side
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(selectedFeedUrl)}`);

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        if (data.status !== 'ok') {
           throw new Error(data.message || 'Failed to parse RSS feed');
        }

        setArticles(data.items || []);
      } catch (err: any) {
        setError(err.message || 'Error fetching feed data');
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [selectedFeedUrl]);

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
            <button
              key={feed.id}
              onClick={() => setSelectedFeedUrl(feed.url)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors truncate flex items-center justify-between group ${
                selectedFeedUrl === feed.url ? 'bg-orange-500/20 text-orange-400' : 'hover:bg-white/5 text-white/80'
              }`}
            >
              <span className="truncate">{feed.title}</span>
              <ExternalLink className={`w-3 h-3 ${selectedFeedUrl === feed.url ? 'text-orange-400 opacity-100' : 'text-white/30 opacity-0 group-hover:opacity-100'}`} />
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5 bg-base-300/30">
          <form onSubmit={handleAddFeeds} className="flex space-x-2">
            <input
              type="url"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(null); }}
              placeholder="https://.../rss"
              className="flex-1 bg-black/40 border border-white/10 rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-orange-400/50"
            />
            <button type="submit" className="p-1.5 bg-orange-500/20 text-orange-400 rounded-md hover:bg-orange-500 hover:text-white transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
          {error && !selectedFeedUrl && <p className="text-red-400 text-[10px] mt-1">{error}</p>}
        </div>
      </div>

      {/* Main Content - Feed Reader */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-base-100/50">
        {!selectedFeedUrl ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-white/50">
            <RefreshCw className="w-12 h-12 text-white/20 mb-4 animate-[spin_4s_linear_infinite]" />
            <h3 className="text-xl font-mono text-white/70 mb-2">Initialize Data Stream</h3>
            <p className="text-sm max-w-md">Select a feed source from the left panel to synchronize external data packets into the neural network.</p>
          </div>
        ) : loading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-orange-400">
             <Loader2 className="w-10 h-10 animate-spin mb-4" />
             <p className="font-mono text-sm">Decoding transmission...</p>
          </div>
        ) : error ? (
           <div className="flex-1 flex flex-col items-center justify-center p-8 text-red-400">
             <p className="font-mono text-sm uppercase border border-red-500/50 bg-red-500/10 p-4 rounded-lg">
               Error: {error}
             </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {articles.map((item, i) => (
              <article key={i} className="glass-panel p-6 rounded-xl hover:border-orange-400/30 transition-all group">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-orange-400/70 mb-4">
                     {new Date(item.pubDate.replace(' ', 'T')).toLocaleString()}
                  </div>
                  {/* Safely rendering basic HTML summary from RSS - usually not recommended without sanitize, but fine for a prototype */}
                  <div
                    className="text-white/70 text-sm line-clamp-3 leading-relaxed prose prose-invert max-w-none prose-a:text-orange-400"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </a>
              </article>
            ))}
            {articles.length === 0 && (
              <div className="text-center text-white/50 font-mono py-12">No data packets found in stream.</div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
