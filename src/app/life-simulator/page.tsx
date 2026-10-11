'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { lifeScenarios, LifeDecisionOption } from '@/lib/data/scenariosData';
import { formatUZS } from '@/lib/utils';
import {
  Layers,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Heart,
  TrendingUp,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Award,
} from 'lucide-react';

export default function LifeSimulatorPage() {
  const { language } = useLanguage();
  const { awardXP, unlockAchievement } = useApp();

  const scenario = lifeScenarios[0];

  // Simulation State
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0, 1, 2
  const [cashBalance, setCashBalance] = useState(scenario.monthlyIncomeUZS - scenario.baseLivingCostsUZS);
  const [savingsBuffer, setSavingsBuffer] = useState(scenario.initialSavingsUZS);
  const [happiness, setHappiness] = useState(70);
  const [financialIQ, setFinancialIQ] = useState(80);
  const [history, setHistory] = useState<{
    month: number;
    choice: string;
    feedback: string;
    iqScore: number;
  }[]>([]);

  const [selectedOpt, setSelectedOpt] = useState<LifeDecisionOption | null>(null);
  const [decisionFeedback, setDecisionFeedback] = useState<LifeDecisionOption | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentEvent = scenario.events[currentMonthIndex];

  const handleMakeDecision = () => {
    if (!selectedOpt) return;

    // Apply impacts
    const nextCash = Math.max(0, cashBalance + selectedOpt.cashImpactUZS);
    const nextSavings = Math.max(0, savingsBuffer + selectedOpt.savingsImpactUZS);
    const nextHappiness = Math.max(0, Math.min(100, happiness + selectedOpt.happinessImpact));
    const nextIQ = Math.round((financialIQ + selectedOpt.financialIQScore) / 2);

    setCashBalance(nextCash);
    setSavingsBuffer(nextSavings);
    setHappiness(nextHappiness);
    setFinancialIQ(nextIQ);

    setHistory((prev) => [
      ...prev,
      {
        month: currentMonthIndex + 1,
        choice: selectedOpt.label,
        feedback: selectedOpt.feedback,
        iqScore: selectedOpt.financialIQScore,
      },
    ]);

    setDecisionFeedback(selectedOpt);
  };

  const handleNextMonth = () => {
    setDecisionFeedback(null);
    setSelectedOpt(null);

    if (currentMonthIndex + 1 < scenario.events.length) {
      // New month stipend arrives!
      const nextMonthStipendSurplus = scenario.monthlyIncomeUZS - scenario.baseLivingCostsUZS;
      setCashBalance((prev) => prev + nextMonthStipendSurplus);
      setCurrentMonthIndex((prev) => prev + 1);
    } else {
      // Finished simulation!
      setIsCompleted(true);
      awardXP(100);
      unlockAchievement('first-mission');
    }
  };

  const handleRestart = () => {
    setCurrentMonthIndex(0);
    setCashBalance(scenario.monthlyIncomeUZS - scenario.baseLivingCostsUZS);
    setSavingsBuffer(scenario.initialSavingsUZS);
    setHappiness(70);
    setFinancialIQ(80);
    setHistory([]);
    setSelectedOpt(null);
    setDecisionFeedback(null);
    setIsCompleted(false);
  };

  const localizedTitle =
    language === 'uz' ? scenario.titleUz : language === 'ru' ? scenario.titleRu : scenario.title;
  const eventTitle =
    language === 'uz'
      ? currentEvent?.titleUz
      : language === 'ru'
      ? currentEvent?.titleRu
      : currentEvent?.title;
  const eventDesc =
    language === 'uz'
      ? currentEvent?.descriptionUz
      : language === 'ru'
      ? currentEvent?.descriptionRu
      : currentEvent?.description;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#182238] via-[#121A2B] to-[#0B1020] border border-[#23324E]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/20 text-sky-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Branching Scenario Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{localizedTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">{scenario.summary}</p>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="px-4 py-2 rounded-xl bg-[#0B1020] border border-[#23324E] hover:border-slate-500 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* Live Vitals HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Vital 1 */}
        <div className="p-4 rounded-2xl bg-[#121A2B] border border-[#23324E]">
          <span className="text-[11px] text-slate-400 block mb-1">Unallocated Cash</span>
          <div className="text-lg font-black text-white">{formatUZS(cashBalance)}</div>
          <span className="text-[10px] text-slate-500">Free to spend</span>
        </div>

        {/* Vital 2 */}
        <div className="p-4 rounded-2xl bg-[#121A2B] border border-[#23324E]">
          <span className="text-[11px] text-slate-400 block mb-1">Emergency Buffer</span>
          <div className="text-lg font-black text-emerald-400">{formatUZS(savingsBuffer)}</div>
          <span className="text-[10px] text-slate-500">Dedicated cushion</span>
        </div>

        {/* Vital 3 */}
        <div className="p-4 rounded-2xl bg-[#121A2B] border border-[#23324E]">
          <span className="text-[11px] text-slate-400 block mb-1">Student Happiness</span>
          <div className="text-lg font-black text-pink-400 flex items-center gap-1">
            <Heart className="w-4 h-4 fill-pink-400" />
            <span>{happiness}%</span>
          </div>
          <span className="text-[10px] text-slate-500">Social & emotional well-being</span>
        </div>

        {/* Vital 4 */}
        <div className="p-4 rounded-2xl bg-[#121A2B] border border-[#23324E]">
          <span className="text-[11px] text-slate-400 block mb-1">Financial IQ</span>
          <div className="text-lg font-black text-sky-400 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>{financialIQ} / 100</span>
          </div>
          <span className="text-[10px] text-slate-500">Decision quality rating</span>
        </div>
      </div>

      {/* Timeline Steps Indicator */}
      <div className="p-4 rounded-2xl bg-[#121A2B] border border-[#23324E] flex items-center justify-between text-xs">
        {scenario.events.map((ev, idx) => (
          <div key={ev.id} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                idx === currentMonthIndex
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : idx < currentMonthIndex
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-[#182238] text-slate-500'
              }`}
            >
              {idx < currentMonthIndex ? '✓' : idx + 1}
            </div>
            <span
              className={`hidden sm:inline font-medium ${
                idx === currentMonthIndex ? 'text-white' : 'text-slate-400'
              }`}
            >
              Month {idx + 1}
            </span>
            {idx < scenario.events.length - 1 && (
              <span className="text-slate-700 hidden sm:inline ml-3">——</span>
            )}
          </div>
        ))}
      </div>

      {/* Main Simulation Event Stage */}
      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
              <Calendar className="w-4 h-4" />
              <span>Current Stage: Month {currentMonthIndex + 1} of 3</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">{eventTitle}</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{eventDesc}</p>
          </div>

          {/* Decision Options */}
          {!decisionFeedback ? (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Your Response:
              </span>
              {currentEvent?.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedOpt(opt)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    selectedOpt?.id === opt.id
                      ? 'bg-violet-600/20 border-violet-500/60 text-white shadow-md'
                      : 'bg-[#0B1020] border-[#23324E] text-slate-300 hover:text-white hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-bold text-white text-sm block">{opt.label}</span>
                    <p className="text-xs text-slate-400">{opt.description}</p>
                  </div>
                  <div className="shrink-0 text-[11px] text-right font-medium text-slate-400">
                    <div>Cash: {opt.cashImpactUZS !== 0 ? formatUZS(opt.cashImpactUZS) : '0'}</div>
                    <div className="text-sky-300">IQ Score: {opt.financialIQScore}</div>
                  </div>
                </button>
              ))}

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  disabled={!selectedOpt}
                  onClick={handleMakeDecision}
                  className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 flex items-center gap-2 disabled:opacity-40 cursor-pointer transition-all"
                >
                  <span>Commit Financial Decision</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Consequence & Educational Feedback Box */
            <div className="p-6 rounded-2xl bg-[#0B1020] border border-violet-500/30 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Decision Consequence Analysis</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {decisionFeedback.feedback}
              </p>

              <div className="p-3 rounded-xl bg-[#121A2B] border border-[#23324E] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Cash Impact</span>
                  <span className="font-bold text-white">
                    {decisionFeedback.cashImpactUZS !== 0
                      ? formatUZS(decisionFeedback.cashImpactUZS)
                      : 'None'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Buffer Impact</span>
                  <span className="font-bold text-emerald-400">
                    {decisionFeedback.savingsImpactUZS !== 0
                      ? formatUZS(decisionFeedback.savingsImpactUZS)
                      : 'None'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Happiness</span>
                  <span className="font-bold text-pink-400">
                    {decisionFeedback.happinessImpact > 0
                      ? `+${decisionFeedback.happinessImpact}%`
                      : `${decisionFeedback.happinessImpact}%`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Financial IQ</span>
                  <span className="font-bold text-sky-400">{decisionFeedback.financialIQScore} / 100</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>
                    {currentMonthIndex + 1 < scenario.events.length
                      ? 'Proceed to Next Month'
                      : 'Complete Simulation & View Score'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Final Completion Screen */
        <div className="p-8 rounded-3xl bg-[#121A2B] border border-emerald-500/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-300">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-extrabold text-white">
              Semester Completed Successfully!
            </h2>
            <p className="text-xs text-slate-300">
              You navigated social outings, unexpected hardware breakdowns, and freelance gigs with maturity.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-2xl bg-[#0B1020] border border-[#23324E]">
              <span className="text-[10px] text-slate-400 block">Final Cash</span>
              <span className="text-base font-bold text-white">{formatUZS(cashBalance)}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0B1020] border border-[#23324E]">
              <span className="text-[10px] text-slate-400 block">Saved Buffer</span>
              <span className="text-base font-bold text-emerald-400">{formatUZS(savingsBuffer)}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0B1020] border border-[#23324E]">
              <span className="text-[10px] text-slate-400 block">Final Happiness</span>
              <span className="text-base font-bold text-pink-400">{happiness}%</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0B1020] border border-[#23324E]">
              <span className="text-[10px] text-slate-400 block">Financial IQ Rating</span>
              <span className="text-base font-bold text-sky-400">{financialIQ} / 100</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-[#182238] hover:bg-[#202d4a] text-slate-200 text-xs font-semibold border border-[#23324E] transition-all cursor-pointer"
            >
              Replay Journey
            </button>
            <a
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 transition-all flex items-center gap-2"
            >
              <span>Return to Dashboard (+100 XP Claimed)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
