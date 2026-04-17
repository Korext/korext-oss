import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }) {
  const { ecosystem, name } = await params;
  const pkgName = name.join('/');
  return buildMetadata({
    title: `${pkgName} (${ecosystem}) | Supply Chain Attestation`,
    description: `AI provenance data for ${pkgName} on ${ecosystem}. View attestation details, governance tier, and export as CycloneDX or SPDX.`,
    path: `/supply-chain/registry/${ecosystem}/${pkgName}`,
    tags: ['attestation', ecosystem, pkgName, 'AI provenance'],
  });
}

async function fetchAttestationData(ecosystem, pkgName) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://oss.korext.com';
    const res = await fetch(`${baseUrl}/api/registry/${ecosystem}/${pkgName}`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall through to defaults
  }
  return { ecosystem, name: pkgName, ai_percentage: 0, governance_tier: 'NONE', tools: [] };
}

function tierBadgeColor(tier) {
  switch (tier) {
    case 'FULL': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'GOVERNED': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'MODERATE': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    case 'MINIMAL': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    default: return 'bg-white/[0.04] text-white/50 border-white/[0.08]';
  }
}

export default async function PackageDetailsPage({ params }) {
  const { ecosystem, name } = await params;
  const pkgName = name.join('/');
  const data = await fetchAttestationData(ecosystem, pkgName);

  const pct = typeof data.ai_percentage === 'number' ? data.ai_percentage : 0;
  const tier = data.governance_tier || 'NONE';
  const tools = data.tools || [];

  return (
    <div className="py-12 md:py-20">
      <JsonLd data={breadcrumbSchema([
        { name: 'Korext Open Source', url: 'https://oss.korext.com' },
        { name: 'Supply Chain', url: 'https://oss.korext.com/supply-chain' },
        { name: 'Registry', url: 'https://oss.korext.com/supply-chain/registry' },
        { name: pkgName, url: `https://oss.korext.com/supply-chain/registry/${ecosystem}/${pkgName}` },
      ])} />

      <div className="container mx-auto px-6 space-y-12 max-w-5xl">

        {/* Breadcrumb */}
        <nav className="text-sm text-white/30">
          <Link href="/" className="hover:text-white/60 transition-colors">Korext Open Source</Link>
          <span className="mx-2">/</span>
          <Link href="/supply-chain" className="hover:text-white/60 transition-colors">Supply Chain</Link>
          <span className="mx-2">/</span>
          <Link href="/supply-chain/registry" className="hover:text-white/60 transition-colors">Registry</Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">{pkgName}</span>
        </nav>

        {/* Package header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 -mt-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 uppercase">
              {ecosystem}
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">{pkgName}</h1>
          </div>

          <div className="flex gap-4">
            <div className="px-6 py-4 border border-white/[0.06] bg-white/[0.02] rounded-xl text-center">
              <div className="text-3xl font-bold text-white">{pct}%</div>
              <div className="text-xs text-white/30 uppercase tracking-wide mt-1">AI Assisted</div>
            </div>
            <div className={`px-6 py-4 border rounded-xl text-center ${tierBadgeColor(tier)}`}>
              <div className="text-3xl font-bold">{tier}</div>
              <div className="text-xs opacity-60 uppercase tracking-wide mt-1">Governance</div>
            </div>
          </div>
        </div>

        {/* Tools section */}
        {tools.length > 0 && (
          <div className="p-6 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">AI Tools Detected</h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white/70">
                  {typeof tool === 'string' ? tool : tool.name || tool.id}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-5">
            <h3 className="text-xl font-semibold text-white">Export SBOM</h3>
            <p className="text-white/40 text-[15px] leading-relaxed">
              Download this package&apos;s attestation data as a CycloneDX 1.6 or SPDX 2.3 fragment with AI properties embedded.
            </p>
            <div className="flex gap-3">
              <a
                href={`/api/supply-chain/sbom/${ecosystem}/${pkgName}?format=cyclonedx`}
                className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                CycloneDX 1.6
              </a>
              <a
                href={`/api/supply-chain/sbom/${ecosystem}/${pkgName}?format=spdx`}
                className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                SPDX 2.3
              </a>
            </div>
          </div>

          <div className="p-8 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-5">
            <h3 className="text-xl font-semibold text-white">Embed Badge</h3>
            <p className="text-white/40 text-[15px] leading-relaxed">
              Add an AI attestation badge to your README.
            </p>
            <div className="space-y-3">
              <div className="border border-white/[0.06] rounded-xl p-4 bg-white/[0.02] flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/api/supply-chain/badge/${ecosystem}/${pkgName}`} alt="AI Attestation Badge" />
                <span className="text-sm text-white/30">{ecosystem}/{pkgName}</span>
              </div>
              <code className="block text-xs font-mono text-white/40 px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-x-auto select-all">
                {`[![AI Attestation](https://oss.korext.com/api/supply-chain/badge/${ecosystem}/${pkgName})](https://oss.korext.com/supply-chain/registry/${ecosystem}/${pkgName})`}
              </code>
            </div>
          </div>
        </div>

        {/* API endpoint */}
        <div className="p-6 border border-white/[0.06] bg-white/[0.02] rounded-xl space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">API Endpoint</h3>
          <code className="block text-sm font-mono text-white/60 select-all">
            GET https://oss.korext.com/api/registry/{ecosystem}/{pkgName}
          </code>
        </div>

      </div>
    </div>
  );
}
