import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle2, Layers, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import { VariableAnalysisResult } from '../types';

export const ProblemAnalyzer: React.FC = () => {
  const [problemInput, setProblemInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<VariableAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const samplePrompts = [
    'A soda factory tests if customer flavor preference is equal among Cola, Sprite, and Fanta.',
    'A researcher records customer age group (Under 21 vs 21+) and preferred coffee drink (Latte, Espresso, Iced) to see if age is associated with coffee preference.',
    'Geneticists cross fruit flies expecting a Mendelian 9:3:3:1 ratio of wing and eye traits.'
  ];

  const handleAnalyze = async (textToAnalyze?: string) => {
    const text = textToAnalyze || problemInput;
    if (!text.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/analyze-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemText: text })
      });

      if (!res.ok) {
        throw new Error('Failed to analyze problem.');
      }

      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      } else {
        throw new Error('Invalid analysis format.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Could not complete analysis. Please try typing a clear word problem.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600" />
          Word Problem Variable & Test Analyzer
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Paste any statistics homework or exam word problem below to instantly break down its variables and get the correct Chi-Square test verdict.
        </p>

        {/* Text Input Area */}
        <div className="mt-5 space-y-4">
          <textarea
            rows={4}
            value={problemInput}
            onChange={(e) => setProblemInput(e.target.value)}
            placeholder="Paste your word problem here... (e.g. 'A casino manager wants to check if a die is fair by rolling it 600 times and recording the counts of each face 1-6...')"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold">Try a sample:</span>
              {samplePrompts.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setProblemInput(s);
                    handleAnalyze(s);
                  }}
                  className="text-blue-700 hover:bg-blue-100 font-semibold bg-blue-50 px-3 py-1 rounded-full text-[11px] border border-blue-100 transition-colors cursor-pointer"
                >
                  Sample #{idx + 1}
                </button>
              ))}
            </div>

            <button
              disabled={isLoading || !problemInput.trim()}
              onClick={() => handleAnalyze()}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-40 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Variables...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Problem</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Error */}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Analysis Result Display */}
      {analysis && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Verdict Banner */}
          <div className={`p-6 rounded-2xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            analysis.testType === 'Goodness-of-Fit'
              ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
              : 'bg-sky-50 border-sky-500 text-sky-950'
          }`}>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                Recommended Test Verdict:
              </div>
              <h3 className="text-2xl font-bold">
                Chi-Square {analysis.testType === 'Goodness-of-Fit' ? 'Goodness-of-Fit Test' : 'Test for Independence'}
              </h3>
            </div>

            <div className={`text-xs font-bold px-3.5 py-1.5 rounded-full border text-center font-mono ${
              analysis.testType === 'Goodness-of-Fit'
                ? 'bg-emerald-200/80 border-emerald-400 text-emerald-900'
                : 'bg-sky-200/80 border-sky-400 text-sky-900'
            }`}>
              {analysis.numVariables} Categorical Variable{analysis.numVariables > 1 ? 's' : ''} Identified
            </div>
          </div>

          {/* Variable Breakdown */}
          <div className="grid sm:grid-cols-2 gap-4">
            
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/60 space-y-2">
              <span className="text-xs font-bold text-slate-900 block border-b border-slate-200 pb-1">
                🎯 Primary Variable 1:
              </span>
              <p className="text-xs font-semibold text-blue-900">
                {analysis.variable1.name}
              </p>
              {analysis.variable1.categories && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {analysis.variable1.categories.map((cat, i) => (
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
                {analysis.variable2.name || 'None (1 Variable Scenario)'}
              </p>
              {analysis.variable2.categories && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {analysis.variable2.categories.map((cat, i) => (
                    <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 font-mono font-medium">
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Explanation & Hypotheses */}
          <div className="space-y-4 text-xs text-slate-800">
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5">
              <span className="font-bold text-blue-950 block mb-1">
                💡 Why this is a {analysis.testType}:
              </span>
              <p className="text-slate-700 leading-relaxed">
                {analysis.explanation}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-2xl p-5 bg-white">
                <span className="font-bold text-slate-900 block mb-1">
                  Null Hypothesis ($H_0$):
                </span>
                <p className="text-slate-700 font-mono text-[11px]">
                  {analysis.nullHypothesis}
                </p>
              </div>

              <div className="border border-slate-200 rounded-2xl p-5 bg-white">
                <span className="font-bold text-slate-900 block mb-1">
                  Alternative Hypothesis ($H_a$):
                </span>
                <p className="text-slate-700 font-mono text-[11px]">
                  {analysis.altHypothesis}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between border-t border-slate-100 pt-4 text-slate-600 gap-2">
              <span>Degrees of Freedom Formula: <strong className="font-mono text-slate-900">{analysis.degreesOfFreedomFormula}</strong></span>
              {analysis.keyTriggerWords && analysis.keyTriggerWords.length > 0 && (
                <span className="flex items-center gap-1">
                  Triggers:
                  {analysis.keyTriggerWords.map((tw, i) => (
                    <span key={i} className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                      "{tw}"
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
