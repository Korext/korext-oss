import { NextResponse } from 'next/server';

const BUCKET = 'korext-oss-submissions';

async function getAccessToken() {
  try {
    const res = await fetch(
      'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
      { headers: { 'Metadata-Flavor': 'Google' }, signal: AbortSignal.timeout(2000) }
    );
    if (!res.ok) return null;
    const { access_token } = await res.json();
    return access_token;
  } catch {
    return null;
  }
}

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

    const subId = `sub-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const subscription = {
      id: subId,
      email: data.email,
      criteria: data.criteria,
      created_at: new Date().toISOString(),
      status: 'active',
    };

    const objectName = `subscriptions/${subId}.json`;
    const jsonString = JSON.stringify(subscription, null, 2);

    // Persist to GCS (durable across container restarts)
    const token = await getAccessToken();
    if (token) {
      const uploadUrl = `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET}/o?uploadType=media&name=${encodeURIComponent(objectName)}`;
      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: jsonString,
      });

      if (!res.ok) {
        const err = await res.text();
        console.error(`[subscribe] GCS upload failed: ${err}`);
      } else {
        console.log(`[subscribe] Saved ${objectName} to gs://${BUCKET}/`);
      }
    } else {
      console.log(`[subscribe] DEV MODE - Would save ${objectName}:`, jsonString.substring(0, 200));
    }

    return NextResponse.json({
      success: true,
      subscription_id: subId,
      message: 'Subscription created. You will receive notifications when new incidents match your criteria.',
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
