'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { missions } from '@/lib/data/missionsData';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Filter,
  Flame,
  Zap,
} from 'lucide-react';

export default function MissionsPage() {
  const { t, language } = useLanguage();
  const { state } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');

  const categories = ['All', 'Budgeting', 'Spending', 'Saving', 'Planning', 'Safety'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredMissions = missions.filter((m) => {
    if (categoryFilter !== 'All' && m.category !== categoryFilter) return false;
    if (difficultyFilter !== 'All' && m.difficulty !== difficultyFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#182238] via-[#121A2B] to-[#0B1020] border border-[#23324E]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/15 border border-violet-500/20 text-violet-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Quests</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Missions & Financial Challenges
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Test your decision-making in hands-on scenarios. Complete tasks, earn XP, and level up your financial status.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3.5 rounded-2xl bg-[#0B1020] border border-[#23324E] text-xs">
            <span className="text-slate-400 block">Completed Quests:</span>
            <span className="text-base font-extrabold text-emerald-400">
              {state.completedMissions.length} / {missions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#121A2B] border border-[#23324E] text-xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-400 shrink-0 mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-violet-600 text-white font-semibold shadow-sm shadow-violet-600/30'
                  : 'bg-[#182238] text-slate-300 hover:text-white hover:bg-[#202d4a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-slate-400">Difficulty:</span>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#182238] border border-[#23324E] text-slate-200 focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMissions.map((m) => {
          const isCompleted = state.completedMissions.includes(m.id);
          const localizedTitle = language === 'uz' ? m.titleUz : language === 'ru' ? m.titleRu : m.title;
          const localizedDesc = language === 'uz' ? m.descriptionUz : language === 'ru' ? m.descriptionRu : m.description;

          const diffBadgeColor = {
            Beginner: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
            Intermediate: 'bg-sky-500/15 text-sky-300 border-sky-500/20',
            Advanced: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
          }[m.difficulty];

          return (
            <div
              key={m.id}
              className={`rounded-2xl bg-[#121A2B] border p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${
                isCompleted
                  ? 'border-emerald-500/30 shadow-lg shadow-emerald-950/20'
                  : 'border-[#23324E] hover:border-violet-500/50 hover:shadow-xl'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#182238] text-slate-300 border border-[#23324E] font-medium">
                      {m.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-semibold ${diffBadgeColor}`}>
                      {m.difficulty}
                    </span>
                  </div>

                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> +{m.xpReward} XP
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-2">{localizedTitle}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{localizedDesc}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#0B1020] border border-[#23324E]/80 text-[11px] text-slate-400 space-y-1">
                  <span className="text-slate-300 font-semibold block">Key Objective:</span>
                  <p>{m.learningObjectives[0]}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#23324E] flex items-center justify-between">
                <span className="text-[11px] text-slate-500">⏱ ~{m.durationMin} minutes</span>
                <Link
                  href={`/missions/${m.id}`}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                      : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/30'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed (Replay)</span>
                    </>
                  ) : (
                    <>
                      <span>Start Quest</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
