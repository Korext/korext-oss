'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BrowseIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/incidents/search')
      .then(r => r.json())
      .then(data => {
        setIncidents(data);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`/api/incidents/search?q=${encodeURIComponent(query)}`)
      .then(r => r.json())
      .then(data => {
        setIncidents(data);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl font-bold text-white mb-8">Browse Registry</h1>
        
        <form onSubmit={handleSearch} className="mb-12 flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, tool, or pattern..."
            className="flex-1 px-4 py-3 bg-[#0d0e1a] border border-white/[0.08] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          />
          <button type="submit" className="px-8 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] transition-all">
            Filter
          </button>
        </form>

        {loading ? (
          <div className="text-white/40 text-center py-12">Loading registry data...</div>
        ) : incidents.length === 0 ? (
          <div className="text-center py-20 border border-white/[0.06] rounded-2xl bg-[#0d0e1a]">
            <p className="text-white/40 mb-4">No incidents matched your criteria.</p>
            <Link href="/incidents/submit" className="text-violet-400 hover:text-violet-300">Be the first to report an incident →</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {incidents.map(inc => (
              <Link key={inc.identifier} href={`/incidents/${inc.identifier}`} className="block p-6 bg-[#0d0e1a] hover:bg-white/[0.02] border border-white/[0.06] rounded-2xl transition-all group">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-xs font-mono text-white/40">{inc.identifier}</span>
                       <span className={`text-xs px-2 py-0.5 rounded-md border ${
                          inc.severity === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          inc.severity === 'high' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                          inc.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                          'bg-blue-500/10 text-blue-400 border-blue-500/20'
                       }`}>
                         {inc.severity}
                       </span>
                       <span className="text-xs text-white/30">{new Date(inc.published_date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors">{inc.title}</h3>
                    <p className="text-sm text-white/40 mt-2 line-clamp-2">{inc.summary}</p>
                    <div className="mt-4 flex gap-3 text-xs text-white/30">
                      <span className="px-2 py-1 rounded bg-white/[0.04]">{inc.ai_tool.name}</span>
                      <span className="px-2 py-1 rounded bg-white/[0.04]">{inc.affected_pattern.language}</span>
                      <span className="px-2 py-1 rounded bg-white/[0.04]">{inc.affected_pattern.pattern_type}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
