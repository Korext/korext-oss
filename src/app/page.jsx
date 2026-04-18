import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { JsonLd, softwareApplicationSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'AI Code Governance Standards and Tools',
  description: 'Free open source tools and standards for AI code transparency. Track AI generated code, declare provenance, scan your supply chain. Install in one command.',
  path: '/',
  tags: ['AI code governance', 'AI attestation', 'AI license', 'open source', 'AI transparency', 'supply chain AI', 'AI provenance'],
});

const projects = [
  {
    slug: 'ai-attestation',
    name: 'AI Attestation',
    tagline: 'Track AI generated code in your repository',
    description: 'An open standard for tracking and governing AI generated code in any repository. Detects Copilot, Cursor, Claude Code, and 16 more tools. 19 AI coding tools total.',
    install: 'npx @korext/ai-attestation init',
    href: '/ai-attestation',
    github: 'https://github.com/korext/ai-attestation',
    npm: 'https://www.npmjs.com/package/@korext/ai-attestation',
    specLicense: 'CC0 1.0',
    codeLicense: 'Apache 2.0',
    version: '1.0.4',
    color: 'blue',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    features: ['19 AI tools detected', 'Git hook integration', 'GitHub Action', 'Badge generator'],
  },
  {
    slug: 'ai-license',
    name: 'AI License Notice',
    tagline: 'Declare AI provenance in open source projects',
    description: 'A standardized notice for declaring AI tool usage in any open source project. Attaches to any existing license as an addendum. Five provenance levels from NONE to FULL.',
    install: 'npx @korext/ai-license generate',
    href: '/ai-license',
    github: 'https://github.com/korext/ai-license',
    npm: 'https://www.npmjs.com/package/@korext/ai-license',
    specLicense: 'CC0 1.0',
    codeLicense: 'Apache 2.0',
    version: '1.0.3',
    color: 'violet',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    features: ['5 provenance levels', '3 governance tiers', 'CLI generator', 'License agnostic'],
  },
  {
    slug: 'supply-chain',
    name: 'Supply Chain Attestation',
    tagline: 'AI provenance across your dependency tree',
    description: 'Scan your entire dependency tree for AI generated code. Fourteen ecosystems. CycloneDX and SPDX integration. Private registry support for enterprise deployment.',
    install: 'npx @korext/supply-check scan',
    href: '/supply-chain',
    github: 'https://github.com/korext/supply-chain-attestation',
    npm: 'https://www.npmjs.com/package/@korext/supply-check',
    specLicense: 'CC0 1.0',
    codeLicense: 'Apache 2.0',
    version: '1.1.1',
    color: 'emerald',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    features: ['14 ecosystems', 'SBOM integration', 'Private registry', 'GitHub Action'],
  },
  {
    slug: 'incidents',
    name: 'AI Incident Registry',
    tagline: 'Learn from AI code failures across the industry',
    description: 'The public registry and open standard for cataloging AI code failures. Report incidents, browse patterns, and subscribe to feeds. The CVE equivalent for AI authored code.',
    install: 'npx @korext/incident-report draft',
    href: '/incidents',
    github: 'https://github.com/korext/ai-incident-registry',
    npm: 'https://www.npmjs.com/package/@korext/incident-report',
    specLicense: 'CC0 1.0',
    codeLicense: 'Apache 2.0',
    version: '1.0.0',
    color: 'red',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
    features: ['AICI identifiers', 'Detection rule mapping', 'RSS/Atom feeds', 'Anonymous reporting'],
  },
  {
    slug: 'regressions',
    name: 'AI Regression Database',
    tagline: 'Catalog code patterns AI tools continually generate incorrectly',
    description: 'The public corpus of code patterns that AI tools consistently generate incorrectly. Scan your repo, track patterns over time, test reproduction rates automatically.',
    install: 'npx @korext/regression-submit draft',
    href: '/regressions',
    github: 'https://github.com/korext/ai-regression-database',
    npm: 'https://www.npmjs.com/package/@korext/regression-submit',
    specLicense: 'CC0 1.0',
    codeLicense: 'Apache 2.0',
    version: '1.0.4',
    color: 'purple',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    features: ['Automated test harness', 'Version awareness tracking', 'API detection', 'GitHub Action'],
  },
  {
    slug: 'radar',
    name: 'AI Code Radar',
    tagline: 'The real-time pulse of AI code adoption',
    description: 'The live public dashboard showing AI code adoption and market share across open source. Powered by the attestation and supply chain data flowing through the ecosystem.',
    install: 'npm install @korext/radar-data',
    href: '/radar',
    github: 'https://github.com/korext/ai-code-radar',
    npm: 'https://www.npmjs.com/package/@korext/radar-data',
    specLicense: 'CC0 1.0',
    codeLicense: 'Apache 2.0',
    version: '1.0.0',
    color: 'cyan',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
    features: ['Public API', 'Time series data', 'Ecosystem trends', 'Embeddable charts'],
  },
  {
    slug: 'commit-carbon',
    name: 'Commit Carbon',
    tagline: 'Measure the carbon footprint of AI assisted commits',
    description: 'The open standard for calculating AI coding emissions at commit granularity. CSRD, SEC, and CDP compatible. Conservative estimates with ranged outputs.',
    install: 'npx @korext/commit-carbon scan',
    href: '/commit-carbon',
    github: 'https://github.com/korext/commit-carbon',
    npm: 'https://www.npmjs.com/package/@korext/commit-carbon',
    specLicense: 'CC0 1.0',
    codeLicense: 'Apache 2.0',
    version: '1.0.2',
    color: 'green',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    features: ['CSRD/SEC/CDP reports', 'Regional grid intensity', 'Ranged estimates', 'GitHub Action'],
  },
];

