'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { missions } from '@/lib/data/missionsData';
import { formatUZS } from '@/lib/utils';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Target,
  PieChart,
  BookOpen,
  Award,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  Laptop,
  Check,
} from 'lucide-react';

export default function LandingPage() {
  const { t, language } = useLanguage();
  const { state, levelInfo } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const sampleMission = missions[0];

  const faqItems = [
    {
      q: 'What is MoneyQuest?',
      qUz: 'MoneyQuest nima?',
      qRu: 'Что такое MoneyQuest?',
      a: 'MoneyQuest is an interactive gamified financial literacy platform created for school and IT academy students. It teaches practical money management through realistic budgeting simulations, decision-based missions, and structured economic lessons.',
      aUz: 'MoneyQuest — bu maktab o‘quvchilari va IT akademiyalari talabalari uchun yaratilgan interaktiv o‘yinlashtirilgan moliyaviy ta’lim platformasi. U byudjet tuzish, ssenariylar va darslar orqali pulni to‘g‘ri boshqarishni o‘rgatadi.',
      aRu: 'MoneyQuest — это интерактивная платформа финансовой грамотности для школьников и студентов IT-академий. Она обучает управлению деньгами через симуляции бюджета, миссии и уроки.',
    },
    {
      q: 'Is MoneyQuest free to use for students?',
      qUz: 'Platformadan foydalanish bepulmi?',
      qRu: 'Платформа бесплатна для студентов?',
      a: 'Yes, MoneyQuest is 100% free and open for students and educators. All simulation tools, academy modules, and mission challenges are accessible without any paywalls.',
      aUz: 'Ha, MoneyQuest talabalar va o‘quvchilar uchun mutlaqo bepul. Barcha simulyatorlar va akademiya modullari ochiq.',
      aRu: 'Да, MoneyQuest полностью бесплатен для учащихся и преподавателей. Все инструменты и курсы открыты.',
    },
    {
      q: 'Does MoneyQuest connect to my real bank card or bank account?',
      qUz: 'MoneyQuest real bank kartamga ulanadimi?',
      qRu: 'Подключается ли платформа к реальной банковской карте?',
      a: 'No! MoneyQuest never connects to real bank accounts and never asks for card numbers or SMS passwords. All numbers, stipends, and expenses are simulated fictional figures (UZS) designed solely for risk-free learning.',
      aUz: 'Yo‘q! MoneyQuest hech qachon real bank hisoblariga ulanmaydi va karta yoki SMS parollarni so‘ramaydi. Barcha mablag‘lar xavfsiz ta’limiy simulyatsiya hisoblanadi.',
      aRu: 'Нет! MoneyQuest никогда не подключается к реальным счетам и не запрашивает данные карт. Все суммы — это безопасная обучающая симуляция.',
    },
    {
      q: 'How do missions and XP rewards work?',
      qUz: 'Missiyalar va XP ballari qanday ishlaydi?',
      qRu: 'Как работают миссии и баллы опыта (XP)?',
      a: 'Completing educational actions awards Experience Points (XP). Passing academy quizzes gives 30-40 XP, while completing budgeting challenges or surviving unexpected expense scenarios awards 50-80 XP. Accumulating XP advances your student rank from Money Beginner up to Financial Master.',
      aUz: 'Dars va vazifalarni muvaffaqiyatli topshirish orqali siz XP ballari yig‘asiz. XP to‘plangan sari unvoningiz "Pul Boshlovchisi"dan "Moliyaviy Usta" darajasigacha ko‘tariladi.',
      aRu: 'Выполнение заданий и тестов приносит очки опыта (XP). Накопление XP повышает ваш статус от новичка до финансового мастера.',
    },
    {
      q: 'Can I use MoneyQuest on my smartphone?',
      qUz: 'Telefon orqali foydalanish mumkinmi?',
      qRu: 'Можно ли пользоваться платформой со смартфона?',
      a: 'Absolutely. MoneyQuest is built with responsive mobile-first architecture, fully optimized for smartphones, tablets, and desktop displays.',
      aUz: 'Albatta. MoneyQuest smartfonlar, planshetlar va kompyuterlar ekraniga to‘liq moslashtirilgan.',
      aRu: 'Да. MoneyQuest полностью адаптирован для любых мобильных экранов и планшетов.',
    },
    {
      q: 'Is my learning data protected?',
      qUz: 'Mening ma’lumotlarim himoyalanganmi?',
      qRu: 'Защищены ли мои данные?',
      a: 'Yes. In interactive demo mode, your progress is safely stored in your own browser localStorage. When integrated with Supabase, every user profile is protected by PostgreSQL Row Level Security (RLS).',
      aUz: 'Ha. Demo rejimda ma’lumotlar sizning brauzeringizda saqlanadi. Supabase ulanishida esa barcha yozuvlar RLS xavfsizlik siyosati bilan himoyalangan.',
      aRu: 'Да. В демо-режиме прогресс хранится локально в браузере, а при подключении Supabase защищён политиками Row Level Security.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* 4.2 HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient background glow orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-violet-600/15 via-sky-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-600/10 border border-violet-500/30 text-violet-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>{t('brand_slogan')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            {t('tagline')}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t('hero_description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/missions"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>{t('start_mission')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#features"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#182238] hover:bg-[#202d4a] text-slate-200 hover:text-white font-semibold text-sm border border-[#23324E] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('explore_platform')}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

        {/* 4.2 LIVE APPLICATION DASHBOARD PREVIEW */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-gradient-to-b from-[#182238] to-[#121A2B] p-1.5 sm:p-2 border border-violet-500/30 shadow-2xl shadow-black/80">
            {/* Top Mock Window Chrome */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#23324E]/80 mb-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-slate-500">moneyquest.uz/dashboard</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Check className="w-3.5 h-3.5" /> Interactive Sandbox
                </span>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="p-3 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* Card 1: Student Level & XP */}
              <div className="rounded-xl bg-[#0B1020]/90 border border-[#23324E] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider">
                      Student Rank
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300 text-[10px] font-bold border border-violet-500/30">
                      Lv. {levelInfo.level}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{t(levelInfo.titleKey)}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Jasur Temirov (IT Student)</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#23324E]/60 space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{state.totalXP} XP Total</span>
                    <span>{levelInfo.nextLevelXP} XP Next</span>
                  </div>
                  <div className="w-full h-2 bg-[#182238] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 to-sky-400 rounded-full"
                      style={{ width: `${levelInfo.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Active Budget Snapshot */}
              <div className="rounded-xl bg-[#0B1020]/90 border border-[#23324E] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">
                      Monthly Budget
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">50/30/20 Rule</span>
                  </div>
                  <div className="text-base font-bold text-white">
                    {formatUZS(state.budget.monthlyIncome)}
                  </div>
                  <p className="text-xs text-slate-400">Planned Student Allowance</p>
                </div>

                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Needs (Food & Transit)</span>
                    <span className="text-slate-200 font-medium">550 000 UZS</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Wants (Outings/Games)</span>
                    <span className="text-slate-200 font-medium">250 000 UZS</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-emerald-400">Savings Cushion</span>
                    <span className="text-emerald-400 font-medium">200 000 UZS (20%)</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Savings Goal */}
              <div className="rounded-xl bg-[#0B1020]/90 border border-[#23324E] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                      Priority Goal
                    </span>
                    <Laptop className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Refurbished Coding Laptop</h4>
                  <div className="text-xs text-slate-300 mt-1">
                    {formatUZS(2200000)} / {formatUZS(5000000)}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#23324E]/60 space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>44% Completed</span>
                    <span className="text-sky-300">~7 months left</span>
                  </div>
                  <div className="w-full h-2 bg-[#182238] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full w-[44%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quick Bar inside preview */}
            <div className="px-4 py-3 bg-[#0B1020]/60 rounded-b-xl border-t border-[#23324E]/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Active Quest:</span>
                <span className="text-white font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {sampleMission.title}
                </span>
                <span className="text-violet-400 font-semibold">+{sampleMission.xpReward} XP</span>
              </div>
              <Link
                href="/dashboard"
                className="text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1 hover:underline"
              >
                <span>Launch Interactive Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4.3 PROBLEM AND SOLUTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#121A2B] to-[#182238] border border-[#23324E] p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* The Problem */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>The Knowledge Gap</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t('problem_title')}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t('problem_desc')}
              </p>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Stipends disappearing within 10 days due to unplanned impulse spending
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Confusion between essential study needs and luxury lifestyle wants
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Falling for online Telegram crypto bots and fake bank SMS schemes
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="space-y-4 rounded-2xl bg-[#0B1020]/80 p-6 border border-emerald-500/20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>The MoneyQuest Solution</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t('solution_title')}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t('solution_desc')}
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-[#121A2B] border border-[#23324E]">
                  <span className="font-bold text-white block">Safe Simulation</span>
                  <span className="text-slate-400 text-[11px]">Real som figures without real financial risk</span>
                </div>
                <div className="p-3 rounded-xl bg-[#121A2B] border border-[#23324E]">
                  <span className="font-bold text-white block">Actionable Quests</span>
                  <span className="text-slate-400 text-[11px]">Earn XP by solving actual money dilemmas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.4 HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t('how_title')}
          </h2>
          <p className="text-sm text-slate-400">
            {t('how_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="rounded-2xl bg-[#121A2B] border border-[#23324E] p-6 hover:border-violet-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-violet-400 font-extrabold text-lg mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t('step_1_title')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('step_1_desc')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#23324E] text-xs text-violet-300 font-medium flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>8 structured modules</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl bg-[#121A2B] border border-[#23324E] p-6 hover:border-sky-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-extrabold text-lg mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t('step_2_title')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('step_2_desc')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#23324E] text-xs text-sky-300 font-medium flex items-center gap-1.5">
              <PieChart className="w-4 h-4" />
              <span>UZS budget simulators</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl bg-[#121A2B] border border-[#23324E] p-6 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-lg mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t('step_3_title')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('step_3_desc')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#23324E] text-xs text-emerald-300 font-medium flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>XP, levels & badges</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 FEATURE SHOWCASE (8 Core Capabilities) */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Power Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t('features_title')}
          </h2>
          <p className="text-sm text-slate-400">
            {t('features_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Feature 1 */}
          <Link
            href="/budget-simulator"
            className="group rounded-2xl bg-[#121A2B] border border-[#23324E] p-5 hover:border-violet-500/50 hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-600/15 text-violet-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <PieChart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                {t('feat_budget_title')}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {t('feat_budget_desc')}
              </p>
            </div>
            <span className="text-xs text-violet-400 font-semibold mt-4 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              Launch Tool <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Feature 2 */}
          <Link
            href="/savings-goals"
            className="group rounded-2xl bg-[#121A2B] border border-[#23324E] p-5 hover:border-emerald-500/50 hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {t('feat_savings_title')}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {t('feat_savings_desc')}
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold mt-4 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              Launch Tool <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Feature 3 */}
          <Link
            href="/life-simulator"
            className="group rounded-2xl bg-[#121A2B] border border-[#23324E] p-5 hover:border-sky-500/50 hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                {t('feat_life_title')}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {t('feat_life_desc')}
              </p>
            </div>
            <span className="text-xs text-sky-400 font-semibold mt-4 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              Simulate Journey <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Feature 4 */}
          <Link
            href="/academy"
            className="group rounded-2xl bg-[#121A2B] border border-[#23324E] p-5 hover:border-amber-500/50 hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                {t('feat_academy_title')}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {t('feat_academy_desc')}
              </p>
            </div>
            <span className="text-xs text-amber-400 font-semibold mt-4 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              Open Lessons <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Feature 5 */}
          <Link
            href="/missions"
            className="group rounded-2xl bg-[#121A2B] border border-[#23324E] p-5 hover:border-indigo-500/50 hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {t('feat_missions_title')}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {t('feat_missions_desc')}
              </p>
            </div>
            <span className="text-xs text-indigo-400 font-semibold mt-4 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              View Missions <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Feature 6 */}
          <Link
            href="/scam-radar"
            className="group rounded-2xl bg-[#121A2B] border border-[#23324E] p-5 hover:border-rose-500/50 hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                {t('feat_scam_title')}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {t('feat_scam_desc')}
              </p>
            </div>
            <span className="text-xs text-rose-400 font-semibold mt-4 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              Inspect Schemes <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Feature 7 */}
          <Link
            href="/profile"
            className="group rounded-2xl bg-[#121A2B] border border-[#23324E] p-5 hover:border-violet-500/50 hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-600/15 text-violet-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                XP & Achievements
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Unlock 6 specialized achievement badges and rank up from Beginner to Financial Master.
              </p>
            </div>
            <span className="text-xs text-violet-400 font-semibold mt-4 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              View Badges <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Feature 8 */}
          <Link
            href="/dashboard"
            className="group rounded-2xl bg-[#121A2B] border border-[#23324E] p-5 hover:border-sky-500/50 hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                Progress Dashboard
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Unified overview of your current level, active savings goal, daily streaks, and next mission.
              </p>
            </div>
            <span className="text-xs text-sky-400 font-semibold mt-4 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              Open Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* 4.6 MISSION PREVIEW (Interactive sample missions) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Real Interactive Challenges</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Sample Quests Ready to Play</h2>
            <p className="text-sm text-slate-400 mt-1">Explore real student scenarios without needing to sign up</p>
          </div>
          <Link
            href="/missions"
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1"
          >
            View All 5 Missions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {missions.slice(0, 3).map((m) => {
            const isCompleted = state.completedMissions.includes(m.id);
            const localizedTitle = language === 'uz' ? m.titleUz : language === 'ru' ? m.titleRu : m.title;
            const localizedDesc = language === 'uz' ? m.descriptionUz : language === 'ru' ? m.descriptionRu : m.description;

            return (
              <div
                key={m.id}
                className="rounded-2xl bg-[#121A2B] border border-[#23324E] p-5 hover:border-violet-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-violet-600/15 text-violet-300 font-medium border border-violet-500/20">
                      {m.category}
                    </span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> +{m.xpReward} XP
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{localizedTitle}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{localizedDesc}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#23324E] flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">⏱ {m.durationMin} mins</span>
                  <Link
                    href={`/missions/${m.id}`}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/25'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Replay
                      </>
                    ) : (
                      <>
                        Start Quest <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4.7 WHY STUDENTS CHOOSE MONEYQUEST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#121A2B] border border-[#23324E] p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why IT Academy & School Students Choose MoneyQuest
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Designed around how today’s generation actually learns: hands-on, fast, and visual
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-[#0B1020]/80 border border-[#23324E]/80">
              <div className="w-9 h-9 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Make Mistakes Safely</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Experiment with real Uzbek som budgets. If your simulator runs into a deficit, you learn the lesson immediately without owing any real-world debt.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B1020]/80 border border-[#23324E]/80">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Relevant to Modern Life</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No outdated theoretical textbook jargon. We cover coding laptops, metro transit cards, Telegram bots, and tech internship salaries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B1020]/80 border border-[#23324E]/80">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Measurable Progress</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track your actual Financial IQ, earn XP on validated challenges, and build permanent financial discipline before earning your first tech salary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.8 ILLUSTRATIVE STUDENT EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-[11px] font-semibold text-violet-400 tracking-wider uppercase">
            Illustrative Student Journeys
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How Students Experience MoneyQuest</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-[#121A2B] border border-[#23324E] p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-sm font-bold text-violet-300">
                JT
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Jasur Temirov</h3>
                <p className="text-[11px] text-slate-400">IT Academy Student (Web Dev)</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              &quot;The budget simulator made the 50/30/20 rule click for me. I was able to plan my real laptop savings goal and understand how much to set aside every month.&quot;
            </p>
            <div className="text-[11px] text-emerald-400 font-medium">Rank: Budget Explorer (340 XP)</div>
          </div>

          <div className="rounded-2xl bg-[#121A2B] border border-[#23324E] p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sm font-bold text-sky-300">
                MK
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Malika Karimova</h3>
                <p className="text-[11px] text-slate-400">High School Senior, Tashkent</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              &quot;The Scam Radar mission showed me the exact tricks fraudulent Telegram channels use. Everyone in our class should play through these before opening their first bank card.&quot;
            </p>
            <div className="text-[11px] text-emerald-400 font-medium">Rank: Scam Detective (510 XP)</div>
          </div>

          <div className="rounded-2xl bg-[#121A2B] border border-[#23324E] p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-sm font-bold text-emerald-300">
                TA
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Timur Alimov</h3>
                <p className="text-[11px] text-slate-400">Junior Frontend Intern</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              &quot;The Financial Life Simulator taught me that an emergency buffer is non-negotiable. When my charger broke in the scenario, having a buffer saved my stipend.&quot;
            </p>
            <div className="text-[11px] text-emerald-400 font-medium">Rank: Saving Strategist (680 XP)</div>
          </div>
        </div>
      </section>

      {/* 4.9 FAQ ACCORDION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">{t('faq_title')}</h2>
          <p className="text-xs sm:text-sm text-slate-400">{t('faq_subtitle')}</p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openFaq === idx;
            const questionText = language === 'uz' ? item.qUz : language === 'ru' ? item.qRu : item.q;
            const answerText = language === 'uz' ? item.aUz : language === 'ru' ? item.aRu : item.a;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#121A2B] border border-[#23324E] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-slate-100 hover:text-white cursor-pointer"
                >
                  <span>{questionText}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-violet-400 shrink-0 ml-3" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-3" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-[#23324E]/60 pt-3 animate-in fade-in duration-200">
                    {answerText}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4.10 FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-violet-900/60 via-[#182238] to-sky-950/60 border border-violet-500/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl shadow-violet-950/40">
          <div className="w-14 h-14 rounded-2xl bg-violet-600/30 border border-violet-400/40 flex items-center justify-center mx-auto text-violet-300">
            <Flame className="w-7 h-7" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Take Control of Your Financial Future?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Join students mastering money through interactive simulations and practical challenges.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/missions"
              className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-xl shadow-violet-600/30 transition-all flex items-center gap-2"
            >
              <span>Start Your First Mission</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/budget-simulator"
              className="px-8 py-3.5 rounded-xl bg-[#121A2B] hover:bg-[#182238] text-slate-200 font-semibold text-sm border border-[#23324E] transition-all"
            >
              Open Budget Simulator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
