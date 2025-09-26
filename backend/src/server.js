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
  console.log(`backend listening on ${PORT}`);
});
