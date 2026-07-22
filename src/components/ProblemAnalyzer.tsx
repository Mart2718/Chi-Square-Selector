import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle2, Copy, Check, MessageSquareCode, Lightbulb, BookOpen, Layers } from 'lucide-react';
import { VariableAnalysisResult } from '../types';

interface PresetSample {
  id: string;
  title: string;
  domain: string;
  problemText: string;
  analysis: VariableAnalysisResult;
}

const SAMPLES: PresetSample[] = [
  {
    id: 'soda',
    title: 'Soda Flavor Preference',
    domain: 'Business & Marketing',
    problemText: 'A soda manufacturer conducts a market survey asking 300 randomly selected customers to choose their favorite flavor among Cola, Lemon-Lime, and Orange. They want to test if flavor preferences are equally distributed among consumers.',
    analysis: {
      testType: 'Goodness-of-Fit',
      numVariables: 1,
      variable1: {
        name: 'Favorite Soda Flavor',
        categories: ['Cola', 'Lemon-Lime', 'Orange']
      },
      variable2: {
        name: 'None',
        categories: null
      },
      expectedDistribution: 'Equally likely (1/3 for each flavor)',
      keyTriggerWords: ['equally distributed', 'favorite flavor', '300 randomly selected customers'],
      nullHypothesis: 'H₀: Flavor preferences are equally distributed (p₁ = p₂ = p₃ = 1/3)',
      altHypothesis: 'Hₐ: At least one flavor preference differs from equal distribution',
      degreesOfFreedomFormula: 'df = k - 1 = 3 - 1 = 2',
      explanation: 'Only 1 categorical variable (Favorite Soda Flavor) is recorded for each customer. The study compares observed sample counts against an equal baseline distribution across 3 categories.'
    }
  },
  {
    id: 'coffee',
    title: 'Age Group vs. Coffee Preference',
    domain: 'Sociology & Marketing',
    problemText: 'A café researcher surveys 200 customers, recording each person\'s age group (Under 21 vs. 21+) and their preferred coffee order (Latte, Espresso, or Iced Coffee). The manager wants to determine if coffee preference depends on age group.',
    analysis: {
      testType: 'Independence',
      numVariables: 2,
      variable1: {
        name: 'Age Group',
        categories: ['Under 21', '21+']
      },
      variable2: {
        name: 'Preferred Coffee Order',
        categories: ['Latte', 'Espresso', 'Iced Coffee']
      },
      expectedDistribution: 'Contingency Table Expected Counts: E = (Row Total × Col Total) / Grand Total',
      keyTriggerWords: ['depends on age group', 'recording age group AND coffee order', '200 customers'],
      nullHypothesis: 'H₀: Age group and coffee drink preference are independent',
      altHypothesis: 'Hₐ: Age group and coffee drink preference are dependent (associated)',
      degreesOfFreedomFormula: 'df = (r - 1)(c - 1) = (2 - 1)(3 - 1) = 2',
      explanation: 'Two categorical attributes (Age Group AND Coffee Order) are recorded simultaneously for each subject in a 2×3 contingency table.'
    }
  },
  {
    id: 'genetics',
    title: 'Fruit Fly Genetic Crossing',
    domain: 'Genetics & Biology',
    problemText: 'A geneticist crosses fruit flies and expects offspring traits to follow a Mendelian 9:3:3:1 phenotypic ratio (Red/Normal, Red/Vestigial, Brown/Normal, Brown/Vestigial). In a sample of 400 flies, they count observed frequencies to test if the breeding outcomes conform to the genetic model.',
    analysis: {
      testType: 'Goodness-of-Fit',
      numVariables: 1,
      variable1: {
        name: 'Phenotype Combination',
        categories: ['Red/Normal', 'Red/Vestigial', 'Brown/Normal', 'Brown/Vestigial']
      },
      variable2: {
        name: 'None',
        categories: null
      },
      expectedDistribution: 'Mendelian Ratio 9:3:3:1 (9/16, 3/16, 3/16, 1/16)',
      keyTriggerWords: ['conform to the genetic model', 'Mendelian ratio 9:3:3:1', '400 flies'],
      nullHypothesis: 'H₀: Offspring phenotypes follow the Mendelian 9:3:3:1 ratio',
      altHypothesis: 'Hₐ: Offspring phenotypes do not follow the Mendelian 9:3:3:1 ratio',
      degreesOfFreedomFormula: 'df = k - 1 = 4 - 1 = 3',
      explanation: 'Each fly is categorized into 1 composite trait category. Observed counts are compared against expected proportions derived from genetic principles.'
    }
  },
  {
    id: 'blood',
    title: 'Blood Type vs. Illness Severity',
    domain: 'Healthcare & Medicine',
    problemText: 'A hospital study analyzes 500 patient records to check if patient blood type (Type A, Type B, Type AB, Type O) is associated with disease outcome severity (Mild, Moderate, Severe).',
    analysis: {
      testType: 'Independence',
      numVariables: 2,
      variable1: {
        name: 'Blood Type',
        categories: ['Type A', 'Type B', 'Type AB', 'Type O']
      },
      variable2: {
        name: 'Disease Severity',
        categories: ['Mild', 'Moderate', 'Severe']
      },
      expectedDistribution: 'Contingency Table Expected Counts: E = (Row Total × Col Total) / Grand Total',
      keyTriggerWords: ['is associated with', 'blood type AND disease severity', '500 patient records'],
      nullHypothesis: 'H₀: Blood type and disease outcome severity are independent',
      altHypothesis: 'Hₐ: Blood type and disease outcome severity are dependent (associated)',
      degreesOfFreedomFormula: 'df = (r - 1)(c - 1) = (4 - 1)(3 - 1) = 6',
      explanation: 'Two categorical traits (Blood Type and Disease Severity) are evaluated for each patient in a 4×3 matrix to test for relationship or association.'
    }
  }
];

