import React from 'react';
import { Compass, GitCompare, HelpCircle, GitBranch, Search, FileText, Award, RefreshCw } from 'lucide-react';

export type TabType = 'guide' | 'comparison' | 'quiz' | 'flowchart' | 'analyzer' | 'cheatsheet';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  stats: {
    attempted: number;
    correct: number;
    streak: number;
  };
  onResetStats: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, stats, onResetStats }) => {
  const accuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;

  return (
    <header className="bg-white border-b border-slate-200 text-slate-800 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          
          {/* Brand & Main Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-xs shrink-0">
              χ²
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
                StatGuide: Chi-Square Navigator
              </h1>
              <p className="text-xs text-slate-500">
                Goodness-of-Fit vs. Test for Independence Word Problem Master
              </p>
            </div>
          </div>

          {/* User Score & Stats Pill */}
          <div className="flex items-center gap-3 bg-slate-100/80 border border-slate-200 rounded-2xl px-4 py-2 text-xs">
            <div className="flex items-center gap-1.5 text-blue-700 font-bold">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Score: {stats.correct}/{stats.attempted} ({accuracy}%)</span>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="text-emerald-600 font-semibold flex items-center gap-1">
              🔥 Streak: {stats.streak}
            </div>
            {stats.attempted > 0 && (
              <button
                onClick={onResetStats}
                title="Reset Stats"
                className="ml-1 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs - Pill Style */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-3 scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>3-Step Strategy Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'comparison'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>Look-Alike Examples</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Practice & Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('flowchart')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'flowchart'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Decision Flowchart</span>
          </button>

          <button
            onClick={() => setActiveTab('analyzer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'analyzer'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Problem Analyzer</span>
          </button>

          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'cheatsheet'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Formula Reference</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
