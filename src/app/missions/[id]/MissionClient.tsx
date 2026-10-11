'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { missions } from '@/lib/data/missionsData';
import { formatUZS } from '@/lib/utils';
import { playErrorSound } from '@/lib/sounds';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  Zap,
  Bus,
  Gamepad2,
  Utensils,
  Shirt,
  Wifi,
  Coffee,
  Check,
  Laptop,
  Flame,
} from 'lucide-react';

export function MissionClient({ id }: { id: string }) {
  const router = useRouter();
  const { language } = useLanguage();
  const { state, completeMission } = useApp();

  const mission = missions.find((m) => m.id === id);

  // States for Task 1 (budget_allocation)
  const [allocNeeds, setAllocNeeds] = useState(500000);
  const [allocWants, setAllocWants] = useState(300000);
  const [allocSavings, setAllocSavings] = useState(200000);

  // States for Task 2 (needs_wants_sort)
  const [sortUserChoices, setSortUserChoices] = useState<Record<string, 'need' | 'want'>>({});

  // States for Task 3 (savings_calculation)
  const [userMonthlySavings, setUserMonthlySavings] = useState('');
  const [userFinanceChoice, setUserFinanceChoice] = useState<'save_cash' | 'take_loan' | null>(null);

  // States for Task 4 (scenario_choice)
  const [selectedScenarioOpt, setSelectedScenarioOpt] = useState<string | null>(null);

  // States for Task 5 (scam_spotter)
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);

  // Validation / Feedback states
  const [feedback, setFeedback] = useState<{
    success: boolean;
    message: string;
    details?: string;
  } | null>(null);

  const [showCelebration, setShowCelebration] = useState(false);

  if (!mission) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Mission Not Found</h2>
        <p className="text-slate-400 text-sm">The quest you are looking for does not exist.</p>
        <Link href="/missions" className="inline-block px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold">
          Return to Missions
        </Link>
      </div>
    );
  }

  const isCompleted = state.completedMissions.includes(mission.id);
  const localizedTitle = language === 'uz' ? mission.titleUz : language === 'ru' ? mission.titleRu : mission.title;
  const localizedDesc = language === 'uz' ? mission.descriptionUz : language === 'ru' ? mission.descriptionRu : mission.description;

  const iconMap: Record<string, React.ElementType> = {
    Bus,
    Gamepad2,
    Utensils,
    Shirt,
    Wifi,
    Coffee,
  };

  const handleValidateTask = () => {
    setFeedback(null);

    // 1. Budget Allocation
    if (mission.type === 'budget_allocation') {
      const sum = allocNeeds + allocWants + allocSavings;
      if (sum !== 1000000) {
        playErrorSound();
        setFeedback({
          success: false,
          message: `Your total allocated sum is ${formatUZS(sum)}, but your stipend is exactly 1 000 000 UZS. Adjust your sliders so they match 100%!`,
        });
        return;
      }
      const savingsPercent = (allocSavings / 1000000) * 100;
      if (savingsPercent < 20) {
        playErrorSound();
        setFeedback({
          success: false,
          message: `Your planned savings (${savingsPercent}%) is below the recommended 20% minimum. Allocate at least 200 000 UZS to savings for future resilience!`,
        });
        return;
      }
      completeMission(mission.id, mission.xpReward);
      setShowCelebration(true);
      setFeedback({
        success: true,
        message: 'Masterful allocation! You satisfied the 50/30/20 rule: 50% Needs, 30% Wants, and 20% Savings.',
      });
      return;
    }

    // 2. Needs vs Wants Sorting
    if (mission.type === 'needs_wants_sort') {
      const items = (mission.content.taskData?.items as Array<{ id: string; category: string }>) || [];
      const unclassified = items.filter((it) => !sortUserChoices[it.id]);
      if (unclassified.length > 0) {
        playErrorSound();
        setFeedback({
          success: false,
          message: `Please classify all 6 items before submitting. (${unclassified.length} remaining)`,
        });
        return;
      }
      const errors = items.filter((it) => sortUserChoices[it.id] !== it.category);
      if (errors.length > 0) {
        playErrorSound();
        setFeedback({
          success: false,
          message: `You got ${items.length - errors.length} out of ${items.length} correct. Review the items highlighted in red and adjust your choices.`,
        });
        return;
      }
      completeMission(mission.id, mission.xpReward);
      setShowCelebration(true);
      setFeedback({
        success: true,
        message: 'Perfect 6/6! You clearly separated vital survival and study essentials from lifestyle luxuries.',
      });
      return;
    }

    // 3. Savings Calculation
    if (mission.type === 'savings_calculation') {
      const parsedNum = parseInt(userMonthlySavings.replace(/[^0-9]/g, ''), 10);
      if (parsedNum !== 1000000) {
        playErrorSound();
        setFeedback({
          success: false,
          message: 'Check your math! (Target: 6 000 000 UZS - Saved: 1 000 000 UZS = 5 000 000 UZS remaining). Over 5 months, how much is 5 000 000 ÷ 5?',
        });
        return;
      }
      if (userFinanceChoice !== 'save_cash') {
        playErrorSound();
        setFeedback({
          success: false,
          message: 'Taking high-interest microloans for tech purchases can add 40%+ in toxic fees. Select the patient automated savings option!',
        });
        return;
      }
      completeMission(mission.id, mission.xpReward);
      setShowCelebration(true);
      setFeedback({
        success: true,
        message: 'Spot on! Saving 1 000 000 UZS for 5 months allows you to buy the laptop completely debt-free with zero interest fees!',
      });
      return;
    }

    // 4. Scenario Choice
    if (mission.type === 'scenario_choice') {
      if (!selectedScenarioOpt) {
        playErrorSound();
        setFeedback({
          success: false,
          message: 'Please select one of the response options.',
        });
        return;
      }
      const chosen = (mission.content.taskData?.options as Array<{ id: string; isCorrect: boolean; impact: { explanation: string } }>).find(
        (o) => o.id === selectedScenarioOpt
      );
      if (!chosen?.isCorrect) {
        playErrorSound();
        setFeedback({
          success: false,
          message: chosen?.impact.explanation || 'That choice carries excessive financial or health costs. Try another solution!',
        });
        return;
      }
      completeMission(mission.id, mission.xpReward);
      setShowCelebration(true);
      setFeedback({
        success: true,
        message: chosen.impact.explanation,
      });
      return;
    }

    // 5. Scam Spotter
    if (mission.type === 'scam_spotter') {
      const flags = (mission.content.taskData?.flags as Array<{ id: string; isScamIndicator: boolean }>) || [];
      const required = flags.filter((f) => f.isScamIndicator).map((f) => f.id);
      const isCorrect =
        selectedFlags.length === required.length &&
        required.every((r) => selectedFlags.includes(r));

      if (!isCorrect) {
        playErrorSound();
        setFeedback({
          success: false,
          message: 'You have not identified the exact set of scam red flags. Remember: abnormal guaranteed returns, high-pressure countdowns, and SMS code requests are the key danger signals.',
        });
        return;
      }
      completeMission(mission.id, mission.xpReward);
      setShowCelebration(true);
      setFeedback({
        success: true,
        message: 'Outstanding cyber-detective work! You flagged all 3 critical traps. Real banks never ask for SMS codes, and no real investment guarantees 50% weekly gains.',
      });
      return;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/missions"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Missions Catalog</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-violet-600/15 border border-violet-500/20 text-violet-300 text-xs font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>+{mission.xpReward} XP Reward</span>
          </span>
          {isCompleted && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Completed</span>
            </span>
          )}
        </div>
      </div>

      {/* Mission Briefing Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#182238] via-[#121A2B] to-[#0B1020] border border-[#23324E] space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-[#0B1020] text-slate-300 border border-[#23324E]">
            {mission.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
            {mission.difficulty}
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {mission.durationMin} minutes
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{localizedTitle}</h1>
        <p className="text-sm text-slate-300 leading-relaxed">{localizedDesc}</p>

        {/* Story Box */}
        <div className="p-4 rounded-2xl bg-[#0B1020]/90 border border-violet-500/20 space-y-2 text-xs">
          <span className="text-violet-400 font-bold block uppercase tracking-wider">
            Context & Scenario
          </span>
          <p className="text-slate-300 leading-relaxed">{mission.content.story}</p>
        </div>
      </div>

      {/* INTERACTIVE TASK WORKBENCH */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-6">
        <div className="border-b border-[#23324E] pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-sky-400" />
            <span>Interactive Challenge Task</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">{mission.content.instructions}</p>
        </div>

        {/* TASK 1: Budget Allocation */}
        {mission.type === 'budget_allocation' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#0B1020] border border-[#23324E] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-xs text-slate-400 block">Stipend Total</span>
                <span className="text-base font-bold text-white">{formatUZS(1000000)}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Total Allocated</span>
                <span
                  className={`text-base font-bold ${
                    allocNeeds + allocWants + allocSavings === 1000000
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }`}
                >
                  {formatUZS(allocNeeds + allocWants + allocSavings)}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Remaining Som</span>
                <span className="text-base font-bold text-sky-400">
                  {formatUZS(1000000 - (allocNeeds + allocWants + allocSavings))}
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-200 font-semibold">1. Needs (Target ~50%)</span>
                  <span className="text-sky-300 font-bold">
                    {formatUZS(allocNeeds)} ({Math.round((allocNeeds / 1000000) * 100)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="50000"
                  value={allocNeeds}
                  onChange={(e) => setAllocNeeds(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-200 font-semibold">2. Wants (Target ~30%)</span>
                  <span className="text-violet-300 font-bold">
                    {formatUZS(allocWants)} ({Math.round((allocWants / 1000000) * 100)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="50000"
                  value={allocWants}
                  onChange={(e) => setAllocWants(Number(e.target.value))}
                  className="w-full accent-violet-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-200 font-semibold">3. Savings (Target ≥20%)</span>
                  <span className="text-emerald-300 font-bold">
                    {formatUZS(allocSavings)} ({Math.round((allocSavings / 1000000) * 100)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="50000"
                  value={allocSavings}
                  onChange={(e) => setAllocSavings(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* TASK 2: Needs vs Wants Sorting */}
        {mission.type === 'needs_wants_sort' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {((mission.content.taskData?.items as Array<{ id: string; name: string; priceUZS: number; category: 'need' | 'want'; icon: string; reason: string }>) || []).map(
                (item) => {
                  const Icon = iconMap[item.icon] || Laptop;
                  const currentChoice = sortUserChoices[item.id];

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[#0B1020] border border-[#23324E] space-y-3 flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#182238] border border-[#23324E] flex items-center justify-center text-slate-300">
                            <Icon className="w-5 h-5 text-sky-400" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{item.name}</h4>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {formatUZS(item.priceUZS)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSortUserChoices((prev) => ({ ...prev, [item.id]: 'need' }))
                          }
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            currentChoice === 'need'
                              ? 'bg-sky-500/20 text-sky-300 border-sky-500/60 shadow-sm'
                              : 'bg-[#182238] text-slate-400 border-[#23324E] hover:text-white'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Need (Zarurat)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setSortUserChoices((prev) => ({ ...prev, [item.id]: 'want' }))
                          }
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            currentChoice === 'want'
                              ? 'bg-violet-600/20 text-violet-300 border-violet-500/60 shadow-sm'
                              : 'bg-[#182238] text-slate-400 border-[#23324E] hover:text-white'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Want (Istak)</span>
                        </button>
                      </div>

                      {feedback && (
                        <div
                          className={`p-2 rounded-xl text-[11px] leading-relaxed border ${
                            currentChoice === item.category
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                          }`}
                        >
                          {item.reason}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* TASK 3: Savings Calculation */}
        {mission.type === 'savings_calculation' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0B1020] border border-[#23324E] text-center text-xs">
              <div>
                <span className="text-slate-400 block">Target Laptop Cost</span>
                <span className="text-sm font-bold text-white">{formatUZS(6000000)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Already Saved</span>
                <span className="text-sm font-bold text-emerald-400">{formatUZS(1000000)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Target Deadline</span>
                <span className="text-sm font-bold text-sky-400">5 Months</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-200">
                1. Calculate required monthly savings amount (UZS):
              </label>
              <input
                type="text"
                value={userMonthlySavings}
                onChange={(e) => setUserMonthlySavings(e.target.value)}
                placeholder="e.g. 1 000 000"
                className="w-full p-3 rounded-xl bg-[#0B1020] border border-[#23324E] text-slate-100 text-sm focus:outline-none focus:border-violet-500"
              />
              <span className="text-[11px] text-slate-400">
                Formula: (Total Goal − Already Saved) ÷ Remaining Months
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold text-slate-200">
                2. Select the optimal financing strategy:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setUserFinanceChoice('save_cash')}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    userFinanceChoice === 'save_cash'
                      ? 'bg-emerald-500/15 text-emerald-200 border-emerald-500/60'
                      : 'bg-[#0B1020] text-slate-300 border-[#23324E] hover:border-slate-600'
                  }`}
                >
                  <div className="font-bold mb-1">Option A: Disciplined 5-Month Savings</div>
                  <p className="text-[11px] text-slate-400">
                    Save 1 000 000 UZS every month. Buy in cash with 0% extra interest or commission.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setUserFinanceChoice('take_loan')}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    userFinanceChoice === 'take_loan'
                      ? 'bg-rose-500/15 text-rose-200 border-rose-500/60'
                      : 'bg-[#0B1020] text-slate-300 border-[#23324E] hover:border-slate-600'
                  }`}
                >
                  <div className="font-bold mb-1">Option B: Instant Microloan App</div>
                  <p className="text-[11px] text-slate-400">
                    Buy today, but pay 42% annual interest (+2 100 000 UZS total extra fees) over 12 months.
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TASK 4: Scenario Choice */}
        {mission.type === 'scenario_choice' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Urgent Expense: Screen replacement costs 350 000 UZS.</span>
            </div>

            <div className="space-y-3">
              {((mission.content.taskData?.options as Array<{ id: string; label: string; isCorrect: boolean }>) || []).map(
                (opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedScenarioOpt(opt.id)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs transition-all cursor-pointer flex items-start gap-3 ${
                      selectedScenarioOpt === opt.id
                        ? 'bg-violet-600/20 border-violet-500/60 text-white shadow-md'
                        : 'bg-[#0B1020] border-[#23324E] text-slate-300 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        selectedScenarioOpt === opt.id
                          ? 'border-violet-400 bg-violet-600 text-white'
                          : 'border-slate-600'
                      }`}
                    >
                      {selectedScenarioOpt === opt.id && <Check className="w-3 h-3" />}
                    </div>
                    <span className="font-medium leading-relaxed">{opt.label}</span>
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* TASK 5: Scam Spotter */}
        {mission.type === 'scam_spotter' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#0B1020] border border-[#23324E] p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[#23324E]/80">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                  TG
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>@TashkentCryptoFastWealth</span>
                    <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded">
                      Unverified Bot
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500">Incoming direct message</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#182238] border border-[#23324E] text-xs text-slate-200 leading-relaxed font-mono">
                &quot;Salam student! Transfer 100 000 UZS right now and get 150 000 UZS back in 48 hours
                guaranteed. Offer expires in 45 minutes! Send card details and SMS code.&quot;
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-slate-200 block">
                Select all genuine scam red flags found in this message:
              </span>

              {((mission.content.taskData?.flags as Array<{ id: string; text: string; isScamIndicator: boolean }>) || []).map(
                (flag) => {
                  const isChecked = selectedFlags.includes(flag.id);

                  return (
                    <label
                      key={flag.id}
                      className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-violet-600/15 border-violet-500/50 text-white'
                          : 'bg-[#0B1020] border-[#23324E] text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSelectedFlags(selectedFlags.filter((fId) => fId !== flag.id));
                          } else {
                            setSelectedFlags([...selectedFlags, flag.id]);
                          }
                        }}
                        className="rounded border-slate-700 text-violet-600 focus:ring-violet-500"
                      />
                      <span className="leading-relaxed">{flag.text}</span>
                    </label>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* FEEDBACK BANNER */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 animate-in fade-in duration-200 ${
              feedback.success
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-200'
            }`}
          >
            {feedback.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <span className="font-bold block">
                {feedback.success ? 'Challenge Completed!' : 'Adjustment Required'}
              </span>
              <p>{feedback.message}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 border-t border-[#23324E] flex items-center justify-between">
          <Link href="/missions" className="text-xs text-slate-400 hover:text-white">
            Cancel & Return
          </Link>

          <button
            type="button"
            onClick={handleValidateTask}
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Submit Solution & Verify</span>
          </button>
        </div>
      </div>

      {/* VICTORY CELEBRATION MODAL */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full rounded-3xl bg-[#121A2B] border border-violet-500/40 p-6 sm:p-8 text-center space-y-6 shadow-2xl shadow-violet-950/60 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-300">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                Quest Victory!
              </span>
              <h3 className="text-2xl font-extrabold text-white">Mission Accomplished!</h3>
              <p className="text-xs text-slate-300">
                You successfully mastered this financial decision and earned experience points.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1020] border border-[#23324E] flex items-center justify-around">
              <div>
                <span className="text-[11px] text-slate-400 block">XP Earned</span>
                <span className="text-xl font-black text-amber-400">+{mission.xpReward} XP</span>
              </div>
              <div className="w-px h-8 bg-[#23324E]" />
              <div>
                <span className="text-[11px] text-slate-400 block">Current Streak</span>
                <span className="text-xl font-black text-white flex items-center gap-1 justify-center">
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {state.streakDays}d
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <Link
                href="/dashboard"
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 transition-all cursor-pointer"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/missions"
                className="w-full py-3 rounded-xl bg-[#182238] hover:bg-[#202d4a] text-slate-300 text-xs font-semibold border border-[#23324E] transition-all cursor-pointer"
              >
                Next Mission
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
