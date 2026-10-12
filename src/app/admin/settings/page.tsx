'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Crown,
  Lock,
  Shield,
  Database,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Server,
  Zap,
  Save,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { state } = useApp();
  const isSuperAdmin = state.user.role === 'super_admin';

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [xpMultiplier, setXpMultiplier] = useState(1.0);
  const [auditRetentionDays, setAuditRetentionDays] = useState(365);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isSuperAdmin) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#0F172A] border border-amber-500/30 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white">Super Admin Restricted Area</h2>
          <p className="text-xs text-slate-300">
            Platform Settings and root system configurations can only be accessed by the Project Owner (<strong className="text-amber-400">super_admin</strong>).
          </p>
        </div>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-1">
            <Crown className="w-3.5 h-3.5" />
            <span>Root Ownership Tier</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Platform Settings & System Controls
          </h1>
          <p className="text-xs text-slate-400">
            Manage global operational flags, PostgreSQL database policies, and gamification multipliers.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Platform settings successfully saved and applied!</span>
        </div>
      )}

      {/* Owner Protection Status Card */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#0F172A] to-[#0F172A] border border-amber-500/30 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-amber-400">
            <Crown className="w-5 h-5" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Super Admin Immutability Safeguards
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/40">
            Active Protection
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#090F1E] border border-[#1E2B45] space-y-1">
            <span className="text-slate-400 text-[11px] block">Project Owner Email</span>
            <span className="font-mono text-white font-semibold">{state.user.email}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#090F1E] border border-[#1E2B45] space-y-1">
            <span className="text-slate-400 text-[11px] block">Database Trigger Lock</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>prevent_super_admin_tampering</span>
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#090F1E] border border-[#1E2B45] space-y-1">
            <span className="text-slate-400 text-[11px] block">Account Deletion Guard</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>prevent_super_admin_deletion</span>
            </span>
          </div>
        </div>
      </div>

      {/* Operational Toggles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Switches */}
        <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E2B45] space-y-5">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-violet-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Operational Flags
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            {/* Maintenance Mode */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#090F1E] border border-[#1E2B45]">
              <div>
                <p className="font-semibold text-white">Maintenance Mode</p>
                <p className="text-[11px] text-slate-400">
                  Suspend student sessions for database migrations
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* Allow Registration */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#090F1E] border border-[#1E2B45]">
              <div>
                <p className="font-semibold text-white">Open Student Registration</p>
                <p className="text-[11px] text-slate-400">
                  Allow new students to sign up publicly
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowRegistration}
                  onChange={(e) => setAllowRegistration(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* XP Multiplier */}
            <div className="p-3.5 rounded-xl bg-[#090F1E] border border-[#1E2B45] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Experience XP Multiplier Event</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Boost reward XP across all lessons and missions
                  </p>
                </div>
                <span className="font-bold text-amber-400 text-sm">{xpMultiplier}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="3.0"
                step="0.5"
                value={xpMultiplier}
                onChange={(e) => setXpMultiplier(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Database & Infrastructure */}
        <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E2B45] space-y-5">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Infrastructure & Policies
            </h2>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-3 rounded-xl bg-[#090F1E] border border-[#1E2B45] flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Database Provider</p>
                <p className="text-[11px] text-slate-400">Supabase Managed PostgreSQL</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[11px] font-semibold">
                PostgreSQL 15+
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#090F1E] border border-[#1E2B45] flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Row Level Security (RLS)</p>
                <p className="text-[11px] text-slate-400">Per-user table access policies</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-semibold text-[11px]">
                Enforced
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#090F1E] border border-[#1E2B45] flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Audit Log Retention</p>
                <p className="text-[11px] text-slate-400">Days before cold-archiving logs</p>
              </div>
              <select
                value={auditRetentionDays}
                onChange={(e) => setAuditRetentionDays(parseInt(e.target.value))}
                className="px-2.5 py-1 rounded-lg bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none"
              >
                <option value={90}>90 Days</option>
                <option value={180}>180 Days</option>
                <option value={365}>365 Days (1 Year)</option>
                <option value={730}>730 Days (2 Years)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
