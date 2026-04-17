import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'AI Code Radar: Live AI Code Adoption Data',
  description: 'Live data on AI code adoption across open source. Track how AI coding tools are used by language, framework, and industry. Updated continuously.',
  path: '/radar',
  tags: ['AI code radar', 'AI code adoption', 'AI coding statistics', 'AI tool usage data', 'GitHub AI code'],
});

export default function Layout({ children }) {
  return children;
}
