import { z } from "zod";

export const challengeAreas = [
  "privacy",
  "quality",
  "bias",
  "cost",
  "regulatory"
] as const;

export type ChallengeArea = typeof challengeAreas[number];

export interface Component {
  name: string;
  description: string;
  impact?: string;
}

export interface ChallengeData {
  id: ChallengeArea;
  title: string;
  icon: string;
  description: string;
  components: Component[];
  color: string;
}

export interface PromptExample {
  id: string;
  title: string;
  challengeArea: ChallengeArea;
  traditional: {
    prompt: string;
    issues: string[];
  };
  optimized: {
    prompt: string;
    benefits: string[];
  };
  metrics?: {
    label: string;
    before: number;
    after: number;
    unit: string;
  }[];
}
