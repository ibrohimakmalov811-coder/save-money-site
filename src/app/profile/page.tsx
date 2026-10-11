'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { achievementsList } from '@/lib/data/achievementsData';
import { missions } from '@/lib/data/missionsData';
import { academyModules } from '@/lib/data/academyData';
import {
  User,
  Sparkles,
  Flame,
  Award,
  Globe,
  RotateCcw,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Lock,
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { state, levelInfo, resetProgress, logoutUser } = useApp();

  const [confirmReset, setConfirmReset] = useState(false);

  const handleResetAction = () => {
    resetProgress();
    setConfirmReset(false);
    alert('Demo progress has been successfully reset to defaults.');
  };

  const handleLogoutAction = () => {
    logoutUser();
    router.push('/login');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Profile Card Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#182238] via-[#121A2B] to-[#0B1020] border border-[#23324E] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-sky-400 p-0.5 shadow-xl shadow-violet-600/30 shrink-0">
            <div className="w-full h-full bg-[#0B1020] rounded-[14px] flex items-center justify-center text-xl font-bold text-white uppercase">
              {state.user.displayName.slice(0, 2)}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {state.user.displayName}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300 text-[10px] font-bold border border-violet-500/30">
                Lv. {levelInfo.level}
              </span>
            </div>
            <p className="text-xs text-slate-400">{state.user.email}</p>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Student Profile</span>
            </div>
          </div>
        </div>

        {/* Level & Streak Stats */}
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-[#0B1020] border border-[#23324E] text-center min-w-[90px]">
            <span className="text-[10px] text-slate-400 block">Total XP</span>
            <span className="text-base font-extrabold text-amber-400">{state.totalXP}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0B1020] border border-[#23324E] text-center min-w-[90px]">
            <span className="text-[10px] text-slate-400 block">Streak</span>
            <span className="text-base font-extrabold text-white flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              {state.streakDays}d
            </span>
          </div>
        </div>
      </div>

      {/* Level Details & XP Progress */}
      <div className="p-6 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-4">
        <div className="flex justify-between items-center text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Current Rank Title:</span>
            <span className="text-sm font-bold text-white">{t(levelInfo.titleKey)}</span>
          </div>
          <span className="text-violet-400 font-semibold">
            {levelInfo.level === 5 ? 'Mastery Milestone' : `${levelInfo.nextLevelXP - state.totalXP} XP to Level ${levelInfo.level + 1}`}
          </span>
        </div>

        <div className="w-full h-3 bg-[#0B1020] rounded-full overflow-hidden border border-[#23324E]">
          <div
            className="h-full bg-gradient-to-r from-violet-600 via-sky-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${levelInfo.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Achievements Badges Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#23324E]">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Student Achievements</h2>
          </div>
          <span className="text-xs text-slate-400">
            {state.unlockedAchievements.length} of {achievementsList.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievementsList.map((ach) => {
            const isUnlocked = state.unlockedAchievements.includes(ach.id);
            const title =
              language === 'uz' ? ach.titleUz : language === 'ru' ? ach.titleRu : ach.title;
            const desc =
              language === 'uz' ? ach.descriptionUz : language === 'ru' ? ach.descriptionRu : ach.description;

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-[#182238] border-violet-500/40 shadow-md'
                    : 'bg-[#0B1020]/60 border-slate-800 opacity-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                        : 'bg-[#121A2B] text-slate-600'
                    }`}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{title}</span>
                      {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-snug">{desc}</p>
                    <span className="text-[10px] text-amber-400 font-semibold block pt-1">
                      +{ach.xpBonus} XP Bonus
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Stats & Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#121A2B] border border-[#23324E]">
          <span className="text-xs text-slate-400 block mb-1">Missions Completed</span>
          <div className="text-xl font-bold text-white">
            {state.completedMissions.length} / {missions.length}
          </div>
          <span className="text-[11px] text-emerald-400">Practical challenges</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121A2B] border border-[#23324E]">
          <span className="text-xs text-slate-400 block mb-1">Academy Modules</span>
          <div className="text-xl font-bold text-white">
            {state.completedLessons.length} / {academyModules.length}
          </div>
          <span className="text-[11px] text-sky-400">Curriculum progress</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121A2B] border border-[#23324E]">
          <span className="text-xs text-slate-400 block mb-1">Active Savings Goals</span>
          <div className="text-xl font-bold text-white">{state.savingsGoals.length}</div>
          <span className="text-[11px] text-violet-400">Fictional milestones</span>
        </div>
      </div>

      {/* Account Settings & Preferences */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-6">
        <h2 className="text-base font-bold text-white pb-3 border-b border-[#23324E]">
          Preferences & Account Controls
        </h2>

        {/* Language Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">Preferred Language</label>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { code: 'uz', label: "🇺🇿 O'zbekcha" },
              { code: 'en', label: '🇬🇧 English' },
              { code: 'ru', label: '🇷🇺 Русский' },
            ].map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code as 'en' | 'uz' | 'ru')}
                className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                  language === item.code
                    ? 'bg-violet-600 text-white font-semibold border-violet-500 shadow-md'
                    : 'bg-[#0B1020] text-slate-300 border-[#23324E] hover:border-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset / Sign Out */}
        <div className="pt-4 border-t border-[#23324E] flex flex-col sm:flex-row items-center justify-between gap-4">
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Progress to Defaults</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-rose-400">Confirm reset?</span>
              <button
                type="button"
                onClick={handleResetAction}
                className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-semibold cursor-pointer"
              >
                Yes, Reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-2 py-1 text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogoutAction}
            className="px-4 py-2 rounded-xl bg-[#182238] hover:bg-[#202d4a] text-slate-200 text-xs font-semibold border border-[#23324E] flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out / Switch Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
