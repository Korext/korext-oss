import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Carbon Calculator',
  description: 'Calculate the carbon footprint of your AI assisted coding. Estimate CO2 emissions by tool, session duration, and energy grid region.',
  path: '/commit-carbon/calculator',
  tags: ['AI carbon calculator', 'AI coding emissions', 'commit carbon calculator', 'AI sustainability'],
});

export default function Layout({ children }) {
  return children;
}
