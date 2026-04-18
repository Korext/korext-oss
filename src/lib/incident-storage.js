import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Reusing LocalFileBackend pattern from supply chain registry conceptually
// Note: In production this would interface with GCS/S3, per prompt instructions this 
// simulates the interface locally using files for the OSS project.

const DATA_DIR = path.join(process.cwd(), '.incident-data');

export class IncidentStorage {
  constructor() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(path.join(DATA_DIR, 'published'))) fs.mkdirSync(path.join(DATA_DIR, 'published'), { recursive: true });
    if (!fs.existsSync(path.join(DATA_DIR, 'drafts'))) fs.mkdirSync(path.join(DATA_DIR, 'drafts'), { recursive: true });
  }

  async savePublished(incident) {
    const file = path.join(DATA_DIR, 'published', `${incident.identifier}.yaml`);
    fs.writeFileSync(file, yaml.dump(incident));
    await this._updateIndex();
    return true;
  }

  async saveDraft(incident, subId) {
    const file = path.join(DATA_DIR, 'drafts', `${subId}.yaml`);
    fs.writeFileSync(file, yaml.dump(incident));
    return subId;
  }

  async getIncident(id) {
    const file = path.join(DATA_DIR, 'published', `${id}.yaml`);
    if (fs.existsSync(file)) {
      return yaml.load(fs.readFileSync(file, 'utf8'));
    }
    
    // Check examples directory for seed data
    try {
      const examplesDir = path.join(process.cwd(), '../ai-incident-registry/examples');
      if (fs.existsSync(examplesDir)) {
        const exampleFile = fs.readdirSync(examplesDir).find(f => f.includes(id));
        if (exampleFile) {
          return yaml.load(fs.readFileSync(path.join(examplesDir, exampleFile), 'utf8'));
        }
      }
    } catch {
      // Examples directory not available (e.g. production container)
    }
    return null;
  }

  async search(query = '', filters = {}) {
    await this._updateIndex();
    const indexFile = path.join(DATA_DIR, 'index.yaml');
    if (!fs.existsSync(indexFile)) return [];
    
    let all = yaml.load(fs.readFileSync(indexFile, 'utf8')) || [];
    
    // Apply filters
    if (filters.severity) {
      const sevs = filters.severity.split(',');
      all = all.filter(i => sevs.includes(i.severity));
    }
    if (filters.tool) {
      const tools = filters.tool.split(',').map(t => t.toLowerCase());
      all = all.filter(i => tools.some(t => Math.max(i.ai_tool.name.toLowerCase().indexOf(t), -1) >= 0));
    }
    if (filters.language) {
      const langs = filters.language.split(',').map(l => l.toLowerCase());
      all = all.filter(i => langs.includes(i.affected_pattern.language.toLowerCase()));
    }
    
    if (query) {
      const q = query.toLowerCase();
      all = all.filter(i => 
        i.title.toLowerCase().includes(q) || 
        i.summary.toLowerCase().includes(q) ||
        i.affected_pattern.pattern_type.toLowerCase().includes(q)
      );
    }
    
    return all.sort((a,b) => new Date(b.published_date) - new Date(a.published_date));
  }

  async _updateIndex() {
    // Only compile published
    const pubDir = path.join(DATA_DIR, 'published');
    const files = fs.readdirSync(pubDir).filter(f => f.endsWith('.yaml'));
    const index = files.map(f => {
      const doc = yaml.load(fs.readFileSync(path.join(pubDir, f), 'utf8'));
      return {
        identifier: doc.identifier,
        title: doc.title,
        severity: doc.severity,
        status: doc.status,
        published_date: doc.published_date,
        summary: doc.summary,
        ai_tool: doc.ai_tool,
        affected_pattern: doc.affected_pattern
      };
    });
    fs.writeFileSync(path.join(DATA_DIR, 'index.yaml'), yaml.dump(index));
  }

  async getAllPublished() {
    return this.search();
  }
}
