import Link from 'next/link';
import Generator from './Generator';
import { buildMetadata } from '@/lib/seo';
import { JsonLd, softwareApplicationSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'AI License Notice: Declare AI Provenance in Open Source',
  description: 'Standardized notice for declaring AI provenance in any open source project. Attaches to any license. CC0 specification. Free CLI and web generator.',
  path: '/ai-license',
  tags: ['AI license notice', 'AI provenance standard', 'open source AI license', 'AI code transparency', 'AI provenance declaration'],
});

const faqs = [
  { question: 'Does this replace my existing license?', answer: 'No. The AI License Notice is an addendum that attaches to your existing license. It does not modify, override, or replace any existing license terms.' },
  { question: 'Does this grant or restrict rights?', answer: 'No. The notice is purely informational. It declares facts about AI tool usage without modifying legal rights.' },
  { question: 'Can I use this with GPL?', answer: 'Yes. The notice is compatible with every open source license including GPL, LGPL, AGPL, MIT, Apache 2.0, BSD, MPL, ISC, Unlicense, and CC0.' },
  { question: 'Can I use this with proprietary code?', answer: 'Yes. The notice works with any license model including proprietary, dual-licensed, and source-available.' },
  { question: 'Is this legal advice?', answer: 'No. This is a transparency standard, not legal counsel. Consult a lawyer for legal questions about your specific situation.' },
  { question: 'Who created this?', answer: 'The Korext team. The specification is CC0 1.0 (public domain) and the CLI tools are Apache 2.0.' },
  { question: 'Can I fork this specification?', answer: 'Yes. The specification is CC0 public domain. You can copy, modify, and redistribute it without restriction.' },
];

