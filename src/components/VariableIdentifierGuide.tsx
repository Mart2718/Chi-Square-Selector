import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Table, Layers, Sparkles, HelpCircle } from 'lucide-react';

export const VariableIdentifierGuide: React.FC = () => {
  const [selectedDemoTab, setSelectedDemoTab] = useState<'gof' | 'ind'>('gof');

  return (
    <div className="space-y-8 py-6">
      
      {/* Hero Core Answer Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The Core Distinction
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
            How to Instantly Identify the Test in Word Problems
          </h2>

          <p className="text-slate-300 text-base leading-relaxed mb-6">
            The key to word problems is asking: <span className="font-semibold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/50">"How many categorical attributes are recorded for EACH subject in the sample?"</span>
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-slate-800/90 border border-emerald-500/40 rounded-2xl p-5 transition-all hover:border-emerald-500/60">
              <div className="flex items-center gap-2 font-bold text-emerald-400 text-base mb-1">
                <CheckCircle2 className="w-5 h-5" />
                Goodness-of-Fit Test
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                <strong className="text-white">1 Categorical Variable</strong> (e.g. Favorite Flavor). You compare sample proportions against a known/claimed distribution or equal expectations.
              </p>
              <div className="mt-3 text-xs bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 px-3 py-1.5 rounded-lg font-mono inline-block">
                df = k - 1 (1D Table)
              </div>
            </div>

            <div className="bg-slate-800/90 border border-sky-500/40 rounded-2xl p-5 transition-all hover:border-sky-500/60">
              <div className="flex items-center gap-2 font-bold text-sky-400 text-base mb-1">
                <CheckCircle2 className="w-5 h-5" />
                Test for Independence
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                <strong className="text-white">2 Categorical Variables</strong> (e.g. Flavor AND Age Group). You test if the two traits are associated or independent in a contingency table.
              </p>
              <div className="mt-3 text-xs bg-sky-950/60 text-sky-300 border border-sky-800/50 px-3 py-1.5 rounded-lg font-mono inline-block">
                df = (r - 1)(c - 1) (2D Grid)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Step Mental Framework for Word Problems */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          The 3-Step Word Problem Decoding Method
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Follow this mental checklist when reading any statistics scenario on exams or assignments.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/60 relative">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-3 shadow-xs">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              Identify Subject & Variables
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Imagine interviewing 1 subject from the study. What pieces of information are recorded?
            </p>
            <ul className="mt-4 space-y-2 text-xs">
              <li className="flex items-start gap-1.5 text-emerald-800 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200/80">
                <span>•</span>
                <span>If <strong>1 trait</strong> (e.g., "Color"), it is <strong>Goodness-of-Fit</strong>.</span>
              </li>
              <li className="flex items-start gap-1.5 text-sky-800 bg-sky-50/80 p-2.5 rounded-xl border border-sky-200/80">
                <span>•</span>
                <span>If <strong>2 traits</strong> (e.g., "Color" and "Size"), it is <strong>Independence</strong>.</span>
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/60 relative">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-3 shadow-xs">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              Look for Trigger Phrasing
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scan the question for key mathematical intention words:
            </p>
            <div className="mt-4 space-y-2 text-xs">
              <div className="p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-200/80 text-slate-800">
                <span className="font-bold text-emerald-800">GoF Triggers:</span> "equally likely", "fits the ratio 9:3:3:1", "claims 20% each", "conforms to baseline".
              </div>
              <div className="p-2.5 bg-sky-50/80 rounded-xl border border-sky-200/80 text-slate-800">
                <span className="font-bold text-sky-800">Independence Triggers:</span> "associated with", "independent of", "depends on", "contingency table".
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/60 relative">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-3 shadow-xs">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              Check Table Dimensions
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              If a data table is provided in the prompt, look at its shape:
            </p>
            <div className="mt-4 space-y-2 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 font-mono text-slate-800 shadow-2xs">
                <strong>1 Row or 1 Column:</strong> 1 Variable (GoF)
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 font-mono text-slate-800 shadow-2xs">
                <strong>Multi-Row × Multi-Col:</strong> 2 Variables (Independence)
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Table Structure Visualizer */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Table className="w-5 h-5 text-blue-600" />
              Interactive Table Layout Visualizer
            </h3>
            <p className="text-xs text-slate-500">
              Toggle below to see how data tables look for each test.
            </p>
          </div>

          <div className="inline-flex rounded-full bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setSelectedDemoTab('gof')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                selectedDemoTab === 'gof'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Goodness-of-Fit Layout (1D)
            </button>
            <button
              onClick={() => setSelectedDemoTab('ind')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                selectedDemoTab === 'ind'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Independence Layout (2D)
            </button>
          </div>
        </div>

        {selectedDemoTab === 'gof' ? (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900">
              <span className="font-bold text-emerald-800">Scenario Example:</span> "A coffee shop counts how many of 200 customers order Espresso, Latte, Cappuccino, or Americano to check if orders are equally popular."
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-sm text-slate-800">
                <thead className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-700">
                  <tr>
                    <th className="p-3 bg-slate-200/60">Categorical Variable: Coffee Order</th>
                    <th className="p-3 text-center bg-emerald-100/50 border-l border-slate-200">Espresso</th>
                    <th className="p-3 text-center bg-emerald-100/50 border-l border-slate-200">Latte</th>
                    <th className="p-3 text-center bg-emerald-100/50 border-l border-slate-200">Cappuccino</th>
                    <th className="p-3 text-center bg-emerald-100/50 border-l border-slate-200">Americano</th>
                    <th className="p-3 text-center bg-slate-200/60 border-l border-slate-200">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-medium bg-slate-50">Observed Counts (O)</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">42</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">68</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">50</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">40</td>
                    <td className="p-3 text-center border-l border-slate-200 font-bold bg-slate-50">200</td>
                  </tr>
                  <tr className="bg-emerald-50/40">
                    <td className="p-3 font-medium text-emerald-900">Expected Counts (E = 200/4)</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono text-emerald-800">50</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono text-emerald-800">50</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono text-emerald-800">50</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono text-emerald-800">50</td>
                    <td className="p-3 text-center border-l border-slate-200 font-bold text-emerald-900">200</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>Categories (k) = 4</span>
              <span>Formula: <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-bold">df = k - 1 = 3</code></span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-xs text-sky-900">
              <span className="font-bold text-sky-800">Scenario Example:</span> "A coffee shop surveys 200 customers to check if Coffee Order (Espresso, Latte, Cappuccino, Americano) is associated with Customer Age Group (Student vs Adult)."
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-sm text-slate-800">
                <thead className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-700">
                  <tr>
                    <th className="p-3 bg-slate-200/60">Variable 2: Age \ Variable 1: Coffee</th>
                    <th className="p-3 text-center border-l border-slate-200">Espresso</th>
                    <th className="p-3 text-center border-l border-slate-200">Latte</th>
                    <th className="p-3 text-center border-l border-slate-200">Cappuccino</th>
                    <th className="p-3 text-center border-l border-slate-200">Americano</th>
                    <th className="p-3 text-center bg-slate-200/60 border-l border-slate-200">Row Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-semibold bg-sky-50/50 text-sky-900">Student</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">12</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">48</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">25</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">15</td>
                    <td className="p-3 text-center border-l border-slate-200 font-bold bg-slate-50">100</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-sky-50/50 text-sky-900">Adult</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">30</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">20</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">25</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">25</td>
                    <td className="p-3 text-center border-l border-slate-200 font-bold bg-slate-50">100</td>
                  </tr>
                  <tr className="bg-slate-100 font-bold">
                    <td className="p-3">Column Total</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">42</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">68</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">50</td>
                    <td className="p-3 text-center border-l border-slate-200 font-mono">40</td>
                    <td className="p-3 text-center border-l border-slate-200 font-bold text-indigo-700">200</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>Rows (r) = 2, Cols (c) = 4</span>
              <span>Formula: <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-bold">df = (2-1)(4-1) = 3</code></span>
            </div>
          </div>
        )}
      </div>

      {/* Trigger Word Cheat Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          Word Problem Phrase Decoder
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="border border-emerald-100 bg-emerald-50/40 rounded-2xl p-6">
            <h4 className="font-bold text-emerald-900 text-base mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Goodness-of-Fit Trigger Phrases
            </h4>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs">
                <span className="font-semibold text-emerald-800">"Equally likely / Equally distributed"</span>
                <p className="text-slate-500 mt-1">Implies equal probabilities $1/k$ across all categories.</p>
              </li>
              <li className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs">
                <span className="font-semibold text-emerald-800">"Fits the Mendelian ratio 9:3:3:1"</span>
                <p className="text-slate-500 mt-1">Compares sample to expected fractions (9/16, 3/16, 3/16, 1/16).</p>
              </li>
              <li className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs">
                <span className="font-semibold text-emerald-800">"Matches the national baseline percentages"</span>
                <p className="text-slate-500 mt-1">Compares 1 sample to established historical percentages.</p>
              </li>
            </ul>
          </div>

          <div className="border border-sky-100 bg-sky-50/40 rounded-2xl p-6">
            <h4 className="font-bold text-sky-900 text-base mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              Test for Independence Trigger Phrases
            </h4>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs">
                <span className="font-semibold text-sky-800">"Is associated with / Relationship between"</span>
                <p className="text-slate-500 mt-1">Asks if knowing trait A gives information about trait B.</p>
              </li>
              <li className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs">
                <span className="font-semibold text-sky-800">"Is independent of"</span>
                <p className="text-slate-500 mt-1">Direct statement testing $H_0$: Variables are independent.</p>
              </li>
              <li className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs">
                <span className="font-semibold text-sky-800">"Depends on / Is related to"</span>
                <p className="text-slate-500 mt-1">Tests $H_a$: Variables are dependent.</p>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
};
