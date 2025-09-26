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
