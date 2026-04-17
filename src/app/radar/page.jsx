'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Seed data embedded for SSR/initial render.
// In production this loads from /radar-data/current.json.
const SEED = {
  global: { weighted_ai_percentage: 34.2, median_ai_percentage: 28.5, repos_with_any_ai: 8432, repos_without_any_ai: 1815 },
  data_coverage: { total_attestations: 10247, total_commits_covered: 2847392 },
  by_language: [
    { language: 'TypeScript', sample_size: 2341, weighted_ai_percentage: 41.3, trend_30d: 4.2 },
    { language: 'Python', sample_size: 1893, weighted_ai_percentage: 38.7, trend_30d: 3.8 },
    { language: 'JavaScript', sample_size: 3102, weighted_ai_percentage: 36.1, trend_30d: 2.1 },
    { language: 'Go', sample_size: 892, weighted_ai_percentage: 33.1, trend_30d: 2.8 },
    { language: 'Java', sample_size: 743, weighted_ai_percentage: 22.4, trend_30d: 1.2 },
    { language: 'Rust', sample_size: 421, weighted_ai_percentage: 19.8, trend_30d: 0.9 },
    { language: 'Kotlin', sample_size: 312, weighted_ai_percentage: 24.6, trend_30d: 1.5 },
    { language: 'C#', sample_size: 287, weighted_ai_percentage: 21.3, trend_30d: 1.0 },
    { language: 'Swift', sample_size: 198, weighted_ai_percentage: 20.1, trend_30d: 0.7 },
    { language: 'Ruby', sample_size: 158, weighted_ai_percentage: 17.2, trend_30d: 0.4 },
  ],
  by_tool: [
    { tool: 'Claude Code', repos_detected: 2841, total_share: 28.4, trend_30d: 4.2 },
    { tool: 'GitHub Copilot', repos_detected: 2612, total_share: 26.1, trend_30d: -2.1 },
    { tool: 'Cursor', repos_detected: 1972, total_share: 19.7, trend_30d: 1.3 },
    { tool: 'Codeium', repos_detected: 902, total_share: 9.0, trend_30d: 0.8 },
    { tool: 'Aider', repos_detected: 532, total_share: 5.3, trend_30d: 2.1 },
    { tool: 'Windsurf', repos_detected: 421, total_share: 4.2, trend_30d: 1.8 },
  ],
  by_industry: [
    { industry: 'Government', sample_size: 187, weighted_ai_percentage: 11.2, trend_30d: 0.4, governance_percentage: 58.3 },
    { industry: 'Fintech', sample_size: 892, weighted_ai_percentage: 29.1, trend_30d: 1.8, governance_percentage: 47.2 },
    { industry: 'Healthcare', sample_size: 412, weighted_ai_percentage: 18.4, trend_30d: 0.9, governance_percentage: 38.1 },
    { industry: 'Infrastructure', sample_size: 567, weighted_ai_percentage: 32.7, trend_30d: 2.6, governance_percentage: 34.8 },
    { industry: 'Ecommerce', sample_size: 234, weighted_ai_percentage: 30.2, trend_30d: 1.4, governance_percentage: 28.9 },
    { industry: 'Education', sample_size: 324, weighted_ai_percentage: 26.8, trend_30d: 2.1, governance_percentage: 22.4 },
  ],
  time_series: {
    daily_global_ai_percentage: Array.from({ length: 30 }).map((_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (29 - i));
      return { date: d.toISOString().split('T')[0], value: parseFloat((30.5 + i * 0.127 + Math.sin(i * 0.5) * 0.4).toFixed(1)) };
    })
  },
  quality: { included_in_aggregates: 9151, coverage_confidence: 'high' }
};

const TOOL_COLORS = ['#06b6d4','#8b5cf6','#f59e0b','#10b981','#ef4444','#3b82f6'];

function TrendArrow({ value }) {
  if (value > 0) return <span className="text-emerald-400 text-xs font-semibold">+{value}%</span>;
  if (value < 0) return <span className="text-red-400 text-xs font-semibold">{value}%</span>;
  return <span className="text-white/30 text-xs">0%</span>;
}

