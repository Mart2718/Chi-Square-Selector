import { PracticeProblem } from '../types';

export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: 'p1',
    title: 'Roulette Wheel Balance Test',
    domain: 'Sports & Entertainment',
    difficulty: 'Easy',
    problemText: 'A casino manager wants to check whether a roulette wheel is fair and balanced. The wheel has 38 slots (18 Red, 18 Black, and 2 Green). Over 1,900 spins, the manager records the color observed for each outcome.',
    question: 'Which Chi-Square test should the manager use to test if the wheel is fair?',
    correctAnswer: 'Goodness-of-Fit',
    numVariables: 1,
    variable1: {
      name: 'Outcome Color',
      categories: ['Red', 'Black', 'Green']
    },
    variable2: null,
    expectedDistribution: '18/38 Red (900 expected), 18/38 Black (900 expected), 2/38 Green (100 expected)',
    dataTable: {
      headers: ['Outcome Color', 'Red', 'Black', 'Green', 'Total'],
      rows: [
        { label: 'Observed Count', values: [920, 875, 105, 1900] }
      ]
    },
    keyClues: [
      'Single categorical variable (Color)',
      'Comparing against a known theoretical expectation (18/38, 18/38, 2/38)',
      '1-row observed frequency table'
    ],
    explanation: 'There is only 1 categorical variable measured per spin (Color: Red, Black, Green). We are comparing observed spin counts against the theoretical expected probabilities for a fair wheel.',
    commonMistakeAlert: 'Don\'t confuse "38 slots" with 38 variables! Slots are categories of the single variable "Slot / Color Outcome".',
    tags: ['probability', 'casino', 'expected proportions', '1 variable']
  },
  {
    id: 'p2',
    title: 'Customer Satisfaction vs. Store Location',
    domain: 'Business & Marketing',
    difficulty: 'Easy',
    problemText: 'A retail chain surveys 400 shoppers across 4 regional locations (Downtown, Suburbs, Airport, Mall) and asks them to rate their satisfaction as Unsatisfied, Neutral, or Satisfied. The CEO wants to know if customer satisfaction level depends on store location.',
    question: 'Which Chi-Square test should be conducted?',
    correctAnswer: 'Independence',
    numVariables: 2,
    variable1: {
      name: 'Store Location',
      categories: ['Downtown', 'Suburbs', 'Airport', 'Mall']
    },
    variable2: {
      name: 'Satisfaction Rating',
      categories: ['Unsatisfied', 'Neutral', 'Satisfied']
    },
    dataTable: {
      headers: ['Location', 'Unsatisfied', 'Neutral', 'Satisfied'],
      rows: [
        { label: 'Downtown', values: [15, 30, 55] },
        { label: 'Suburbs', values: [10, 25, 65] },
        { label: 'Airport', values: [25, 40, 35] },
        { label: 'Mall', values: [20, 35, 45] }
      ]
    },
    keyClues: [
      'Two categorical variables measured per customer (Location AND Satisfaction)',
      'Question asks if satisfaction "depends on" location',
      'Data forms a 4x3 contingency table grid'
    ],
    explanation: 'Each customer provides TWO pieces of categorical data: which store they visited AND their satisfaction rating. We are testing for association between these two variables.',
    commonMistakeAlert: 'Even though store locations are distinct places, they represent categories of Variable 1 (Location), while ratings are categories of Variable 2 (Satisfaction).',
    tags: ['marketing', 'contingency table', 'depends on', '2 variables']
  },
  {
    id: 'p3',
    title: 'Cereal Box Toy Distribution',
    domain: 'Business & Marketing',
    difficulty: 'Easy',
    problemText: 'A cereal manufacturer claims that every box randomly contains 1 of 5 collectible action figures with equal probability (20% each). A collector buys 150 boxes and records how many of each action figure were found.',
    question: 'Which Chi-Square test tests if the toy distribution matches the manufacturer\'s 20% claim?',
    correctAnswer: 'Goodness-of-Fit',
    numVariables: 1,
    variable1: {
      name: 'Action Figure Type',
      categories: ['Figure A', 'Figure B', 'Figure C', 'Figure D', 'Figure E']
    },
    variable2: null,
    expectedDistribution: 'Equal 20% (30 expected per figure out of 150 boxes)',
    dataTable: {
      headers: ['Toy Figure', 'Fig A', 'Fig B', 'Fig C', 'Fig D', 'Fig E'],
      rows: [
        { label: 'Boxes Found', values: [38, 22, 29, 35, 26] }
      ]
    },
    keyClues: [
      '1 categorical variable (Toy Type)',
      'Explicit claim of equal 20% probability',
      'Comparing sample counts to a benchmark expectation'
    ],
    explanation: 'There is 1 categorical variable (Toy Type) with 5 categories. The null hypothesis tests if the observed counts fit the claimed uniform distribution of 20% each.',
    commonMistakeAlert: 'Notice there is no second variable like "Cereal Flavor" or "Store". It is just toy type!',
    tags: ['uniform distribution', '1 variable', 'claimed proportions']
  },
  {
    id: 'p4',
    title: 'Blood Type vs. Severity of Disease',
    domain: 'Healthcare & Medicine',
    difficulty: 'Medium',
    problemText: 'Medical researchers review records of 500 viral infection patients to see if blood type (A, B, AB, O) is associated with disease outcome (Mild, Moderate, Severe).',
    question: 'Which Chi-Square test determines whether blood type and disease outcome are associated?',
    correctAnswer: 'Independence',
    numVariables: 2,
    variable1: {
      name: 'Blood Type',
      categories: ['A', 'B', 'AB', 'O']
    },
    variable2: {
      name: 'Disease Severity',
      categories: ['Mild', 'Moderate', 'Severe']
    },
    dataTable: {
      headers: ['Blood Type', 'Mild', 'Moderate', 'Severe'],
      rows: [
        { label: 'Type A', values: [40, 60, 50] },
        { label: 'Type B', values: [35, 45, 20] },
        { label: 'Type AB', values: [15, 20, 15] },
        { label: 'Type O', values: [80, 70, 50] }
      ]
    },
    keyClues: [
      'Two categorical traits recorded per patient (Blood Type AND Severity)',
      'Trigger word: "associated with"',
      'Contingency table layout (4 rows x 3 columns)'
    ],
    explanation: 'Each patient has two categorical variables recorded: Blood Type and Severity level. We are testing for an association between the two variables.',
    commonMistakeAlert: 'Remember that national blood type percentages (e.g. 44% O, 42% A) are NOT involved here because we are comparing two traits within this patient group.',
    tags: ['healthcare', 'association', '2 variables', 'medical records']
  },
  {
    id: 'p5',
    title: 'National vs. Regional Blood Type Comparison',
    domain: 'Healthcare & Medicine',
    difficulty: 'Medium',
    problemText: 'The national blood bank reports that the U.S. population blood type distribution is 44% Type O, 42% Type A, 10% Type B, and 4% Type AB. A regional clinic samples 1,000 donors to test if their local regional distribution differs from the national baseline.',
    question: 'Which Chi-Square test tests if the local regional donor distribution fits the national proportions?',
    correctAnswer: 'Goodness-of-Fit',
    numVariables: 1,
    variable1: {
      name: 'Donor Blood Type',
      categories: ['O', 'A', 'B', 'AB']
    },
    variable2: null,
    expectedDistribution: 'National rates: 44% O (440 expected), 42% A (420 expected), 10% B (100 expected), 4% AB (40 expected)',
    dataTable: {
      headers: ['Blood Type', 'O', 'A', 'B', 'AB'],
      rows: [
        { label: 'Regional Donors', values: [410, 450, 90, 50] }
      ]
    },
    keyClues: [
      'Single variable (Blood Type)',
      'Known national percentage baseline (44%, 42%, 10%, 4%)',
      'Comparing 1 sample to 1 expected distribution'
    ],
    explanation: 'We are observing 1 categorical variable (Blood Type) and comparing its counts against fixed national percentages. This is a classic Goodness-of-Fit test.',
    commonMistakeAlert: 'Compare Problem 4 and Problem 5! Problem 4 compares 2 patient variables (Blood Type vs Severity). Problem 5 compares 1 variable (Blood Type) against known historical percentages.',
    tags: ['baseline comparison', 'national proportions', '1 variable']
  },
  {
    id: 'p6',
    title: 'College Major vs. Preferred Study Location',
    domain: 'Education & Campus Life',
    difficulty: 'Medium',
    problemText: 'A university librarian surveys 300 students categorized by Major Discipline (STEM, Humanities, Business, Arts) and asks their preferred campus study spot (Main Library, Quiet Lounge, Student Center, Coffee Shop) to see if study location preference is related to major.',
    question: 'Which Chi-Square test should the librarian use?',
    correctAnswer: 'Independence',
    numVariables: 2,
    variable1: {
      name: 'Major Discipline',
      categories: ['STEM', 'Humanities', 'Business', 'Arts']
    },
    variable2: {
      name: 'Preferred Study Location',
      categories: ['Main Library', 'Quiet Lounge', 'Student Center', 'Coffee Shop']
    },
    keyClues: [
      'Two categorical traits per student (Major AND Study Location)',
      'Question asks if location is "related to" major',
      '4x4 contingency grid'
    ],
    explanation: 'Two categorical variables are measured for each student in a single sample. The test evaluates whether Major Discipline and Study Location are independent or associated.',
    commonMistakeAlert: 'STEM, Humanities, Business, Arts are categories of Variable 1 (Major). Main Library, Quiet Lounge, etc. are categories of Variable 2 (Location).',
    tags: ['education', 'campus life', '2 variables', 'survey']
  },
  {
    id: 'p7',
    title: 'Crime Type vs. Time of Day',
    domain: 'Sociology & Psychology',
    difficulty: 'Hard',
    problemText: 'A criminologist analyzes police reports from 600 incidents last month. Each incident is categorized by Crime Type (Theft, Burglary, Vandalism, Assault) and Time Interval (Morning, Afternoon, Evening, Night). The researcher wants to know if crime type is independent of the time of day.',
    question: 'Which Chi-Square test should be applied?',
    correctAnswer: 'Independence',
    numVariables: 2,
    variable1: {
      name: 'Crime Type',
      categories: ['Theft', 'Burglary', 'Vandalism', 'Assault']
    },
    variable2: {
      name: 'Time Interval',
      categories: ['Morning', 'Afternoon', 'Evening', 'Night']
    },
    keyClues: [
      'Two categorical variables per police report (Crime Type AND Time Interval)',
      'Explicit keyword "independent of"',
      '4x4 contingency table'
    ],
    explanation: 'Each report has two categorical traits recorded. We test whether the distribution of crime types changes across time intervals (Independence).',
    commonMistakeAlert: 'Do not confuse this with checking if crimes are evenly distributed across time intervals (which would be Goodness of Fit if crime type was ignored). Here both traits are tested together!',
    tags: ['criminology', 'independent of', '2 variables']
  },
  {
    id: 'p8',
    title: 'Birth Days of the Week',
    domain: 'Healthcare & Medicine',
    difficulty: 'Easy',
    problemText: 'Obstetricians want to know if births occur uniformly across all 7 days of the week, or if scheduled C-sections/inductions cause fewer births on weekends. They record the day of the week for 1,400 births in a hospital network.',
    question: 'Which Chi-Square test tests if births are evenly distributed across days?',
    correctAnswer: 'Goodness-of-Fit',
    numVariables: 1,
    variable1: {
      name: 'Day of Birth',
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    variable2: null,
    expectedDistribution: 'Equal 1/7 (~200 expected per day out of 1,400 births)',
    keyClues: [
      '1 variable (Day of the Week)',
      'Testing uniform/equal distribution hypothesis',
      '1-dimensional category count'
    ],
    explanation: 'There is only 1 categorical variable (Day of Birth) with 7 categories. We compare observed counts to an expected uniform baseline (200 per day).',
    commonMistakeAlert: 'Even though there are 7 days, it is ONE variable with 7 levels.',
    tags: ['uniformity', 'days of week', '1 variable']
  },
  {
    id: 'p9',
    title: 'Genetics Mendelian Corn Kernel Color and Texture',
    domain: 'Genetics & Biology',
    difficulty: 'Hard',
    problemText: 'A genetics lab crosses corn plants expecting a classical Mendelian 9:3:3:1 ratio for four kernel types: Purple & Smooth, Purple & Wrinkled, Yellow & Smooth, Yellow & Wrinkled. They count 800 corn kernels.',
    question: 'Which Chi-Square test evaluates if the observed kernel counts fit the 9:3:3:1 Mendelian cross prediction?',
    correctAnswer: 'Goodness-of-Fit',
    numVariables: 1,
    variable1: {
      name: 'Kernel Phenotype Category',
      categories: ['Purple Smooth', 'Purple Wrinkled', 'Yellow Smooth', 'Yellow Wrinkled']
    },
    variable2: null,
    expectedDistribution: '9/16 (450), 3/16 (150), 3/16 (150), 1/16 (50)',
    keyClues: [
      'Phenotypes grouped into 4 mutually exclusive categories',
      'Comparing to theoretical 9:3:3:1 ratio',
      '1 sample categorized by 1 combined phenotype classification'
    ],
    explanation: 'The problem classifies kernels into 4 discrete categories and compares counts to a specific theoretical ratio (9:3:3:1). That is a Goodness-of-Fit test.',
    commonMistakeAlert: 'Although Color (Purple vs Yellow) and Texture (Smooth vs Wrinkled) are two biological traits, when combined into a single 4-category ratio (9:3:3:1), it is tested with Goodness-of-Fit against the expected fractions!',
    tags: ['genetics', 'Mendelian 9:3:3:1', 'Goodness of Fit']
  },
  {
    id: 'p10',
    title: 'Political Party vs. Opinion on Environmental Tax',
    domain: 'Sociology & Psychology',
    difficulty: 'Easy',
    problemText: 'A survey asks 1,000 voters their Political Party (Democrat, Republican, Independent) and whether they Favor, Oppose, or are Undecided on a new carbon tax bill.',
    question: 'Which Chi-Square test determines if carbon tax stance is associated with political party?',
    correctAnswer: 'Independence',
    numVariables: 2,
    variable1: {
      name: 'Political Party',
      categories: ['Democrat', 'Republican', 'Independent']
    },
    variable2: {
      name: 'Carbon Tax Stance',
      categories: ['Favor', 'Oppose', 'Undecided']
    },
    keyClues: [
      'Two categorical survey questions per respondent',
      'Testing for "association" between party and stance',
      '3x3 contingency table'
    ],
    explanation: 'Each voter answers two questions (Party and Stance). We want to determine if there is a relationship/dependence between these two categorical variables.',
    commonMistakeAlert: 'Notice no fixed expected percentages (like 50% favor, 50% oppose) are given in the problem text.',
    tags: ['sociology', 'politics', 'association', '2 variables']
  },
  {
    id: 'p11',
    title: 'Grade Level vs. Preferred Learning Mode',
    domain: 'Education & Campus Life',
    difficulty: 'Medium',
    problemText: 'A school district polls students across Grade Levels (Elementary, Middle, High School) to see their Preferred Learning Mode (In-Person, Hybrid, Online). Administrators want to test if learning mode preference depends on grade level.',
    question: 'Which Chi-Square test should the school district use?',
    correctAnswer: 'Independence',
    numVariables: 2,
    variable1: {
      name: 'Grade Level',
      categories: ['Elementary', 'Middle School', 'High School']
    },
    variable2: {
      name: 'Preferred Learning Mode',
      categories: ['In-Person', 'Hybrid', 'Online']
    },
    keyClues: [
      'Two categorical variables (Grade Level AND Learning Mode)',
      'Trigger phrase "depends on grade level"',
      '3x3 two-way contingency table'
    ],
    explanation: 'We are cross-classifying students by two categorical factors: Grade Level and Preferred Learning Mode. Testing if preference depends on grade level requires a Test for Independence.',
    commonMistakeAlert: 'Remember: 2 variables = Test for Independence.',
    tags: ['education', 'learning mode', 'depends on']
  },
  {
    id: 'p12',
    title: 'Birth Month Uniformity in Professional Hockey',
    domain: 'Sports & Entertainment',
    difficulty: 'Medium',
    problemText: 'Sociologists study the "Relative Age Effect" by examining the Birth Quarter (Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec) of 400 professional NHL players to test if birth quarter is evenly distributed across the year.',
    question: 'Which Chi-Square test tests if birth quarter counts fit an equal 25% distribution?',
    correctAnswer: 'Goodness-of-Fit',
    numVariables: 1,
    variable1: {
      name: 'Birth Quarter',
      categories: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    variable2: null,
    expectedDistribution: '25% Q1, 25% Q2, 25% Q3, 25% Q4 (100 players per quarter)',
    keyClues: [
      '1 variable (Birth Quarter)',
      'Expected equal 25% distribution across quarters',
      'Single sample classified into 4 time buckets'
    ],
    explanation: 'We measure 1 categorical attribute (Birth Quarter) and test if the observed counts match an expected equal probability of 25% per quarter.',
    commonMistakeAlert: 'The quarters are categories of 1 variable (Quarter). There is no second variable.',
    tags: ['sports', 'relative age effect', '1 variable']
  }
];