export default function AiLicensePage() {
  return (
    <div className="py-12 md:py-20">
      <JsonLd data={breadcrumbSchema([
        { name: 'Korext Open Source', url: 'https://oss.korext.com' },
        { name: 'AI License Notice', url: 'https://oss.korext.com/ai-license' },
      ])} />
      <JsonLd data={softwareApplicationSchema({
        name: 'AI License Notice',
        description: 'Standardized notice for declaring AI provenance in any open source project.',
        url: 'https://oss.korext.com/ai-license',
        downloadUrl: 'https://www.npmjs.com/package/@korext/ai-license',
        version: '1.0.1',
        license: 'https://opensource.org/licenses/Apache-2.0',
        applicationCategory: 'DeveloperApplication',
      })} />
      <JsonLd data={faqSchema(faqs)} />

      <div className="container mx-auto px-6 space-y-24 max-w-5xl">

        {/* Breadcrumb */}
        <nav className="text-sm text-white/30">
          <Link href="/" className="hover:text-white/60 transition-colors">Korext Open Source</Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">AI License Notice</span>
        </nav>

        {/* HERO */}
        <section className="text-center max-w-3xl mx-auto -mt-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-xs font-medium text-violet-400 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Category Creating Open Standard
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.08]">
            Declare your <span className="text-gradient">AI provenance</span>
          </h1>
          <p className="text-xl text-white/50 leading-relaxed max-w-2xl mx-auto">
            An open standard for declaring AI tool usage in any open source project. Attaches to any license. Works with any governance engine.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <a href="#generator" className="px-8 py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-500 transition-all border border-violet-500/30 shadow-lg shadow-violet-500/10">
              Generate Notice
            </a>
            <a href="https://github.com/Korext/ai-license/blob/main/SPEC.md" target="_blank" rel="noreferrer" className="px-8 py-3 rounded-xl bg-white/[0.04] text-white/70 font-semibold text-sm hover:bg-white/[0.08] hover:text-white transition-all border border-white/[0.08]">
              Read Specification
            </a>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="max-w-3xl mx-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12 space-y-4">
          <h2 className="text-2xl font-bold text-white">The Gap in Open Source</h2>
          <p className="text-lg text-white/50 leading-relaxed">
            When you open source code today, your license covers copyright and usage rights. It does not cover AI authorship.
          </p>
          <p className="text-white/40 leading-relaxed">
            A consumer of your code cannot tell if it was written by a human, assisted by Copilot, or generated entirely by Claude Code. This opacity causes issues for compliance, insurance, and supply chain risk. The AI License Notice solves this by making AI provenance explicit, transparent, and machine readable.
          </p>
        </section>

        {/* QUICK START */}
        <section className="space-y-10">
          <h2 className="text-3xl font-bold text-white">Quick Start</h2>
          <div className="grid sm:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {[
              { step: '1', title: 'Track AI usage', cmd: 'npx @korext/ai-attestation init' },
              { step: '2', title: 'Generate notice', cmd: 'npx @korext/ai-license generate' },
              { step: '3', title: 'Reference license', cmd: 'npx @korext/ai-license reference' },
            ].map((s) => (
              <div key={s.step} className="bg-[#0d0e1a] p-8 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold text-lg">{s.step}</div>
                <h3 className="font-semibold text-white">{s.title}</h3>
                <code className="block text-sm font-mono text-emerald-400/80 bg-white/[0.02] border border-white/[0.06] rounded-lg px-4 py-3 select-all">{s.cmd}</code>
              </div>
            ))}
          </div>
        </section>

        {/* GENERATOR */}
        <section id="generator" className="scroll-mt-24">
          <Generator />
        </section>

        {/* WHAT IT LOOKS LIKE */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white">What It Looks Like</h2>
          <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-white/[0.03] px-5 py-3 flex items-center gap-2 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <div className="ml-4 text-xs font-medium text-white/30 tracking-wider font-mono">AI-LICENSE</div>
            </div>
            <pre className="p-8 text-sm text-emerald-400/70 font-mono whitespace-pre-wrap leading-relaxed">
{`===============================================
AI LICENSE NOTICE (Version 1.0)
===============================================

This software contains code that was
written with assistance from AI tools.

AI ASSISTED PORTIONS: MODERATE (35.1%)
Assisted Commits: 438
Total Commits: 1247
Percentage: 35.1%

AI TOOLS USED:
GitHub Copilot (Sep 2025 to Apr 2026)
Cursor (Jan 2026 to Apr 2026)

HUMAN REVIEW:
All AI assisted commits were reviewed
and accepted by human developers.

GOVERNANCE:
Engine: KOREXT
Score: 94/100
Verification: https://app.korext.com/verify/kpb_abc123

VERIFY:
https://oss.korext.com/report/acme/payments

===============================================`}
            </pre>
          </div>
        </section>

        {/* DETAILS - LEVELS & TIERS */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">5 Provenance Levels</h2>
            <div className="space-y-3">
              {[
                { l: 'NONE', p: '0%', text: 'No AI was used', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                { l: 'LOW', p: '1-25%', text: 'Minimal AI involvement', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
                { l: 'MODERATE', p: '26-60%', text: 'Significant AI involvement', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
                { l: 'HIGH', p: '61-99%', text: 'Majority AI generated', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
                { l: 'FULL', p: '100%', text: 'Entirely AI generated', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
              ].map(x => (
                <div key={x.l} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${x.color}`}>{x.l}</span>
                    <span className="text-sm font-mono text-white/30">{x.p}</span>
                  </div>
                  <span className="text-sm text-white/50">{x.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">3 Governance Tiers</h2>
            <div className="space-y-3">
              {[
                { t: 'UNGOVERNED', text: 'No automated governance scanning', color: 'bg-white/[0.04] text-white/40 border-white/[0.08]' },
                { t: 'SCANNED', text: 'Recent governance scan result available', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                { t: 'ATTESTED', text: 'Cryptographically signed attestation', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
              ].map(x => (
                <div key={x.t} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-2">
                  <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg border ${x.color}`}>{x.t}</span>
                  <p className="text-sm text-white/50">{x.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTEGRATES WITH */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white">Integrates With</h2>
          <div className="grid sm:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            <div className="bg-[#0d0e1a] p-8 text-center space-y-3">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-white">AI Attestation</h3>
              <p className="text-sm text-white/40">Reads data from <code className="text-violet-400">.ai-attestation.yaml</code> to populate provenance fields automatically.</p>
            </div>
            <div className="bg-[#0d0e1a] p-8 text-center space-y-3">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold text-white">Any Governance Engine</h3>
              <p className="text-sm text-white/40">Any compliance engine can populate governance fields. Korext provides ATTESTED tier with signed proof bundles.</p>
            </div>
            <div className="bg-[#0d0e1a] p-8 text-center space-y-3">
              <div className="text-3xl mb-2">📄</div>
              <h3 className="font-semibold text-white">Any Existing License</h3>
              <p className="text-sm text-white/40">MIT, Apache 2.0, GPL, BSD, and all other licenses. The notice is an addendum, not a replacement.</p>
            </div>
          </div>
        </section>

        {/* COMPATIBILITY */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">License Compatibility</h2>
          <p className="text-white/40">Compatible with every open source license:</p>
          <div className="flex flex-wrap gap-3">
            {['MIT', 'Apache 2.0', 'GPL', 'BSD', 'MPL', 'ISC', 'AGPL', 'LGPL', 'Unlicense', 'CC0'].map(lic => (
              <span key={lic} className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-white/60 text-sm font-medium">{lic}</span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">Frequently Asked Questions</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/[0.06] rounded-xl p-6 bg-white/[0.02] space-y-3">
                <h3 className="font-semibold text-white text-sm">{faq.question}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SPECIFICATION */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Specification</h2>
          <p className="text-white/40">The full specification is available on GitHub. The spec and notice template are CC0 public domain. The CLI and tools are Apache 2.0.</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://github.com/Korext/ai-license/blob/main/SPEC.md" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl bg-white/[0.04] text-white font-medium hover:bg-white/[0.08] transition border border-white/[0.08]">
              Read SPEC.md
            </a>
            <a href="https://github.com/Korext/ai-license" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl bg-white/[0.04] text-white font-medium hover:bg-white/[0.08] transition border border-white/[0.08]">
              View on GitHub
            </a>
          </div>
        </section>

        {/* STAR CTA */}
        <section className="text-center py-8">
          <a href="https://github.com/Korext/ai-license" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-violet-600 text-white font-bold text-lg hover:bg-violet-500 transition-all border border-violet-500/30 shadow-xl shadow-violet-500/10">
            ⭐ Star on GitHub
          </a>
        </section>
      </div>
    </div>
  );
}
