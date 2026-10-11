'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, Target, Heart, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/15 border border-violet-500/20 text-violet-300 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>About MoneyQuest</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Our Mission & Purpose</h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          Empowering youth and IT academy learners across Uzbekistan with practical, risk-free financial education.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-4">
        <h2 className="text-lg font-bold text-white">The Vision</h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          In an era where tech talent is flourishing, high schoolers and coding interns are receiving stipends and tech salaries at younger ages. However, conventional curricula often overlook practical personal finance: budgeting according to economic principles, avoiding predatory high-interest consumer credit, and detecting sophisticated online social-engineering scams.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          MoneyQuest turns financial education into an interactive quest. By experimenting with simulated Uzbekistani Som (UZS) figures, students gain the confidence and muscle memory needed to make sound choices with real money.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#121A2B] border border-[#23324E] space-y-2 text-xs">
          <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-sm">Interactive Practice</h3>
          <p className="text-slate-400 leading-relaxed">
            Hands-on budgeting and scenario simulation instead of dry lecture notes.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#121A2B] border border-[#23324E] space-y-2 text-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-sm">Safe Sandbox</h3>
          <p className="text-slate-400 leading-relaxed">
            100% risk-free. No real credit card, bank account, or funds required.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#121A2B] border border-[#23324E] space-y-2 text-xs">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-sm">Youth Focused</h3>
          <p className="text-slate-400 leading-relaxed">
            Tailored specifically for teenagers, school pupils, and IT academy learners.
          </p>
        </div>
      </div>

      <div className="pt-4 text-center">
        <Link
          href="/missions"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all"
        >
          <span>Explore Quests</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
