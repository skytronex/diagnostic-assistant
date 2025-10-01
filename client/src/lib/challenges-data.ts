import { ChallengeData, PromptExample } from "@shared/schema";

export const challengesData: ChallengeData[] = [
  {
    id: "privacy",
    title: "Data Privacy & Security",
    icon: "Shield",
    description: "Implementing prompt-level data minimization and security layers to protect Protected Health Information (PHI)",
    color: "chart-1",
    components: [
      {
        name: "Prompt-Level Data Minimization",
        description: "Prompts structured to request only minimum necessary data, reducing PHI exposure",
        impact: "Reduces unnecessary PHI exposure by 70-85%"
      },
      {
        name: "Prompt Security & Injection Prevention",
        description: "Security layers that sanitize inputs to prevent malicious prompt injection attacks",
        impact: "Blocks 99%+ of injection attempts"
      },
      {
        name: "API & Access Control",
        description: "Ensures prompts only access authorized data and services with proper permissions",
        impact: "Enforces role-based access at prompt level"
      }
    ]
  },
  {
    id: "quality",
    title: "Data Quality & Interoperability",
    icon: "Database",
    description: "Extracting structured data from fragmented sources and enabling seamless system integration",
    color: "chart-2",
    components: [
      {
        name: "Structured Data Extraction",
        description: "Normalizes and extracts clean, machine-readable data from unstructured physician notes",
        impact: "Reduces data processing time by 60%"
      },
      {
        name: "Dynamic Contextualization",
        description: "Synthesizes relevant data from disparate sources like EHRs and lab reports dynamically",
        impact: "Unifies 5+ fragmented data sources"
      },
      {
        name: "Feedback Loops for Data Improvement",
        description: "Clinician review interfaces that continuously refine AI models and prompts",
        impact: "Improves accuracy by 15-25% over time"
      }
    ]
  },
  {
    id: "bias",
    title: "Algorithmic Bias & Transparency",
    icon: "Eye",
    description: "Promoting ethical AI through bias mitigation guardrails and explainable outputs",
    color: "chart-3",
    components: [
      {
        name: "Prompt-Based Bias Mitigation",
        description: "Guardrails and personas that instruct models to consider diverse demographics",
        impact: "Reduces demographic bias by 40-60%"
      },
      {
        name: "Transparent & Explainable Outputs",
        description: "Prompts require AI to provide reasoning and cite contributing factors",
        impact: "Enables clinical validation of all outputs"
      },
      {
        name: "Human-in-the-Loop Interface",
        description: "UI designs where AI outputs are clearly marked as recommendations, not decisions",
        impact: "Maintains clinical oversight and control"
      }
    ]
  },
  {
    id: "cost",
    title: "Cost & Technical Accessibility",
    icon: "DollarSign",
    description: "Making AI accessible through rapid prototyping, intuitive interfaces, and efficient resource management",
    color: "chart-4",
    components: [
      {
        name: "Rapid Prototyping & Deployment",
        description: "Quick functional prototypes using existing LLMs and cloud APIs",
        impact: "Reduces time-to-value by 75%"
      },
      {
        name: "Bridging the Gap for Clinical Staff",
        description: "Intuitive interfaces enabling staff to interact with AI using natural language",
        impact: "Zero technical training required"
      },
      {
        name: "Efficient Resource Management",
        description: "Token-efficient prompts and judicious AI workflow design",
        impact: "Reduces operational costs by 40-55%"
      }
    ]
  },
  {
    id: "regulatory",
    title: "Regulatory & Ethical Compliance",
    icon: "Scale",
    description: "Integrating compliance constraints and ethical principles directly into AI system design",
    color: "chart-5",
    components: [
      {
        name: "Prompt-Based Compliance",
        description: "Regulatory constraints built into prompts (e.g., FDA guideline adherence)",
        impact: "Automated compliance enforcement"
      },
      {
        name: "Documentation & Audit Trails",
        description: "Comprehensive logging of all prompts, responses, and interactions",
        impact: "Complete decision-making transparency"
      },
      {
        name: "Ethical Oversight Frameworks",
        description: "Technical mechanisms to enforce ethical AI governance principles",
        impact: "Ensures ethical AI deployment"
      }
    ]
  }
];

