'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import {
  Compass,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  UserCheck,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { loginAsDemoUser } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    if (!email || !password) {
      setErrorMsg('Please fill in both email and password.');
      setLoading(false);
      return;
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
          return;
        }
        router.push('/dashboard');
      } catch (err: unknown) {
        setErrorMsg((err as Error).message || 'Authentication error.');
        setLoading(false);
      }
    } else {
      // Demo Mode login fallback
      loginAsDemoUser(email.split('@')[0] || 'Student', email);
      router.push('/dashboard');
    }
  };

  const handleQuickDemoLogin = (name: string, demoEmail: string) => {
    loginAsDemoUser(name, demoEmail);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-sky-400 p-0.5 shadow-lg shadow-violet-600/30">
              <div className="w-full h-full bg-[#0B1020] rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <span className="text-xl font-extrabold text-white">MoneyQuest</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back, Student</h1>
          <p className="text-xs text-slate-400 mt-1">Sign in to continue your missions and streaks</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-[#121A2B] border border-[#23324E] p-6 sm:p-8 shadow-2xl space-y-6">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@moneyquest.uz"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] text-slate-100 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => alert('In Demo Mode: Click any 1-Click Demo Student below to test instantly.')}
                  className="text-[11px] text-violet-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] text-slate-100 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Student Switcher for Assessors */}
          <div className="pt-4 border-t border-[#23324E]/80">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2 uppercase tracking-wider text-center">
              ⚡ Instant 1-Click Demo Profiles
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Jasur Temirov', 'jasur@moneyquest.uz')}
                className="p-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] hover:border-violet-500/50 text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer text-left"
              >
                <UserCheck className="w-4 h-4 text-violet-400 shrink-0" />
                <div>
                  <div className="font-semibold text-[11px]">Jasur (Level 2)</div>
                  <div className="text-[10px] text-slate-500">240 XP • Active Goals</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Malika Karimova', 'malika@moneyquest.uz')}
                className="p-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] hover:border-sky-500/50 text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer text-left"
              >
                <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <div className="font-semibold text-[11px]">Malika (Level 3)</div>
                  <div className="text-[10px] text-slate-500">510 XP • Strategist</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          New to MoneyQuest?{' '}
          <Link href="/register" className="text-violet-400 font-semibold hover:underline">
            Create a Student Account
          </Link>
        </p>
      </div>
    </div>
  );
}
