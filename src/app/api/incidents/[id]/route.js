import { NextResponse } from 'next/server';
import { IncidentStorage } from '@/lib/incident-storage';

export async function GET(request, context) {
  const storage = new IncidentStorage();
  const incident = await storage.getIncident((await context.params).id);
  
  if (!incident) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  
  return NextResponse.json(incident);
}
