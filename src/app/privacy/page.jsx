import Link from 'next/link';
import { JsonLd } from '@/lib/schema';
import PrintButton from '@/components/PrintButton';

export const metadata = {
  title: 'Privacy Policy | Korext Open Source',
  description: 'How oss.korext.com handles your data. No cookies. No tracking. No analytics.',
  alternates: { canonical: 'https://oss.korext.com/privacy' },
};

const privacySchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy',
  description: 'How oss.korext.com handles your data. No cookies. No tracking. No analytics.',
  url: 'https://oss.korext.com/privacy',
  publisher: {
    '@type': 'Organization',
    name: 'Korext',
    url: 'https://korext.com',
  },
  dateModified: '2026-04-18',
};

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-medium text-white/90 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function P({ children }) {
  return <p className="text-[15px] text-white/60 leading-relaxed mb-3">{children}</p>;
}

function ItemList({ items }) {
  return (
    <ul className="space-y-1.5 mb-4 ml-1">
      {items.map((item, i) => (
        <li key={i} className="text-[15px] text-white/60 leading-relaxed flex items-start gap-2.5">
          <span className="text-violet-400/60 mt-1.5 flex-shrink-0">
            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" /></svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-24">
      <JsonLd data={privacySchema} />
      <div className="container mx-auto px-6 max-w-[720px]">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Privacy Policy</h1>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/30 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-lg text-xs font-medium">
              Last updated: April 2026
            </span>
            <PrintButton />
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-10">
          <P>
            Korext Open Source (oss.korext.com) is operated by Korext.
            This policy explains how we handle data on this site.
          </P>

          <Section title="Summary">
            <div className="p-5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/10 mb-6">
              <P>
                This site does not use cookies. This site does not use analytics.
                This site does not track you across other websites. We collect
                personal data only when you voluntarily submit it through forms.
              </P>
            </div>
          </Section>

          <Section title="What We Collect">
            <SubSection title="Server Logs">
              <P>
                Our hosting infrastructure automatically records:
              </P>
              <ItemList items={[
                'IP addresses',
                'Browser user agent strings',
                'Pages requested',
                'Timestamps',
                'HTTP status codes',
              ]} />
              <P>
                This data is used for security monitoring, abuse prevention,
                and infrastructure operations. It is retained for 30 days and
                then deleted.
              </P>
              <P>
                Legal basis: legitimate interest in maintaining site security
                and availability.
              </P>
            </SubSection>

            <SubSection title="Voluntary Submissions">
              <P>
                When you submit data through forms on this site (incident reports,
                regression patterns, notification subscriptions), we collect the
                data you provide. This may include:
              </P>
              <ItemList items={[
                'Name (optional)',
                'Email address (optional or required depending on the form)',
                'Organization (optional)',
                'Technical content (code patterns, incident descriptions)',
              ]} />
              <P>
                This data is used to operate the registries and notification
                services you signed up for.
              </P>
              <P>
                Legal basis: consent (you chose to submit the data).
              </P>
            </SubSection>

            <SubSection title="Badge and Report Requests">
              <P>
                When you use the badge generator or view a report page, we
                fetch data from public GitHub repositories on your behalf. We
                do not store which repositories you looked up.
              </P>
            </SubSection>
          </Section>

          <Section title="What We Do Not Collect">
            <ItemList items={[
              'Cookies (none)',
              'Analytics data (none)',
              'Advertising identifiers (none)',
              'Location data beyond IP address (none)',
              'Browsing history (none)',
              'Cross-site tracking (none)',
              'Device fingerprints (none)',
            ]} />
          </Section>

          <Section title="Third Party Services">
            <P>
              This site is hosted on Google Cloud Run. Google's infrastructure
              processes server logs as described above.
            </P>
            <P>
              We fetch data from GitHub's public API to render badges and reports.
              GitHub's privacy policy applies to data stored on GitHub.
            </P>
            <P>
              No other third party services receive data from this site.
            </P>
          </Section>

          <Section title="Your Rights">
            <P>
              Under GDPR and similar regulations, you have the right to:
            </P>
            <ItemList items={[
              'Access the personal data we hold about you',
              'Request correction of inaccurate data',
              'Request deletion of your data',
              'Object to processing based on legitimate interest',
              'Withdraw consent for voluntary submissions',
              'Lodge a complaint with a supervisory authority',
            ]} />
            <P>
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:maintainers@korext.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                maintainers@korext.com
              </a>.
            </P>
          </Section>

          <Section title="Data Retention">
            <div className="space-y-2 mb-4">
              {[
                ['Server logs', '30 days'],
                ['Incident submissions', 'Retained as long as published in the registry (redaction available on request)'],
                ['Regression submissions', 'Same as incident submissions'],
                ['Notification subscriptions', 'Until you unsubscribe'],
                ['Badge/report requests', 'Not stored'],
              ].map(([key, val]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-[15px] py-2 border-b border-white/[0.04]">
                  <span className="text-white/80 font-medium min-w-[180px]">{key}</span>
                  <span className="text-white/50">{val}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Data Transfers">
            <P>
              Server logs are processed by Google Cloud in the United States.
              If you are in the European Economic Area, this constitutes a
              transfer outside the EEA. Google Cloud operates under Standard
              Contractual Clauses for such transfers.
            </P>
          </Section>

          <Section title="Children">
            <P>
              This site is not directed at children under 16. We do not
              knowingly collect data from children.
            </P>
          </Section>

          <Section title="Changes">
            <P>
              We may update this policy. Changes are posted on this page with
              an updated date. If changes are material, we will update the
              consent banner version so it reappears for existing visitors.
            </P>
          </Section>

          <Section title="Contact">
            <P>
              For privacy inquiries:{' '}
              <a href="mailto:maintainers@korext.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                maintainers@korext.com
              </a>
            </P>
            <div className="text-[15px] text-white/50 leading-relaxed">
              <p>Korext</p>
              <p>San Francisco Bay Area</p>
              <p>United States</p>
            </div>
          </Section>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-white/[0.06]">
            <Link href="/" className="text-sm text-white/40 hover:text-white/60 transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
