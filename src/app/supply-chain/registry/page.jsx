import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Registry Browser: AI Provenance Data for Open Source Packages',
  description: 'Browse AI provenance attestations for open source packages across npm, PyPI, Cargo, Go, RubyGems, Maven, NuGet, Composer, Swift PM, CocoaPods, Pub, Hex, CPAN, and Conda.',
  path: '/supply-chain/registry',
  tags: ['attestation registry', 'AI provenance', 'package registry', 'supply chain'],
});

export default function RegistryBrowserPage() {
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

  return (
    <div className="py-12 md:py-20">
      <JsonLd data={breadcrumbSchema([
        { name: 'Korext Open Source', url: 'https://oss.korext.com' },
        { name: 'Supply Chain Attestation', url: 'https://oss.korext.com/supply-chain' },
        { name: 'Registry', url: 'https://oss.korext.com/supply-chain/registry' },
      ])} />

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

        {/* Ecosystem filters */}
        <div className="flex flex-wrap gap-2">
          {ecosystems.map(e => (
            <button key={e} className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-all capitalize">
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

        {/* CTA */}
        <div className="text-center space-y-4 pt-8">
          <p className="text-white/30 text-sm">Search coming soon. For now, query any package directly:</p>
          <code className="inline-block px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-mono text-white/60 select-all">
            npx @korext/supply-check registry npm:lodash
          </code>
        </div>
      </div>
    </div>
  );
}
