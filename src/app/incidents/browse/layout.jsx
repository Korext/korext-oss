import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Browse AI Incidents',
  description: 'Search and browse the public AI Incident Registry. Filter by severity, language, or AI tool. Every incident documented for the community.',
  path: '/incidents/browse',
  tags: ['browse AI incidents', 'AI code failures database', 'search AI incidents'],
});

export default function Layout({ children }) {
  return children;
}
