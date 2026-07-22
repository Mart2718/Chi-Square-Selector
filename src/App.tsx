import React, { useState, useEffect } from 'react';
import { Header, TabType } from './components/Header';
import { VariableIdentifierGuide } from './components/VariableIdentifierGuide';
import { LookAlikeComparison } from './components/LookAlikeComparison';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { DecisionTreeWizard } from './components/DecisionTreeWizard';
import { ProblemAnalyzer } from './components/ProblemAnalyzer';
import { FormulaCheatSheet } from './components/FormulaCheatSheet';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('guide');

  const [stats, setStats] = useState<{ attempted: number; correct: number; streak: number }>(() => {
    try {
      const saved = localStorage.getItem('chisq_stats');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return { attempted: 0, correct: 0, streak: 0 };
  });

  useEffect(() => {
    try {
      localStorage.setItem('chisq_stats', JSON.stringify(stats));
    } catch (e) {
      // ignore
    }
  }, [stats]);

  const handleRecordAnswer = (isCorrect: boolean) => {
    setStats((prev) => ({
      attempted: prev.attempted + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      streak: isCorrect ? prev.streak + 1 : 0,
    }));
  };

  const handleResetStats = () => {
    if (window.confirm('Reset your score and streak history?')) {
      setStats({ attempted: 0, correct: 0, streak: 0 });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-500 selection:text-white flex flex-col">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
        onResetStats={handleResetStats}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Quick Tab Content Switcher */}
        {activeTab === 'guide' && <VariableIdentifierGuide />}
        {activeTab === 'comparison' && <LookAlikeComparison />}
        {activeTab === 'quiz' && <InteractiveQuiz onRecordAnswer={handleRecordAnswer} />}
        {activeTab === 'flowchart' && <DecisionTreeWizard />}
        {activeTab === 'analyzer' && <ProblemAnalyzer />}
        {activeTab === 'cheatsheet' && <FormulaCheatSheet />}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="font-semibold text-slate-700">
            Chi-Square Test Selector & Variable Identification Master
          </p>
          <p className="text-slate-400">
            Designed for Introductory & Advanced Applied Statistics • Goodness-of-Fit vs. Test for Independence
          </p>
        </div>
      </footer>
    </div>
  );
}
