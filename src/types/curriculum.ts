export type TrackId = 
  | 'python'
  | 'sql'
  | 'ml'
  | 'pyspark'
  | 'databricks'
  | 'snowflake'
  | 'palantir'
  | 'genai';

export interface TrackMeta {
  id: TrackId;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  badgeColor: string;
  accentColor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Enterprise Mastery';
  estimatedHours: number;
}

export type QuestionType = 
  | 'multiple-choice'
  | 'code-fill'
  | 'code-order'
  | 'bug-hunt'
  | 'interactive-runner'
  | 'pair-match';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  explanation: string;
  tip?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctIndex: number;
  codeSnippet?: string;
  language?: string;
}

export interface CodeFillQuestion extends BaseQuestion {
  type: 'code-fill';
  codeTemplate: string; // e.g. "___ calculate_loss(y_true, y_pred):\n  return np.mean((y_true - y_pred) ** ___)"
  wordBank: string[]; // pool of draggable/clickable tokens
  correctTokens: string[]; // ordered list of tokens filling the blanks
}

export interface CodeOrderQuestion extends BaseQuestion {
  type: 'code-order';
  shuffledLines: string[];
  correctOrder: number[]; // indices in correct sequence
  language: string;
}

export interface BugHuntQuestion extends BaseQuestion {
  type: 'bug-hunt';
  code: string;
  buggyLineIndex: number;
  options: string[];
  correctOptionIndex: number;
  fixExplanation: string;
}

export interface InteractiveRunnerQuestion extends BaseQuestion {
  type: 'interactive-runner';
  language: 'python' | 'sql' | 'pyspark';
  starterCode: string;
  solutionCode: string;
  expectedOutputRegex?: string;
  testValidationFunction?: string;
  sampleInput?: string;
}

export interface PairMatchQuestion extends BaseQuestion {
  type: 'pair-match';
  pairs: Array<{
    id: string;
    left: string;
    right: string;
  }>;
}

export type Question = 
  | MultipleChoiceQuestion
  | CodeFillQuestion
  | CodeOrderQuestion
  | BugHuntQuestion
  | InteractiveRunnerQuestion
  | PairMatchQuestion;

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  xpReward: number;
  questions: Question[];
}

export interface Inquisition {
  id: string;
  unitId: string;
  title: string;
  subtitle: string;
  enterpriseScenario: string;
  timeLimitSeconds: number;
  minimumPassPercentage: number;
  xpReward: number;
  gemReward: number;
  badge: {
    id: string;
    title: string;
    icon: string;
    description: string;
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  };
  questions: Question[];
}

export interface Unit {
  id: string;
  trackId: TrackId;
  unitNumber: number;
  title: string;
  description: string;
  color: string;
  lessons: Lesson[];
  inquisition: Inquisition;
}

export interface Track {
  meta: TrackMeta;
  units: Unit[];
}

