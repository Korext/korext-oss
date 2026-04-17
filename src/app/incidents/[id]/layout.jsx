import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { id } = await params;
  return buildMetadata({
    title: `Incident ${id} | AI Incident Registry`,
    description: `Details for AI coding incident ${id}. View affected patterns, severity, AI tools involved, and remediation guidance.`,
    path: `/incidents/${id}`,
    tags: ['AI incident', 'coding failure', id, 'AI tools'],
  });
}

export default function IncidentDetailLayout({ children }) {
  return children;
}
