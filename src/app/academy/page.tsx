'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { academyModules } from '@/lib/data/academyData';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Coins,
  PieChart,
  Scale,
  ShieldCheck,
  Landmark,
  TrendingDown,
  AlertCircle,
  ShieldAlert,
} from 'lucide-react';

export default function AcademyPage() {
  const { language } = useLanguage();
  const { state } = useApp();

  const iconMap: Record<string, React.ElementType> = {
    Coins,
    PieChart,
    Scale,
    ShieldCheck,
    Landmark,
    TrendingDown,
    AlertCircle,
    ShieldAlert,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#182238] via-[#121A2B] to-[#0B1020] border border-[#23324E]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/15 border border-violet-500/20 text-violet-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Structured Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Financial Academy</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            8 core modules designed to teach practical money management, economic laws, and digital safety in simple language.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0B1020] border border-[#23324E] text-xs">
          <span className="text-slate-400 block">Completed Modules:</span>
          <span className="text-base font-extrabold text-emerald-400">
            {state.completedLessons.length} / {academyModules.length}
          </span>
        </div>
      </div>

      {/* Curriculum Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {academyModules.map((mod, idx) => {
          const Icon = iconMap[mod.iconName] || BookOpen;
          const isCompleted = state.completedLessons.includes(mod.id);
          const score = state.quizScores[mod.id];

          const localizedTitle =
            language === 'uz' ? mod.titleUz : language === 'ru' ? mod.titleRu : mod.title;
          const localizedSummary =
            language === 'uz' ? mod.summaryUz : language === 'ru' ? mod.summaryRu : mod.summary;

          return (
            <div
              key={mod.id}
              className={`p-6 rounded-3xl bg-[#121A2B] border flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${
                isCompleted
                  ? 'border-emerald-500/30 shadow-lg shadow-emerald-950/20'
                  : 'border-[#23324E] hover:border-violet-500/50 hover:shadow-xl'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#182238] text-slate-300 border border-[#23324E] font-medium text-[11px]">
                    Module {idx + 1}
                  </span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> +{mod.xpReward} XP
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600/20 to-sky-500/20 border border-violet-500/30 flex items-center justify-center text-sky-400">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                    {localizedTitle}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {localizedSummary}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#23324E] flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {mod.durationMin} mins
                </span>

                <Link
                  href={`/academy/${mod.slug}`}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold flex items-center gap-1 transition-all ${
                    isCompleted
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                      : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/25'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Passed ({score}%)</span>
                    </>
                  ) : (
                    <>
                      <span>Start Lesson</span>
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
