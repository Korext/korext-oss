import { NextResponse } from 'next/server';
import { IncidentStorage } from '@/lib/incident-storage';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // In production, robust validation here.
    const reqs = ['title', 'summary', 'severity', 'ai_tool', 'affected_pattern', 'incorrect_pattern'];
    const missing = reqs.filter(k => !data[k]);
    if (missing.length > 0) {
      return NextResponse.json({ error: 'Missing required fields', missing }, { status: 400 });
    }

    const storage = new IncidentStorage();
    const subId = `SUB-${new Date().toISOString().split('T')[0]}-${Math.random().toString(36).substring(2, 6)}`;
    
    data.status = 'under_review';
    
    await storage.saveDraft(data, subId);

    return NextResponse.json({ 
      success: true, 
      submission_id: subId,
      status: 'under_review',
      message: 'Submission received. Expected review: 5 to 10 business days.'
    }, { status: 201 });

  } catch (err) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
