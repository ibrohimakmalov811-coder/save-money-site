'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { scamCases, ScamCase } from '@/lib/data/scamRadarData';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Eye,
  CheckCircle2,
  Lock,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export default function ScamRadarPage() {
  const { language } = useLanguage();
  const { awardXP, unlockAchievement } = useApp();

  const [activeCase, setActiveCase] = useState<ScamCase>(scamCases[0]);
  const [analyzedCases, setAnalyzedCases] = useState<string[]>([]);
  const [revealedAnalysis, setRevealedAnalysis] = useState(false);

  const handleInspectCase = (scam: ScamCase) => {
    setActiveCase(scam);
    setRevealedAnalysis(analyzedCases.includes(scam.id));
  };

  const handleAnalyzeRedFlags = () => {
    setRevealedAnalysis(true);
    if (!analyzedCases.includes(activeCase.id)) {
      const nextList = [...analyzedCases, activeCase.id];
      setAnalyzedCases(nextList);
      awardXP(30);
      if (nextList.length >= scamCases.length) {
        unlockAchievement('scam-detective');
      }
    }
  };

  const localizedTitle =
    language === 'uz' ? activeCase.titleUz : language === 'ru' ? activeCase.titleRu : activeCase.title;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#182238] via-[#121A2B] to-[#0B1020] border border-[#23324E]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/20 text-rose-300 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Cyber Defense Lab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Scam Awareness Radar</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Inspect real phishing messages, fraudulent Telegram bots, and social engineering tricks targeting students in Uzbekistan.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0B1020] border border-[#23324E] text-xs">
          <span className="text-slate-400 block">Threats Mastered:</span>
          <span className="text-base font-extrabold text-emerald-400">
            {analyzedCases.length} / {scamCases.length}
          </span>
        </div>
      </div>

      {/* Main Grid: Left Selector List, Right Detailed Inspection Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Threat Cases List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Select Suspicious Incident:
          </span>

          <div className="space-y-2.5">
            {scamCases.map((scam) => {
              const isSelected = activeCase.id === scam.id;
              const isDone = analyzedCases.includes(scam.id);
              const title =
                language === 'uz' ? scam.titleUz : language === 'ru' ? scam.titleRu : scam.title;

              return (
                <button
                  key={scam.id}
                  type="button"
                  onClick={() => handleInspectCase(scam)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-violet-600/20 border-violet-500 text-white shadow-lg'
                      : 'bg-[#121A2B] border-[#23324E] text-slate-300 hover:border-slate-500 hover:bg-[#182238]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-2 py-0.5 rounded-full bg-[#0B1020] text-slate-400 font-mono">
                      {scam.platform}
                    </span>
                    {isDone && (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold text-[10px]">
                        <CheckCircle2 className="w-3 h-3" /> Mastered
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold leading-snug">{title}</h3>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Inspection Workbench (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#23324E]">
              <div>
                <span className="text-xs text-violet-400 font-semibold uppercase">
                  Incident Inspection
                </span>
                <h2 className="text-lg font-bold text-white">{localizedTitle}</h2>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs font-semibold self-start sm:self-auto">
                {activeCase.difficulty} Threat Level
              </span>
            </div>

            {/* Simulated Device Screen Mockup */}
            <div className="rounded-2xl bg-[#0B1020] border border-[#23324E] p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-[#23324E]/60 text-slate-400">
                <span className="font-mono text-slate-300">Sender: {activeCase.sender}</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <MessageSquare className="w-3.5 h-3.5" /> {activeCase.platform} Message
                </span>
              </div>

              {/* Message Content Bubble */}
              <div className="p-4 rounded-2xl bg-[#182238] border border-[#23324E] text-xs sm:text-sm text-slate-100 font-mono leading-relaxed selection:bg-rose-600">
                {activeCase.messageBody}
              </div>
            </div>

            {/* Analysis Section */}
            {!revealedAnalysis ? (
              <div className="text-center py-4 space-y-3">
                <p className="text-xs text-slate-400">
                  Carefully read the message above. Look for abnormal guarantees, high urgency, and requests for codes.
                </p>
                <button
                  type="button"
                  onClick={handleAnalyzeRedFlags}
                  className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 flex items-center gap-2 mx-auto cursor-pointer transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>Scan & Reveal Red Flags (+30 XP)</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6 pt-2 animate-in fade-in duration-200">
                {/* Red Flags List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Identified Threat Red Flags:</span>
                  </span>

                  <div className="space-y-2">
                    {activeCase.redFlags.map((flag, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-200 flex items-start gap-2.5"
                      >
                        <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          !
                        </span>
                        <span className="leading-relaxed">{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safe Protocol Advice */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1.5">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Recommended Protective Protocol:</span>
                  </span>
                  <p className="text-emerald-200 leading-relaxed">{activeCase.safeAction}</p>
                </div>

                {/* Economic & Psychological Reasoning */}
                <div className="p-4 rounded-2xl bg-[#0B1020] border border-[#23324E] text-xs space-y-1">
                  <span className="font-bold text-sky-400 block">Why Scammers Use This Trick:</span>
                  <p className="text-slate-300 leading-relaxed">{activeCase.explanation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
