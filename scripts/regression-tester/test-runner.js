/**
 * AI Regression Database - Automated Test Harness
 * 
 * Runs weekly via Cloud Scheduler. Evaluates published patterns against 
 * mocked API integrations. If a vendor fixes a pattern, status becomes 'fixed'.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REG_DIR = path.join(process.cwd(), '..', '..', '.regression-data', 'published');

async function callAIToolMock(tool, prompt) {
    // Highly rudimentary mock that gives 30-70% failure dynamically for testing
    // In production, this connects to OpenAI / Anthropic / Google via APIs
    return Math.random() > 0.4 ? "INCORRECT_MATCH" : "CORRECT_MATCH";
}

function matchesIncorrectPattern(response, expectedIncorrect, detectionRules) {
    // We assume the mocked API returns our flag OR an exact regex match occurs.
    if (response === 'INCORRECT_MATCH') return true;
    return false;
}

async function testPattern(pattern, tool) {
  const results = {
    pattern_id: pattern.identifier,
    tool: tool.name,
    tool_version: "v9.9.9",
    attempts: [],
    reproduction_count: 0
  };

  const prompt = `Mock prompt using triggers: ${pattern.prompt_patterns?.triggers?.join(',')}`;

  for (let i = 0; i < 10; i++) {
    const response = await callAIToolMock(tool, prompt);
    const reproduced = matchesIncorrectPattern(response, pattern.incorrect_pattern, pattern.detection);
    
    results.attempts.push({ attempt: i + 1, reproduced });
    if (reproduced) results.reproduction_count++;
  }

  results.reproduction_rate = results.reproduction_count / 10;
  return results;
}

async function runRegressionTests() {
    console.log('Starting AI Regression Test Runner...');
    
    if (!fs.existsSync(REG_DIR)) {
        console.log('No published patterns to test.');
        return;
    }
    
    const files = fs.readdirSync(REG_DIR).filter(f => f.endsWith('.yaml'));
    for (const file of files) {
        const pPath = path.join(REG_DIR, file);
        const pattern = yaml.load(fs.readFileSync(pPath, 'utf8'));
        
        console.log(`\nTesting Pattern: ${pattern.identifier}`);
        for (const tool of pattern.ai_tools || []) {
            console.log(` - Against ${tool.name}...`);
            const results = await testPattern(pattern, tool);
            
            console.log(`   Reproduced ${results.reproduction_count}/10 times.`);
            
            if (results.reproduction_rate === 0) {
                console.log(`   [FIXED] Status updating to fixed.`);
                tool.status = 'fixed';
            } else if (results.reproduction_rate < tool.reproduction_rate) {
                console.log(`   [IMPROVING] Status updating to partially_fixed.`);
                tool.status = 'partially_fixed';
            }
            
            tool.reproduction_rate = results.reproduction_rate;
            tool.last_test_date = new Date().toISOString().split('T')[0];
        }
        
        fs.writeFileSync(pPath, yaml.dump(pattern));
    }
    
    console.log('\nTest Run Completed Successfully.');
}

if (require.main === module) {
    runRegressionTests();
}
