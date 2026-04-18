import { NextResponse } from 'next/server';
import { IncidentStorage } from '@/lib/incident-storage';

export async function GET(request, context) {
  try {
    const storage = new IncidentStorage();
    const { id } = await context.params;
    const incident = await storage.getIncident(id);
    
    if (!incident) {
      return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
    }
    
    return NextResponse.json(incident);
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
