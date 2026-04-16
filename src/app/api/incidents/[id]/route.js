import { NextResponse } from 'next/server';
import { IncidentStorage } from '@/lib/incident-storage';

export async function GET(request, { params }) {
  const storage = new IncidentStorage();
  const incident = await storage.getIncident(params.id);
  
  if (!incident) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  
  return NextResponse.json(incident);
}
