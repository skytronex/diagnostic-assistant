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
