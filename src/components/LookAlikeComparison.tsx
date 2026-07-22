import React, { useState } from 'react';
import { SCENARIO_PAIRS } from '../data/scenarioPairs';
import { ScenarioPair } from '../types';
import { GitCompare, Filter, ChevronRight, CheckCircle2, ArrowRightLeft, Sparkles } from 'lucide-react';

export const LookAlikeComparison: React.FC = () => {
  const [selectedPairId, setSelectedPairId] = useState<string>(SCENARIO_PAIRS[0].id);
  const [domainFilter, setDomainFilter] = useState<string>('All');

  const filteredPairs = domainFilter === 'All'
    ? SCENARIO_PAIRS
    : SCENARIO_PAIRS.filter(p => p.domain === domainFilter);

  const activePair = SCENARIO_PAIRS.find(p => p.id === selectedPairId) || SCENARIO_PAIRS[0];

  const domains = ['All', ...Array.from(new Set(SCENARIO_PAIRS.map(p => p.domain)))];

  return (
    <div className="space-y-8 py-6">
      
      {/* Section Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-blue-600" />
              Look-Alike Scenario Comparisons
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select a pair below to see how deceptively similar word problems diverge into 1 variable vs 2 variables.
            </p>
          </div>

          {/* Domain Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {domains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pair Selector Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-6">
          {filteredPairs.map((pair) => (
            <button
              key={pair.id}
              onClick={() => setSelectedPairId(pair.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedPairId === pair.id
                  ? 'bg-blue-600 border-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className={`text-[10px] uppercase tracking-wider font-bold mb-0.5 ${
                selectedPairId === pair.id ? 'text-blue-100' : 'text-blue-600'
              }`}>
                {pair.domain}
              </div>
              <div className="text-xs font-bold truncate">
                {pair.topic}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparison Container */}
      <div className="space-y-6">
        
        {/* Contrast Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-xs text-slate-800 flex items-start gap-3.5">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block text-sm mb-1">
              Why these two scenarios sound identical at first glance:
            </span>
            <p className="text-slate-700 leading-relaxed">
              {activePair.contrastSummary}
            </p>
          </div>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Card 1: Goodness-of-Fit */}
          <div className="bg-white border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative">
            <div className="absolute top-6 right-6 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200">
              Goodness-of-Fit (1 Variable)
            </div>

            <div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                Scenario A
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 pr-32">
                {activePair.gofScenario.title}
              </h3>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-800 leading-relaxed mb-4">
                "{activePair.gofScenario.problemText}"
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200">
                  <span className="font-bold text-emerald-900 block mb-1">
                    🎯 Variable Measured:
                  </span>
                  <span className="text-emerald-800 font-medium">
                    {activePair.gofScenario.variable}
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {activePair.gofScenario.categories.map((c, idx) => (
                      <span key={idx} className="bg-emerald-200/70 text-emerald-900 text-[10px] px-2 py-0.5 rounded-md font-mono font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">
                    📊 Comparison Baseline:
                  </span>
                  <span className="text-slate-700">
                    {activePair.gofScenario.expectedRule}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Table Shape:
                  </span>
                  <span className="font-mono bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md font-bold">
                    {activePair.gofScenario.tableSummary}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-emerald-900 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Key Trigger Phrase: <strong className="underline decoration-emerald-400">"{activePair.gofScenario.keyTriggerWord}"</strong></span>
            </div>
          </div>

          {/* Card 2: Test for Independence */}
          <div className="bg-white border-2 border-sky-500/40 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative">
            <div className="absolute top-6 right-6 bg-sky-100 text-sky-800 text-[11px] font-bold px-3 py-1 rounded-full border border-sky-200">
              Test for Independence (2 Variables)
            </div>

            <div>
              <div className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
                Scenario B
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 pr-32">
                {activePair.indScenario.title}
              </h3>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-800 leading-relaxed mb-4">
                "{activePair.indScenario.problemText}"
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-200">
                  <span className="font-bold text-sky-900 block mb-1">
                    🎯 Variables Measured (Two Traits):
                  </span>
                  <div className="space-y-1">
                    <div>
                      <strong className="text-sky-950">Var 1:</strong> {activePair.indScenario.variable1}
                    </div>
                    <div>
                      <strong className="text-sky-950">Var 2:</strong> {activePair.indScenario.variable2}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">
                    📊 Expected Table Grid:
                  </span>
                  <span className="text-slate-700">
                    Contingency grid combining Categories ({activePair.indScenario.categories1.length} x {activePair.indScenario.categories2.length})
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Table Shape:
                  </span>
                  <span className="font-mono bg-sky-100 text-sky-900 px-2.5 py-0.5 rounded-md font-bold">
                    {activePair.indScenario.tableSummary}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-sky-900 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Key Trigger Phrase: <strong className="underline decoration-sky-400">"{activePair.indScenario.keyTriggerWord}"</strong></span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
