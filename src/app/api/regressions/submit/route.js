import { NextResponse } from 'next/server';
import { saveSubmission } from '@/lib/submissions';
import { sanitizeInput } from '@/lib/sanitize';

export async function POST(request) {
  try {
    const raw = await request.json();
    const data = sanitizeInput(raw);

    const reqs = ['title', 'category', 'severity', 'language'];
    const missing = reqs.filter(k => !data[k]);
    if (missing.length > 0) {
      return NextResponse.json({ error: 'Missing required fields', missing }, { status: 400 });
    }

    data.status = 'submitted';

    const { id, stored } = await saveSubmission('regressions', data);

    return NextResponse.json({
      success: true,
      submission_id: id,
      status: 'submitted',
      stored,
      message: 'Pattern submitted. Expected review: 5 to 10 business days. You will be notified of status changes.'
    }, { status: 201 });

  } catch {
    return NextResponse.json({ error: 'Invalid submission format' }, { status: 400 });
  }
}
