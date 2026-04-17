import { NextResponse } from 'next/server';

// Built-in detection patterns matching the CLI @korext/regression-submit detect patterns
const BUILTIN_PATTERNS = [
  {
    id: 'ARD-BUILTIN-001',
    title: 'SQL string concatenation',
    severity: 'high',
    category: 'security',
    regex: '(?:query|execute|exec|sql)\\s*\\(\\s*(?:[\'"`]|f[\'"`])\\s*(?:SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER)\\b[^)]*\\+',
    description: 'SQL query built with string concatenation instead of parameterized queries',
  },
  {
    id: 'ARD-BUILTIN-002',
    title: 'Hardcoded secret or API key',
    severity: 'critical',
    category: 'security',
    regex: '(?:api[_-]?key|secret|password|token|auth)\\s*[:=]\\s*[\'"][A-Za-z0-9+/=_-]{16,}[\'"]',
    description: 'Credential or API key hardcoded in source instead of environment variable',
  },
  {
    id: 'ARD-BUILTIN-003',
    title: 'eval() with dynamic input',
    severity: 'high',
    category: 'security',
    regex: '\\beval\\s*\\(\\s*(?![\'"`])[a-zA-Z_$]',
    description: 'eval() called with variable input, enabling code injection',
  },
  {
    id: 'ARD-BUILTIN-004',
    title: 'JWT verification disabled',
    severity: 'critical',
    category: 'security',
    regex: '(?:verify|algorithms)\\s*[:=]\\s*(?:false|\'none\'|"none"|\\[\'none\'\\]|\\["none"\\]|None)',
    description: 'JWT signature verification disabled or algorithm set to none',
  },
  {
    id: 'ARD-BUILTIN-005',
    title: 'Unchecked null/undefined access',
    severity: 'medium',
    category: 'correctness',
    regex: '(?:\\.data|\\.result|\\.response|\\.body|\\.user|\\.params)\\.[a-zA-Z]+\\.[a-zA-Z]+(?!\\s*\\?\\.)(?!\\s*&&)',
    description: 'Deep property access without null check or optional chaining',
  },
  {
    id: 'ARD-BUILTIN-006',
    title: 'Synchronous file I/O in async context',
    severity: 'medium',
    category: 'performance',
    regex: '(?:readFileSync|writeFileSync|execSync|accessSync)\\s*\\(',
    description: 'Synchronous filesystem or process call in code that should be async',
  },
  {
    id: 'ARD-BUILTIN-007',
    title: 'Console.log left in production code',
    severity: 'low',
    category: 'maintainability',
    regex: '\\bconsole\\.(log|debug|info)\\s*\\(\\s*[\'"`](?:debug|test|TODO|FIXME|hack|temp)',
    description: 'Debug logging with temporary markers left in code',
  },
  {
    id: 'ARD-BUILTIN-008',
    title: 'Catch block swallows error',
    severity: 'medium',
    category: 'correctness',
    regex: 'catch\\s*\\([^)]*\\)\\s*\\{\\s*\\}',
    description: 'Empty catch block silently swallows errors',
  },
  {
    id: 'ARD-BUILTIN-009',
    title: 'Math.random for security',
    severity: 'high',
    category: 'security',
    regex: '(?:token|secret|key|session|nonce|salt|id)\\s*[:=]\\s*.*Math\\.random',
    description: 'Math.random() used to generate security-sensitive values instead of crypto',
  },
  {
    id: 'ARD-BUILTIN-010',
    title: 'Shell command injection',
    severity: 'critical',
    category: 'security',
    regex: '(?:exec|spawn|system|popen|subprocess\\.call|os\\.system)\\s*\\(\\s*(?:[\'"`].*\\$\\{|[a-zA-Z_$]+\\s*\\+|f[\'"`])',
    description: 'Shell command built with string interpolation, enabling command injection',
  },
];

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.code || typeof data.code !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "code" field. Send { "code": "..." } to scan.' },
        { status: 400 }
      );
    }

    const code = data.code;
    const lines = code.split('\n');
    const matches = [];

    for (const pattern of BUILTIN_PATTERNS) {
      try {
        const re = new RegExp(pattern.regex, 'i');
        for (let i = 0; i < lines.length; i++) {
          if (re.test(lines[i])) {
            matches.push({
              pattern_id: pattern.id,
              title: pattern.title,
              severity: pattern.severity,
              category: pattern.category,
              line: i + 1,
              snippet: lines[i].trim().substring(0, 200),
              description: pattern.description,
              url: `https://oss.korext.com/regressions/${pattern.id}`,
            });
            break; // One match per pattern
          }
        }
      } catch {
        // Skip invalid regex
      }
    }

    return NextResponse.json({
      scanned_lines: lines.length,
      patterns_loaded: BUILTIN_PATTERNS.length,
      matches_found: matches.length,
      matches,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
