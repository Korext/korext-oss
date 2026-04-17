'use client';

import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';

const DIMENSIONS = [
  { key: 'by_language', label: 'Language', nameField: 'language' },
  { key: 'by_tool', label: 'Tool', nameField: 'tool' },
  { key: 'by_ecosystem', label: 'Ecosystem', nameField: 'ecosystem' },
  { key: 'by_industry', label: 'Industry', nameField: 'industry' },
  { key: 'by_region', label: 'Region', nameField: 'region' },
  { key: 'by_maturity', label: 'Maturity', nameField: 'maturity' },
];

export default function RadarExplorerPage() {
  const [data, setData] = useState(null);
  const [dimension, setDimension] = useState('by_language');
  const [sortBy, setSortBy] = useState('weighted_ai_percentage');

  useEffect(() => {
    fetch('/api/radar/current')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setData(d); })
      .catch(() => {});
  }, []);

  const activeDim = DIMENSIONS.find(d => d.key === dimension);
  const rows = useMemo(() => {
    if (!data || !data[dimension]) return [];
    const items = [...data[dimension]];
    items.sort((a, b) => {
      const aVal = a[sortBy] ?? 0;
      const bVal = b[sortBy] ?? 0;
      return bVal - aVal;
    });
    return items;
  }, [data, dimension, sortBy]);

  const columns = useMemo(() => {
    if (rows.length === 0) return [];
    const first = rows[0];
    const cols = [];
    if (activeDim) cols.push({ key: activeDim.nameField, label: activeDim.label, type: 'string' });
    if ('sample_size' in first) cols.push({ key: 'sample_size', label: 'Sample Size', type: 'number' });
    if ('weighted_ai_percentage' in first) cols.push({ key: 'weighted_ai_percentage', label: 'AI %', type: 'percent' });
    if ('total_share' in first) cols.push({ key: 'total_share', label: 'Share %', type: 'percent' });
    if ('repos_detected' in first) cols.push({ key: 'repos_detected', label: 'Repos', type: 'number' });
    if ('governance_percentage' in first) cols.push({ key: 'governance_percentage', label: 'Governance %', type: 'percent' });
    if ('trend_30d' in first) cols.push({ key: 'trend_30d', label: '30d Trend', type: 'trend' });
    return cols;
  }, [rows, activeDim]);

  function exportJSON() {
    const blob = new Blob([JSON.stringify({ dimension, data: rows }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `radar-${dimension}.json`;
    a.click();
  }

  function exportCSV() {
    if (columns.length === 0 || rows.length === 0) return;
    const header = columns.map(c => c.label).join(',');
    const body = rows.map(r => columns.map(c => r[c.key] ?? '').join(',')).join('\n');
    const blob = new Blob([`${header}\n${body}`], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `radar-${dimension}.csv`;
    a.click();
  }

  return (
    <div className="relative min-h-screen pb-20 pt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/radar" className="text-cyan-400 text-sm hover:underline mb-8 inline-block">
          Back to Dashboard
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Data Explorer</h1>
        <p className="text-white/50 mb-10 max-w-3xl">Pivot and visualize the raw aggregated datasets. Filter by dimension, sort by any column, and export.</p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Controls Sidebar */}
          <div className="lg:w-64 shrink-0 space-y-6">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-4">
              <h3 className="font-semibold text-white/80 text-sm">Dimension</h3>
              <div className="space-y-1">
                {DIMENSIONS.map(d => (
                  <button
                    key={d.key}
                    onClick={() => setDimension(d.key)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      dimension === d.key
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                        : 'text-white/50 hover:text-white/70 hover:bg-white/[0.04]'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            {data && (
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2 text-xs text-white/40">
                <div className="flex justify-between"><span>Repos in aggregate</span><span className="text-white/60">{data.quality?.included_in_aggregates?.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Computed</span><span className="text-white/60">{data.computed_at?.split('T')[0]}</span></div>
                <div className="flex justify-between"><span>Confidence</span><span className="text-emerald-400 uppercase">{data.quality?.coverage_confidence}</span></div>
              </div>
            )}
          </div>

          {/* Table Area */}
          <div className="flex-1 space-y-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              {!data ? (
                <div className="h-96 flex items-center justify-center text-white/30 text-sm">Loading data...</div>
              ) : rows.length === 0 ? (
                <div className="h-96 flex items-center justify-center text-white/30 text-sm">No data for this dimension</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b border-white/[0.06]">
                        {columns.map(col => (
                          <th
                            key={col.key}
                            onClick={() => setSortBy(col.key)}
                            className={`px-4 py-3 font-medium cursor-pointer transition-colors ${
                              sortBy === col.key ? 'text-cyan-300' : 'text-white/40 hover:text-white/60'
                            } ${col.type !== 'string' ? 'text-right' : ''}`}
                          >
                            {col.label} {sortBy === col.key && '↓'}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                          {columns.map(col => (
                            <td key={col.key} className={`px-4 py-3 ${col.type !== 'string' ? 'text-right font-mono' : 'text-white/80 capitalize'}`}>
                              {col.type === 'trend' ? (
                                <span className={row[col.key] > 0 ? 'text-emerald-400' : row[col.key] < 0 ? 'text-red-400' : 'text-white/30'}>
                                  {row[col.key] > 0 ? '+' : ''}{row[col.key]}%
                                </span>
                              ) : col.type === 'percent' ? (
                                <span className="text-white/70">{row[col.key]}%</span>
                              ) : col.type === 'number' ? (
                                <span className="text-white/60">{(row[col.key] || 0).toLocaleString()}</span>
                              ) : (
                                row[col.key]
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/30">{rows.length} rows</span>
              <div className="flex gap-3">
                <button onClick={exportCSV} className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] transition rounded-lg text-sm font-medium border border-white/[0.08]">
                  Export CSV
                </button>
                <button onClick={exportJSON} className="px-4 py-2 bg-cyan-600/80 hover:bg-cyan-500 transition rounded-lg text-sm font-medium">
                  Export JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
