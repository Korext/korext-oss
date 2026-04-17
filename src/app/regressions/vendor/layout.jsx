import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Vendor Dashboard',
  description: 'AI coding tool vendors can register to receive regression reports, track pattern resolution, and demonstrate commitment to code quality.',
  path: '/regressions/vendor',
  tags: ['AI vendor dashboard', 'AI tool regression tracking', 'vendor regression reports'],
});

export default function Layout({ children }) {
  return children;
}
