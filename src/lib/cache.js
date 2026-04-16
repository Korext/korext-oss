const cache = new Map();

export function get(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export function set(key, value, ttlMs = 3600000) {
  cache.set(key, {
    value,
    expires: Date.now() + ttlMs
  });
}
