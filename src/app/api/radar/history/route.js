import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, max-age=3600',
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const metric = searchParams.get('metric');
  const days = Math.min(Math.max(parseInt(searchParams.get('days'), 10) || 30, 1), 365);

  if (!metric) {
    return NextResponse.json(
      { error: 'metric parameter is required. Example: /api/radar/history?metric=global&days=30' },
      { status: 400 }
    );
  }

  try {
    const publicPath = path.join(process.cwd(), 'public', 'radar-data', 'current.json');
    if (!fs.existsSync(publicPath)) {
      return NextResponse.json({ error: 'Data not initialized yet.' }, { status: 503 });
    }

    const data = JSON.parse(fs.readFileSync(publicPath, 'utf-8'));

    if (!data.time_series || !data.time_series.daily_global_ai_percentage) {
      return NextResponse.json({ error: 'Time series data not available yet.' }, { status: 404 });
    }

    // Currently the aggregator produces daily_global_ai_percentage.
    // Future: expand time_series to include per-metric history.
    const series = data.time_series.daily_global_ai_percentage;
    const sliced = series.slice(-days);

    return NextResponse.json(
      {
        metric,
        days,
        points: sliced.length,
        history: sliced,
        computed_at: data.computed_at,
      },
      { headers: CORS_HEADERS }
    );
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