export const ProblemAnalyzer: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<PresetSample>(SAMPLES[0]);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const aiPromptTemplate = `I have a statistics word problem involving a Chi-Square test. Please analyze it and provide:

1. How many categorical variables are measured for EACH subject? (1 or 2?)
2. What are the specific categorical variables and their categories?
3. Which Chi-Square test should be used:
   - Chi-Square Goodness-of-Fit Test (1 categorical variable compared to expected proportions)
   - Chi-Square Test for Independence (2 categorical variables in a contingency table)
4. State the Null (H0) and Alternative (Ha) hypotheses.
5. Provide the Degrees of Freedom formula and value.
6. Highlight key trigger phrases in the problem text that justify this choice.

Here is the word problem:
"[PASTE YOUR WORD PROBLEM HERE]"`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(aiPromptTemplate);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      
      {/* Header & Sample Selector */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            Interactive Word Problem Analyzer
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Select an exemplar word problem below to see an instant, step-by-step statistical variable breakdown and test verdict.
          </p>
        </div>

        {/* Sample Selection Buttons */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Select a Sample Problem to Analyze:</span>
          </label>
          <div className="grid sm:grid-cols-2 gap-3">
            {SAMPLES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => setSelectedSample(sample)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedSample.id === sample.id
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                    : 'bg-slate-50/80 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                    selectedSample.id === sample.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {sample.domain}
                  </span>
                  <span className={`text-[10px] font-bold ${
                    selectedSample.id === sample.id ? 'text-blue-100' : 'text-blue-700'
                  }`}>
                    {sample.analysis.testType}
                  </span>
                </div>
                <div className="text-xs font-bold truncate">
                  {sample.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Problem Scenario Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
          <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>"{selectedSample.title}" Scenario Text:</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed italic">
            "{selectedSample.problemText}"
          </p>
        </div>
      </div>

      {/* Selected Analysis Result Display */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Verdict Banner */}
        <div className={`p-6 rounded-2xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          selectedSample.analysis.testType === 'Goodness-of-Fit'
            ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
            : 'bg-sky-50 border-sky-500 text-sky-950'
        }`}>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
              Recommended Test Verdict:
            </div>
            <h3 className="text-2xl font-bold">
              Chi-Square {selectedSample.analysis.testType === 'Goodness-of-Fit' ? 'Goodness-of-Fit Test' : 'Test for Independence'}
            </h3>
          </div>

          <div className={`text-xs font-bold px-3.5 py-1.5 rounded-full border text-center font-mono ${
            selectedSample.analysis.testType === 'Goodness-of-Fit'
              ? 'bg-emerald-200/80 border-emerald-400 text-emerald-900'
              : 'bg-sky-200/80 border-sky-400 text-sky-900'
          }`}>
            {selectedSample.analysis.numVariables} Categorical Variable{selectedSample.analysis.numVariables > 1 ? 's' : ''} Identified
          </div>
        </div>

        {/* Variable Breakdown */}
        <div className="grid sm:grid-cols-2 gap-4">
          
          <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/60 space-y-2">
            <span className="text-xs font-bold text-slate-900 block border-b border-slate-200 pb-1">
              🎯 Primary Variable 1:
            </span>
            <p className="text-xs font-semibold text-blue-900">
              {selectedSample.analysis.variable1.name}
            </p>
            {selectedSample.analysis.variable1.categories && (
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedSample.analysis.variable1.categories.map((cat, i) => (
                  <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 font-mono font-medium">
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/60 space-y-2">
            <span className="text-xs font-bold text-slate-900 block border-b border-slate-200 pb-1">
              🎯 Secondary Variable 2:
            </span>
            <p className="text-xs font-semibold text-blue-900">
              {selectedSample.analysis.variable2.name || 'None (1 Variable Scenario)'}
            </p>
            {selectedSample.analysis.variable2.categories ? (
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedSample.analysis.variable2.categories.map((cat, i) => (
                  <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 font-mono font-medium">
                    {cat}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">No second variable measured on subjects.</p>
            )}
          </div>

        </div>

        {/* Explanation & Hypotheses */}
        <div className="space-y-4 text-xs text-slate-800">
          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5">
            <span className="font-bold text-blue-950 block mb-1">
              💡 Why this is a {selectedSample.analysis.testType}:
            </span>
            <p className="text-slate-700 leading-relaxed">
              {selectedSample.analysis.explanation}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-2xl p-5 bg-white">
              <span className="font-bold text-slate-900 block mb-1">
                Null Hypothesis ($H_0$):
              </span>
              <p className="text-slate-700 font-mono text-[11px]">
                {selectedSample.analysis.nullHypothesis}
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-white">
              <span className="font-bold text-slate-900 block mb-1">
                Alternative Hypothesis ($H_a$):
              </span>
              <p className="text-slate-700 font-mono text-[11px]">
                {selectedSample.analysis.altHypothesis}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between border-t border-slate-100 pt-4 text-slate-600 gap-2">
            <span>Degrees of Freedom Formula: <strong className="font-mono text-slate-900">{selectedSample.analysis.degreesOfFreedomFormula}</strong></span>
            {selectedSample.analysis.keyTriggerWords && selectedSample.analysis.keyTriggerWords.length > 0 && (
              <span className="flex items-center gap-1">
                Triggers:
                {selectedSample.analysis.keyTriggerWords.map((tw, i) => (
                  <span key={i} className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                    "{tw}"
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>

      </div>

      {/* AI Prompting Guidance Box for User Scenarios */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider mb-2">
              <MessageSquareCode className="w-3.5 h-3.5" />
              AI Prompting Guide
            </div>
            <h3 className="text-xl font-bold text-white">
              How to Prompt AI for Your Custom Homework Problems
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Copy this structured prompt template into Gemini, ChatGPT, or Claude to get a reliable statistical analysis of any word problem.
            </p>
          </div>

          <button
            onClick={handleCopyPrompt}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Prompt Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Prompt Template</span>
              </>
            )}
          </button>
        </div>

        {/* Copyable Code Box */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-blue-200 uppercase tracking-wider">
            Optimized Statistics Prompt Template:
          </label>
          <pre className="bg-slate-950/90 border border-slate-700/80 rounded-2xl p-5 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {aiPromptTemplate}
          </pre>
        </div>

        {/* Best Practice Tips */}
        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Tip 1: Include Count Totals
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Ensure you paste the full problem text including sample size ($n$) and category counts or ratios.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
              <Layers className="w-4 h-4 text-sky-400" />
              Tip 2: Mention Table Shape
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              If the problem has a table, specify if it's 1 row of counts or a multi-row by multi-column grid ($r \times c$).
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Tip 3: Ask for Justification
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Asking the AI to cite specific wording (e.g. "equally likely" vs "associated with") prevents halluncinations.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

