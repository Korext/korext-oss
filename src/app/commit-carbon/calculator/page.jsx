'use client';

import { useState } from 'react';
import Link from 'next/link';

const TOOLS = [
  { id: 'copilot', name: 'GitHub Copilot' },
  { id: 'cursor', name: 'Cursor' },
  { id: 'claude-code', name: 'Claude Code' },
  { id: 'codeium', name: 'Codeium' },
  { id: 'aider', name: 'Aider' },
  { id: 'codex-cli', name: 'OpenAI Codex CLI' },
  { id: 'gemini-code-assist', name: 'Gemini Code Assist' },
  { id: 'windsurf', name: 'Windsurf' },
  { id: 'tabnine', name: 'Tabnine' },
  { id: 'devin', name: 'Devin' },
  { id: 'openhands', name: 'OpenHands' },
  { id: 'amazon-q', name: 'Amazon Q Developer' },
  { id: 'jetbrains-ai', name: 'JetBrains AI Assistant' },
  { id: 'sourcegraph-cody', name: 'Sourcegraph Cody' },
  { id: 'replit-ai', name: 'Replit AI' },
  { id: 'cline', name: 'Cline' },
  { id: 'continue', name: 'Continue' },
  { id: 'gpt-engineer', name: 'GPT Engineer' },
  { id: 'bolt', name: 'Bolt' },
];

const REGIONS = [
  { code: 'US', name: 'United States', intensity: 369 },
  { code: 'EU', name: 'European Union', intensity: 241 },
  { code: 'GB', name: 'United Kingdom', intensity: 195 },
  { code: 'DE', name: 'Germany', intensity: 357 },
  { code: 'FR', name: 'France', intensity: 58 },
  { code: 'JP', name: 'Japan', intensity: 462 },
  { code: 'CN', name: 'China', intensity: 543 },
  { code: 'IN', name: 'India', intensity: 628 },
  { code: 'CA', name: 'Canada', intensity: 120 },
  { code: 'AU', name: 'Australia', intensity: 510 },
  { code: 'BR', name: 'Brazil', intensity: 61 },
  { code: 'SE', name: 'Sweden', intensity: 13 },
  { code: 'NO', name: 'Norway', intensity: 8 },
  { code: 'ZA', name: 'South Africa', intensity: 709 },
  { code: 'PL', name: 'Poland', intensity: 635 },
  { code: 'KR', name: 'South Korea', intensity: 415 },
  { code: 'SG', name: 'Singapore', intensity: 395 },
];

export default function CalculatorPage() {
  const [tool, setTool] = useState('copilot');
  const [commits, setCommits] = useState(500);
  const [region, setRegion] = useState('US');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCalculate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/commit-carbon/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, commits: parseInt(commits, 10), region }),
      });
      if (!res.ok) throw new Error('Calculation failed');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const selectedRegion = REGIONS.find(r => r.code === region) || REGIONS[0];

  return (
    <div className="relative">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24">
        <nav className="flex items-center gap-2 text-xs text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Korext Open Source</Link>
          <span>/</span>
          <Link href="/commit-carbon" className="hover:text-white/70 transition-colors">Commit Carbon</Link>
          <span>/</span>
          <span className="text-white/70">Calculator</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="pt-8 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Emissions <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Calculator</span>
          </h1>
          <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto">
            Calculate the carbon footprint of your AI assisted commits.
            Conservative estimates. Ranged outputs. Audit ready.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-semibold text-white">Inputs</h2>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">AI Tool</label>
                <select
                  id="tool-select"
                  value={tool}
                  onChange={e => setTool(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  {TOOLS.map(t => (
                    <option key={t.id} value={t.id} className="bg-[#0d0e1a] text-white">{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">AI Assisted Commits</label>
                <input
                  id="commits-input"
                  type="number"
                  value={commits}
                  onChange={e => setCommits(e.target.value)}
                  min={1}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">Region</label>
                <select
                  id="region-select"
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  {REGIONS.map(r => (
                    <option key={r.code} value={r.code} className="bg-[#0d0e1a] text-white">
                      {r.name} ({r.intensity} gCO2e/kWh)
                    </option>
                  ))}
                </select>
              </div>

              <button
                id="calculate-button"
                onClick={handleCalculate}
                disabled={loading}
                className="w-full rounded-lg bg-green-500 text-black font-semibold py-3 text-sm hover:bg-green-400 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Calculating...' : 'Calculate Emissions'}
              </button>
            </div>

            {/* Results */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-6">Results</h2>

              {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}

              {!result && !error && (
                <div className="flex flex-col items-center justify-center h-48 text-white/30 text-sm">
                  <svg className="w-12 h-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  </svg>
                  Configure inputs and click Calculate
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  {/* Emissions Table */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-sm text-white/50">Low estimate</span>
                      <span className="text-sm font-mono text-white/70">{result.emissions.total_kgco2e.low} kg CO2e</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-green-500/20 bg-green-500/5 rounded px-3 -mx-3">
                      <span className="text-sm font-medium text-green-400">Central estimate</span>
                      <span className="text-lg font-bold font-mono text-green-400">{result.emissions.total_kgco2e.central} kg CO2e</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-sm text-white/50">High estimate</span>
                      <span className="text-sm font-mono text-white/70">{result.emissions.total_kgco2e.high} kg CO2e</span>
                    </div>
                  </div>

                  {/* Per Commit */}
                  <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-4">
                    <div className="text-xs text-white/40 mb-1">Per AI commit average</div>
                    <div className="text-xl font-bold text-white">{result.emissions.per_commit_gco2e.central} g CO2e</div>
                  </div>

                  {/* Context */}
                  <div className="space-y-2 text-xs text-white/40">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">~{(result.emissions.total_kgco2e.central / 0.404).toFixed(0)}</span> miles driven in average car
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">~{(result.emissions.total_kgco2e.central / 0.00822).toFixed(0)}</span> smartphone charges
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="text-xs text-white/30 space-y-1 pt-2 border-t border-white/[0.06]">
                    <div>Tool: {result.tool_name}</div>
                    <div>Region: {result.region} ({result.grid_intensity_gco2e_per_kwh} gCO2e/kWh)</div>
                    <div>Methodology: {result.methodology}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CLI Equivalent */}
          <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
            <div className="text-xs text-white/40 mb-2">CLI equivalent</div>
            <pre className="text-sm text-green-400 overflow-x-auto break-all">
              <code>{`npx @korext/commit-carbon calculate --tool ${tool} --commits ${commits} --region ${region}`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
