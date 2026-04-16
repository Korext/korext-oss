import { NextResponse } from 'next/server';
import { IncidentStorage } from '@/lib/incident-storage';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const severity = searchParams.get('severity') || '';
  const tool = searchParams.get('tool') || '';
  const language = searchParams.get('language') || '';
  
  const storage = new IncidentStorage();
  const results = await storage.search(q, { severity, tool, language });

  return NextResponse.json(results);
}
