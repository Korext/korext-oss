import yaml from 'js-yaml';

export function parseAttestation(text, isYaml) {
  if (!text) return null;
  try {
    if (isYaml) {
      return yaml.load(text);
    }
    return JSON.parse(text);
  } catch (err) {
    return null;
  }
}
