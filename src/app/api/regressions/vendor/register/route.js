import { NextResponse } from 'next/server';
import { saveSubmission } from '@/lib/submissions';
import { sanitizeInput, isValidEmail, isFreeEmailProvider } from '@/lib/sanitize';

export async function POST(request) {
  try {
    const raw = await request.json();
    const data = sanitizeInput(raw);

    const reqs = ['name', 'email', 'org', 'tool'];
    const missing = reqs.filter(k => !data[k]);
    if (missing.length > 0) {
      return NextResponse.json({ error: 'Missing required fields', missing }, { status: 400 });
    }

    // Email validation
    if (!isValidEmail(data.email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    if (isFreeEmailProvider(data.email)) {
      return NextResponse.json({ error: 'A corporate email address is required for vendor registration.' }, { status: 400 });
    }

    const { id, stored } = await saveSubmission('vendor-registrations', data);

    return NextResponse.json({
      success: true,
      registration_id: id,
      stored,
      message: 'Registration received. We will verify your corporate domain and contact you within 2 business days.'
    }, { status: 201 });

  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
