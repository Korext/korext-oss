const CONSENT_KEY = 'korext_consent';
const CONSENT_VERSION = '1.0';

export function getConsent(category) {
  if (typeof window === 'undefined') return false;

  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return false;

    const data = JSON.parse(stored);

    // If version mismatch, treat as no consent
    if (data.version !== CONSENT_VERSION) return false;

    return data.preferences?.[category] ?? false;
  } catch {
    return false;
  }
}

export function hasConsented() {
  if (typeof window === 'undefined') return false;

  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return false;

    const data = JSON.parse(stored);
    return data.version === CONSENT_VERSION && data.consent === true;
  } catch {
    return false;
  }
}

export function setConsent(preferences) {
  if (typeof window === 'undefined') return;

  const data = {
    consent: true,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
    preferences: {
      necessary: true, // Always true
      analytics: preferences.analytics ?? false,
      marketing: false // Always false for now
    }
  };

  localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
}

export function clearConsent() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_KEY);
}

export function getConsentData() {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function getConsentTimestamp() {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    return JSON.parse(stored).timestamp;
  } catch {
    return null;
  }
}

export { CONSENT_VERSION };
