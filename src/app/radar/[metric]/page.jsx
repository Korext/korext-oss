import Link from 'next/link';

const METRIC_TITLES = {
  languages: 'Language Breakdown',
  tools: 'Tool Market Share',
  ecosystems: 'Ecosystem Breakdown',
  industries: 'Industry Breakdown',
  regions: 'Regional Breakdown',
  governance: 'Governance Tiers',
  trends: 'Time Series Trends',
};

export async function generateMetadata({ params }) {
  const { metric } = await params;
  const title = METRIC_TITLES[metric] || metric;
  return {
    title: `${title} | AI Code Radar`,
    description: `Detailed ${title.toLowerCase()} data from the AI Code Radar.`,
  };
}

export default async function RadarMetricPage({ params }) {
  const { metric } = await params;
  const title = METRIC_TITLES[metric] || metric.replace(/-/g, ' ');

  return (
    <div className="relative min-h-screen pb-20 pt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/radar" className="text-cyan-400 text-sm hover:underline mb-8 inline-block">
          Back to Dashboard
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 capitalize">{title}</h1>
        <p className="text-white/50 mb-10">Detailed analytical breakdown. Data is live and updates hourly. Every statistic includes sample size and methodology link.</p>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 mb-10">
          <p className="text-sm text-white/40 h-96 flex items-center justify-center border border-white/5 rounded-lg border-dashed">
            Full visualization for {title} will render here once chart.js components are wired to the /api/radar/current?metric={metric} endpoint.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Methodology</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              This statistic requires a minimum sample size of {metric === 'regions' || metric === 'industries' ? '100' : '50'} repositories.
              Repositories in the 99th percentile of commit volume are capped at 1% of the total aggregate to prevent outliers from skewing results.
              All percentages are weighted by total commit count per repository.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Export</h3>
            <div className="flex gap-4">
              <a
                href={`/api/radar/current?metric=${metric}`}
                target="_blank"
                className="px-4 py-2 bg-white/[0.06] rounded-lg hover:bg-white/[0.1] text-sm font-medium transition border border-white/[0.08]"
              >
                Download JSON
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Embed This Chart</h3>
            <code className="block w-full p-4 bg-black/40 rounded-lg text-sm text-cyan-200 font-mono overflow-x-auto">
              {`<iframe src="https://oss.korext.com/radar/embed/${metric}" width="600" height="400" frameborder="0" title="AI Code Radar: ${title}"></iframe>`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
