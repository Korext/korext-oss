import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Team',
  description: 'Meet the team behind Korext Open Source. Open standards and tools for AI code transparency, governance, and sustainability.',
  path: '/team',
  tags: ['team', 'maintainers', 'Korext', 'open source', 'AI code governance'],
});

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tom Bruno',
  jobTitle: 'Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'Korext',
    url: 'https://korext.com',
  },
  url: 'https://oss.korext.com/team',
  sameAs: [
    'https://github.com/tombruno-korext',
    'https://linkedin.com/in/tbrunoh',
  ],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'HEC Paris',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'UC Berkeley College of Engineering',
    },
  ],
  knowsAbout: [
    'AI Code Governance',
    'Developer Tools',
    'Software Supply Chain',
    'Code Attestation',
    'AI Transparency',
  ],
};

const contributeActions = [
  {
    title: 'Explore open issues',
    description: 'Browse open issues across our repositories on GitHub.',
    href: 'https://github.com/korext',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: 'Read the guidelines',
    description: 'Read the CONTRIBUTING.md in any project for guidelines.',
    href: 'https://github.com/korext/ai-attestation/blob/main/CONTRIBUTING.md',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: 'Become a maintainer',
    description: 'Reach out at maintainers@korext.com to discuss maintainer roles.',
    href: 'mailto:maintainers@korext.com',
    external: false,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function TeamPage() {
  return (
    <div className="relative">
      <JsonLd data={personSchema} />

      {/* Page Header */}
      <section className="pt-20 pb-8 md:pt-32 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Team
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/50 max-w-2xl">
            The people behind Korext Open Source.
          </p>
        </div>
      </section>

      {/* Founder Profile Card */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent backdrop-blur-sm overflow-hidden">
            {/* Decorative top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-violet-500/60 via-blue-500/40 to-cyan-500/30" />

            <div className="p-6 sm:p-10 md:p-14">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">

                {/* Photo */}
                <div className="shrink-0">
                  <div className="relative group">
                    {/* Glow ring behind photo */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                    <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden border-2 border-white/[0.08] shadow-2xl shadow-violet-500/5">
                      <Image
                        src="/team/tom-bruno.jpg"
                        alt="Tom Bruno, Founder of Korext"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, 180px"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Name and Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Tom Bruno
                  </h2>
                  <p className="mt-1.5 text-base sm:text-lg text-white/50 font-medium">
                    Founder, Korext
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center justify-center md:justify-start gap-5 mt-5">
                    <a
                      href="https://github.com/tombruno-korext"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
                      aria-label="GitHub profile"
                    >
                      <svg className="w-[18px] h-[18px] opacity-60 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span className="hidden sm:inline">GitHub</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/tbrunoh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
                      aria-label="LinkedIn profile"
                    >
                      <svg className="w-[18px] h-[18px] opacity-60 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span className="hidden sm:inline">LinkedIn</span>
                    </a>
                    <a
                      href="mailto:maintainers@korext.com"
                      className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
                      aria-label="Email"
                    >
                      <svg className="w-[18px] h-[18px] opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      <span className="hidden sm:inline">Email</span>
                    </a>
                  </div>

                  {/* Divider */}
                  <div className="mt-8 mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                  {/* Bio */}
                  <div className="space-y-5 max-w-[680px] mx-auto md:mx-0">
                    <p className="text-[15px] sm:text-base text-white/70 leading-[1.75]">
                      Tom is the creator and lead maintainer of all Korext Open Source projects. He designs the specifications, reviews contributions, and maintains the infrastructure.
                    </p>

                    <p className="text-[15px] sm:text-base text-white/70 leading-[1.75]">
                      His work sits at the intersection of AI coding tools, platforms, code governance, and developer tooling. He built the Korext platform from zero to production, spanning five IDE extensions, a CLI, a GitHub Action, an MCP integration, and a Chrome extension, all focused on making AI generated code safe, governed, and auditable in enterprise and regulated environments.
                    </p>

                    <p className="text-[15px] sm:text-base text-white/70 leading-[1.75]">
                      Alongside building Korext, Tom brings over a decade of experience in product strategy, innovation, and engineering leadership at Google, where he has led initiatives across Chrome, web platform strategy, and developer ecosystems that shaped how developers and users experience the web.
                    </p>

                    <p className="text-[15px] sm:text-base text-white/70 leading-[1.75]">
                      Tom holds graduate degrees in Business, specializing in Innovation and Entrepreneurship from HEC Paris, and Electronics and Systems Engineering from UC Berkeley College of Engineering, alongside his foundation in Computer Science. That combination drives how he thinks about building: where technical progress meets real world adoption, where infrastructure constraints shape product decisions, and where standards create markets.
                    </p>

                    <p className="text-[15px] sm:text-base text-white/50 leading-[1.75]">
                      Based in the San Francisco Bay Area.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Contributor */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Become a Contributor
              </h2>
              <p className="text-white/50 text-sm sm:text-base max-w-3xl leading-relaxed">
                Korext Open Source is built in the open. We welcome contributors across all projects. Whether you want to report an AI regression pattern, add a new ecosystem adapter, refine the carbon methodology, or improve documentation, there is a place for you.
              </p>
              <p className="text-white/50 text-sm sm:text-base">
                To get involved:
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {contributeActions.map((action) => (
                <a
                  key={action.title}
                  href={action.href}
                  target={action.external ? '_blank' : undefined}
                  rel={action.external ? 'noopener noreferrer' : undefined}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-violet-500/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.06)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4 group-hover:bg-violet-500/15 transition-colors">
                    {action.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-violet-300 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {action.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
