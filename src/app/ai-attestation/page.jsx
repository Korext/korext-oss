import BadgeGenerator from '@/components/BadgeGenerator';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { JsonLd, softwareApplicationSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'AI Code Attestation: Track AI Generated Code in Your Repository',
  description: 'Open standard for tracking AI generated code in any repository. Detects Copilot, Cursor, Claude Code, and 16 more tools. 19 AI coding tools total. Install with npx in one command.',
  path: '/ai-attestation',
  tags: ['AI code attestation', 'AI code transparency', 'track AI generated code', 'AI supply chain attestation', 'detect copilot commits', 'cursor commit tracking', 'AI coding tool detection'],
});

export default function AIAttestationPage() {
  const exampleYaml = `# AI Attestation
# https://oss.korext.com/ai-attestation

schema: https://oss.korext.com/ai-attestation/schema
version: "1.0"

repo:
  owner: acme
  name: payments-service
  url: https://github.com/acme/payments-service

generated: "2026-04-15T12:00:00Z"

range:
  from: "2025-01-01T00:00:00Z"
  to: "2026-04-15T12:00:00Z"
  commits: 1247

ai:
  assisted_commits: 438
  percentage: 35.1
  tools:
    - name: GitHub Copilot
      identifier: copilot
      first_seen: "2025-09-01"
      last_seen: "2026-04-15"
      commit_count: 312

    - name: Cursor
      identifier: cursor
      first_seen: "2026-01-15"
      last_seen: "2026-04-14"
      commit_count: 89`;

  const tools = [
    'GitHub Copilot', 'Cursor', 'Claude Code', 'Windsurf', 'Codeium',
    'Aider', 'Devin', 'OpenHands', 'Amazon Q Developer', 'OpenAI Codex CLI',
    'Gemini Code Assist', 'JetBrains AI', 'Sourcegraph Cody', 'Tabnine',
    'Replit AI', 'Cline', 'Continue', 'GPT Engineer', 'Bolt'
  ];

  const faqs = [
    {
      question: 'How does AI Attestation detect AI tools?',
      answer: 'AI Attestation analyzes publicly observable git patterns including co-author trailers, commit message patterns, and file header markers. It does not access proprietary data or require API keys.'
    },
    {
      question: 'Is AI Attestation free?',
      answer: 'Yes. AI Attestation is free and open source under Apache 2.0. The specification is CC0 1.0 (public domain). There are no paid tiers.'
    },
    {
      question: 'Does it work with private repositories?',
      answer: 'Yes. AI Attestation runs entirely locally. Your code never leaves your machine. The CLI reads your local git history and writes a YAML file to your repository root.'
    },
    {
      question: 'What is the governance tier?',
      answer: 'The governance tier indicates whether AI generated code in your repository has been scanned by a governance engine. UNGOVERNED means no scanning. SCANNED means a tool has analyzed the code. ATTESTED means cryptographic proof bundles exist for every AI change.'
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <JsonLd data={breadcrumbSchema([
        { name: 'Korext Open Source', url: 'https://oss.korext.com' },
        { name: 'AI Attestation', url: 'https://oss.korext.com/ai-attestation' },
      ])} />
      <JsonLd data={softwareApplicationSchema({
        name: 'AI Attestation',
        description: 'Open standard for tracking AI generated code in any repository.',
        url: 'https://oss.korext.com/ai-attestation',
        downloadUrl: 'https://www.npmjs.com/package/@korext/ai-attestation',
        version: '1.0.4',
        license: 'https://opensource.org/licenses/Apache-2.0',
        applicationCategory: 'DeveloperApplication',
      })} />
      <JsonLd data={faqSchema(faqs)} />

      <div className="container mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24 max-w-5xl">

        {/* Breadcrumb */}
        <nav className="text-sm text-white/30">
          <Link href="/" className="hover:text-white/60 transition-colors">Korext Open Source</Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">AI Attestation</span>
        </nav>

        {/* Hero */}
        <div className="text-center space-y-6 max-w-3xl mx-auto -mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs font-medium text-blue-400 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Open Standard
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.08]">
            Track AI generated code in your repository
          </h1>
          <p className="text-xl text-white/50 leading-relaxed">
            An open standard for tracking and governing AI generated code in any repository.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <code className="px-4 sm:px-8 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm sm:text-lg font-mono text-white/80 select-all break-all">
              npx @korext/ai-attestation init
            </code>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          <div className="bg-[#0d0e1a] p-5 sm:p-8 space-y-4">
            <h3 className="text-xl font-semibold text-white">Tracks</h3>
            <p className="text-white/40 leading-relaxed text-[15px]">
              Detects AI tool usage across your git history. Copilot, Cursor, Claude Code, Aider, and 15 more. 19 tools total. Fully automatic via git hook.
            </p>
          </div>
          <div className="bg-[#0d0e1a] p-5 sm:p-8 space-y-4">
            <h3 className="text-xl font-semibold text-white">Attests</h3>
            <p className="text-white/40 leading-relaxed text-[15px]">
              Produces a human readable <code className="text-sm text-blue-400">.ai-attestation.yaml</code> file with tool breakdown, commit counts, and governance status.
            </p>
          </div>
          <div className="bg-[#0d0e1a] p-5 sm:p-8 space-y-4">
            <h3 className="text-xl font-semibold text-white">Governs</h3>
            <p className="text-white/40 leading-relaxed text-[15px]">
              Connects to governance engines for compliance scanning, proof bundles, and audit evidence.
            </p>
          </div>
        </div>

        {/* Example section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">The Standard</h2>
            <p className="text-white/40 text-lg leading-relaxed">
              AI Attestation is a declarative YAML file stored in your repository root, alongside LICENSE and SECURITY.md. It provides machine readable answers to regulators, auditors, and engineering leaders about how much of your code is AI generated.
            </p>
            <div className="space-y-4 pt-4">
               <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">Badge Preview</h3>
               <div className="border border-white/[0.06] rounded-xl p-4 bg-white/[0.02] w-full max-w-sm flex items-center gap-4">
                 <img src="https://oss.korext.com/api/badge/acme/payments-service" alt="AI Attestation Badge" />
                 <span className="text-sm text-white/40 break-all">acme / payments-service</span>
               </div>
            </div>
          </div>
          <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-white/[0.03] px-5 py-3 flex items-center gap-2 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <div className="ml-4 text-xs font-medium text-white/30 tracking-wider font-mono">.ai-attestation.yaml</div>
            </div>
            <pre className="p-6 text-sm overflow-x-auto text-white/60 font-mono leading-relaxed">
              <code>{exampleYaml}</code>
            </pre>
          </div>
        </div>

        {/* Badge Generator */}
        <div className="max-w-3xl mx-auto">
          <BadgeGenerator />
        </div>

        {/* Supported Tools */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">Supported Tools</h2>
            <p className="text-white/40">Detects 19 AI coding tools from publicly observable git patterns.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {tools.map(tool => (
              <div key={tool} className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-white/60 text-sm font-medium">
                {tool}
              </div>
            ))}
          </div>
        </div>

        {/* Why this matters */}
        <div className="max-w-3xl mx-auto text-center space-y-6 rounded-2xl border border-blue-500/10 bg-blue-500/[0.02] p-5 sm:p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Why This Matters</h2>
          <p className="text-lg text-white/40 leading-relaxed">
            35% of production code is now AI generated. The EU AI Act requires transparency. SOX auditors are asking. Insurance questionnaires now include AI tool usage. Your team needs answers before the questions arrive.
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/[0.06] rounded-xl p-6 bg-white/[0.02] space-y-3">
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="text-white/40 leading-relaxed text-[15px]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-5 sm:p-8 border border-white/[0.06] bg-white/[0.02] rounded-2xl text-center space-y-6">
            <h3 className="text-xl font-semibold text-white">Governance Integration</h3>
            <p className="text-white/40">
              AI Attestation tracks your AI code. Korext governs it.
            </p>
            <a href="https://korext.com" target="_blank" rel="noreferrer" className="inline-block px-6 py-2.5 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-500 transition border border-violet-500/30">
              Install Korext
            </a>
          </div>
          <div className="p-5 sm:p-8 border border-white/[0.06] bg-white/[0.02] rounded-2xl text-center space-y-6">
            <h3 className="text-xl font-semibold text-white">Open Source</h3>
            <p className="text-white/40">
              Help us expand the standard. Contribute patterns and tools.
            </p>
            <a href="https://github.com/korext/ai-attestation" target="_blank" rel="noreferrer" className="inline-block px-6 py-2.5 bg-white/[0.04] text-white font-medium rounded-xl hover:bg-white/[0.08] transition border border-white/[0.08]">
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
