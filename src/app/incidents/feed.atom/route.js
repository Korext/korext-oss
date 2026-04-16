import { IncidentStorage } from '@/lib/incident-storage';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const severity = searchParams.get('severity') || '';
  const tool = searchParams.get('tool') || '';
  const language = searchParams.get('language') || '';
  
  const storage = new IncidentStorage();
  const incidents = await storage.search('', { severity, tool, language });

  const buildDate = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>AI Incident Registry</title>
  <subtitle>The public registry of AI authored code failures.</subtitle>
  <link href="https://oss.korext.com/incidents/feed.atom" rel="self" />
  <link href="https://oss.korext.com/incidents" />
  <id>https://oss.korext.com/incidents</id>
  <updated>${buildDate}</updated>
  <author><name>AI Incident Registry</name></author>
  ${incidents.map(inc => `
  <entry>
    <title>${inc.identifier}: ${inc.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>
    <link href="https://oss.korext.com/incidents/${inc.identifier}" />
    <id>https://oss.korext.com/incidents/${inc.identifier}</id>
    <updated>${new Date(inc.published_date).toISOString()}</updated>
    <summary>${inc.summary.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</summary>
    <category term="${inc.severity}" />
  </entry>`).join('')}
</feed>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/atom+xml' }
  });
}
