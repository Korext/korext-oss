import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    if (!data.email || !data.criteria) {
      return NextResponse.json({ error: 'Missing email or criteria' }, { status: 400 });
    }

    // In a real implementation we would save this to a database
    // For OSS we mock a success response to close the loop.
    console.log(`Subscribed ${data.email} to criteria`, data.criteria);

    return NextResponse.json({ 
      success: true, 
      message: 'Subscription created. You will receive notifications when new incidents match your criteria.' 
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
