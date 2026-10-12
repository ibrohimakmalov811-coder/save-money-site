'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Compass,
  BarChart3,
  FileText,
  Settings,
  Shield,
  Crown,
  ChevronRight,
  ExternalLink,
  LogOut,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state, switchDemoRole, logoutUser } = useApp();
  const { user } = state;

  const isSuperAdmin = user.role === 'super_admin';
  const isAdmin = user.role === 'admin';
  const hasAccess = isSuperAdmin || isAdmin;

  const navItems = [
    {
      href: '/admin',
      label: 'Overview',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/admin/users',
      label: 'User Directory',
      icon: Users,
    },
    {
      href: '/admin/content',
      label: 'Course & Lessons',
      icon: BookOpen,
    },
    {
      href: '/admin/missions',
      label: 'Missions & Quests',
      icon: Compass,
    },
    {
      href: '/admin/analytics',
      label: 'Analytics & KPIs',
      icon: BarChart3,
    },
    {
      href: '/admin/audit-logs',
      label: 'Audit Trail',
      icon: FileText,
    },
    {
      href: '/admin/settings',
      label: 'Platform Settings',
      icon: Settings,
      superAdminOnly: true,
    },
  ];

  // Access guard for student users
  if (!hasAccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg rounded-2xl bg-[#121A2B] border border-rose-500/30 p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">Administrative Access Restricted</h1>
            <p className="text-sm text-slate-300">
              You are currently logged in as <strong className="text-white">{user.displayName}</strong> with role{' '}
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-xs font-semibold">
                user
              </span>
              . Only authorized <strong className="text-violet-400">Administrators</strong> or the{' '}
              <strong className="text-amber-400">Super Admin (Project Owner)</strong> can access this subsystem.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0B1020] border border-[#23324E] text-left space-y-3">
            <p className="text-xs text-slate-400 font-medium">Evaluation Demo Role Switcher:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => switchDemoRole('super_admin')}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold cursor-pointer transition-colors"
              >
                <Crown className="w-4 h-4" />
                <span>Switch to Super Admin</span>
              </button>
              <button
                onClick={() => switchDemoRole('admin')}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-xs font-semibold cursor-pointer transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Switch to Admin</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              <span>Return to Student Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080D1A] text-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <div className="border-b border-[#1E2B45] bg-[#0E1526]/90 backdrop-blur-md sticky top-16 z-30 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left Title & Role Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-violet-600/20 border border-violet-500/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-violet-400" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">Admin Console</span>
            </div>

            <div className="h-4 w-px bg-slate-700 hidden sm:block" />

            {/* Role Badge */}
            {isSuperAdmin ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm shadow-amber-500/10">
                <Crown className="w-3.5 h-3.5" />
                <span>Super Admin (Owner)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Content Admin</span>
              </span>
            )}
          </div>

          {/* Right Action Tools & Switchers */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Quick Demo Role Switcher */}
            <div className="hidden md:flex items-center gap-1 bg-[#090F1E] border border-[#1E2B45] p-1 rounded-xl text-xs">
              <span className="text-[11px] text-slate-400 px-2 font-medium">Role:</span>
              <button
                onClick={() => switchDemoRole('super_admin')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  isSuperAdmin
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Owner
              </button>
              <button
                onClick={() => switchDemoRole('admin')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  isAdmin
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => switchDemoRole('user')}
                className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white font-medium cursor-pointer"
              >
                Student
              </button>
            </div>

            {/* Back to Student View */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#152037] hover:bg-[#1E2B45] border border-[#23324E] text-slate-200 text-xs font-semibold transition-colors"
            >
              <span>Student App</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            </Link>

            {/* Sign Out */}
            <button
              onClick={() => {
                logoutUser();
                router.push('/login');
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Admin Layout Grid */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-4">
          <div className="rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-3 space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
              System Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              if (item.superAdminOnly && !isSuperAdmin) {
                return (
                  <div
                    key={item.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-500 text-xs font-medium cursor-not-allowed opacity-60"
                    title="Restricted to Super Admin (Owner)"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <Crown className="w-3.5 h-3.5 text-amber-500/50" />
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                      : 'text-slate-300 hover:bg-[#18233D] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.superAdminOnly && (
                    <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Operator Profile Card */}
          <div className="rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-sky-400 p-0.5">
                <div className="w-full h-full bg-[#0B1020] rounded-[10px] flex items-center justify-center font-bold text-white text-xs">
                  {user.displayName.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user.displayName}</p>
                <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1C273E] text-[11px] text-slate-400 flex items-center justify-between">
              <span>Security Level:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <UserCheck className="w-3 h-3" />
                {isSuperAdmin ? 'Tier-1 Root' : 'Tier-2 Content'}
              </span>
            </div>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
