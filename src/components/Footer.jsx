import Link from 'next/link';
import Image from 'next/image';

const projects = [
  { href: '/ai-attestation', label: 'AI Attestation' },
  { href: '/ai-license', label: 'AI License' },
  { href: '/supply-chain', label: 'Supply Chain' },
  { href: '/incidents', label: 'Incidents' },
];

const resources = [
  { href: 'https://github.com/korext/ai-attestation', label: 'GitHub: AI Attestation', external: true },
  { href: 'https://github.com/korext/ai-license', label: 'GitHub: AI License', external: true },
  { href: 'https://github.com/korext/supply-chain-attestation', label: 'GitHub: Supply Chain', external: true },
  { href: 'https://github.com/korext/ai-incident-registry', label: 'GitHub: AI Incidents', external: true },
  { href: 'https://www.npmjs.com/package/@korext/ai-attestation', label: 'npm: ai-attestation', external: true },
  { href: 'https://www.npmjs.com/package/@korext/ai-license', label: 'npm: ai-license', external: true },
  { href: 'https://www.npmjs.com/package/@korext/supply-check', label: 'npm: supply-check', external: true },
  { href: 'https://www.npmjs.com/package/@korext/incident-report', label: 'npm: incident-report', external: true },
];

const company = [
  { href: 'https://korext.com', label: 'Korext', external: true },
  { href: 'https://korext.com/privacy', label: 'Privacy Policy', external: true },
  { href: 'https://korext.com/legal', label: 'Terms', external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.06] mt-32">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="Korext" width={24} height={24} className="rounded-sm" />
              <span className="font-semibold text-sm text-white/80 tracking-tight">
                Korext <span className="text-white/40 font-normal">Open Source</span>
              </span>
            </Link>
            <p className="text-sm text-white/30 leading-relaxed max-w-xs">
              Open standards and tools for AI code transparency. Free forever.
            </p>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Projects</h3>
            <ul className="space-y-3">
              {projects.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-white/50 hover:text-white/80 transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Resources</h3>
            <ul className="space-y-3">
              {resources.map((r) => (
                <li key={r.href}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Company</h3>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {year} Korext. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Specifications are published under CC0 1.0. Code under Apache 2.0.
          </p>
        </div>
      </div>
    </footer>
  );
}
