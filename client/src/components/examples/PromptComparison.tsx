import PromptComparison from '../PromptComparison';

export default function PromptComparisonExample() {
  const mockExample = {
    id: "privacy-minimization",
    title: "Data Minimization Example",
    challengeArea: "privacy" as const,
    traditional: {
      prompt: "Summarize this patient's complete medical record.",
      issues: [
        "Requests entire medical history unnecessarily",
        "Exposes all Protected Health Information (PHI)",
        "No scope limitation or purpose definition"
      ]
    },
    optimized: {
      prompt: `Extract and summarize ONLY the lab results from the last 6 months related to diabetes management.

Context: Patient follow-up visit for Type 2 Diabetes
Required fields: HbA1c, fasting glucose, lipid panel
Exclude: All other medical history, medications, personal identifiers`,
      benefits: [
        "Requests only necessary data for specific task",
        "Reduces PHI exposure by 85%",
        "Clear scope and purpose definition",
        "HIPAA-compliant data minimization"
      ]
    },
    metrics: [
      { label: "PHI Exposure", before: 100, after: 15, unit: "%" },
      { label: "Data Fields Accessed", before: 45, after: 3, unit: "fields" }
    ]
  };

  return (
    <div className="p-8">
      <PromptComparison example={mockExample} />
    </div>
  );
}
