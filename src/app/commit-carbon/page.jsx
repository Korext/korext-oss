import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { JsonLd, softwareApplicationSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Commit Carbon: AI Coding Emissions at Commit Level',
  description: 'The open standard for measuring AI assisted commit carbon emissions. CSRD, SEC, and CDP compatible disclosure reporting. Free, auditable, CC0 methodology.',
  path: '/commit-carbon',
  tags: ['carbon emissions', 'AI coding', 'sustainability', 'ESG', 'CSRD', 'SEC', 'CDP', 'GHG Protocol'],
});

const frameworks = [
  { name: 'CSRD', geo: 'EU', desc: 'Corporate Sustainability Reporting Directive' },
  { name: 'SEC Climate Rules', geo: 'US', desc: 'Securities and Exchange Commission' },
  { name: 'California SB 253', geo: 'US (CA)', desc: 'Climate Corporate Data Accountability Act' },
  { name: 'CDP', geo: 'Global', desc: 'Carbon Disclosure Project' },
  { name: 'GHG Protocol', geo: 'Global', desc: 'Scope 3, Category 1' },
  { name: 'SBTi', geo: 'Global', desc: 'Science Based Targets initiative' },
];

const features = [
  {
    title: 'Measure',
    desc: 'Calculate emissions from any repository with ai-attestation data. Regional grid intensity. Ranged estimates with uncertainty. Per commit granularity.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: 'Report',
    desc: 'Generate CSRD, SEC, CDP, and GHG Protocol compatible disclosure documents. Auditable methodology. Every number sourced.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: 'Reduce',
    desc: 'Track emissions over time. Set reduction targets. Measure the impact of optimization. CI integration for trend monitoring.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
      </svg>
    ),
  },
];

export default function CommitCarbonPage() {
  return (
    <div className="relative">
      <JsonLd data={softwareApplicationSchema({
        name: 'Commit Carbon',
        description: 'The open standard for measuring AI assisted commit carbon emissions. CSRD, SEC, and CDP compatible.',
        url: 'https://oss.korext.com/commit-carbon',
        downloadUrl: 'https://www.npmjs.com/package/@korext/commit-carbon',
        version: '1.0.3',
        license: 'https://opensource.org/licenses/Apache-2.0',
        applicationCategory: 'DeveloperApplication',
      })} />
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-xs font-medium text-green-400 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Open Standard for AI Coding Emissions
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08]">
            <span className="text-white">Commit</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Carbon</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
            The open standard for measuring AI assisted commit carbon emissions.
            CSRD, SEC, and CDP compatible. Free, auditable, CC0 methodology.
          </p>

          {/* Key Number */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-green-500/20 bg-green-500/5">
            <span className="text-2xl sm:text-3xl font-bold text-green-400">~33g</span>
            <span className="text-sm text-white/50 text-left">CO2e per AI assisted commit<br />(US grid average, central estimate)</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/commit-carbon/calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-green-500 text-black font-semibold text-sm sm:text-base hover:bg-green-400 transition-colors"
            >
              Try the Calculator
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href="https://github.com/korext/commit-carbon"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-white/10 text-white/80 font-medium text-sm sm:text-base hover:bg-white/[0.04] transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Start</h2>
            <pre className="bg-black/40 rounded-lg p-4 text-sm sm:text-base text-green-400 overflow-x-auto">
              <code>{`# Get your AI attestation first
npx @korext/ai-attestation init

# Calculate carbon emissions
npx @korext/commit-carbon scan

# Generate CSRD disclosure
npx @korext/commit-carbon report --format csrd`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-red-400 mb-3">The Problem</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Regulations now require companies to disclose emissions from digital operations. AI coding tools are part of those operations.
                But nobody measures it at the code level. Companies either ignore it, guess, or rely on vendor published aggregates that auditors cannot verify.
              </p>
            </div>
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-green-400 mb-3">The Solution</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Commit Carbon provides the first standardized, auditable, reproducible methodology for calculating AI coding emissions at commit granularity.
                Open methodology. Conservative bias. Ranged estimates. No greenwashing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Features */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-12">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Compatibility */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4">Regulatory Compatibility</h2>
          <p className="text-center text-white/50 mb-12 max-w-2xl mx-auto">
            Generate disclosure documents compatible with major sustainability reporting frameworks.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {frameworks.map((fw) => (
              <div key={fw.name} className="rounded-lg border border-green-500/10 bg-green-500/5 p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <div>
                  <div className="text-sm font-semibold text-white">{fw.name}</div>
                  <div className="text-xs text-white/40">{fw.geo} · {fw.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Transparent Methodology</h2>
          <p className="text-white/50 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Every number is documented. Every calculation is reproducible.
            Every assumption is cited. CC0 1.0 licensed (public domain) so
            regulators, auditors, and tool vendors can adopt without friction.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/commit-carbon/methodology"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-green-500/20 text-green-400 font-medium text-sm hover:bg-green-500/10 transition-colors"
            >
              Read the Methodology
            </Link>
            <Link
              href="/commit-carbon/reports"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-white/70 font-medium text-sm hover:bg-white/[0.04] transition-colors"
            >
              Report Templates
            </Link>
          </div>
        </div>
      </section>

      {/* For Sustainability Teams */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6 sm:p-10 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">For Sustainability Teams</h2>
            <p className="text-white/50 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Working on your CSRD or SEC Climate disclosure? Commit Carbon provides
              the data you need for AI coding emissions. Free to use. CC0 methodology. Audit ready reports.
            </p>
            <Link
              href="/commit-carbon/calculator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-black font-semibold text-sm hover:bg-green-400 transition-colors"
            >
              Calculate Your Emissions
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Get Started</h2>
          <pre className="inline-block bg-black/40 rounded-lg px-6 py-3 text-sm sm:text-base text-green-400">
            <code>npx @korext/commit-carbon scan</code>
          </pre>
          <p className="text-white/40 text-sm">
            Questions? <a href="mailto:maintainers@korext.com" className="text-green-400 hover:text-green-300">maintainers@korext.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
