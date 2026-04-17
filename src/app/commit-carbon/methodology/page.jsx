import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Commit Carbon Methodology v1.0',
  description: 'The complete methodology for calculating AI assisted commit carbon emissions. CC0 1.0 licensed (public domain). Token-based estimation with conservative bias.',
  path: '/commit-carbon/methodology',
  tags: ['methodology', 'carbon emissions', 'AI coding', 'sustainability'],
});

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    content: `Commit Carbon estimates the carbon emissions associated with AI assisted software commits. The estimation combines AI tool usage data (from ai-attestation), token generation energy estimates (from the emissions factor database), grid carbon intensity (regional and temporal where available), and conservative bias with uncertainty ranges.`,
  },
  {
    id: 'formula',
    title: 'Calculation Formula',
    content: null,
    code: `commit_emissions_gco2e =
  estimated_tokens_per_commit /
  1000 *
  energy_per_1k_tokens_watt_seconds /
  3600 *
  grid_intensity_gco2e_per_kwh`,
    after: `Where estimated_tokens_per_commit defaults to 2500, scaled by commit size (lines changed * 40, minimum 2500). Agent tools apply a 3x multiplier. Energy per 1k tokens is tool-specific from the factor database. Grid intensity is region-specific from IEA annual averages (or real-time if configured).`,
  },
  {
    id: 'tokens',
    title: 'Token Estimation',
    content: `The default of 2500 tokens per commit accounts for: multiple code completions (some accepted, some rejected, all consuming inference energy), chat interactions for debugging and planning, context window tokens consumed in prompt construction, and conservative bias erring toward higher count. For commits with more lines changed, tokens scale proportionally. Agent tools (Claude Code, Devin, OpenHands, Cline, GPT Engineer, Bolt) apply a 3x multiplier reflecting sustained multi-turn inference sessions. This is the most uncertain input in the calculation. We document it openly and invite refinement.`,
  },
  {
    id: 'ranges',
    title: 'Ranged Estimates',
    content: `Every emission estimate produces three values: Low (optimistic, using low energy factors and clean grid assumptions), Central (most likely, using central factors and representative grid data), and High (pessimistic, using high energy factors and dirty grid assumptions). The ratio between high and low is typically 4x, reflecting genuine uncertainty. This ratio is documented and justified.`,
  },
  {
    id: 'uncertainty',
    title: 'Uncertainty Treatment',
    content: `Sources of uncertainty: (1) Energy per token: AI tool vendors do not publish per-request energy data. We estimate from inference energy research on models of similar capability. (2) Grid intensity: hourly data available only for some regions. Annual averages used as fallback. (3) Tokens per commit: actual count is private to AI tool vendors. We use conservative estimates. (4) Regional attribution: which grid powers the AI tool inference is usually the vendor's data center, not the developer's location. We apply conservative bias at each step.`,
  },
  {
    id: 'scope',
    title: 'Scope Alignment',
    content: `Emissions fall under: GHG Protocol Scope 3 Category 1 (Purchased Goods and Services), CSRD Topic E1 (Climate Change, emissions from supply chain purchased services), and SEC proposed rule category "other indirect emissions from operations."`,
  },
  {
    id: 'sources',
    title: 'Data Sources',
    content: `Primary sources: IEA Emissions Factors 2024 (annual grid intensity by country), EPA eGRID 2022 (US subnational), Electricity Maps API (real-time global, optional), WattTime API (real-time marginal emissions, optional), Luccioni et al. 2023 "Power Hungry Processing" (inference energy baselines), Patterson et al. 2021 "Carbon Emissions and Large Neural Network Training."`,
  },
  {
    id: 'limitations',
    title: 'Known Limitations',
    content: `(1) Does not measure training emissions (one time, amortized). (2) Does not measure water consumption (planned v2.0). (3) Does not measure embodied emissions of data center hardware. (4) Grid data availability varies by region. (5) Vendor telemetry not available; must estimate token counts. (6) Annual grid averages smooth real-time variations. Companies using this methodology should document these limitations in their sustainability reports.`,
  },
];

export default function MethodologyPage() {
  return (
    <div className="relative">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24">
        <nav className="flex items-center gap-2 text-xs text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Korext Open Source</Link>
          <span>/</span>
          <Link href="/commit-carbon" className="hover:text-white/70 transition-colors">Commit Carbon</Link>
          <span>/</span>
          <span className="text-white/70">Methodology</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="pt-8 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">Methodology</h1>
            <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">v1.0</span>
          </div>
          <p className="text-white/50 text-sm sm:text-base max-w-2xl">
            Released under CC0 1.0 Universal (public domain). Every number is documented.
            Every calculation is reproducible. Every assumption is cited.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-white/80 mb-3">Contents</h2>
            <ol className="space-y-1.5">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm text-green-400/80 hover:text-green-300 transition-colors">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-12">
          {sections.map((s, i) => (
            <div key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                <span className="text-green-400/60 mr-2">{i + 1}.</span>
                {s.title}
              </h2>
              {s.code && (
                <pre className="bg-black/40 rounded-lg p-4 mb-4 text-sm text-green-400 overflow-x-auto border border-white/[0.06]">
                  <code>{s.code}</code>
                </pre>
              )}
              {s.content && (
                <p className="text-white/60 text-sm leading-relaxed">{s.content}</p>
              )}
              {s.after && (
                <p className="text-white/60 text-sm leading-relaxed mt-3">{s.after}</p>
              )}
            </div>
          ))}

          {/* Review CTA */}
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6 sm:p-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Open for Peer Review</h3>
            <p className="text-white/50 text-sm mb-4">
              This methodology is open to review by climate scientists, sustainability professionals, and AI researchers.
            </p>
            <a
              href="https://github.com/korext/commit-carbon/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-500/10 transition-colors"
            >
              Submit Feedback on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
