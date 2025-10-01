import ComponentTable from '../ComponentTable';

export default function ComponentTableExample() {
  const mockComponents = [
    {
      name: "Prompt-Level Data Minimization",
      description: "Prompts structured to request only minimum necessary data",
      impact: "Reduces unnecessary PHI exposure by 70-85%"
    },
    {
      name: "Prompt Security & Injection Prevention",
      description: "Security layers that sanitize inputs to prevent malicious attacks",
      impact: "Blocks 99%+ of injection attempts"
    }
  ];

  return (
    <div className="p-8">
      <ComponentTable components={mockComponents} />
    </div>
  );
}
