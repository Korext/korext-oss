import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Submit a Regression Pattern',
  description: 'Document an AI coding tool regression pattern. Share reproducible failures AI tools consistently get wrong to help vendors fix them.',
  path: '/regressions/submit',
  tags: ['submit AI regression', 'AI tool bug report', 'AI regression pattern'],
});

export default function Layout({ children }) {
  return children;
}
