import CodeViewer from '../CodeViewer';

export default function CodeViewerExample() {
  const sampleCode = `Extract and summarize ONLY the lab results from the last 6 months.

Context: Patient follow-up visit
Required fields: HbA1c, fasting glucose
Exclude: All other medical history`;

  return (
    <div className="p-8">
      <CodeViewer code={sampleCode} title="Example Prompt" language="plaintext" />
    </div>
  );
}
