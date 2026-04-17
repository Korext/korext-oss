/**
 * Input sanitization for form submissions.
 *
 * Strips HTML tags, trims whitespace, and enforces field length limits
 * to prevent stored XSS and payload abuse.
 */

const MAX_FIELD_LENGTH = 5000;
const HTML_TAG_REGEX = /<[^>]*>/g;

/**
 * Sanitize a single string value.
 * Strips HTML tags and trims whitespace.
 *
 * @param {string} value - The raw input string
 * @param {number} maxLength - Maximum allowed length (default 5000)
 * @returns {string} Sanitized string
 */
export function sanitizeString(value, maxLength = MAX_FIELD_LENGTH) {
  if (typeof value !== 'string') return value;
  return value
    .replace(HTML_TAG_REGEX, '')
    .trim()
    .substring(0, maxLength);
}

/**
 * Sanitize all string fields in an object recursively.
 * Non-string values (numbers, booleans) are passed through unchanged.
 * Arrays are sanitized element by element.
 *
 * @param {object} data - The raw submission data
 * @returns {object} Sanitized copy
 */
export function sanitizeInput(data) {
  if (data === null || data === undefined) return data;

  if (typeof data === 'string') {
    return sanitizeString(data);
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeInput(item));
  }

  if (typeof data === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(data)) {
      cleaned[sanitizeString(key, 100)] = sanitizeInput(value);
    }
    return cleaned;
  }

  return data;
}

/**
 * Validate an email address format.
 *
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
}

const FREE_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
  'aol.com', 'protonmail.com', 'icloud.com', 'mail.com',
  'yandex.com', 'zoho.com',
];

/**
 * Check if an email domain is a free/consumer provider.
 *
 * @param {string} email - The email to check
 * @returns {boolean} Whether it's a free email provider
 */
export function isFreeEmailProvider(email) {
  if (typeof email !== 'string') return false;
  const domain = email.split('@')[1]?.toLowerCase();
  return FREE_EMAIL_DOMAINS.includes(domain);
}