export const promptExamples: PromptExample[] = [
  {
    id: "privacy-minimization",
    title: "Data Minimization Example",
    challengeArea: "privacy",
    traditional: {
      prompt: "Summarize this patient's complete medical record.",
      issues: [
        "Requests entire medical history unnecessarily",
        "Exposes all Protected Health Information (PHI)",
        "No scope limitation or purpose definition",
        "Violates data minimization principles"
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
  },
  {
    id: "quality-extraction",
    title: "Structured Data Extraction",
    challengeArea: "quality",
    traditional: {
      prompt: "Get patient information from the notes.",
      issues: [
        "Vague request with no structure",
        "Returns unformatted text blocks",
        "Inconsistent field extraction",
        "Not machine-readable output"
      ]
    },
    optimized: {
      prompt: `Extract the following structured information from the physician's note:

Required JSON format:
{
  "diagnosis": "string",
  "medications": ["medication name", "dosage", "frequency"],
  "followUpDate": "YYYY-MM-DD",
  "labOrdersRequested": ["test name"]
}

Validation: All dates must be in ISO format. If any field is not mentioned, use null.`,
      benefits: [
        "Machine-readable JSON output",
        "Consistent field extraction across notes",
        "Validation rules ensure data quality",
        "Direct integration with EHR systems"
      ]
    },
    metrics: [
      { label: "Data Accuracy", before: 68, after: 94, unit: "%" },
      { label: "Processing Time", before: 120, after: 45, unit: "sec" }
    ]
  },
  {
    id: "bias-mitigation",
    title: "Bias-Aware Diagnostic Aid",
    challengeArea: "bias",
    traditional: {
      prompt: "Provide a diagnosis based on these symptoms.",
      issues: [
        "No demographic consideration",
        "Black-box reasoning with no explanation",
        "Potential for systemic bias",
        "No data limitation acknowledgment"
      ]
    },
    optimized: {
      prompt: `Provide a differential diagnosis considering diverse patient demographics.

Patient context: Age, gender, ethnicity (if provided)
Instructions:
1. Consider how symptoms may present differently across demographics
2. Highlight any data limitations that could affect diagnosis
3. Cite the top 3 contributing factors from medical history
4. Note if additional demographic-specific screening is recommended

Format: Provide diagnosis with explicit reasoning and demographic considerations.`,
      benefits: [
        "Explicit demographic consideration",
        "Transparent reasoning with citations",
        "Acknowledges data limitations",
        "Reduces diagnostic bias by 45%"
      ]
    },
    metrics: [
      { label: "Demographic Bias", before: 42, after: 23, unit: "% variance" },
      { label: "Clinical Validation Rate", before: 71, after: 91, unit: "%" }
    ]
  },
  {
    id: "cost-efficiency",
    title: "Token-Efficient Prompt",
    challengeArea: "cost",
    traditional: {
      prompt: `I need you to please help me understand and analyze this patient's complete medical history including all visits, all medications ever prescribed, all lab results, all imaging studies, all specialist consultations, all hospitalizations, and provide a comprehensive summary with your thoughts and recommendations about everything you find.`,
      issues: [
        "Excessive token usage (43 tokens)",
        "Requests unnecessary comprehensive analysis",
        "No scope limitation",
        "High API costs for routine task"
      ]
    },
    optimized: {
      prompt: `Summarize recent visits (last 3 months) focusing on:
- Active medications
- Pending lab results
- Upcoming appointments`,
      benefits: [
        "Reduced to 16 tokens (63% reduction)",
        "Focused scope reduces processing time",
        "Appropriate model tier (GPT-3.5 vs GPT-4)",
        "40-55% cost savings"
      ]
    },
    metrics: [
      { label: "Token Count", before: 43, after: 16, unit: "tokens" },
      { label: "API Cost", before: 100, after: 45, unit: "% of baseline" },
      { label: "Response Time", before: 8.2, after: 2.1, unit: "sec" }
    ]
  },
  {
    id: "regulatory-compliance",
    title: "FDA Compliance Integration",
    challengeArea: "regulatory",
    traditional: {
      prompt: "Generate a recommendation for this medical device usage.",
      issues: [
        "No regulatory framework reference",
        "Unauditable recommendation",
        "Missing compliance verification",
        "Liability risk"
      ]
    },
    optimized: {
      prompt: `Generate medical device recommendation adhering to FDA guidelines.

Requirements:
1. Reference specific FDA guideline version (21 CFR Part 820)
2. Cite applicable device classification
3. Include required warnings and contraindications
4. Log this interaction with timestamp and user ID for audit trail

Output format: Recommendation with compliance metadata for regulatory review.`,
      benefits: [
        "Automated FDA guideline enforcement",
        "Complete audit trail for liability protection",
        "Version-specific compliance citations",
        "Regulatory review-ready documentation"
      ]
    },
    metrics: [
      { label: "Compliance Rate", before: 64, after: 98, unit: "%" },
      { label: "Audit Readiness", before: 35, after: 100, unit: "%" }
    ]
  }
];
