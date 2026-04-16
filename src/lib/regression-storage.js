/**
 * Registration storage abstraction imitating incidents/registry storage.
 * Reads logic from local .yaml structures or mocks when empty.
 */
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const REG_DIR = path.join(process.cwd(), '.regression-data', 'published');

export async function getRegressionPattern(id) {
  if (!fs.existsSync(REG_DIR)) return null;
  const filePath = path.join(REG_DIR, `${id}.yaml`);
  if (!fs.existsSync(filePath)) return null;
  
  const content = fs.readFileSync(filePath, 'utf8');
  return yaml.load(content);
}

export async function getAllRegressionPatterns() {
  if (!fs.existsSync(REG_DIR)) return [];
  const files = fs.readdirSync(REG_DIR).filter(f => f.endsWith('.yaml'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(REG_DIR, file), 'utf8');
    return yaml.load(content);
  });
}

export async function searchRegressions(query) {
  const all = await getAllRegressionPatterns();
  if (!query) return all;
  
  const q = query.toLowerCase();
  return all.filter(item => 
    item.title?.toLowerCase().includes(q) || 
    item.summary?.toLowerCase().includes(q)
  );
}

export async function submitRegressionPattern(data) {
  const draftsDir = path.join(process.cwd(), '.regression-data', 'drafts');
  if (!fs.existsSync(draftsDir)) {
    fs.mkdirSync(draftsDir, { recursive: true });
  }
  
  const id = `SUB-2026-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  const filePath = path.join(draftsDir, `${id}.yaml`);
  
  fs.writeFileSync(filePath, yaml.dump(data));
  return { submission_id: id };
}

export async function detectPatternsInCode(code) {
    const all = await getAllRegressionPatterns();
    const matches = [];
    
    // Very rudimentary detection mock for demonstration
    for (const pattern of all) {
        if (pattern.detection?.custom_detection?.regex) {
            try {
                const re = new RegExp(pattern.detection.custom_detection.regex, 'g');
                if (re.test(code)) {
                    matches.push(pattern);
                }
            } catch(e) {}
        }
    }
    return matches;
}
