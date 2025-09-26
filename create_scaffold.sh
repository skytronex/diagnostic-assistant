#!/usr/bin/env bash
set -e
# Create directories
mkdir -p backend/src/prompts/templates backend/src/prompts/rules backend/src/prompts/services backend/src/rag backend/src/data/demo infra frontend
# backend files
cat > backend/Dockerfile <<'DOF'
FROM node:20-slim
WORKDIR /usr/src/app
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --only=production || true
COPY backend/ .
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "src/server.js"]
DOF
cat > backend/package.json <<'PKG'
{
  "name": "diagnostic-assistant-backend",
  "version": "0.1.0",
  "private": true,
  "main": "src/server.js",
  "scripts": {
    "dev": "nodemon --legacy-watch src/server.js",
    "start": "node src/server.js",
    "test": "jest --runInBand"
  },
  "dependencies": {
    "axios": "^1.5.0",
    "body-parser": "^1.20.2",
    "express": "^4.18.2",
    "redis": "^4.6.7",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "jest": "^29.6.1",
    "nodemon": "^3.0.1"
  }
}
PKG
mkdir -p backend/src
cat > backend/src/server.js <<'SRV'
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { buildAndSendPrompt } = require('./prompts/services/prompt_manager');

const app = express();
app.use(bodyParser.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/diagnose', async (req, res) => {
  try {
    const { user, patientId, structuredInput, mode } = req.body;
    const result = await buildAndSendPrompt({ user, patientId, structuredInput, mode });
    res.json(result);
  } catch (err) {
    console.error('error /api/diagnose', err);
    res.status(500).json({ error: 'internal_error', message: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(\`backend listening on \${PORT}\`);
});
SRV

# prompts template
cat > backend/src/prompts/templates/diagnostic_assistant_v1.txt <<'TPT'
SYSTEM:
You are a clinical assistant. Provide a reasoned assessment and recommended next steps.
Always include:
- Diagnosis (differential)
- Supporting Evidence (cite retrieved items with [doc:id])
- Confidence level (low/medium/high)
- Disclaimers: "This is not a final diagnosis."

INPUT:
Structured Input:
{{STRUCTURED_INPUT}}

Retrieved Context:
{{RETRIEVED_CONTEXT}}

OUTPUT:
Produce a JSON object with keys:
{
  "diagnosis": "...",
  "evidence": ["doc:id", "..."],
  "recommendations": ["..."],
  "confidence": "low|medium|high",
  "notes": "..."
}
TPT

# injection check
cat > backend/src/prompts/rules/injection_check.js <<'RCK'
const blockedPatterns = [
  /ignore previous instructions/i,
  /give me .*ssn/i,
  /show me .*social security/i,
  /exfiltrate/i
];

function checkInjection(text = '') {
  const lower = String(text);
  for (const rx of blockedPatterns) {
    if (rx.test(lower)) return true;
  }
  return false;
}

function checkPII(text = '') {
  const longDigits = /\b\d{6,}\b/;
  return longDigits.test(String(text));
}

module.exports = { checkInjection, checkPII };
RCK

# prompt manager
cat > backend/src/prompts/services/prompt_manager.js <<'PM'
const fs = require('fs');
const path = require('path');
const { checkInjection, checkPII } = require('../rules/injection_check');

async function retrieveContext({ patientId, fields = [], topK = 3 }) {
  return [
    { id: 'doc:guideline-1', source: 'Guideline A', text: 'If chest pain with shortness of breath in elderly, consider MI.' },
    { id: 'doc:record-1', source: 'EHR', text: 'Patient had elevated BP in prior visit.' }
  ].slice(0, topK);
}

function loadTemplate(name = 'diagnostic_assistant_v1') {
  const p = path.join(__dirname, '..', 'templates', `${name}.txt`);
  return fs.readFileSync(p, 'utf8');
}

function fillTemplate(template, vars = {}) {
  return template
    .replace('{{STRUCTURED_INPUT}}', vars.structuredInput || '')
    .replace('{{RETRIEVED_CONTEXT}}', vars.retrievedContext || '');
}

async function callLLM({ prompt }) {
  return {
    text: JSON.stringify({
      diagnosis: 'Possible Myocardial Infarction (MI)',
      evidence: ['doc:guideline-1', 'doc:record-1'],
      recommendations: ['Order ECG', 'Check troponin'],
      confidence: 'medium',
      notes: 'This is a demo response.'
    })
  };
}

async function buildAndSendPrompt({ user = {}, patientId, structuredInput = {}, mode = 'bridged' }) {
  if (!structuredInput.chiefComplaint && mode === 'bridged') {
    return { error: 'chiefComplaint_required' };
  }
  const freeText = structuredInput.freeText || '';
  if (checkInjection(freeText)) {
    return { error: 'input_blocked_injection' };
  }
  if (checkPII(freeText)) {
    structuredInput.freeText = freeText.replace(/\\d/g, 'X');
  }
  const retrieved = await retrieveContext({ patientId, fields: [], topK: 3 });
  const contextStr = retrieved.map(r => `[${r.id}] ${r.text}`).join('\\n');
  const template = loadTemplate('diagnostic_assistant_v1');
  const filled = fillTemplate(template, { structuredInput: JSON.stringify(structuredInput, null, 2), retrievedContext: contextStr });
  if (checkInjection(filled)) {
    return { error: 'assembled_prompt_blocked' };
  }
  const llmResp = await callLLM({ prompt: filled });
  let parsed;
  try {
    parsed = JSON.parse(llmResp.text);
  } catch (e) {
    return { error: 'llm_parse_failed', raw: llmResp.text };
  }
  console.log('AUDIT:', { user: user.id || 'anon', patientId, retrieved: retrieved.map(r => r.id) });
  return { data: parsed, sources: retrieved.map(r => r.id) };
}

module.exports = { buildAndSendPrompt };
PM

# index builder
cat > backend/src/rag/index_builder.js <<'IB'
const fs = require('fs');
const path = require('path');

async function buildIndex() {
  console.log('Building demo index from backend/src/data/demo...');
  const demoPath = path.join(__dirname, '..', 'data', 'demo');
  if (!fs.existsSync(demoPath)) {
    console.warn('No demo data found at', demoPath);
    return;
  }
  const out = { builtAt: new Date().toISOString(), docs: fs.readdirSync(demoPath) };
  const outPath = path.join(__dirname, '..', 'data', 'processed', 'demo_index.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log('Demo index written to', outPath);
}

if (require.main === module) {
  buildIndex().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { buildIndex };
IB

# demo data
echo "Patient record example" > backend/src/data/demo/patient1.txt

# docker compose
cat > backend/docker-compose.demo.yml <<'DC'
version: '3.8'
services:
  redis:
    image: redis:7
    container_name: diagnostic_redis
    ports:
      - "6379:6379"
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: diagnostic_backend
    environment:
      - PORT=4000
      - NODE_ENV=development
    ports:
      - "4000:4000"
    depends_on:
      - redis
    volumes:
      - ./:/usr/src/app
DC

# infra compose
cat > infra/docker-compose.demo.yml <<'IDC'
version: '3.8'
services:
  backend:
    build:
      context: ../backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    volumes:
      - ../backend:/usr/src/app
    depends_on:
      - redis
  redis:
    image: redis:7
    ports:
      - "6379:6379"
IDC

# .env.example
cat > .env.example <<'ENV'
PORT=4000
NODE_ENV=development
LLM_API_KEY=replace-with-key
VECTOR_DB_API_KEY=replace-with-key
REDIS_URL=redis://localhost:6379
ENV

# frontend placeholder
cat > frontend/package.json <<'FP'
{
  "name": "diagnostic-assistant-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start": "echo \"Add frontend framework (React/Vite) in frontend/src and run dev here\" && exit 0",
    "build": "echo \"Build step\" && exit 0",
    "test": "echo \"No tests yet\" && exit 0"
  }
}
FP

# test
mkdir -p backend/src/tests
cat > backend/src/tests/prompt_manager.test.js <<'TST'
const { buildAndSendPrompt } = require('../prompts/services/prompt_manager');

test('buildAndSendPrompt returns data for bridged mode with chiefComplaint', async () => {
  const res = await buildAndSendPrompt({
    user: { id: 'testuser' },
    patientId: 'patient-1',
    structuredInput: { chiefComplaint: 'chest pain', freeText: '65 year male with chest pain' },
    mode: 'bridged'
  });
  expect(res.data).toBeDefined();
  expect(res.data.diagnosis).toMatch(/MI|Myocardial|Possible/);
  expect(Array.isArray(res.sources)).toBe(true);
});
TST

echo "scaffold created"
