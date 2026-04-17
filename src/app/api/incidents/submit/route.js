import { NextResponse } from 'next/server';
import { saveSubmission } from '@/lib/submissions';
import { sanitizeInput } from '@/lib/sanitize';

export async function POST(request) {
  try {
    const raw = await request.json();
    const data = sanitizeInput(raw);

    const reqs = ['title', 'summary', 'severity', 'ai_tool', 'affected_pattern', 'incorrect_pattern'];
    const missing = reqs.filter(k => !data[k]);
    if (missing.length > 0) {
      return NextResponse.json({ error: 'Missing required fields', missing }, { status: 400 });
    }

    data.status = 'under_review';

    const { id, stored } = await saveSubmission('incidents', data);

    return NextResponse.json({
      success: true,
      submission_id: id,
      status: 'under_review',
      stored,
      message: 'Submission received. Expected review: 5 to 10 business days.'
    }, { status: 201 });

  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
