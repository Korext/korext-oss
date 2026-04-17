import { buildMetadata } from '@/lib/seo';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Registry Browser: AI Provenance Data for Open Source Packages',
  description: 'Browse AI provenance attestations for open source packages across npm, PyPI, Cargo, Go, RubyGems, Maven, NuGet, Composer, Swift PM, CocoaPods, Pub, Hex, CPAN, and Conda.',
  path: '/supply-chain/registry',
  tags: ['attestation registry', 'AI provenance', 'package registry', 'supply chain'],
});

export default function RegistryLayout({ children }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Korext Open Source', url: 'https://oss.korext.com' },
        { name: 'Supply Chain Attestation', url: 'https://oss.korext.com/supply-chain' },
        { name: 'Registry', url: 'https://oss.korext.com/supply-chain/registry' },
      ])} />
      {children}
    </>
  );
}
