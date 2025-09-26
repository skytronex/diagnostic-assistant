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
