import { NextResponse } from 'next/server';
import { IncidentStorage } from '@/lib/incident-storage';

export async function GET(request, context) {
  const { id: ruleId } = await context.params;
  const storage = new IncidentStorage();
  const incidents = await storage.getAllPublished();
  
  const matched = incidents.filter(i => 
    i.detection?.korext_rule_ids?.includes(ruleId) ||
    i.detection?.semgrep_rules?.includes(ruleId) ||
    i.detection?.snyk_rules?.includes(ruleId)
  );

  return NextResponse.json(matched);
}
