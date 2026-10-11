'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { missions } from '@/lib/data/missionsData';
import { academyModules } from '@/lib/data/academyData';
import { achievementsList } from '@/lib/data/achievementsData';
import { formatUZS } from '@/lib/utils';
import {
  Sparkles,
  Flame,
  Award,
  ArrowRight,
  Target,
  PieChart,
  BookOpen,
  CheckCircle2,
  Layers,
  Shield,
  Plus,
  Play,
  Zap,
} from 'lucide-react';

export default function DashboardPage() {
  const { state, levelInfo, depositToGoal } = useApp();
  const { t, language } = useLanguage();

  // Find daily/featured mission
  const nextMission = missions.find((m) => !state.completedMissions.includes(m.id)) || missions[0];
  const activeGoal = state.savingsGoals[0];
  const nextLesson = academyModules.find((m) => !state.completedLessons.includes(m.id)) || academyModules[0];

  const totalBudgetSpent = Object.values(state.budget.categories).reduce((a, b) => a + b, 0);
  const remainingBudget = state.budget.monthlyIncome - totalBudgetSpent;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* 1. Header / Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#182238] via-[#121A2B] to-[#0B1020] border border-[#23324E]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-violet-400 font-semibold uppercase tracking-wider">
              Student Dashboard
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              Active Questor
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t('dash_welcome')} {state.user.displayName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Keep your streak alive and master real financial skills one mission at a time.
          </p>
        </div>

        {/* Level & Streak Stats */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3.5 rounded-2xl bg-[#0B1020] border border-[#23324E] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="text-xs text-slate-400">{t('dash_streak_label')}</div>
              <div className="text-base font-extrabold text-white">
                {state.streakDays} {t('dash_days')}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0B1020] border border-violet-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">{t('dash_level_label')}</div>
              <div className="text-base font-extrabold text-violet-300">
                Lv. {levelInfo.level}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Level XP Progression Bar */}
      <div className="p-6 rounded-2xl bg-[#121A2B] border border-[#23324E] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">{t(levelInfo.titleKey)}</span>
            <span className="text-slate-400">({state.totalXP} Total XP)</span>
          </div>
          <span className="text-slate-400">
            {levelInfo.level === 5
              ? 'Max Level Reached!'
              : `${Math.max(0, levelInfo.nextLevelXP - state.totalXP)} ${t('dash_to_next')}`}
          </span>
        </div>

        <div className="w-full h-3 bg-[#0B1020] rounded-full overflow-hidden border border-[#23324E]">
          <div
            className="h-full bg-gradient-to-r from-violet-600 via-sky-500 to-emerald-400 rounded-full transition-all duration-700"
            style={{ width: `${levelInfo.progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3. Main Operational Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Daily Mission & Recommended Lesson (2 cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Mission Card */}
          <div className="p-6 rounded-2xl bg-[#121A2B] border border-[#23324E] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-violet-600/15 text-violet-400">
                  <Zap className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-white text-base">{t('dash_daily_mission')}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/20">
                +{nextMission.xpReward} XP
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1020] border border-[#23324E]/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-violet-400 font-semibold">{nextMission.category}</span>
                <span className="text-slate-400">⏱ {nextMission.durationMin} mins • {nextMission.difficulty}</span>
              </div>
              <h4 className="font-bold text-slate-100 text-sm">
                {language === 'uz' ? nextMission.titleUz : language === 'ru' ? nextMission.titleRu : nextMission.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'uz' ? nextMission.descriptionUz : language === 'ru' ? nextMission.descriptionRu : nextMission.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400">
                Objectives: {nextMission.learningObjectives[0]}
              </span>
              <Link
                href={`/missions/${nextMission.id}`}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 flex items-center gap-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Launch Mission</span>
              </Link>
            </div>
          </div>

          {/* Recommended Academy Lesson Card */}
          <div className="p-6 rounded-2xl bg-[#121A2B] border border-[#23324E] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-sky-500/15 text-sky-400">
                  <BookOpen className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-white text-base">{t('dash_recommended_lesson')}</h3>
              </div>
              <Link href="/academy" className="text-xs text-sky-400 hover:underline">
                View All Modules
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1020] border border-[#23324E]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[11px] text-sky-400 font-semibold uppercase">
                  {nextLesson.category} • Module
                </div>
                <h4 className="font-bold text-white text-sm">
                  {language === 'uz' ? nextLesson.titleUz : language === 'ru' ? nextLesson.titleRu : nextLesson.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {language === 'uz' ? nextLesson.summaryUz : language === 'ru' ? nextLesson.summaryRu : nextLesson.summary}
                </p>
              </div>

              <Link
                href={`/academy/${nextLesson.slug}`}
                className="shrink-0 px-4 py-2 rounded-xl bg-[#182238] hover:bg-[#223050] text-slate-200 hover:text-white text-xs font-semibold border border-[#23324E] transition-all flex items-center gap-1.5"
              >
                <span>Read & Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Access Tools */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm">{t('dash_quick_tools')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Link
                href="/budget-simulator"
                className="p-3.5 rounded-xl bg-[#121A2B] border border-[#23324E] hover:border-violet-500/50 hover:bg-[#182238] transition-all flex flex-col items-center text-center gap-2"
              >
                <PieChart className="w-5 h-5 text-violet-400" />
                <span className="font-semibold text-white">Budget Simulator</span>
              </Link>

              <Link
                href="/savings-goals"
                className="p-3.5 rounded-xl bg-[#121A2B] border border-[#23324E] hover:border-emerald-500/50 hover:bg-[#182238] transition-all flex flex-col items-center text-center gap-2"
              >
                <Target className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-white">Savings Tracker</span>
              </Link>

              <Link
                href="/life-simulator"
                className="p-3.5 rounded-xl bg-[#121A2B] border border-[#23324E] hover:border-sky-500/50 hover:bg-[#182238] transition-all flex flex-col items-center text-center gap-2"
              >
                <Layers className="w-5 h-5 text-sky-400" />
                <span className="font-semibold text-white">Life Simulator</span>
              </Link>

              <Link
                href="/scam-radar"
                className="p-3.5 rounded-xl bg-[#121A2B] border border-[#23324E] hover:border-rose-500/50 hover:bg-[#182238] transition-all flex flex-col items-center text-center gap-2"
              >
                <Shield className="w-5 h-5 text-rose-400" />
                <span className="font-semibold text-white">Scam Radar</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Financial Summaries & Badges */}
        <div className="space-y-6">
          {/* Active Savings Goal */}
          <div className="p-6 rounded-2xl bg-[#121A2B] border border-[#23324E] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">{t('dash_savings_summary')}</h3>
              </div>
              <Link href="/savings-goals" className="text-xs text-emerald-400 hover:underline">
                Manage
              </Link>
            </div>

            {activeGoal ? (
              <div className="p-4 rounded-xl bg-[#0B1020] border border-[#23324E] space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-xs">{activeGoal.name}</h4>
                    <span className="text-[11px] text-slate-400">{activeGoal.category}</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">
                    {Math.round((activeGoal.currentAmount / activeGoal.targetAmount) * 100)}%
                  </span>
                </div>

                <div className="w-full h-2 bg-[#182238] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{
                      width: `${Math.min(100, (activeGoal.currentAmount / activeGoal.targetAmount) * 100)}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Saved: {formatUZS(activeGoal.currentAmount)}</span>
                  <span>Goal: {formatUZS(activeGoal.targetAmount)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => depositToGoal(activeGoal.id, 100000)}
                  className="w-full py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Simulate Deposit (+100k UZS)</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-400">
                No active goals. Create one to begin tracking!
              </div>
            )}
          </div>

          {/* Budget Overview Card */}
          <div className="p-6 rounded-2xl bg-[#121A2B] border border-[#23324E] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-violet-400" />
                <h3 className="font-bold text-white text-sm">{t('dash_budget_summary')}</h3>
              </div>
              <Link href="/budget-simulator" className="text-xs text-violet-400 hover:underline">
                Adjust
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1020] border border-[#23324E] space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly Income:</span>
                <span className="font-bold text-white">{formatUZS(state.budget.monthlyIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Planned Spending:</span>
                <span className="text-slate-200">{formatUZS(totalBudgetSpent)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#23324E]">
                <span className="text-slate-400">Unallocated Balance:</span>
                <span
                  className={`font-bold ${
                    remainingBudget < 0 ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {formatUZS(remainingBudget)}
                </span>
              </div>
            </div>
          </div>

          {/* Earned Badges Snapshot */}
          <div className="p-6 rounded-2xl bg-[#121A2B] border border-[#23324E] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-white text-sm">{t('dash_achievements')}</h3>
              </div>
              <span className="text-xs text-slate-400">
                {state.unlockedAchievements.length} / {achievementsList.length}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {achievementsList.map((ach) => {
                const isUnlocked = state.unlockedAchievements.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    title={`${ach.title}: ${ach.description}`}
                    className={`p-2.5 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                      isUnlocked
                        ? 'bg-[#182238] border-violet-500/40 text-violet-300'
                        : 'bg-[#0B1020]/60 border-slate-800 text-slate-600 opacity-60'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    <span className="text-[10px] font-medium leading-tight truncate w-full">
                      {ach.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
