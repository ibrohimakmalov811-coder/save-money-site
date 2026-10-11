'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Database, X, ShieldCheck } from 'lucide-react';

export function DemoBanner() {
  const { isSupabaseActive } = useApp();
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Demo Status" className="bg-gradient-to-r from-violet-950/80 via-[#121A2B] to-slate-900 border-b border-violet-500/20 text-xs text-slate-300 py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {isSupabaseActive ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{t('supabase_connected_badge')} (PostgreSQL + RLS)</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-sky-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{t('demo_mode_badge')}:</span>
              <span className="text-slate-300 font-normal hidden sm:inline">
                Interactive student demo with persistent local storage and sample Uzbekistani Som (UZS) figures.
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden md:flex items-center gap-1 text-[11px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
            <Database className="w-3 h-3 text-violet-400" />
            <span>PostgreSQL Schema Ready</span>
          </span>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
