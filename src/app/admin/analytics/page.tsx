'use client';

import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Download,
  CheckCircle2,
  PieChart as PieIcon,
  Flame,
  ArrowUpRight,
} from 'lucide-react';

const activityData = [
  { day: 'Oct 01', users: 12, xp: 480 },
  { day: 'Oct 03', users: 18, xp: 750 },
  { day: 'Oct 05', users: 26, xp: 1100 },
  { day: 'Oct 07', users: 34, xp: 1450 },
  { day: 'Oct 09', users: 48, xp: 2100 },
  { day: 'Oct 11', users: 65, xp: 2890 },
  { day: 'Oct 12', users: 82, xp: 3450 },
];

const moduleXPData = [
  { module: 'Budgeting', xp: 1420 },
  { module: 'Saving', xp: 1150 },
  { module: 'Banking', xp: 890 },
  { module: 'Scam Radar', xp: 1340 },
  { module: 'Investing', xp: 720 },
  { module: 'Career', xp: 580 },
];

const missionDistributionData = [
  { name: '50/30/20 Budget', value: 34, color: '#8B5CF6' },
  { name: 'Emergency Fund', value: 24, color: '#38BDF8' },
  { name: 'Smart Shopper', value: 18, color: '#10B981' },
  { name: 'Scam Detective', value: 16, color: '#F59E0B' },
  { name: 'Freelance Sim', value: 8, color: '#EC4899' },
];

const quizMastery = [
  { topic: 'Understanding Money & Purchasing Power', attempts: 54, avgScore: 92, status: 'Mastered' },
  { topic: 'The 50/30/20 Budgeting Rule', attempts: 68, avgScore: 89, status: 'Mastered' },
  { topic: 'Card Security & Phishing Detection', attempts: 47, avgScore: 94, status: 'Mastered' },
  { topic: 'Banking & High-Yield Deposits', attempts: 39, avgScore: 82, status: 'Good' },
  { topic: 'Inflation vs Compounding Growth', attempts: 35, avgScore: 78, status: 'Needs Review' },
];

export default function AdminAnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Topic,Attempts,AverageScore,Status\n' +
      quizMastery
        .map((q) => `"${q.topic}",${q.attempts},${q.avgScore}%,${q.status}`)
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `moneyquest_analytics_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Platform Analytics & Learning KPIs
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor real-time student engagement, mission completion funnels, and quiz accuracy.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#152037] hover:bg-[#1E2B45] border border-[#23324E] text-slate-200 text-xs font-semibold transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-sky-400" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E2B45] space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Daily Active Students</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white">82</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+28% this week</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E2B45] space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Quiz Pass Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">88.4%</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>High comprehension</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E2B45] space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Missions per User</span>
            <Award className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-black text-white">3.6</div>
          <div className="text-[11px] text-violet-400 flex items-center gap-1">
            <span>Strong course stickiness</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E2B45] space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Average Streak</span>
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">6.2 days</div>
          <div className="text-[11px] text-amber-400 flex items-center gap-1">
            <span>Daily retention habit</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Over Time */}
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#1E2B45] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                Student Engagement & Active Days
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">Past 14 Days</span>
          </div>

          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090F1E',
                      borderColor: '#1E2B45',
                      borderRadius: '10px',
                      fontSize: '11px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#38BDF8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#userGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-600">
                Loading visualizer...
              </div>
            )}
          </div>
        </div>

        {/* XP Distributed by Module */}
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#1E2B45] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-violet-400" />
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                XP Distributed by Module
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">Total XP</span>
          </div>

          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moduleXPData}>
                  <XAxis dataKey="module" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090F1E',
                      borderColor: '#1E2B45',
                      borderRadius: '10px',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="xp" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-600">
                Loading visualizer...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Mission Distribution & Topic Mastery Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart: Mission Completion */}
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#1E2B45] space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Missions Completed Share
            </h2>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={missionDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {missionDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090F1E',
                      borderColor: '#1E2B45',
                      borderRadius: '10px',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-slate-600">Loading chart...</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            {missionDistributionData.map((m) => (
              <div key={m.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="truncate">{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Comprehension Table */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0F172A] border border-[#1E2B45] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Topic Comprehension & Quiz Accuracy
            </h2>
            <span className="text-[11px] text-slate-400">Automated evaluation</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-slate-400 font-semibold border-b border-[#1E2B45] uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Academy Topic</th>
                  <th className="py-2.5 px-3">Student Attempts</th>
                  <th className="py-2.5 px-3">Average Accuracy</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A253C]">
                {quizMastery.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#141E34]/40">
                    <td className="py-3 px-3 font-medium text-white">{item.topic}</td>
                    <td className="py-3 px-3 text-slate-400">{item.attempts} sessions</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.avgScore >= 90
                                ? 'bg-emerald-400'
                                : item.avgScore >= 80
                                ? 'bg-sky-400'
                                : 'bg-amber-400'
                            }`}
                            style={{ width: `${item.avgScore}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-200">{item.avgScore}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.status === 'Mastered'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : item.status === 'Good'
                            ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
