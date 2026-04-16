import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.incident-data', 'counters');

export class IncidentCounter {
  constructor() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  async getNextIdentifier() {
    const year = new Date().getFullYear();
    const file = path.join(DATA_DIR, `${year}.txt`);
    
    // Simple naive allocation for OSS prototype
    let count = 1;
    if (fs.existsSync(file)) {
      count = parseInt(fs.readFileSync(file, 'utf8'), 10) + 1;
    }
    fs.writeFileSync(file, count.toString());
    
    return `AICI-${year}-${count.toString().padStart(4, '0')}`;
  }
}
