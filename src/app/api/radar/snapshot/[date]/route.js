import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, max-age=31536000, immutable',
};

/**
 * Snapshots are stored in public/radar-data/snapshots/ alongside current.json.
 * The aggregator writes them there during its hourly run.
 * This avoids a cross-repo relative path that would break in production.
 */
export async function GET(request, context) {
  const { date } = await context.params;

  if (!/^\d{4}-\d{2}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Invalid date format. Expected YYYY-MM-DD-HH (e.g. 2026-04-15-12).' },
      { status: 400 }
    );
  }

  try {
    const snapshotPath = path.join(process.cwd(), 'public', 'radar-data', 'snapshots', `${date}.json`);

    if (!fs.existsSync(snapshotPath)) {
      return NextResponse.json(
        { error: `Snapshot ${date} not found. Snapshots are retained for 7 days (hourly), 90 days (daily), and 2 years (weekly).` },
        { status: 404 }
      );
    }

    const data = JSON.parse(fs.readFileSync(snapshotPath, 'utf-8'));
    return NextResponse.json(data, { headers: CORS_HEADERS });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
