import React, { useState } from 'react';
import { PRACTICE_PROBLEMS } from '../data/problems';
import { PracticeProblem, TestType, AcademicDomain, DifficultyLevel } from '../types';
import { Search, Filter, CheckCircle2, XCircle, ArrowRight, RefreshCw, Lightbulb, HelpCircle, Layers, Award, Sparkles } from 'lucide-react';

interface InteractiveQuizProps {
  onRecordAnswer: (isCorrect: boolean) => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ onRecordAnswer }) => {
  const [selectedProblemIndex, setSelectedProblemIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<AcademicDomain>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Step-by-step drill state
  const [userNumVars, setUserNumVars] = useState<number | null>(null);
  const [userTestType, setUserTestType] = useState<TestType | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Filter problems
  const filteredProblems = PRACTICE_PROBLEMS.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.problemText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDomain = selectedDomain === 'All' || p.domain === selectedDomain;
    const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

    return matchesSearch && matchesDomain && matchesDifficulty;
  });

  const currentProblem: PracticeProblem | undefined = filteredProblems[selectedProblemIndex] || filteredProblems[0];

  const handleSelectProblem = (index: number) => {
    setSelectedProblemIndex(index);
    setUserNumVars(null);
    setUserTestType(null);
    setIsSubmitted(false);
    setShowHint(false);
  };

  const handleSubmitAnswer = () => {
    if (!currentProblem || userTestType === null) return;
    setIsSubmitted(true);
    const isCorrect = userTestType === currentProblem.correctAnswer;
    onRecordAnswer(isCorrect);
  };

  const handleNextProblem = () => {
    if (selectedProblemIndex < filteredProblems.length - 1) {
      handleSelectProblem(selectedProblemIndex + 1);
    } else {
      handleSelectProblem(0);
    }
  };

  const domains: AcademicDomain[] = ['All', 'Business & Marketing', 'Healthcare & Medicine', 'Genetics & Biology', 'Sociology & Psychology', 'Education & Campus Life', 'Sports & Entertainment'];

  return (
    <div className="space-y-8 py-6">
      
      {/* Search & Retrieval Header Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Sample Word Problems & Interactive Quiz
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Search by keyword or select a topic to test your variable identification skills.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {filteredProblems.length} Problem{filteredProblems.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search (e.g., M&M, roulette, blood...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800"
            />
          </div>

          {/* Domain Filter */}
          <div className="relative">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value as AcademicDomain)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {domains.map(d => (
                <option key={d} value={d}>Domain: {d}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="relative">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All">Difficulty: All</option>
              <option value="Easy">Difficulty: Easy</option>
              <option value="Medium">Difficulty: Medium</option>
              <option value="Hard">Difficulty: Hard</option>
            </select>
          </div>

        </div>

        {/* Problem Quick Pill Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          {filteredProblems.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => handleSelectProblem(idx)}
              className={`px-3.5 py-1.5 rounded-full border font-semibold whitespace-nowrap transition-all ${
                idx === selectedProblemIndex
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              #{idx + 1} {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Active Problem Card */}
      {currentProblem ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Card Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                {currentProblem.domain}
              </span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                currentProblem.difficulty === 'Easy'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : currentProblem.difficulty === 'Medium'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                {currentProblem.difficulty}
              </span>
            </div>

            <div className="text-xs text-slate-400 font-medium">
              Problem {selectedProblemIndex + 1} of {filteredProblems.length}
            </div>
          </div>

          {/* Problem Statement */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {currentProblem.title}
            </h3>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-sm text-slate-800 leading-relaxed font-normal">
              {currentProblem.problemText}
            </div>

            <div className="mt-4 text-sm font-semibold text-slate-900">
              ❓ {currentProblem.question}
            </div>
          </div>

          {/* Hint Toggle */}
          <div>
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-semibold hover:text-amber-800 transition-colors bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200"
              >
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Show Word Clue Hint</span>
              </button>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
                <span className="font-bold block text-amber-950">💡 Word Clues in this problem:</span>
                <ul className="list-disc list-inside space-y-0.5">
                  {currentProblem.keyClues.map((clue, idx) => (
                    <li key={idx}>{clue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Step-By-Step Practice Drill Form */}
          <div className="border border-blue-100 bg-blue-50/30 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm border-b border-blue-100 pb-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Variable Extraction Step-by-Step Drill</span>
            </div>

            {/* Sub-Step 1: Variable Count */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Step 1: How many categorical variables are measured for EACH subject in this scenario?
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  disabled={isSubmitted}
                  onClick={() => setUserNumVars(1)}
                  className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all ${
                    userNumVars === 1
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  1 Categorical Variable
                </button>
                <button
                  disabled={isSubmitted}
                  onClick={() => setUserNumVars(2)}
                  className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all ${
                    userNumVars === 2
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  2 Categorical Variables
                </button>
              </div>
            </div>

            {/* Sub-Step 2: Select Test Type */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Step 2: Select the correct Chi-Square test:
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  disabled={isSubmitted}
                  onClick={() => setUserTestType('Goodness-of-Fit')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    userTestType === 'Goodness-of-Fit'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs font-bold'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-sm font-bold">Chi-Square Goodness-of-Fit</div>
                  <div className="text-[11px] opacity-90 font-normal mt-0.5">
                    Compares 1 variable against expected proportions/claim
                  </div>
                </button>

                <button
                  disabled={isSubmitted}
                  onClick={() => setUserTestType('Independence')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    userTestType === 'Independence'
                      ? 'bg-sky-700 text-white border-sky-700 shadow-xs font-bold'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-sm font-bold">Chi-Square Test for Independence</div>
                  <div className="text-[11px] opacity-90 font-normal mt-0.5">
                    Tests association between 2 categorical variables
                  </div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            {!isSubmitted ? (
              <button
                disabled={userTestType === null}
                onClick={handleSubmitAnswer}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
              >
                Check Answer
              </button>
            ) : (
              <div className="space-y-4 pt-2">
                {userTestType === currentProblem.correctAnswer ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-950 flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-sm text-emerald-900 block">
                        Correct! Excellent variable identification.
                      </span>
                      <p className="text-emerald-800 leading-relaxed">
                        {currentProblem.explanation}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-950 flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-sm text-rose-900 block">
                        Not quite right. Correct Answer: {currentProblem.correctAnswer}
                      </span>
                      <p className="text-rose-800 leading-relaxed">
                        {currentProblem.explanation}
                      </p>
                      <div className="mt-2 font-semibold text-rose-950 bg-rose-100/70 p-2.5 rounded-xl border border-rose-200">
                        ⚠️ Watch out: {currentProblem.commonMistakeAlert}
                      </div>
                    </div>
                  </div>
                )}

                {/* Variable Breakdown Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
                  <span className="font-bold text-slate-900 block border-b border-slate-100 pb-1">
                    🔍 Solution Breakdown:
                  </span>
                  <div>
                    <span className="font-semibold text-slate-700">Variable 1:</span> {currentProblem.variable1.name} ({currentProblem.variable1.categories.join(', ')})
                  </div>
                  {currentProblem.variable2 ? (
                    <div>
                      <span className="font-semibold text-slate-700">Variable 2:</span> {currentProblem.variable2.name} ({currentProblem.variable2.categories.join(', ')})
                    </div>
                  ) : (
                    <div>
                      <span className="font-semibold text-slate-700">Variable 2:</span> None (Single variable problem)
                    </div>
                  )}
                  {currentProblem.expectedDistribution && (
                    <div>
                      <span className="font-semibold text-slate-700">Expected Distribution:</span> {currentProblem.expectedDistribution}
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextProblem}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex items-center gap-2 transition-all shadow-xs"
                  >
                    <span>Next Problem</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-500">
          No practice problems matched your filters. Try clearing the search query or domain.
        </div>
      )}

    </div>
  );
};
