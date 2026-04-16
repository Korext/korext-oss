import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Read the schema.json from the project root
    const schemaPath = join(process.cwd(), 'schema.json');
    const schemaContent = readFileSync(schemaPath, 'utf8');
    
    return new Response(schemaContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Schema not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
