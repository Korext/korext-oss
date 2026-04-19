import Link from 'next/link';
import { JsonLd, techArticleSchema } from '@/lib/schema';

export const metadata = {
  title: 'Cookie Policy | Korext Open Source',
  description: 'Cookie policy for oss.korext.com. This site does not use cookies.',
  alternates: { canonical: 'https://oss.korext.com/cookies' },
};

function P({ children }) {
  return <p className="text-[15px] text-white/60 leading-relaxed mb-3">{children}</p>;
}

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen py-24">
      <JsonLd data={techArticleSchema({
        headline: 'Cookie Policy',
        description: 'Cookie policy for oss.korext.com. This site does not use cookies.',
        datePublished: '2026-04-18',
        dateModified: '2026-04-18',
        url: 'https://oss.korext.com/cookies',
      })} />
      <div className="container mx-auto px-6 max-w-[720px]">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Cookie Policy</h1>
            </div>
          </div>
          <span className="text-white/30 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-lg text-xs font-medium">
            Last updated: April 2026
          </span>
        </div>

        <div className="border-t border-white/[0.06] pt-10">
          <Section title="Current Status">
            <div className="p-5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/10 mb-6">
              <p className="text-[15px] text-emerald-400/90 font-medium mb-2">This site does not use cookies.</p>
              <P>
                No first-party cookies. No third-party cookies. No session
                cookies. No persistent cookies. No tracking cookies.
              </P>
            </div>
          </Section>

          <Section title="Consent Storage">
            <P>
              When you interact with our privacy banner, your preference is
              stored in your browser's localStorage. localStorage is not a
              cookie. It is not sent to our servers with requests. It stays
              on your device.
            </P>
            <P>You can clear this at any time by:</P>
            <ul className="space-y-2 mb-4 ml-1">
              <li className="text-[15px] text-white/60 leading-relaxed flex items-start gap-2.5">
                <span className="text-violet-400/60 mt-1.5 flex-shrink-0">
                  <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" /></svg>
                </span>
                Clicking &ldquo;Privacy Preferences&rdquo; in the footer and updating your choices
              </li>
              <li className="text-[15px] text-white/60 leading-relaxed flex items-start gap-2.5">
                <span className="text-violet-400/60 mt-1.5 flex-shrink-0">
                  <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" /></svg>
                </span>
                Clearing your browser's site data for oss.korext.com
              </li>
            </ul>
          </Section>

          <Section title="Future Changes">
            <P>
              If we add analytics or other tools that require cookies in the
              future, this page will be updated. The privacy consent banner
              will reappear to request your updated consent.
            </P>
          </Section>

          <Section title="Contact">
            <P>
              For questions about cookies or privacy:{' '}
              <a href="mailto:maintainers@korext.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                maintainers@korext.com
              </a>
            </P>
          </Section>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-violet-400/70 hover:text-violet-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-sm text-white/40 hover:text-white/60 transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
