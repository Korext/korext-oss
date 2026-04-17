import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'API Documentation',
  description: 'Public API for querying live AI code adoption data. JSON endpoints with CORS support. Free and open.',
  path: '/radar/api',
  tags: ['AI code radar API', 'AI adoption data API', 'AI code metrics endpoint'],
});

function Endpoint({ method, path, description, example, response }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">{method}</span>
        <code className="text-sm text-white/80 font-mono">{path}</code>
      </div>
      <p className="text-sm text-white/50">{description}</p>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/30">Request</p>
        <pre className="p-3 bg-black/40 rounded-lg text-xs text-cyan-200 font-mono overflow-x-auto"><code>{example}</code></pre>
      </div>
      {response && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/30">Response shape</p>
          <pre className="p-3 bg-black/40 rounded-lg text-xs text-white/60 font-mono overflow-x-auto"><code>{response}</code></pre>
        </div>
      )}
    </div>
  );
}

export default function RadarApiDocsPage() {
  return (
    <div className="relative min-h-screen pb-20 pt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/radar" className="text-cyan-400 text-sm hover:underline mb-8 inline-block">
          Back to Dashboard
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">API Documentation</h1>
        <p className="text-white/50 mb-4 text-lg">Retrieve live AI code adoption data for your newsroom, dashboard, or research. All endpoints return JSON with CORS enabled.</p>
        <p className="text-sm text-white/30 mb-10">Data is licensed under CC BY 4.0. Attribution required: "Source: AI Code Radar, Korext Open Source"</p>

        {/* Base URL */}
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300/60 mb-2">Base URL</p>
          <code className="text-lg font-mono text-cyan-200">https://oss.korext.com/api/radar</code>
        </div>

        {/* Rate Limits */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 mb-8">
          <h3 className="font-semibold text-white mb-3">Rate Limits</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-white/40">Without API key</div>
            <div className="text-white/70">100 requests / hour / IP</div>
            <div className="text-white/40">With API key (free)</div>
            <div className="text-white/70">10,000 requests / hour</div>
          </div>
          <p className="text-xs text-white/30 mt-3">All responses include <code className="text-white/40">Cache-Control: public, max-age=3600</code>. Data updates hourly.</p>
        </div>

        {/* Endpoints */}
        <h2 className="text-2xl font-bold text-white mb-6">Endpoints</h2>
        <div className="space-y-6 mb-12">
          <Endpoint
            method="GET"
            path="/current"
            description="Returns the latest full aggregated snapshot of all statistics."
            example="curl https://oss.korext.com/api/radar/current"
            response={`{
  "schema": "https://oss.korext.com/radar/schema",
  "version": "1.0",
  "computed_at": "2026-04-16T12:00:00Z",
  "global": { "weighted_ai_percentage": 34.2, ... },
  "by_language": [ ... ],
  "by_tool": [ ... ],
  "quality": { "included_in_aggregates": 9151, ... }
}`}
          />
          <Endpoint
            method="GET"
            path="/current?metric=languages"
            description="Returns a specific dimension from the current snapshot. Valid metrics: languages, tools, ecosystems, industries, regions, governance, maturity."
            example="curl https://oss.korext.com/api/radar/current?metric=tools"
            response={`{
  "metric": "tools",
  "data": [
    { "tool": "Claude Code", "repos_detected": 2841, "total_share": 28.4 },
    ...
  ],
  "computed_at": "2026-04-16T12:00:00Z",
  "quality": { ... }
}`}
          />
          <Endpoint
            method="GET"
            path="/history?metric=global&days=30"
            description="Returns time series data points for a metric. Days parameter is bounded between 1 and 365."
            example="curl https://oss.korext.com/api/radar/history?metric=global&days=30"
            response={`{
  "metric": "global",
  "days": 30,
  "points": 30,
  "history": [
    { "date": "2026-03-17", "value": 31.2 },
    { "date": "2026-03-18", "value": 31.4 },
    ...
  ]
}`}
          />
          <Endpoint
            method="GET"
            path="/snapshot/2026-04-15-12"
            description="Returns a historical snapshot by its hourly timestamp. Format: YYYY-MM-DD-HH."
            example="curl https://oss.korext.com/api/radar/snapshot/2026-04-15-12"
          />
          <Endpoint
            method="GET"
            path="/methodology"
            description="Returns the full methodology document as markdown."
            example="curl https://oss.korext.com/api/radar/methodology"
            response={`{
  "format": "markdown",
  "content": "# AI Code Radar Methodology\\n\\n..."
}`}
          />
        </div>

        {/* SDKs */}
        <h2 className="text-2xl font-bold text-white mb-6">SDKs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-3">
            <h3 className="font-semibold text-white">JavaScript / TypeScript</h3>
            <pre className="p-3 bg-black/40 rounded-lg text-xs text-cyan-200 font-mono"><code>npm install @korext/radar-data</code></pre>
            <pre className="p-3 bg-black/40 rounded-lg text-xs text-white/60 font-mono overflow-x-auto"><code>{`import { radar } from '@korext/radar-data';

const current = await radar.current();
const languages = await radar.metric('languages');
const history = await radar.history('global', { days: 90 });`}</code></pre>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-3">
            <h3 className="font-semibold text-white">Python</h3>
            <pre className="p-3 bg-black/40 rounded-lg text-xs text-cyan-200 font-mono"><code>pip install korext-radar-data</code></pre>
            <pre className="p-3 bg-black/40 rounded-lg text-xs text-white/60 font-mono overflow-x-auto"><code>{`from korext_radar_data import radar

current = radar.current()
languages = radar.metric('languages')
history = radar.history('global', days=90)`}</code></pre>
          </div>
        </div>

        {/* Attribution */}
        <h2 className="text-2xl font-bold text-white mb-6">Attribution</h2>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-3 text-sm text-white/60 mb-12">
          <p><strong className="text-white/80">Short form:</strong> "Source: AI Code Radar, Korext Open Source"</p>
          <p><strong className="text-white/80">Academic:</strong> AI Code Radar (2026). AI Code Radar: Live Data on AI Code Adoption. Korext Open Source. Retrieved [DATE] from https://oss.korext.com/radar</p>
          <p><strong className="text-white/80">Iframes:</strong> Attribution is included automatically in embedded charts.</p>
        </div>

        {/* Use Cases */}
        <h2 className="text-2xl font-bold text-white mb-6">Example Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-sm">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
            <h4 className="font-semibold text-white/80">Newsroom live widget</h4>
            <p className="text-white/40">Fetch /current on page load and display the global AI percentage as a live number in your sidebar.</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
            <h4 className="font-semibold text-white/80">Research dashboard</h4>
            <p className="text-white/40">Use the /history endpoint to plot long term adoption trends alongside policy timelines.</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
            <h4 className="font-semibold text-white/80">Executive briefing</h4>
            <p className="text-white/40">Pull /current?metric=industries for a table comparing AI adoption and governance rates across regulated sectors.</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
            <h4 className="font-semibold text-white/80">Sustainability report</h4>
            <p className="text-white/40">Query tool market share data to estimate compute emissions from AI coding tools across an ecosystem.</p>
          </div>
        </div>

        <div className="text-center text-sm text-white/30 pt-8 border-t border-white/[0.06]">
          Questions? <a href="mailto:maintainers@korext.com" className="text-cyan-400 hover:underline">maintainers@korext.com</a>
        </div>
      </div>
    </div>
  );
}
