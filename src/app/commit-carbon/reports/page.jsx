import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Commit Carbon Report Templates',
  description: 'CSRD, SEC, CDP, and GHG Protocol compatible disclosure report templates for AI coding emissions.',
  path: '/commit-carbon/reports',
  tags: ['CSRD', 'SEC', 'CDP', 'GHG Protocol', 'disclosure', 'report templates'],
});

const templates = [
  {
    id: 'csrd',
    name: 'CSRD Disclosure',
    framework: 'EU Corporate Sustainability Reporting Directive',
    geo: 'European Union',
    desc: 'Topic E1 (Climate Change) disclosure fragment for Scope 3 purchased services. Includes AI coding tool emissions with ranged estimates, methodology citation, and uncertainty documentation.',
    cmd: 'npx @korext/commit-carbon report --format csrd',
    color: 'blue',
  },
  {
    id: 'sec',
    name: 'SEC Climate Rules',
    framework: 'Securities and Exchange Commission',
    geo: 'United States',
    desc: 'Other indirect emissions from operations disclosure. Includes central estimate with range, methodology reference, and conservative bias documentation.',
    cmd: 'npx @korext/commit-carbon report --format sec',
    color: 'violet',
  },
  {
    id: 'cdp',
    name: 'CDP Response',
    framework: 'Carbon Disclosure Project',
    geo: 'Global',
    desc: 'C6.5 Scope 3 emissions response fragment. Category 1 (Purchased Goods and Services) with activity data, emission factor source, and calculation approach.',
    cmd: 'npx @korext/commit-carbon report --format cdp',
    color: 'emerald',
  },
  {
    id: 'ghg',
    name: 'GHG Protocol',
    framework: 'Greenhouse Gas Protocol',
    geo: 'Global',
    desc: 'Scope 3 Category 1 accounting fragment. Average-data method using academic inference estimates. Includes emissions in both kg and tCO2e.',
    cmd: 'npx @korext/commit-carbon report --format ghg',
    color: 'cyan',
  },
  {
    id: 'markdown',
    name: 'Internal Report',
    framework: 'Markdown format',
    geo: 'Universal',
    desc: 'Human readable report suitable for inclusion in internal sustainability reports, board briefings, or ESG documentation. Full breakdown with tables.',
    cmd: 'npx @korext/commit-carbon report --format markdown',
    color: 'white',
  },
  {
    id: 'json',
    name: 'Machine Readable',
    framework: 'JSON format',
    geo: 'Universal',
    desc: 'Structured JSON output for integration with ESG reporting platforms (Workiva, Watershed, Persefoni, Normative, Sweep) and internal data pipelines.',
    cmd: 'npx @korext/commit-carbon report --format json',
    color: 'green',
  },
];

const colorAccent = {
  blue: 'border-blue-500/20 bg-blue-500/5',
  violet: 'border-violet-500/20 bg-violet-500/5',
  emerald: 'border-emerald-500/20 bg-emerald-500/5',
  cyan: 'border-cyan-500/20 bg-cyan-500/5',
  white: 'border-white/10 bg-white/[0.03]',
  green: 'border-green-500/20 bg-green-500/5',
};

const colorText = {
  blue: 'text-blue-400',
  violet: 'text-violet-400',
  emerald: 'text-emerald-400',
  cyan: 'text-cyan-400',
  white: 'text-white/80',
  green: 'text-green-400',
};

export default function ReportsPage() {
  return (
    <div className="relative">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24">
        <nav className="flex items-center gap-2 text-xs text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Korext Open Source</Link>
          <span>/</span>
          <Link href="/commit-carbon" className="hover:text-white/70 transition-colors">Commit Carbon</Link>
          <span>/</span>
          <span className="text-white/70">Reports</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="pt-8 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Report <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Templates</span>
          </h1>
          <p className="text-white/50 text-sm sm:text-base max-w-2xl">
            Generate disclosure documents compatible with major sustainability reporting frameworks.
            Each report includes methodology citation, assumptions documentation, and uncertainty disclosure.
          </p>
        </div>
      </section>

      {/* Templates */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-6">
          {templates.map((t) => (
            <div key={t.id} className={`rounded-xl border ${colorAccent[t.color]} p-6 sm:p-8`}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h2 className={`text-lg font-semibold ${colorText[t.color]}`}>{t.name}</h2>
                  <div className="text-xs text-white/40 mt-1">{t.framework} · {t.geo}</div>
                </div>
                <span className="px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-medium shrink-0">
                  --format {t.id}
                </span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-4">{t.desc}</p>
              <pre className="bg-black/30 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-green-400 overflow-x-auto break-all">
                <code>{t.cmd}</code>
              </pre>
            </div>
          ))}

          {/* For Auditors */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 text-center mt-12">
            <h3 className="text-lg font-semibold text-white mb-2">For Auditors</h3>
            <p className="text-white/50 text-sm mb-4 max-w-xl mx-auto">
              The methodology is fully documented. Every calculation can be reproduced from inputs.
              See the audit guide for verification procedures.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/commit-carbon/methodology"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/10 transition-colors"
              >
                Methodology
              </Link>
              <a
                href="https://github.com/korext/commit-carbon/blob/main/AUDIT_GUIDE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-white/70 text-sm font-medium hover:bg-white/[0.04] transition-colors"
              >
                Audit Guide
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
