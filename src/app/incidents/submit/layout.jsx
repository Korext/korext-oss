import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Submit an AI Incident',
  description: 'Report an AI code failure to the public AI Incident Registry. Document the pattern, severity, and affected tool to help the community learn and prevent future incidents.',
  path: '/incidents/submit',
  tags: ['report AI incident', 'AI code failure report', 'submit AI bug'],
});

export default function Layout({ children }) {
  return children;
}
