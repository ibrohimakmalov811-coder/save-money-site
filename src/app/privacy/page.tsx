'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Student Privacy & Safety Policy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: October 2026 • Designed for minor & student safety</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>1. Core Youth Privacy Guarantee</span>
          </h2>
          <p>
            MoneyQuest is an educational simulation platform specifically tailored for teenagers, high schoolers, and IT academy trainees. We prioritize student privacy above all else:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
            <li>We do not collect or request real banking card numbers, CVVs, or SMS authorization codes.</li>
            <li>All budgeting numbers, stipends, and expenses inside missions and simulators are 100% fictional figures in Uzbekistani Som (UZS).</li>
            <li>We do not sell personal student data to marketers, banks, or third-party advertisers.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-sky-400" />
            <span>2. Data Collected & Local Storage</span>
          </h2>
          <p>
            When utilizing interactive demo mode, all educational progress (XP earned, completed missions, created savings goals) is stored solely inside your browser’s local storage (`localStorage`). When connecting with an optional authenticated Supabase backend, only your chosen display name, email, and progress state are stored, strictly governed by PostgreSQL Row Level Security (RLS).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Public Leaderboards & Minor Protection</h2>
          <p>
            To prevent invasive tracking or unhealthy pressure on minors, MoneyQuest avoids public exposure of student financial simulation data. You are always in control of your own progress.
          </p>
        </section>

        <div className="pt-4 border-t border-[#23324E] text-xs text-slate-500">
          Questions regarding student privacy? Reach out via our{' '}
          <Link href="/contact" className="text-violet-400 hover:underline">
            Contact Form
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
