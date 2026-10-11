'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import { SoundToggle } from './SoundToggle';
import {
  Compass,
  Menu,
  X,
  Sparkles,
  BookOpen,
  PieChart,
  Target,
  Flame,
  User,
  Shield,
  Layers,
} from 'lucide-react';

export function Navbar() {
  const { t } = useLanguage();
  const { state, levelInfo } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/#how-it-works', label: t('nav_how_it_works') },
    { href: '/#features', label: t('nav_features') },
    { href: '/academy', label: t('nav_academy'), icon: BookOpen },
    { href: '/missions', label: t('nav_missions'), icon: Sparkles },
    { href: '/budget-simulator', label: t('nav_budget'), icon: PieChart },
    { href: '/savings-goals', label: t('nav_savings'), icon: Target },
    { href: '/life-simulator', label: t('nav_life_sim'), icon: Layers },
    { href: '/scam-radar', label: t('nav_scam_radar'), icon: Shield },
    { href: '/#faq', label: t('nav_faq') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#23324E]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-sky-400 p-0.5 shadow-md shadow-violet-600/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0B1020] rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-sky-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent">
              MoneyQuest
            </span>
            <span className="text-[10px] font-medium text-violet-400 -mt-1 tracking-wider uppercase">
              Financial Academy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium text-slate-300">
          <Link
            href="/academy"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname.startsWith('/academy') ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'
            }`}
          >
            {t('nav_academy')}
          </Link>
          <Link
            href="/missions"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname.startsWith('/missions') ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'
            }`}
          >
            {t('nav_missions')}
          </Link>
          <Link
            href="/budget-simulator"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/budget-simulator' ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'
            }`}
          >
            {t('nav_budget')}
          </Link>
          <Link
            href="/savings-goals"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/savings-goals' ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'
            }`}
          >
            {t('nav_savings')}
          </Link>
          <Link
            href="/life-simulator"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/life-simulator' ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'
            }`}
          >
            {t('nav_life_sim')}
          </Link>
          <Link
            href="/scam-radar"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              pathname === '/scam-radar' ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'
            }`}
          >
            {t('nav_scam_radar')}
          </Link>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LanguageSelector />
          <SoundToggle />

          {/* Gamification Stats pill on larger screens */}
          <div className="hidden sm:flex items-center gap-2 bg-[#182238] border border-[#23324E] px-2.5 py-1 rounded-xl text-xs">
            <span className="flex items-center gap-1 text-amber-400 font-semibold" title="Learning Streak">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{state.streakDays}d</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-violet-300 font-bold" title="Total XP">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>{state.totalXP} XP</span>
            </span>
          </div>

          {/* Primary CTA / Dashboard */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 hover:shadow-violet-600/50 transition-all cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('nav_dashboard')}</span>
            <span className="sm:hidden">App</span>
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-xl bg-[#182238] border border-[#23324E] text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1020]/95 border-b border-[#23324E] px-4 pt-3 pb-6 animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 mb-3">
            <span>Student: {state.user.displayName}</span>
            <span className="text-violet-400 font-medium">Lv. {levelInfo.level} ({t(levelInfo.titleKey)})</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#121A2B] border border-[#23324E] text-slate-200 hover:text-white hover:border-violet-500/50 transition-colors"
                >
                  {Icon && <Icon className="w-4 h-4 text-sky-400" />}
                  <span className="truncate">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('nav_profile')}</span>
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-violet-400 font-medium hover:underline"
            >
              {t('nav_login')} / Switch Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
