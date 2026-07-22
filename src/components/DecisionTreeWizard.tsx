import React, { useState } from 'react';
import { GitBranch, CheckCircle2, RotateCcw, ArrowRight, HelpCircle, AlertTriangle } from 'lucide-react';
import { TestType } from '../types';

export const DecisionTreeWizard: React.FC = () => {
  const [currentNode, setCurrentNode] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);

  const handleChoose = (nextNode: string) => {
    setHistory([...history, currentNode]);
    setCurrentNode(nextNode);
  };

  const handleReset = () => {
    setCurrentNode('start');
    setHistory([]);
  };

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-600" />
              Interactive Decision Flowchart
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Answer the questions below step-by-step for any word problem to determine the correct test.
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start Over</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Flowchart Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        
        {/* Step Node: START */}
        {currentNode === 'start' && (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              Step 1 of 3: Data Type
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              What type of data is gathered in the word problem?
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleChoose('num_vars')}
                className="p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 text-left transition-all group cursor-pointer"
              >
                <div className="font-bold text-base text-slate-900 group-hover:text-blue-900 mb-1">
                  Categorical (Qualitative)
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Data falls into counts or frequencies within distinct labels/categories (e.g. Colors, Preferences, Blood Types, Yes/No).
                </div>
              </button>

              <button
                onClick={() => handleChoose('quantitative_error')}
                className="p-6 rounded-2xl border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50/30 text-left transition-all group cursor-pointer"
              >
                <div className="font-bold text-base text-slate-900 group-hover:text-amber-900 mb-1">
                  Quantitative (Numerical)
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Data consists of numerical measurements where averages/means make sense (e.g., height, test scores, weight).
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step Node: QUANTITATIVE ERROR */}
        {currentNode === 'quantitative_error' && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 text-amber-950 space-y-4">
            <div className="flex items-center gap-2 font-bold text-base text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Chi-Square Tests require Categorical Data!
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Chi-Square tests evaluate category counts (frequencies), NOT continuous numeric averages (means). If your problem measures numerical values like average GPA or height, you should use a t-test, Z-test, or ANOVA.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-bold hover:bg-amber-900 cursor-pointer shadow-xs"
            >
              Try Again with Categorical Data
            </button>
          </div>
        )}

        {/* Step Node: NUM_VARS */}
        {currentNode === 'num_vars' && (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              Step 2 of 3: Count Variables
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              How many categorical variables are measured per individual/subject in the sample?
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleChoose('gof_branch')}
                className="p-6 rounded-2xl border-2 border-emerald-300 bg-emerald-50/20 hover:border-emerald-500 hover:bg-emerald-50 text-left transition-all group cursor-pointer"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                  Option A
                </div>
                <div className="font-bold text-base text-slate-900 group-hover:text-emerald-950 mb-1">
                  1 Categorical Variable
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Only ONE question/attribute is recorded per subject (e.g., "What is your favorite flavor?").
                </div>
              </button>

              <button
                onClick={() => handleChoose('ind_branch')}
                className="p-6 rounded-2xl border-2 border-sky-300 bg-sky-50/20 hover:border-sky-500 hover:bg-sky-50 text-left transition-all group cursor-pointer"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">
                  Option B
                </div>
                <div className="font-bold text-base text-slate-900 group-hover:text-sky-950 mb-1">
                  2 Categorical Variables
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  TWO questions/attributes are recorded per subject (e.g., "Favorite flavor AND Age Group").
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step Node: GOF RESULT */}
        {currentNode === 'gof_branch' && (
          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 text-emerald-950 space-y-5">
            <div className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
              VERDICT FOUND!
            </div>

            <h3 className="text-2xl font-bold text-emerald-950">
              Use a Chi-Square Goodness-of-Fit Test
            </h3>

            <div className="space-y-3 text-xs text-emerald-900 leading-relaxed bg-white/90 p-5 rounded-2xl border border-emerald-200/80">
              <p className="font-semibold text-sm text-emerald-950">
                Why this test applies:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>You have <strong>1 categorical variable</strong> with $k$ categories.</li>
                <li>You are testing if observed category counts fit an <strong>expected theoretical distribution</strong> (e.g., equal percentages, claimed ratios, or genetics 9:3:3:1).</li>
                <li>Degrees of Freedom: <code className="bg-emerald-100 font-bold px-1.5 py-0.5 rounded-md">df = k - 1</code></li>
              </ul>
            </div>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-all shadow-xs cursor-pointer"
            >
              Analyze Another Problem
            </button>
          </div>
        )}

        {/* Step Node: IND RESULT */}
        {currentNode === 'ind_branch' && (
          <div className="bg-sky-50 border-2 border-sky-500 rounded-3xl p-6 sm:p-8 text-sky-950 space-y-5">
            <div className="inline-flex items-center gap-2 bg-sky-600 text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
              VERDICT FOUND!
            </div>

            <h3 className="text-2xl font-bold text-sky-950">
              Use a Chi-Square Test for Independence
            </h3>

            <div className="space-y-3 text-xs text-sky-900 leading-relaxed bg-white/90 p-5 rounded-2xl border border-sky-200/80">
              <p className="font-semibold text-sm text-sky-950">
                Why this test applies:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>You have <strong>2 categorical variables</strong> measured simultaneously in a single sample.</li>
                <li>You are testing if there is a <strong>relationship or association</strong> between the two variables in an $r \times c$ contingency table.</li>
                <li>Degrees of Freedom: <code className="bg-sky-100 font-bold px-1.5 py-0.5 rounded-md">df = (r - 1)(c - 1)</code></li>
              </ul>
            </div>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-sky-800 text-white text-xs font-bold hover:bg-sky-900 transition-all shadow-xs cursor-pointer"
            >
              Analyze Another Problem
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
