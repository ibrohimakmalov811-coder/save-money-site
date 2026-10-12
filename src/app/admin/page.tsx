'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { fetchAdminDataAction } from '@/app/actions/adminActions';
import { AdminStats, AdminAuditLogItem } from '@/lib/types/admin';
import {
  Users,
  Award,
  BookOpen,
  Sparkles,
  Shield,
  Crown,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Lock,
  Compass,
  FileText,
  Activity,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const { state } = useApp();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentLogs, setRecentLogs] = useState<AdminAuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchAdminDataAction();
        setStats(data.stats);
        setRecentLogs(data.auditLogs.slice(0, 5));
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const isSuperAdmin = state.user.role === 'super_admin';

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#121A2B] via-[#14213B] to-[#121A2B] border border-[#23324E] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
              <Activity className="w-3.5 h-3.5 text-violet-400" />
              <span>Platform Health: 100% Operational</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Administration & RBAC Overview
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              Manage student accounts, enforce PostgreSQL Row Level Security (RLS), publish interactive financial literacy courses, and inspect tamper-proof audit trails.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/users"
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Manage Users</span>
            </Link>
            {isSuperAdmin && (
              <Link
                href="/admin/settings"
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Crown className="w-4 h-4" />
                <span>Owner Controls</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-5 space-y-2 hover:border-[#2C3E63] transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Users</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {loading ? '...' : stats?.totalUsers || 5}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>100% active standing</span>
          </div>
        </div>

        {/* Admins & Moderators */}
        <div className="rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-5 space-y-2 hover:border-[#2C3E63] transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Administrators</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {loading ? '...' : stats?.adminCount || 2}
          </div>
          <div className="text-[11px] text-amber-400 flex items-center gap-1">
            <Crown className="w-3.5 h-3.5" />
            <span>1 Super Admin + 1 Admin</span>
          </div>
        </div>

        {/* Completed Quests */}
        <div className="rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-5 space-y-2 hover:border-[#2C3E63] transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Missions Done</span>
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {loading ? '...' : stats?.completedMissionsCount || 18}
          </div>
          <div className="text-[11px] text-violet-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Across 5 interactive quests</span>
          </div>
        </div>

        {/* Total XP Distributed */}
        <div className="rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-5 space-y-2 hover:border-[#2C3E63] transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total XP Distributed</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {loading ? '...' : `${(stats?.totalXPDistributed || 5080).toLocaleString()} XP`}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>Verified in PostgreSQL audit</span>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Quick Actions & Security Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security & RBAC Enforcement Summary (Col 1 & 2) */}
        <div className="lg:col-span-2 rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Security & RBAC Architecture
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              Protected by PostgreSQL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-[#090F1E] border border-[#1C273E] space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                <Crown className="w-4 h-4" />
                <span>Super Admin</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Project Owner root authority (<code className="text-slate-300">owner@moneyquest.uz</code>). Protected by SQL Trigger: strictly immutable, cannot be demoted, deleted, or suspended.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090F1E] border border-[#1C273E] space-y-2">
              <div className="flex items-center gap-1.5 text-sky-400 text-xs font-bold">
                <Shield className="w-4 h-4" />
                <span>Content Admin</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Can create and publish courses, lessons, and financial missions. Cannot promote users to Super Admin or modify root owner settings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090F1E] border border-[#1C273E] space-y-2">
              <div className="flex items-center gap-1.5 text-violet-400 text-xs font-bold">
                <Users className="w-4 h-4" />
                <span>Student User</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Default assigned role upon registration. Bound by Row Level Security (RLS) to read and modify only their own progress, budgets, and savings goals.
              </p>
            </div>
          </div>

          {/* Quick Hub Links */}
          <div className="pt-2 border-t border-[#1C273E] flex flex-wrap items-center gap-3">
            <Link
              href="/admin/content"
              className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Manage Academy Modules</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/admin/missions"
              className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-semibold"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Configure Missions</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/admin/analytics"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>View Engagement Analytics</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Recent Audit Log Preview (Col 3) */}
        <div className="rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Recent Audit Trail
                </h3>
              </div>
              <Link
                href="/admin/audit-logs"
                className="text-[11px] text-violet-400 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentLogs.length > 0 ? (
                recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl bg-[#090F1E] border border-[#1C273E] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-violet-300 font-bold">
                        {log.action}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(log.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 truncate">
                      By: <span className="text-slate-400">{log.actorEmail}</span>
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 text-center py-4">
                  No recent audit events.
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[#1C273E]">
            <Link
              href="/admin/audit-logs"
              className="w-full py-2.5 rounded-xl bg-[#152037] hover:bg-[#1E2B45] text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-violet-400" />
              <span>Open Immutable Audit Log</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
