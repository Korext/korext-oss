import 'server-only';

/**
 * Shared submission handler for all OSS form submissions.
 *
 * Writes submissions as JSON objects to a GCS bucket when running
 * on Cloud Run (detected via metadata server availability).
 * Falls back to logging in development.
 *
 * Sends email notification on every submission via Gmail SMTP.
 *
 * Bucket structure:
 *   gs://korext-oss-submissions/
 *     incidents/SUB-2026-04-16-abc123.json
 *     regressions/SUB-2026-04-16-abc123.json
 *     vendor-registrations/SUB-2026-04-16-abc123.json
 */

import nodemailer from 'nodemailer';

const BUCKET = 'korext-oss-submissions';

function generateId() {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const rand = Math.random().toString(36).substring(2, 8);
  return `SUB-${date}-${rand}`;
}

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

/**
 * Send email notification for a new submission.
 * Fails silently so submissions are never blocked by email issues.
 */
async function sendNotification(category, id, data) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notifyTo = process.env.NOTIFY_EMAIL;

  if (!smtpUser || !smtpPass || !notifyTo) {
    console.log('[submissions] Email not configured, skipping notification');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const label = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const preview = JSON.stringify(data, null, 2).substring(0, 1500);

    await transporter.sendMail({
      from: `"Korext OSS" <${smtpUser}>`,
      to: notifyTo,
      subject: `[${label}] New submission: ${id}`,
      text: [
        `New ${label} submission received.`,
        '',
        `ID: ${id}`,
        `Category: ${category}`,
        `Time: ${new Date().toISOString()}`,
        '',
        'Data:',
        preview,
        '',
        `View in GCS: https://console.cloud.google.com/storage/browser/korext-oss-submissions/${category}/?project=korext-oss`,
      ].join('\n'),
    });

    console.log(`[submissions] Notification sent to ${notifyTo} for ${id}`);
  } catch (err) {
    console.error(`[submissions] Email failed (non-blocking): ${err.message}`);
  }
}

/**
 * Save a form submission.
 *
 * @param {string} category - Submission category (e.g. 'incidents', 'regressions', 'vendor-registrations')
 * @param {object} data - The submission data (will be JSON-serialized)
 * @returns {{ id: string, stored: boolean }} Submission ID and whether it was persisted
 */
export async function saveSubmission(category, data) {
  const id = generateId();
  const submission = {
    id,
    category,
    submitted_at: new Date().toISOString(),
    data,
  };

  const objectName = `${category}/${id}.json`;
  const jsonString = JSON.stringify(submission, null, 2);

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
      console.error(`[submissions] GCS upload failed: ${err}`);
      return { id, stored: false };
    }

    console.log(`[submissions] Saved ${objectName} to gs://${BUCKET}/`);
  } else {
    console.log(`[submissions] DEV MODE - Would save ${objectName}:`, JSON.stringify(data).substring(0, 200));
  }

  // Send email notification (non-blocking, never fails the submission)
  sendNotification(category, id, data).catch(() => {});

  return { id, stored: !!token };
}
