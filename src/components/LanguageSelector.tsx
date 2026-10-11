'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedLanguage } from '@/lib/i18n/types';
import { Globe, ChevronDown, Check } from 'lucide-react';

const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

export function LanguageSelector({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = languages.find((l) => l.code === language) || languages[1];

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className || ''}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#182238] border border-[#23324E] text-xs font-medium text-slate-200 hover:text-white hover:border-slate-500/50 transition-colors cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-sky-400" />
        <span>{current.flag} {current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-[#121A2B] border border-[#23324E] shadow-xl shadow-black/50 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                setLanguage(item.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                language === item.code
                  ? 'bg-violet-600/15 text-violet-300 font-semibold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{item.flag}</span>
                <span>{item.label}</span>
              </span>
              {language === item.code && <Check className="w-3.5 h-3.5 text-violet-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
