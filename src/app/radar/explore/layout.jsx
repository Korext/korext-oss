import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Explore AI Code Radar Data',
  description: 'Interactive data explorer for AI code adoption metrics. Filter by language, tool, framework, and industry. Download raw data.',
  path: '/radar/explore',
  tags: ['AI code data explorer', 'AI adoption metrics', 'AI coding data download'],
});

export default function Layout({ children }) {
  return children;
}
