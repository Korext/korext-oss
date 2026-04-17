import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Browse AI Regression Patterns',
  description: 'Search and filter the AI Regression Database. Browse patterns by category, severity, language, or AI tool.',
  path: '/regressions/browse',
  tags: ['browse AI regressions', 'AI code pattern database', 'search AI bugs'],
});

export default function RegressionsBrowse() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Browse Patterns</h1>
        
        {/* Search & Filters */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 mb-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="md:col-span-4">
              <label className="text-xs font-semibold uppercase text-white/40 mb-2 block">Search</label>
              <input type="text" placeholder="Search prompts, categories, types..." className="w-full bg-[#0d0e1a] border border-white/[0.1] rounded-lg px-4 py-2 text-white/80 focus:outline-none focus:border-purple-500/50" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-white/40 mb-2 block">Category</label>
              <select className="w-full bg-[#0d0e1a] border border-white/[0.1] rounded-lg px-4 py-2 text-white/80 focus:outline-none">
                <option value="">All Categories</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-white/40 mb-2 block">Severity</label>
              <select className="w-full bg-[#0d0e1a] border border-white/[0.1] rounded-lg px-4 py-2 text-white/80 focus:outline-none">
                <option value="">All Severities</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-white/40 mb-2 block">AI Tool</label>
              <select className="w-full bg-[#0d0e1a] border border-white/[0.1] rounded-lg px-4 py-2 text-white/80 focus:outline-none">
                <option value="">All Tools</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-white/40 mb-2 block">Status</label>
              <select className="w-full bg-[#0d0e1a] border border-white/[0.1] rounded-lg px-4 py-2 text-white/80 focus:outline-none">
                <option value="">All Statuses</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="p-10 border border-white/[0.06] bg-white/[0.02] rounded-xl text-center">
             <p className="text-white/40 mb-4">No patterns match your search criteria or the database is currently empty pending live data.</p>
             <Link href="/regressions/submit" className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-medium transition-colors text-sm">Submit New Observation</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