const colorMap = {
  blue: {
    border: 'border-blue-500/20 hover:border-blue-400/40',
    glow: 'hover:shadow-[0_0_60px_rgba(59,130,246,0.08)]',
    iconBg: 'bg-blue-500/10 text-blue-400',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    installBg: 'bg-blue-500/5 border-blue-500/10',
    dot: 'bg-blue-400',
  },
  violet: {
    border: 'border-violet-500/20 hover:border-violet-400/40',
    glow: 'hover:shadow-[0_0_60px_rgba(124,58,237,0.08)]',
    iconBg: 'bg-violet-500/10 text-violet-400',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    installBg: 'bg-violet-500/5 border-violet-500/10',
    dot: 'bg-violet-400',
  },
  emerald: {
    border: 'border-emerald-500/20 hover:border-emerald-400/40',
    glow: 'hover:shadow-[0_0_60px_rgba(16,185,129,0.08)]',
    iconBg: 'bg-emerald-500/10 text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    installBg: 'bg-emerald-500/5 border-emerald-500/10',
    dot: 'bg-emerald-400',
  },
  red: {
    border: 'border-red-500/20 hover:border-red-400/40',
    glow: 'hover:shadow-[0_0_60px_rgba(239,68,68,0.08)]',
    iconBg: 'bg-red-500/10 text-red-400',
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    installBg: 'bg-red-500/5 border-red-500/10',
    dot: 'bg-red-400',
  },
  purple: {
    border: 'border-purple-500/20 hover:border-purple-400/40',
    glow: 'hover:shadow-[0_0_60px_rgba(168,85,247,0.08)]',
    iconBg: 'bg-purple-500/10 text-purple-400',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    installBg: 'bg-purple-500/5 border-purple-500/10',
    dot: 'bg-purple-400',
  },
  cyan: {
    border: 'border-cyan-500/20 hover:border-cyan-400/40',
    glow: 'hover:shadow-[0_0_60px_rgba(6,182,212,0.08)]',
    iconBg: 'bg-cyan-500/10 text-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    installBg: 'bg-cyan-500/5 border-cyan-500/10',
    dot: 'bg-cyan-400',
  },
  green: {
    border: 'border-green-500/20 hover:border-green-400/40',
    glow: 'hover:shadow-[0_0_60px_rgba(34,197,94,0.08)]',
    iconBg: 'bg-green-500/10 text-green-400',
    badge: 'bg-green-500/10 text-green-400 border-green-500/20',
    installBg: 'bg-green-500/5 border-green-500/10',
    dot: 'bg-green-400',
  },
};

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs font-medium text-white/60 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open Standards for AI Code Governance
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08]">
            <span className="text-white">Open standards for</span>
            <br />
            <span className="text-gradient">AI code transparency</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Korext Open Source builds free tools and open specifications for the developer community. Every project is published under permissive licenses with public domain specifications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#projects"
              id="cta-explore"
              className="px-8 py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-500 transition-all duration-200 border border-violet-500/40 shadow-lg shadow-violet-500/10"
            >
              Explore Projects
            </a>
            <a
              href="https://github.com/korext"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-github"
              className="px-8 py-3 rounded-xl bg-white/[0.04] text-white/70 font-semibold text-sm hover:bg-white/[0.08] hover:text-white transition-all duration-200 border border-white/[0.08]"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Star on GitHub
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Project Cards */}
      <section id="projects" className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-6">
          {projects.map((project) => {
            const c = colorMap[project.color];
            return (
              <Link
                key={project.slug}
                href={project.href}
                id={`project-${project.slug}`}
                className={`group block rounded-2xl border ${c.border} bg-white/[0.02] ${c.glow} transition-all duration-300 overflow-hidden`}
              >
                <div className="p-5 sm:p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    {/* Left: Info */}
                    <div className="flex-1 space-y-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${c.iconBg} flex items-center justify-center`}>
                          {project.icon}
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-white/95 transition-colors">
                            {project.name}
                          </h2>
                          <p className="text-sm text-white/40 mt-0.5">{project.tagline}</p>
                        </div>
                      </div>

                      <p className="text-white/50 leading-relaxed text-[15px]">
                        {project.description}
                      </p>

                      {/* Feature pills */}
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((f) => (
                          <span key={f} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${c.badge}`}>
                            <span className={`w-1 h-1 rounded-full ${c.dot}`} />
                            {f}
                          </span>
                        ))}
                      </div>

                      {/* License badges */}
                      <div className="flex items-center gap-3 text-xs text-white/30">
                        <span>spec {project.specLicense}</span>
                        <span className="w-px h-3 bg-white/10" />
                        <span>code {project.codeLicense}</span>
                        <span className="w-px h-3 bg-white/10" />
                        <span>v{project.version}</span>
                      </div>
                    </div>

                    {/* Right: Install command */}
                    <div className="md:w-72 lg:w-80 flex-shrink-0">
                      <div className={`rounded-xl border ${c.installBg} p-5 space-y-3`}>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">Quick Start</p>
                        <code className="block text-sm font-mono text-white/80 select-all break-all leading-relaxed">
                          {project.install}
                        </code>
                      </div>

                      <div className="flex items-center gap-4 mt-4">
                        <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors flex items-center gap-1">
                          View project <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-10 md:p-14 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">The gap in open source</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              Open source licenses were designed when all code was human written. When AI tools assist or generate code, downstream consumers have no way to know what portions are AI assisted, which tools were used, or whether the code was governed. These standards change that.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-6 text-left">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gradient">35%</div>
                <p className="text-sm text-white/40">of production code is now AI generated</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gradient">11</div>
                <p className="text-sm text-white/40">AI coding tools detected from git patterns</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gradient">0</div>
                <p className="text-sm text-white/40">existing license standards that address AI authorship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How They Connect */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">How they work together</h2>
            <p className="text-white/40 max-w-xl mx-auto">Eight open standards. One ecosystem. Complete AI code governance.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-blue-500/10 bg-white/[0.02] p-6 text-left space-y-3">
              <div className="text-3xl font-bold text-blue-400/50">1</div>
              <h3 className="text-lg font-semibold text-white">Track</h3>
              <p className="text-sm text-white/40 leading-relaxed">AI Attestation scans your git history and produces a machine readable YAML report of AI tool usage.</p>
            </div>
            <div className="rounded-xl border border-violet-500/10 bg-white/[0.02] p-6 text-left space-y-3">
              <div className="text-3xl font-bold text-violet-400/50">2</div>
              <h3 className="text-lg font-semibold text-white">Declare</h3>
              <p className="text-sm text-white/40 leading-relaxed">AI License Notice reads the attestation and generates a standardized notice declaring AI provenance.</p>
            </div>
            <div className="rounded-xl border border-emerald-500/10 bg-white/[0.02] p-6 text-left space-y-3">
              <div className="text-3xl font-bold text-emerald-400/50">3</div>
              <h3 className="text-lg font-semibold text-white">Scan</h3>
              <p className="text-sm text-white/40 leading-relaxed">Supply Chain Attestation aggregates AI provenance across your entire dependency tree. Fourteen ecosystems.</p>
            </div>
            <div className="rounded-xl border border-red-500/10 bg-white/[0.02] p-6 text-left space-y-3">
              <div className="text-3xl font-bold text-red-400/50">4</div>
              <h3 className="text-lg font-semibold text-white">Learn</h3>
              <p className="text-sm text-white/40 leading-relaxed">AI Incident Registry documents what happens when AI code fails. Browse incidents, subscribe to feeds.</p>
            </div>
            <div className="rounded-xl border border-purple-500/10 bg-white/[0.02] p-6 text-left space-y-3">
              <div className="text-3xl font-bold text-purple-400/50">5</div>
              <h3 className="text-lg font-semibold text-white">Prevent</h3>
              <p className="text-sm text-white/40 leading-relaxed">AI Regression Database catalogs repeatable patterns AI tools get wrong proactively before incidents.</p>
            </div>
            <div className="rounded-xl border border-cyan-500/10 bg-white/[0.02] p-6 text-left space-y-3">
              <div className="text-3xl font-bold text-cyan-400/50">6</div>
              <h3 className="text-lg font-semibold text-white">Observe</h3>
              <p className="text-sm text-white/40 leading-relaxed">AI Code Radar aggregates metrics across the ecosystem into a live public pulse of adoption patterns.</p>
            </div>
            <div className="rounded-xl border border-green-500/10 bg-white/[0.02] p-6 text-left space-y-3">
              <div className="text-3xl font-bold text-green-400/50">7</div>
              <h3 className="text-lg font-semibold text-white">Account</h3>
              <p className="text-sm text-white/40 leading-relaxed">Commit Carbon measures AI coding emissions at commit level. CSRD, SEC, and CDP compatible disclosure.</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 text-left space-y-3 group hover:border-violet-500/20 transition-all">
              <div className="text-3xl font-bold text-violet-400/40">8</div>
              <h3 className="text-lg font-semibold text-white/80">Govern</h3>
              <p className="text-sm text-white/50 leading-relaxed">Enterprise governance layer. Combine all standards into a unified AI code policy for your organization.</p>
              <a
                href="https://www.korext.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400/70 hover:text-violet-300 transition-colors mt-1"
              >
                Learn more
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center space-y-6 md:space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Start tracking your AI code</h2>
          <p className="text-white/50 max-w-lg mx-auto">One command. Zero configuration. Works with every language, every framework, every AI coding tool.</p>
          <code className="inline-block px-4 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm sm:text-lg font-mono text-white/80 select-all break-all">
            npx @korext/ai-attestation init
          </code>
        </div>
      </section>

      {/* JSON-LD for projects */}
      {projects.map((project) => (
        <JsonLd
          key={project.slug}
          data={softwareApplicationSchema({
            name: project.name,
            description: project.description,
            url: `https://oss.korext.com${project.href}`,
            downloadUrl: project.npm,
            version: project.version,
            license: 'https://opensource.org/licenses/Apache-2.0',
            applicationCategory: 'DeveloperApplication',
          })}
        />
      ))}
    </div>
  );
}
