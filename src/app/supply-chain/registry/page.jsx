'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ecosystems = ['npm', 'pypi', 'cargo', 'go', 'rubygems', 'maven', 'nuget', 'composer', 'swift', 'cocoapods', 'pub', 'hex', 'cpan', 'conda'];

const examplePackages = [
  { ecosystem: 'npm', name: 'lodash', version: '4.17.21' },
  { ecosystem: 'npm', name: 'react', version: '19.1.0' },
  { ecosystem: 'npm', name: 'express', version: '5.1.0' },
  { ecosystem: 'pypi', name: 'requests', version: '2.32.3' },
  { ecosystem: 'cargo', name: 'serde', version: '1.0.219' },
  { ecosystem: 'go', name: 'github.com/gin-gonic/gin', version: 'v1.10.0' },
  { ecosystem: 'rubygems', name: 'rails', version: '8.0.2' },
  { ecosystem: 'maven', name: 'com.google.guava/guava', version: '33.4.0' },
];

export default function RegistryBrowserPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEcosystem, setSelectedEcosystem] = useState('npm');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    setError('');
    setSearchResult(null);

    try {
      const res = await fetch(`/api/registry/${selectedEcosystem}/${searchQuery.trim()}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResult(data);
      } else {
        setError('Package not found in registry.');
      }
    } catch {
      setError('Failed to query registry. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const goToPackage = () => {
    if (searchQuery.trim()) {
      router.push(`/supply-chain/registry/${selectedEcosystem}/${searchQuery.trim()}`);
    }
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-6 space-y-12 max-w-5xl">

        {/* Breadcrumb */}
        <nav className="text-sm text-white/30">
          <Link href="/" className="hover:text-white/60 transition-colors">Korext Open Source</Link>
          <span className="mx-2">/</span>
          <Link href="/supply-chain" className="hover:text-white/60 transition-colors">Supply Chain</Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">Registry</span>
        </nav>

        {/* Header */}
        <div className="space-y-4 -mt-4">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Package Registry</h1>
          <p className="text-lg text-white/40">Browse AI provenance data for open source packages across fourteen ecosystems.</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-3">
            <select
              value={selectedEcosystem}
              onChange={(e) => setSelectedEcosystem(e.target.value)}
              className="px-4 py-3 rounded-xl bg-[#0d0e1a] border border-white/[0.08] text-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm font-mono"
            >
              {ecosystems.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Package name (e.g. lodash, @korext/ai-attestation)"
              className="flex-1 px-4 py-3 bg-[#0d0e1a] border border-white/[0.08] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
            <button
              type="submit"
              disabled={searching}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-all disabled:opacity-50"
            >
              {searching ? 'Searching...' : 'Look Up'}
            </button>
          </div>
        </form>

        {/* Search Result */}
        {error && (
          <div className="p-4 border border-red-500/20 bg-red-500/5 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        {searchResult && (
          <div className="p-6 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium uppercase">
                  {searchResult.ecosystem}
                </span>
                <span className="text-white font-semibold text-lg">{searchResult.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{searchResult.ai_percentage}%</div>
                  <div className="text-xs text-white/30 uppercase">AI Assisted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{searchResult.governance_tier}</div>
                  <div className="text-xs text-white/30 uppercase">Governance</div>
                </div>
              </div>
            </div>
            <button
              onClick={goToPackage}
              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/60 hover:text-white hover:bg-white/[0.08] transition-all text-sm"
            >
              View full attestation details →
            </button>
          </div>
        )}

        {/* Ecosystem filters */}
        <div className="flex flex-wrap gap-2">
          {ecosystems.map(e => (
            <button
              key={e}
              onClick={() => setSelectedEcosystem(e)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all capitalize ${
                selectedEcosystem === e
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-white/[0.08] bg-white/[0.03] text-white/50 hover:text-white/80 hover:bg-white/[0.06]'
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        {/* Example packages */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">Popular Packages</h2>
          <div className="space-y-2">
            {examplePackages.map(pkg => (
              <Link
                key={`${pkg.ecosystem}/${pkg.name}`}
                href={`/supply-chain/registry/${pkg.ecosystem}/${pkg.name}`}
                className="flex items-center justify-between p-4 border border-white/[0.06] bg-white/[0.02] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.10] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium uppercase">
                    {pkg.ecosystem}
                  </span>
                  <span className="text-white font-medium group-hover:text-white/95 transition-colors">{pkg.name}</span>
                  <span className="text-white/30 text-sm">{pkg.version}</span>
                </div>
                <span className="text-white/30 group-hover:text-white/60 transition-colors text-sm">
                  View <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* API CTA */}
        <div className="text-center space-y-4 pt-8">
          <p className="text-white/30 text-sm">Or query programmatically:</p>
          <code className="inline-block px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-mono text-white/60 select-all">
            npx @korext/supply-check registry npm:lodash
          </code>
        </div>
      </div>
    </div>
  );
}
