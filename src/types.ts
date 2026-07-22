export type TestType = 'Goodness-of-Fit' | 'Independence';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type AcademicDomain = 
  | 'All' 
  | 'Business & Marketing' 
  | 'Genetics & Biology' 
  | 'Healthcare & Medicine' 
  | 'Sociology & Psychology' 
  | 'Education & Campus Life'
  | 'Sports & Entertainment';

export interface PracticeProblem {
  id: string;
  title: string;
  domain: AcademicDomain;
  difficulty: DifficultyLevel;
  problemText: string;
  question: string;
  correctAnswer: TestType;
  numVariables: 1 | 2;
  variable1: {
    name: string;
    categories: string[];
  };
  variable2: {
    name: string;
    categories: string[];
  } | null;
  expectedDistribution?: string;
  dataTable?: {
    headers: string[];
    rows: Array<{ label: string; values: (string | number)[] }>;
  };
  keyClues: string[];
  explanation: string;
  commonMistakeAlert: string;
  tags: string[];
}

export interface ScenarioPair {
  id: string;
  topic: string;
  domain: AcademicDomain;
  gofScenario: {
    title: string;
    problemText: string;
    variable: string;
    categories: string[];
    expectedRule: string;
    tableSummary: string;
    keyTriggerWord: string;
  };
  indScenario: {
    title: string;
    problemText: string;
    variable1: string;
    variable2: string;
    categories1: string[];
    categories2: string[];
    tableSummary: string;
    keyTriggerWord: string;
  };
  contrastSummary: string;
}

export interface StepByStepAnswer {
  userNumVars: number | null;
  userVar1Name: string;
  userHasVar2: boolean | null;
  userVar2Name: string;
  userTestType: TestType | null;
}

export interface VariableAnalysisResult {
  testType: TestType;
  numVariables: number;
  variable1: {
    name: string;
    categories: string[];
  };
  variable2: {
    name: string;
    categories: string[] | null;
  };
  expectedDistribution: string;
  keyTriggerWords: string[];
  nullHypothesis: string;
  altHypothesis: string;
  degreesOfFreedomFormula: string;
  explanation: string;
}
