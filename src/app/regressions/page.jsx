import Link from 'next/link';

export const metadata = {
  title: 'AI Regression Database | Korext Open Source',
  description: 'The public corpus of code patterns that AI coding tools consistently generate incorrectly. Scan your repo, track patterns over time, test reproduction rates automatically.'
};

const categoryLinks = ['security', 'correctness', 'performance', 'hallucination', 'compliance', 'maintainability'];
const severityLinks = ['critical', 'high', 'medium', 'low', 'informational'];
const languageLinks = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C#', 'C++', 'Ruby', 'PHP', 'Swift', 'Kotlin'];
const toolLinks = [
  'GitHub Copilot', 'Cursor', 'Claude Code', 'Windsurf', 'Codeium',
  'Aider', 'Devin', 'OpenHands', 'Tabnine', 'Amazon Q',
  'Codex CLI', 'Google Code Assist', 'JetBrains AI', 'Sourcegraph Cody',
  'Replit AI', 'Cline', 'Continue', 'Sweep', 'GPT Engineer', 'Lovable',
  'Bolt', 'v0'
];
const patternLinks = ['injection', 'authentication', 'authorization', 'cryptography', 'data-exposure', 'resource', 'logic', 'api-fabrication', 'library-fabrication', 'documentation-fabrication', 'type-confusion', 'async-race', 'null-handling', 'edge-case', 'error-handling', 'outdated-pattern', 'over-engineering', 'under-engineering', 'accessibility', 'i18n', 'locale'];

export default function RegressionsLanding() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-8 border border-purple-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Database Live
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            AI Regression <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Database</span>
          </h1>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            The public corpus of patterns that AI coding tools consistently generate incorrectly. Not an academic benchmark, but real-world developer pitfalls.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/regressions/submit" className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg shadow-purple-500/10 border border-purple-500/40">
              Document a Pattern
            </Link>
            <Link href="/regressions/browse" className="px-8 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold transition-all border border-white/[0.06]">
              Browse Database
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/[0.06] bg-white/[0.01]">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-sm text-white/40 mt-1">patterns documented</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">22</div>
              <div className="text-sm text-white/40 mt-1">AI tools tracked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-sm text-white/40 mt-1">vendor fixes released</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Proactive Pattern Prevention</h2>
          <p className="text-lg text-white/50 leading-relaxed mb-8">
            Academic benchmarks measure AI tools on curated test sets. Incident databases catalog production outcomes. But nobody was documenting the repeatable patterns that AI tools reliably get wrong in normal developer workflows. <strong className="text-white/70">Until now.</strong>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            <div className="bg-[#0d0e1a] p-10 space-y-4">
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex justify-center items-center text-purple-400 mb-4 font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold text-white">Report</h3>
              <p className="text-white/40 leading-relaxed">
                Observed an AI tool reliably producing incorrect code? Document it. Anonymous submissions welcome.
              </p>
            </div>
            <div className="bg-[#0d0e1a] p-10 space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex justify-center items-center text-blue-400 mb-4 font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold text-white">Detect</h3>
              <p className="text-white/40 leading-relaxed">
                Scan your repos for known patterns. Get alerted when new patterns match your code through GitHub Actions.
              </p>
            </div>
            <div className="bg-[#0d0e1a] p-10 space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex justify-center items-center text-emerald-400 mb-4 font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold text-white">Track</h3>
              <p className="text-white/40 leading-relaxed">
                Watch as AI tool vendors acknowledge and fix patterns from the test harness. Measure continuous vendor improvement over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Database Highlights */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Latest Patterns</h2>
              <div className="p-10 bg-white/[0.02] border border-white/[0.06] rounded-xl text-center">
                <p className="text-white/40 mb-3">No regressions published yet.</p>
                <Link href="/regressions/submit" className="text-purple-400 hover:text-purple-300 font-medium">Be the first to document →</Link>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Recently Fixed by Vendors</h2>
              <div className="p-10 bg-white/[0.02] border border-white/[0.06] rounded-xl text-center">
                <p className="text-white/40 mb-3">Test harness pending automated runs against models.</p>
                <Link href="/regressions/vendor" className="text-emerald-400 hover:text-emerald-300 font-medium">Vendor Portal →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse By */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">
          <h2 className="text-2xl font-bold text-white">Browse By</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">By category</h3>
              <div className="flex flex-wrap gap-2">
                {categoryLinks.map(c => (
                  <Link key={c} href={`/regressions/browse?category=${c}`} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-white/60 border border-white/[0.08] hover:bg-white/[0.08] transition-colors">{c}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">By severity</h3>
              <div className="flex flex-wrap gap-2">
                {severityLinks.map(s => (
                  <Link key={s} href={`/regressions/browse?severity=${s}`} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    s === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20' :
                    s === 'high' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20' :
                    s === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20' :
                    'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20'
                  }`}>{s}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">By language</h3>
              <div className="flex flex-wrap gap-2">
                {languageLinks.map(l => (
                  <Link key={l} href={`/regressions/browse?language=${l.toLowerCase()}`} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-white/60 border border-white/[0.08] hover:bg-white/[0.08] transition-colors">{l}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">By tool</h3>
              <div className="flex flex-wrap gap-2">
                {toolLinks.map(t => (
                  <Link key={t} href={`/regressions/browse?tool=${t.toLowerCase()}`} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-white/60 border border-white/[0.08] hover:bg-white/[0.08] transition-colors">{t}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">By pattern</h3>
              <div className="flex flex-wrap gap-2">
                {patternLinks.map(p => (
                  <Link key={p} href={`/regressions/browse?pattern=${p}`} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-white/60 border border-white/[0.08] hover:bg-white/[0.08] transition-colors">{p}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ethical Commitments & Sub/Vendor */}
      <section className="py-20 border-b border-white/[0.06] bg-white/[0.01]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-white">Connect and Integrate</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Incorporate ARD feeds into your CI or track them in your security channels. Vendors can track their tool's patterns directly via the vendor portal.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/regressions/feed.xml" className="px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 text-sm font-medium transition-colors border border-orange-500/20">RSS Feed</a>
                <a href="/regressions/vendor" className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-sm font-medium transition-colors border border-emerald-500/20">Vendor Portal</a>
                <a href="/api/regressions/export" className="px-4 py-2 rounded-lg bg-white/[0.04] text-white/60 hover:bg-white/[0.08] text-sm font-medium transition-colors border border-white/[0.08]">JSON Export</a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Ethical Commitments</h3>
              <ul className="space-y-3 text-sm text-white/50">
                <li className="flex gap-3"><span className="text-purple-400">✓</span> No AI tool shaming. Neutral infrastructure.</li>
                <li className="flex gap-3"><span className="text-purple-400">✓</span> Reproducibility over anecdotes.</li>
                <li className="flex gap-3"><span className="text-purple-400">✓</span> Version awareness. We track improvements.</li>
                <li className="flex gap-3"><span className="text-purple-400">✓</span> No adversarial use. Defensive only.</li>
                <li className="flex gap-3"><span className="text-purple-400">✓</span> Seven day vendor notification before publish.</li>
                <li className="flex gap-3"><span className="text-purple-400">✓</span> Publicly recognize vendor improvements.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
