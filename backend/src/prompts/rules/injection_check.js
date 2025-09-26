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
