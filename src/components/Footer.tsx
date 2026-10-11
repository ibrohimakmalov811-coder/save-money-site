'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Compass, ShieldCheck, Heart, Award } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#23324E] bg-[#0B1020] text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-sky-400 p-0.5">
                <div className="w-full h-full bg-[#0B1020] rounded-[7px] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <span className="text-base font-extrabold text-white">MoneyQuest</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('brand_slogan')}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Safe Educational Sandbox (UZS)</span>
            </div>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-sm">Interactive Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/budget-simulator" className="hover:text-white transition-colors">
                  {t('nav_budget')}
                </Link>
              </li>
              <li>
                <Link href="/savings-goals" className="hover:text-white transition-colors">
                  {t('nav_savings')}
                </Link>
              </li>
              <li>
                <Link href="/life-simulator" className="hover:text-white transition-colors">
                  {t('nav_life_sim')}
                </Link>
              </li>
              <li>
                <Link href="/scam-radar" className="hover:text-white transition-colors">
                  {t('nav_scam_radar')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Curriculum */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-sm">Curriculum & Missions</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/academy" className="hover:text-white transition-colors">
                  8-Module Academy
                </Link>
              </li>
              <li>
                <Link href="/missions" className="hover:text-white transition-colors">
                  Practical Challenges
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ & Guidance
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-sm">Legal & Academy</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About MoneyQuest
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Educational Notice */}
        <div className="pt-8 border-t border-[#23324E]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © 2026 MoneyQuest. Designed for high school and IT academy students.
          </p>
          <div className="flex items-center gap-4 text-center">
            <span>Built for youth financial empowerment</span>
            <span>•</span>
            <span>Fictional simulation data only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
