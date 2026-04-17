import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SUBS_DIR = path.join(process.cwd(), '.incident-data', 'subscriptions');

export async function POST(request) {
  try {
    const data = await request.json();
    if (!data.email || !data.criteria) {
      return NextResponse.json({ error: 'Missing email or criteria' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Store subscription to filesystem
    if (!fs.existsSync(SUBS_DIR)) {
      fs.mkdirSync(SUBS_DIR, { recursive: true });
    }

    const subId = `sub-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const subscription = {
      id: subId,
      email: data.email,
      criteria: data.criteria,
      created_at: new Date().toISOString(),
      status: 'active',
    };

    fs.writeFileSync(
      path.join(SUBS_DIR, `${subId}.json`),
      JSON.stringify(subscription, null, 2)
    );

    return NextResponse.json({
      success: true,
      subscription_id: subId,
      message: 'Subscription created. You will receive notifications when new incidents match your criteria.',
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
