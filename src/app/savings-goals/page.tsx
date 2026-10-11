'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp, SavingsGoal } from '@/context/AppContext';
import { formatUZS, parseSafeNumber } from '@/lib/utils';
import {
  Target,
  Plus,
  Trash2,
  Sparkles,
  Laptop,
  BookOpen,
  Bike,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export default function SavingsGoalsPage() {
  const { t } = useLanguage();
  const { state, addSavingsGoal, depositToGoal, deleteSavingsGoal } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [monthlyContrib, setMonthlyContrib] = useState('');
  const [category, setCategory] = useState('Tech & Education');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const target = parseSafeNumber(targetAmount);
    const current = parseSafeNumber(currentAmount);
    const monthly = parseSafeNumber(monthlyContrib);

    if (!goalName.trim()) {
      setErrorMsg('Please specify a goal name.');
      return;
    }

    if (target <= 0) {
      setErrorMsg('Target amount must be greater than zero.');
      return;
    }

    addSavingsGoal({
      name: goalName.trim(),
      targetAmount: target,
      currentAmount: current,
      monthlyContribution: monthly,
      category,
    });

    setIsModalOpen(false);
    setGoalName('');
    setTargetAmount('');
    setCurrentAmount('');
    setMonthlyContrib('');
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Tech & Education':
        return Laptop;
      case 'Emergency Buffer':
        return ShieldCheck;
      case 'Mobility & Travel':
        return Bike;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#182238] via-[#121A2B] to-[#0B1020] border border-[#23324E]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Target className="w-3.5 h-3.5" />
            <span>Milestone Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{t('st_title')}</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">{t('st_subtitle')}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('st_add_goal')}</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.savingsGoals.map((goal) => {
          const Icon = getCategoryIcon(goal.category);
          const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);
          const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const isFinished = percent >= 100;
          const monthsLeft =
            goal.monthlyContribution > 0 ? Math.ceil(remaining / goal.monthlyContribution) : null;

          return (
            <div
              key={goal.id}
              className={`p-6 rounded-3xl bg-[#121A2B] border flex flex-col justify-between transition-all duration-200 ${
                isFinished
                  ? 'border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                  : 'border-[#23324E] hover:border-slate-600'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                        isFinished
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-[#182238] text-sky-400 border border-[#23324E]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">{goal.name}</h3>
                      <span className="text-[11px] text-slate-400">{goal.category}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteSavingsGoal(goal.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer"
                    aria-label="Delete goal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar & Percent */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Progress</span>
                    <span className={isFinished ? 'text-emerald-400' : 'text-slate-200'}>
                      {percent}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#0B1020] rounded-full overflow-hidden border border-[#23324E]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFinished
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : 'bg-gradient-to-r from-violet-600 to-sky-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Amounts Details */}
                <div className="p-3.5 rounded-2xl bg-[#0B1020] border border-[#23324E]/80 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saved:</span>
                    <span className="font-bold text-white">{formatUZS(goal.currentAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target:</span>
                    <span className="text-slate-300">{formatUZS(goal.targetAmount)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#23324E]">
                    <span className="text-slate-400">Remaining:</span>
                    <span className="text-sky-300 font-medium">{formatUZS(remaining)}</span>
                  </div>
                </div>

                {/* Timeline Projection */}
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-violet-400" />
                  {isFinished ? (
                    <span className="text-emerald-400 font-semibold">{t('st_completed_badge')}</span>
                  ) : monthsLeft !== null ? (
                    <span>
                      Est. duration: <strong className="text-white">~{monthsLeft} months</strong> at{' '}
                      {formatUZS(goal.monthlyContribution)}/mo
                    </span>
                  ) : (
                    <span>Set a monthly contribution to project timeline</span>
                  )}
                </div>
              </div>

              {/* Deposit Action */}
              <div className="mt-5 pt-4 border-t border-[#23324E]">
                {isFinished ? (
                  <div className="py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Goal 100% Accomplished!</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => depositToGoal(goal.id, 100000)}
                    className="w-full py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t('st_simulate_deposit')}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE GOAL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full rounded-3xl bg-[#121A2B] border border-[#23324E] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">{t('st_add_goal')}</h3>
              <p className="text-xs text-slate-400">
                Define your target and simulated monthly contributions in UZS.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateGoal} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {t('st_goal_name')}
                </label>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g. Programming Bootcamp or Laptop"
                  className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] text-white focus:outline-none focus:border-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] text-white focus:outline-none focus:border-violet-500 cursor-pointer"
                >
                  <option value="Tech & Education">Tech & Education</option>
                  <option value="Emergency Buffer">Emergency Buffer</option>
                  <option value="Mobility & Travel">Mobility & Travel</option>
                  <option value="Personal Milestone">Personal Milestone</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {t('st_target_amount')}
                </label>
                <input
                  type="number"
                  min="0"
                  step="50000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="e.g. 5000000"
                  className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] text-white focus:outline-none focus:border-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {t('st_saved_amount')}
                </label>
                <input
                  type="number"
                  min="0"
                  step="50000"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  placeholder="e.g. 1000000"
                  className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {t('st_monthly_contrib')}
                </label>
                <input
                  type="number"
                  min="0"
                  step="50000"
                  value={monthlyContrib}
                  onChange={(e) => setMonthlyContrib(e.target.value)}
                  placeholder="e.g. 400000"
                  className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="pt-3 border-t border-[#23324E] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  {t('btn_cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