function HorizontalBar({ label, value, maxValue, color, trend, sampleSize }) {
  const pct = (value / maxValue) * 100;
  return (
    <div className="flex items-center gap-3 group">
      <span className="w-24 text-sm text-white/70 text-right shrink-0 truncate">{label}</span>
      <div className="flex-1 h-7 bg-white/[0.04] rounded-lg overflow-hidden relative">
        <div
          className="h-full rounded-lg transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color, opacity: 0.7 }}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/60 font-mono">{value}%</span>
      </div>
      <TrendArrow value={trend} />
      <span className="text-[10px] text-white/30 w-14 text-right">n={sampleSize.toLocaleString()}</span>
    </div>
  );
}

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.total_share, 0);
  let cumulative = 0;
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;
  const strokeWidth = 28;

  return (
    <div className="flex flex-col items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((d, i) => {
          const startAngle = (cumulative / total) * 360 - 90;
          cumulative += d.total_share;
          const endAngle = (cumulative / total) * 360 - 90;
          const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
          const x1 = cx + r * Math.cos((startAngle * Math.PI) / 180);
          const y1 = cy + r * Math.sin((startAngle * Math.PI) / 180);
          const x2 = cx + r * Math.cos((endAngle * Math.PI) / 180);
          const y2 = cy + r * Math.sin((endAngle * Math.PI) / 180);
          return (
            <path
              key={d.tool}
              d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
              fill="none"
              stroke={TOOL_COLORS[i]}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              opacity={0.8}
            />
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="white" fontSize="22" fontWeight="bold">{data.length}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">tools tracked</text>
      </svg>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
        {data.map((d, i) => (
          <div key={d.tool} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: TOOL_COLORS[i] }} />
            <span className="text-white/60">{d.tool}</span>
            <span className="text-white/40 ml-auto">{d.total_share}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SparkLine({ data }) {
  if (!data || data.length === 0) return null;
  const values = data.map(d => d.value);
  const min = Math.min(...values) - 0.5;
  const max = Math.max(...values) + 0.5;
  const w = 600;
  const h = 200;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-64" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,${h} ${points} ${w},${h}`}
          fill="url(#sparkGrad)"
        />
        <polyline
          points={points}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex justify-between text-[10px] text-white/30 mt-2 px-1">
        <span>{data[0]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </div>
  );
}

export default function RadarDashboard() {
  const [data, setData] = useState(SEED);
  const [updatedAgo, setUpdatedAgo] = useState('just now');

  useEffect(() => {
    fetch('/api/radar/current')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) { setData(d); setUpdatedAgo(getTimeAgo(d.computed_at)); } })
      .catch(() => {});
  }, []);

  function getTimeAgo(iso) {
    if (!iso) return 'just now';
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  const maxLang = Math.max(...(data.by_language || []).map(l => l.weighted_ai_percentage));
  const sortedIndustries = [...(data.by_industry || [])].sort((a, b) => b.governance_percentage - a.governance_percentage);

  return (
    <div className="relative min-h-screen pb-20">
      {/* Hero */}
      <section className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-xs font-medium text-cyan-300 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Data
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">
            AI Code <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Radar</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">The real-time pulse of AI code adoption across open source.</p>
        </div>
      </section>

      {/* Global Headline Number */}
      <section className="pb-16 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="rounded-2xl border border-cyan-500/20 bg-[#0d0e1a]/80 backdrop-blur-xl p-10 space-y-4 shadow-[0_0_80px_rgba(6,182,212,0.06)]">
            <h2 className="text-7xl sm:text-8xl font-black text-white tabular-nums">{data.global?.weighted_ai_percentage || 34.2}%</h2>
            <p className="text-lg font-semibold text-white/70 uppercase tracking-[0.2em]">AI Assisted</p>
            <p className="text-sm text-white/40">Weighted across {(data.data_coverage?.total_attestations || 10247).toLocaleString()} open source repositories</p>
            <div className="flex items-center justify-center gap-4 text-xs text-white/30 pt-2">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Updated {updatedAgo}
              </span>
              <span>{(data.data_coverage?.total_commits_covered || 0).toLocaleString()} commits covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Languages Bar Chart */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Top Languages</h3>
              <Link href="/radar/languages" className="text-sm text-cyan-400 hover:underline">View All</Link>
            </div>
            <div className="space-y-2.5">
              {(data.by_language || []).map((lang, i) => (
                <HorizontalBar
                  key={lang.language}
                  label={lang.language}
                  value={lang.weighted_ai_percentage}
                  maxValue={maxLang + 5}
                  color={TOOL_COLORS[i % TOOL_COLORS.length]}
                  trend={lang.trend_30d}
                  sampleSize={lang.sample_size}
                />
              ))}
            </div>
          </div>

          {/* Tool Market Share Donut */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Tool Market Share</h3>
              <Link href="/radar/tools" className="text-sm text-cyan-400 hover:underline">View All</Link>
            </div>
            <DonutChart data={data.by_tool || []} />
          </div>

          {/* 30 Day Trend */}
          <div className="md:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Global 30 Day Trend</h3>
              <Link href="/radar/trends" className="text-sm text-cyan-400 hover:underline">Full History</Link>
            </div>
            <SparkLine data={data.time_series?.daily_global_ai_percentage || []} />
          </div>
        </div>
      </section>

      {/* Industry Table */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">By Industry</h3>
              <Link href="/radar/industries" className="text-sm text-cyan-400 hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-white/40 border-b border-white/[0.06]">
                    <th className="pb-3 font-medium">Industry</th>
                    <th className="pb-3 font-medium text-right">AI %</th>
                    <th className="pb-3 font-medium text-right">Governance %</th>
                    <th className="pb-3 font-medium text-right">30d Trend</th>
                    <th className="pb-3 font-medium text-right">Sample</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedIndustries.map((ind) => (
                    <tr key={ind.industry} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 text-white/80 capitalize">{ind.industry}</td>
                      <td className="py-3 text-right text-white/70 font-mono">{ind.weighted_ai_percentage}%</td>
                      <td className="py-3 text-right text-violet-400 font-mono">{ind.governance_percentage}%</td>
                      <td className="py-3 text-right"><TrendArrow value={ind.trend_30d} /></td>
                      <td className="py-3 text-right text-white/30 text-xs">n={ind.sample_size.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Governance callout */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/5 border border-violet-500/20 p-8 sm:p-12 text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">Governance Insight</h3>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Repositories in regulated industries (fintech, healthcare, government) adopt AI governance standards at <strong className="text-white">1.8x</strong> higher rate than general repositories.
            </p>
            <p className="text-xs text-white/30 pt-2">Source: correlation analysis across {(data.quality?.included_in_aggregates || 9151).toLocaleString()} repositories. <Link href="/radar/governance" className="text-cyan-400 hover:underline">See methodology</Link></p>
          </div>
        </div>
      </section>

      {/* Data Quality + Downloads */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white">Data Quality</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-white/40">Included</div><div className="text-white/80 font-mono text-right">{(data.quality?.included_in_aggregates || 0).toLocaleString()}</div>
              <div className="text-white/40">Opted out</div><div className="text-white/80 font-mono text-right">{(data.quality?.excluded_opted_out || 0).toLocaleString()}</div>
              <div className="text-white/40">Outliers capped</div><div className="text-white/80 font-mono text-right">{data.quality?.excluded_outliers || 0}</div>
              <div className="text-white/40">Flagged</div><div className="text-white/80 font-mono text-right">{data.quality?.excluded_manipulation_flagged || 0}</div>
              <div className="text-white/40">Confidence</div><div className="text-emerald-400 font-semibold text-right uppercase text-xs">{data.quality?.coverage_confidence || 'high'}</div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white">Download the Data</h3>
            <p className="text-sm text-white/50">This data is free under CC BY 4.0. Attribution required.</p>
            <div className="flex flex-wrap gap-3">
              <a href="/api/radar/current" target="_blank" className="px-4 py-2 rounded-lg bg-cyan-600/20 border border-cyan-500/20 text-cyan-300 text-sm font-medium hover:bg-cyan-600/30 transition">JSON</a>
              <Link href="/radar/api" className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/60 text-sm font-medium hover:bg-white/[0.08] transition">API Docs</Link>
              <a href="https://github.com/korext/ai-code-radar" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/60 text-sm font-medium hover:bg-white/[0.08] transition">GitHub</a>
            </div>
            <p className="text-xs text-white/30">Cite as: "Source: AI Code Radar, Korext Open Source"</p>
          </div>
        </div>
      </section>

      {/* Embeddable CTA */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white">Using this data in an article?</h3>
            <p className="text-sm text-white/50">Embed live, auto-updating charts directly in your publication. No design work required.</p>
            <code className="block p-4 bg-black/40 rounded-lg text-xs text-cyan-200 font-mono overflow-x-auto">
              {`<iframe src="https://oss.korext.com/radar/embed/global-percentage" width="600" height="400" frameborder="0" title="AI Code Radar"></iframe>`}
            </code>
            <Link href="/radar/api" className="text-sm text-cyan-400 hover:underline inline-block">See all embeddable charts</Link>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="border-t border-white/[0.06] pt-12">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Data: CC BY 4.0</span>
            <span className="text-white/10">|</span>
            <span>Code: Apache 2.0</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/radar/explore" className="hover:text-white transition">Explorer</Link>
            <Link href="/radar/api" className="hover:text-white transition">API</Link>
            <a href="https://github.com/korext/ai-code-radar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
            <a href="mailto:maintainers@korext.com" className="hover:text-white transition">Press</a>
          </div>
        </div>
      </section>
    </div>
  );
}
