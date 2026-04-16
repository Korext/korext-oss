import { IncidentStorage } from '@/lib/incident-storage';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const severity = searchParams.get('severity') || '';
  const tool = searchParams.get('tool') || '';
  const language = searchParams.get('language') || '';
  
  const storage = new IncidentStorage();
  const incidents = await storage.search('', { severity, tool, language });

  const buildDate = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>AI Incident Registry</title>
  <link>https://oss.korext.com/incidents</link>
  <description>The public registry of AI authored code failures.</description>
  <lastBuildDate>${buildDate}</lastBuildDate>
  ${incidents.map(inc => `
  <item>
    <title>${inc.identifier}: ${inc.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>
    <link>https://oss.korext.com/incidents/${inc.identifier}</link>
    <description>${inc.summary.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</description>
    <category>${inc.severity}</category>
    <pubDate>${new Date(inc.published_date).toUTCString()}</pubDate>
    <guid>https://oss.korext.com/incidents/${inc.identifier}</guid>
    <author>registry@korext.com (AI Incident Registry)</author>
  </item>`).join('')}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml' }
  });
}
