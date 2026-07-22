import { ScenarioPair } from '../types';

export const SCENARIO_PAIRS: ScenarioPair[] = [
  {
    id: 'soda_preferences',
    topic: 'Soda Flavor Preferences',
    domain: 'Business & Marketing',
    gofScenario: {
      title: 'Testing Equal Preference for Soda Flavors',
      problemText: 'A beverage company surveys 200 college students to see if customer preference is equally distributed across 4 soda flavors: Cola, Lemon-Lime, Orange, and Grape.',
      variable: 'Preferred Soda Flavor (1 Categorical Variable)',
      categories: ['Cola', 'Lemon-Lime', 'Orange', 'Grape'],
      expectedRule: 'Expected equal distribution (25% or 50 students per flavor)',
      tableSummary: '1-Row Table (4 observed counts)',
      keyTriggerWord: 'equally distributed across flavors'
    },
    indScenario: {
      title: 'Testing Preference vs. Gender / Age Group',
      problemText: 'A beverage company surveys 200 college students to determine if preferred soda flavor (Cola, Lemon-Lime, Orange, Grape) is associated with Age Group (Under 21 vs. 21+).',
      variable1: 'Preferred Soda Flavor (Variable 1)',
      variable2: 'Age Group (Variable 2)',
      categories1: ['Cola', 'Lemon-Lime', 'Orange', 'Grape'],
      categories2: ['Under 21', '21+'],
      tableSummary: '2x4 Contingency Table Grid (8 cells)',
      keyTriggerWord: 'associated with Age Group'
    },
    contrastSummary: 'In Goodness-of-Fit, you record 1 piece of info per person (Flavor). In Independence, you record 2 pieces of info per person (Flavor AND Age Group) to see if they depend on each other.'
  },
  {
    id: 'candy_colors',
    topic: 'M&M / Skittles Candy Color Ratios',
    domain: 'Business & Marketing',
    gofScenario: {
      title: 'Comparing M&M Bag Colors to Company Claim',
      problemText: 'The candy factory claims that its bag mix contains 20% Red, 20% Blue, 20% Green, 20% Yellow, and 20% Orange M&Ms. A student opens a large bag and counts candies in each color category.',
      variable: 'M&M Candy Color (1 Categorical Variable)',
      categories: ['Red', 'Blue', 'Green', 'Yellow', 'Orange'],
      expectedRule: 'Company claim ratio: 20%:20%:20%:20%:20%',
      tableSummary: '1-Row Observed Frequency Table',
      keyTriggerWord: 'claims the mix contains percentages'
    },
    indScenario: {
      title: 'Comparing Candy Colors across Regular vs. Peanut Bags',
      problemText: 'A student counts the color distribution (Red, Blue, Green, Yellow, Orange) across two distinct package types (Regular M&Ms vs. Peanut M&Ms) to see if candy color distribution depends on package type.',
      variable1: 'Candy Color (Variable 1)',
      variable2: 'Package Type (Variable 2)',
      categories1: ['Red', 'Blue', 'Green', 'Yellow', 'Orange'],
      categories2: ['Regular', 'Peanut'],
      tableSummary: '2x5 Contingency Table Grid',
      keyTriggerWord: 'depends on package type'
    },
    contrastSummary: 'Goodness-of-Fit compares 1 bag against fixed claimed percentages. Independence compares two categorical traits across items (Color x Package Type) in a 2D table.'
  },
  {
    id: 'hospital_admissions',
    topic: 'Hospital ER Admissions by Day',
    domain: 'Healthcare & Medicine',
    gofScenario: {
      title: 'Testing ER Admission Uniformity Across Days of Week',
      problemText: 'A hospital administrator records ER visits for 700 patients to test whether emergency room admissions occur with equal frequency across all 7 days of the week.',
      variable: 'Day of ER Visit (1 Categorical Variable)',
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      expectedRule: 'Expected 1/7 (~100 patients per day)',
      tableSummary: '1x7 Frequency Row',
      keyTriggerWord: 'occur with equal frequency across days'
    },
    indScenario: {
      title: 'Testing Day of Admission vs. Severity Level',
      problemText: 'A hospital administrator records ER admissions classified by Day of Week (Mon-Sun) and Triage Severity (Non-Urgent, Urgent, Critical) to determine if severity level is related to the day of admission.',
      variable1: 'Day of Week (Variable 1)',
      variable2: 'Triage Severity Level (Variable 2)',
      categories1: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      categories2: ['Non-Urgent', 'Urgent', 'Critical'],
      tableSummary: '3x7 Two-Way Grid (21 cells)',
      keyTriggerWord: 'severity level is related to the day'
    },
    contrastSummary: 'Goodness-of-Fit asks: "Are visits spread evenly across the days?" Independence asks: "Does the proportion of critical vs non-urgent patients change depending on the day?"'
  },
  {
    id: 'genetics_fruitflies',
    topic: 'Genetics Mendelian Ratios vs. Gene Linkage',
    domain: 'Genetics & Biology',
    gofScenario: {
      title: 'Testing Mendelian Dihybrid Phenotype Ratios',
      problemText: 'A geneticist crosses fruit flies and counts offspring traits across 4 phenotype categories (Red-eyed Long wing, Red-eyed Vestigial, White-eyed Long, White-eyed Vestigial) to verify if offspring conform to the 9:3:3:1 Mendelian ratio.',
      variable: 'Combined Phenotype Category (1 Categorical Variable with 4 outcomes)',
      categories: ['Red-Long', 'Red-Vestigial', 'White-Long', 'White-Vestigial'],
      expectedRule: 'Theoretical 9:3:3:1 ratio (9/16, 3/16, 3/16, 1/16)',
      tableSummary: '1x4 Observed Counts Row',
      keyTriggerWord: 'conform to the 9:3:3:1 Mendelian ratio'
    },
    indScenario: {
      title: 'Testing Genetic Linkage (Association Between 2 Genes)',
      problemText: 'A geneticist tests whether Eye Color gene (Red vs. White) and Wing Structure gene (Long vs. Vestigial) are independent or linked on the same chromosome.',
      variable1: 'Eye Color Phenotype (Variable 1)',
      variable2: 'Wing Structure Phenotype (Variable 2)',
      categories1: ['Red', 'White'],
      categories2: ['Long', 'Vestigial'],
      tableSummary: '2x2 Contingency Table Grid',
      keyTriggerWord: 'genes are independent or linked'
    },
    contrastSummary: 'Goodness-of-Fit checks if counts fit a theoretical genetic formula ratio. Independence checks if two separate genetic traits inherit together (linkage).'
  },
  {
    id: 'voting_demographics',
    topic: 'Voter Preferences & Political Party',
    domain: 'Sociology & Psychology',
    gofScenario: {
      title: 'Comparing City Party Affiliation to State Averages',
      problemText: 'In a state, political registered affiliation is historically 45% Democrat, 40% Republican, and 15% Independent. A researcher surveys 500 voters in a specific district to test if the local district matches state percentages.',
      variable: 'Party Affiliation (1 Categorical Variable)',
      categories: ['Democrat', 'Republican', 'Independent'],
      expectedRule: 'State baseline proportions: 0.45, 0.40, 0.15',
      tableSummary: '1x3 Observed Category Counts',
      keyTriggerWord: 'matches state benchmark percentages'
    },
    indScenario: {
      title: 'Testing Party Affiliation vs. Education Level',
      problemText: 'A sociologist surveys 500 voters to test if political party choice (Democrat, Republican, Independent) is independent of highest education level completed (High School, Bachelor, Graduate Degree).',
      variable1: 'Party Affiliation (Variable 1)',
      variable2: 'Education Level (Variable 2)',
      categories1: ['Democrat', 'Republican', 'Independent'],
      categories2: ['High School', 'Bachelor', 'Graduate'],
      tableSummary: '3x3 Contingency Table Grid',
      keyTriggerWord: 'independent of highest education level'
    },
    contrastSummary: 'Goodness-of-Fit compares 1 local distribution against an established historical benchmark. Independence tests if 2 demographic traits are associated.'
  }
];
