import Link from 'next/link';

export const metadata = {
  title: 'AI Incident Registry | Korext Open Source',
  description: 'The public registry and open standard for cataloging AI code failures. Learn from every incident. Prevent the next one.'
};

const severityLinks = ['critical', 'high', 'medium', 'low', 'informational'];
const languageLinks = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C#', 'C++', 'Ruby', 'PHP', 'Swift', 'Kotlin'];
const toolLinks = [
  'GitHub Copilot', 'Cursor', 'Claude Code', 'Windsurf', 'Codeium',
  'Aider', 'Devin', 'OpenHands', 'Tabnine', 'Amazon Q',
  'Codex CLI', 'Gemini Code Assist', 'JetBrains AI', 'Sourcegraph Cody',
  'Replit AI', 'Cline', 'Continue', 'Sweep', 'GPT Engineer', 'Lovable',
  'Bolt', 'v0'
];
const patternLinks = ['injection', 'authentication', 'authorization', 'cryptography', 'data-exposure', 'resource', 'logic', 'hallucination', 'performance', 'compliance', 'dependency'];

export default function IncidentsLanding() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-8 border border-violet-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Registry Live
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            AI Incident <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">Registry</span>
          </h1>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            The public registry and open standard for cataloging AI code failures. Learn from every incident. Prevent the next one.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/incidents/submit" className="px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all">
              Report an Incident
            </Link>
            <Link href="/incidents/browse" className="px-8 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold transition-all border border-white/[0.06]">
              Browse Registry
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
              <div className="text-sm text-white/40 mt-1">incidents documented</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">22</div>
              <div className="text-sm text-white/40 mt-1">AI tools tracked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">11</div>
              <div className="text-sm text-white/40 mt-1">pattern types classified</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">The Gap in AI Security</h2>
          <p className="text-lg text-white/50 leading-relaxed mb-8">
            Every production AI code failure happens in private. The SQL injection at one company does not warn the next one. The hallucinated API that shipped at one startup does not save the others. <strong className="text-white/70">Learning never compounds.</strong>
          </p>
          <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
            Until now.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            <div className="bg-[#0d0e1a] p-10 space-y-4">
              <div className="text-4xl text-violet-400 mb-4">1</div>
              <h3 className="text-xl font-semibold text-white">Report</h3>
              <p className="text-white/40 leading-relaxed">
                Anyone can report an AI code incident. Anonymous submissions welcome. Verified before publication.
              </p>
            </div>
            <div className="bg-[#0d0e1a] p-10 space-y-4">
              <div className="text-4xl text-blue-400 mb-4">2</div>
              <h3 className="text-xl font-semibold text-white">Learn</h3>
              <p className="text-white/40 leading-relaxed">
                Every incident maps to detection rules. Copy the pattern. Add the rule. Prevent the incident in your codebase.
              </p>
            </div>
            <div className="bg-[#0d0e1a] p-10 space-y-4">
              <div className="text-4xl text-emerald-400 mb-4">3</div>
              <h3 className="text-xl font-semibold text-white">Prevent</h3>
              <p className="text-white/40 leading-relaxed">
                Subscribe to feeds. Get notified when new incidents affect your stack. Stay ahead of emerging patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Incidents */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-2xl font-bold text-white mb-8">Latest Incidents</h2>
          <div className="p-12 bg-white/[0.02] border border-white/[0.06] rounded-2xl text-center">
            <p className="text-white/40 mb-4">No incidents published yet.</p>
            <Link href="/incidents/submit" className="text-violet-400 hover:text-violet-300 font-medium">Be the first to report →</Link>
          </div>
        </div>
      </section>

      {/* Browse By */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">
          <h2 className="text-2xl font-bold text-white">Browse By</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">By severity</h3>
              <div className="flex flex-wrap gap-2">
                {severityLinks.map(s => (
                  <Link key={s} href={`/incidents/browse?severity=${s}`} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
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
                  <Link key={l} href={`/incidents/browse?language=${l.toLowerCase()}`} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-white/60 border border-white/[0.08] hover:bg-white/[0.08] transition-colors">{l}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">By tool</h3>
              <div className="flex flex-wrap gap-2">
                {toolLinks.map(t => (
                  <Link key={t} href={`/incidents/browse?tool=${t.toLowerCase()}`} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-white/60 border border-white/[0.08] hover:bg-white/[0.08] transition-colors">{t}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">By pattern</h3>
              <div className="flex flex-wrap gap-2">
                {patternLinks.map(p => (
                  <Link key={p} href={`/incidents/browse?pattern=${p}`} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-white/60 border border-white/[0.08] hover:bg-white/[0.08] transition-colors">{p}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe & Integrate + Ethical Commitments */}
      <section className="py-20 border-b border-white/[0.06] bg-white/[0.01]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-white">Subscribe and Integrate</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Connect your security workflow to the registry via standard RSS/Atom feeds or bulk export.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/incidents/feed.xml" className="px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 text-sm font-medium transition-colors border border-orange-500/20">RSS Feed</a>
                <a href="/incidents/feed.atom" className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm font-medium transition-colors border border-blue-500/20">Atom Feed</a>
                <a href="/api/incidents/export" className="px-4 py-2 rounded-lg bg-white/[0.04] text-white/60 hover:bg-white/[0.08] text-sm font-medium transition-colors border border-white/[0.08]">JSON Export</a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Ethical Commitments</h3>
              <ul className="space-y-3 text-sm text-white/50">
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> No victim blaming. Reports describe patterns.</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Anonymization by default. Opt in credit.</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Responsible disclosure timelines applied.</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> No AI tool shaming. Neutral infrastructure.</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Verification before publication.</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Right to redact for research integrity.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Report CTA + Researchers */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-white/[0.02] border border-white/[0.06] rounded-2xl space-y-4">
              <h3 className="text-xl font-semibold text-white">Report an Incident</h3>
              <p className="text-sm text-white/50 leading-relaxed">If you experienced an incident where AI generated code caused a failure, help the community learn from it.</p>
              <Link href="/incidents/submit" className="inline-block px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all text-sm">
                Report an Incident
              </Link>
            </div>
            <div className="p-10 bg-white/[0.02] border border-white/[0.06] rounded-2xl space-y-4">
              <h3 className="text-xl font-semibold text-white">For Researchers</h3>
              <p className="text-sm text-white/50 leading-relaxed">All published incident data is available under CC BY 4.0. Download the full dataset for analysis.</p>
              <a href="/api/incidents/export" className="inline-block px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold transition-all text-sm border border-white/[0.06]">
                Download Data Export
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
