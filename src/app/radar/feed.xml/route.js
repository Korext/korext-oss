import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://oss.korext.com';

  // In production this would pull from stored weekly reports.
  // Items are added by scripts/radar/generate-report.js
  // when it runs the weekly aggregation.

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Code Radar Weekly Reports</title>
    <link>${baseUrl}/radar</link>
    <description>Weekly reports on AI code adoption across open source.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/radar/feed.xml" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
