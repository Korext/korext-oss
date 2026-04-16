import { NextResponse } from 'next/server';
import { IncidentStorage } from '@/lib/incident-storage';

export async function GET() {
  const storage = new IncidentStorage();
  const incidents = await storage.getAllPublished();
  
  return NextResponse.json({
    license: "CC BY 4.0",
    attribution: "AI Incident Registry (https://oss.korext.com/incidents)",
    count: incidents.length,
    incidents
  });
}
