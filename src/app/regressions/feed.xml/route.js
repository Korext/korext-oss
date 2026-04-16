import { NextResponse } from 'next/server';
import { getAllRegressionPatterns } from '@/lib/regression-storage';

export async function GET() {
  const patterns = await getAllRegressionPatterns();
  
  // Generate simple RSS 2.0 XML
  const items = patterns.map(p => `
    <item>
      <title><![CDATA[${p.identifier}: ${p.title}]]></title>
      <link>https://oss.korext.com/regressions/${p.identifier}</link>
      <category>${p.category}</category>
      <description><![CDATA[${p.summary}]]></description>
      <pubDate>${new Date(p.published_date || Date.now()).toUTCString()}</pubDate>
      <guid>https://oss.korext.com/regressions/${p.identifier}</guid>
    </item>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>AI Regression Database | Korext Open Source</title>
  <link>https://oss.korext.com/regressions</link>
  <description>The public corpus of code patterns that AI coding tools consistently generate incorrectly.</description>
  <language>en-us</language>
  ${items}
</channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
