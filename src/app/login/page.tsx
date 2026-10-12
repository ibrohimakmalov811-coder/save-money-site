'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { loginServerAction } from '@/app/actions/authActions';
import { UserRole } from '@/lib/types/admin';
import {
  Compass,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  User,
  AlertCircle,
  Crown,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsDemoUser } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const res = await loginServerAction({ email, password });
    setLoading(false);

    if (res.success) {
      const detectedRole = (res.user as { role?: UserRole })?.role || 'user';
      loginAsDemoUser(email.split('@')[0], email, detectedRole);

      if (detectedRole === 'super_admin' || detectedRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } else {
      setErrorMsg(res.message || 'Invalid email or password.');
    }
  };

  const handleTestRoleSelect = (name: string, roleEmail: string, role: UserRole) => {
    loginAsDemoUser(name, roleEmail, role);
    if (role === 'super_admin' || role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-sky-400 p-0.5 shadow-lg shadow-violet-600/30">
              <div className="w-full h-full bg-[#0B1020] rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <span className="text-xl font-extrabold text-white">MoneyQuest</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sign In to Account</h1>
          <p className="text-xs text-slate-400">
            Access your financial missions, savings tracker, and dashboard.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-[#121A2B] border border-[#23324E] p-6 sm:p-8 shadow-2xl space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
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
                  placeholder="name@moneyquest.uz"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] text-slate-100 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-violet-400 hover:underline"
                >
                  Forgot password?
                </Link>
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 text-violet-600 focus:ring-violet-500"
                />
                <span>Remember session</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 3-Role Demo Personas Switcher */}
          <div className="pt-4 border-t border-[#23324E]/80 space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider text-center">
              ⚡ Instant Role Evaluation (3 Distinct Roles)
            </span>

            <div className="space-y-2">
              {/* Role 1: Super Admin */}
              <button
                type="button"
                onClick={() =>
                  handleTestRoleSelect(
                    'Project Owner (Super Admin)',
                    'owner@moneyquest.uz',
                    'super_admin'
                  )
                }
                className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-amber-500/30 hover:border-amber-400 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-300">
                      Super Admin (Project Owner)
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Highest authority • Manage admins, audit logs & system
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </button>

              {/* Role 2: Admin */}
              <button
                type="button"
                onClick={() =>
                  handleTestRoleSelect(
                    'Akmal Rakhimov (Content Admin)',
                    'admin@moneyquest.uz',
                    'admin'
                  )
                }
                className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-sky-500/30 hover:border-sky-400 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-sky-300">
                      Administrator
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Manage lessons, missions & view statistics
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" />
              </button>

              {/* Role 3: User */}
              <button
                type="button"
                onClick={() =>
                  handleTestRoleSelect('Jasur Temirov (Student)', 'jasur@moneyquest.uz', 'user')
                }
                className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] hover:border-violet-400 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-violet-300">
                      Student / Regular User
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Complete quests, budget simulator & track progress
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-violet-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          New to MoneyQuest?{' '}
          <Link href="/register" className="text-violet-400 font-semibold hover:underline">
            Create Student Account
          </Link>
        </p>
      </div>
    </div>
  );
}
