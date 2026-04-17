import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, max-age=86400',
};

/**
 * Serves the methodology document.
 * The document is stored in public/radar-data/METHODOLOGY.md
 * and copied there by the deploy script from the ai-code-radar repo.
 * This avoids a cross-repo relative path.
 */
export async function GET() {
  try {
    // Primary: check public directory (production path)
    let filePath = path.join(process.cwd(), 'public', 'radar-data', 'METHODOLOGY.md');

    // Fallback: check sibling repo (development path)
    if (!fs.existsSync(filePath)) {
      const devPath = path.join(process.cwd(), '..', 'ai-code-radar', 'METHODOLOGY.md');
      if (fs.existsSync(devPath)) {
        filePath = devPath;
      } else {
        return NextResponse.json(
          { error: 'Methodology document not found.' },
          { status: 404 }
        );
      }
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    return NextResponse.json(
      { format: 'markdown', content },
      { headers: CORS_HEADERS }
    );
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
