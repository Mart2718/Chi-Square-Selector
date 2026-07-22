import React from 'react';
import { FileText, Calculator, AlertTriangle, CheckSquare } from 'lucide-react';

export const FormulaCheatSheet: React.FC = () => {
  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Chi-Square Formula & Reference Cheat Sheet
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Quick formula reference for expected counts, degrees of freedom, hypotheses, and required statistical assumptions.
        </p>
      </div>

      {/* Side by Side Comparison Reference */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* GoF Card */}
        <div className="bg-white border border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <h3 className="font-bold text-lg text-emerald-950">
              Goodness-of-Fit Test
            </h3>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              1 Variable
            </span>
          </div>

          <div className="space-y-4 text-xs text-slate-700">
            <div>
              <span className="font-bold text-slate-900 block mb-1">Test Statistic Formula:</span>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 font-mono text-center text-slate-900 font-bold text-sm">
                χ² = ∑ [ (O - E)² / E ]
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-1">Expected Count Formula:</span>
              <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200 font-mono text-emerald-900">
                E = n × p<sub>i</sub> <span className="text-slate-500 font-normal">(Sample size × Expected proportion)</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-1">Degrees of Freedom (df):</span>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 font-mono text-slate-900">
                df = k - 1 <span className="text-slate-500 font-normal">(k = number of categories)</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-1">Hypotheses Statements:</span>
              <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-[11px]">
                <div><strong>H<sub>0</sub>:</strong> The variable follows the specified distribution.</div>
                <div><strong>H<sub>a</sub>:</strong> The variable does not follow the specified distribution.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Independence Card */}
        <div className="bg-white border border-sky-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-sky-100 pb-3">
            <h3 className="font-bold text-lg text-sky-950">
              Test for Independence
            </h3>
            <span className="text-xs font-bold bg-sky-100 text-sky-800 px-3 py-1 rounded-full">
              2 Variables
            </span>
          </div>

          <div className="space-y-4 text-xs text-slate-700">
            <div>
              <span className="font-bold text-slate-900 block mb-1">Test Statistic Formula:</span>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 font-mono text-center text-slate-900 font-bold text-sm">
                χ² = ∑ [ (O - E)² / E ]
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-1">Expected Count Formula:</span>
              <div className="bg-sky-50/80 p-3 rounded-2xl border border-sky-200 font-mono text-sky-900">
                E = (Row Total × Column Total) / Grand Total
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-1">Degrees of Freedom (df):</span>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 font-mono text-slate-900">
                df = (r - 1) × (c - 1) <span className="text-slate-500 font-normal">(r = rows, c = columns)</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-900 block mb-1">Hypotheses Statements:</span>
              <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-[11px]">
                <div><strong>H<sub>0</sub>:</strong> Variable 1 and Variable 2 are independent (no association).</div>
                <div><strong>H<sub>a</sub>:</strong> Variable 1 and Variable 2 are dependent (associated).</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Assumptions Requirements Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-blue-600" />
          Common Assumptions for ALL Chi-Square Tests
        </h3>

        <ul className="grid sm:grid-cols-3 gap-4 text-xs text-slate-700">
          <li className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <strong className="text-slate-900 block mb-1 text-sm">1. Categorical Data</strong>
            Data must be counts/frequencies in mutually exclusive categories.
          </li>
          <li className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <strong className="text-slate-900 block mb-1 text-sm">2. Random Sampling</strong>
            Data collected via random sample or randomized experiment.
          </li>
          <li className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <strong className="text-slate-900 block mb-1 text-sm">3. Expected Cell Size ≥ 5</strong>
            Every expected frequency cell count (E) must be at least 5.
          </li>
        </ul>
      </div>

    </div>
  );
};
