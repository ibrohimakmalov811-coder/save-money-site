'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ShieldAlert } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/15 border border-violet-500/20 text-violet-300 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-xs text-slate-400">Educational platform guidelines & terms of use</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Educational Nature of the Service</h2>
          <p>
            MoneyQuest is an educational technology application designed to foster financial literacy. All tools, missions, simulators, and calculators are provided for instructional and gamified training purposes only.
          </p>
        </section>

        <section className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>2. No Financial or Investment Advice</span>
          </div>
          <p className="text-slate-400 text-xs">
            Nothing contained on the MoneyQuest platform constitutes personalized legal, accounting, tax, investment, or banking advice. The figures shown in the Smart Budget Simulator and Savings Goal Tracker are illustrative simulations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Acceptable Use</h2>
          <p>
            Users agree to use MoneyQuest solely for personal educational exploration. Any attempt to compromise server infrastructure or bypass security boundaries is strictly prohibited.
          </p>
        </section>

        <div className="pt-4 border-t border-[#23324E] text-xs text-slate-500">
          Have questions? Visit our{' '}
          <Link href="/faq" className="text-violet-400 hover:underline">
            FAQ
          </Link>{' '}
          or{' '}
          <Link href="/contact" className="text-violet-400 hover:underline">
            Contact
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
