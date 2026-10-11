'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { formatUZS, parseSafeNumber } from '@/lib/utils';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import {
  PieChart as PieIcon,
  RotateCcw,
  Save,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Info,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

export default function BudgetSimulatorPage() {
  const { t } = useLanguage();
  const { state, updateBudget } = useApp();

  const [income, setIncome] = useState<number>(state.budget.monthlyIncome || 1000000);
  const [categories, setCategories] = useState({
    food: state.budget.categories.food || 400000,
    transport: state.budget.categories.transport || 150000,
    education: state.budget.categories.education || 150000,
    entertainment: state.budget.categories.entertainment || 100000,
    savings: state.budget.categories.savings || 200000,
    other: state.budget.categories.other || 0,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Math
  const totalPlannedExpenses = Object.values(categories).reduce((a, b) => a + b, 0);
  const remainingBalance = income - totalPlannedExpenses;
  const savingsRate = income > 0 ? Math.round((categories.savings / income) * 100) : 0;
  const isDeficit = remainingBalance < 0;

  // Chart data
  const chartData = [
    { name: 'Food & Meals', value: categories.food, color: '#38BDF8' },
    { name: 'Transport', value: categories.transport, color: '#6366F1' },
    { name: 'Education & IT', value: categories.education, color: '#8B5CF6' },
    { name: 'Entertainment', value: categories.entertainment, color: '#EC4899' },
    { name: 'Savings Buffer', value: categories.savings, color: '#34D399' },
    { name: 'Other', value: categories.other, color: '#94A3B8' },
  ].filter((item) => item.value > 0);

  const comparisonData = [
    { name: 'Income', amount: income },
    { name: 'Expenses', amount: totalPlannedExpenses },
    { name: 'Savings', amount: categories.savings },
  ];

  // Presets
  const applyPreset = (presetIncome: number, presetCats: typeof categories) => {
    setIncome(presetIncome);
    setCategories(presetCats);
    setSavedSuccess(false);
  };

  const handleSaveBudget = () => {
    updateBudget({
      monthlyIncome: income,
      categories,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    setIncome(1000000);
    setCategories({
      food: 400000,
      transport: 150000,
      education: 150000,
      entertainment: 100000,
      savings: 200000,
      other: 0,
    });
    setSavedSuccess(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#182238] via-[#121A2B] to-[#0B1020] border border-[#23324E]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/15 border border-violet-500/20 text-violet-300 text-xs font-semibold">
            <PieIcon className="w-3.5 h-3.5" />
            <span>Smart Money Lab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{t('bs_title')}</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">{t('bs_subtitle')}</p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-400 block w-full sm:w-auto">Student Presets:</span>
          <button
            type="button"
            onClick={() =>
              applyPreset(600000, {
                food: 250000,
                transport: 120000,
                education: 80000,
                entertainment: 50000,
                savings: 100000,
                other: 0,
              })
            }
            className="px-2.5 py-1.5 rounded-xl bg-[#0B1020] border border-[#23324E] hover:border-sky-500/50 text-slate-300 text-xs transition-colors cursor-pointer"
          >
            {t('bs_preset_highschool')}
          </button>
          <button
            type="button"
            onClick={() =>
              applyPreset(1200000, {
                food: 450000,
                transport: 180000,
                education: 200000,
                entertainment: 130000,
                savings: 240000,
                other: 0,
              })
            }
            className="px-2.5 py-1.5 rounded-xl bg-[#0B1020] border border-[#23324E] hover:border-violet-500/50 text-slate-300 text-xs transition-colors cursor-pointer"
          >
            {t('bs_preset_student')}
          </button>
          <button
            type="button"
            onClick={() =>
              applyPreset(2500000, {
                food: 900000,
                transport: 300000,
                education: 400000,
                entertainment: 350000,
                savings: 550000,
                other: 0,
              })
            }
            className="px-2.5 py-1.5 rounded-xl bg-[#0B1020] border border-[#23324E] hover:border-emerald-500/50 text-slate-300 text-xs transition-colors cursor-pointer"
          >
            {t('bs_preset_intern')}
          </button>
        </div>
      </div>

      {/* Overview Metric Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-[#121A2B] border border-[#23324E]">
          <span className="text-xs text-slate-400 block mb-1">Monthly Income</span>
          <div className="text-xl font-black text-white">{formatUZS(income)}</div>
          <span className="text-[11px] text-slate-500">Stipend or allowance</span>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-[#121A2B] border border-[#23324E]">
          <span className="text-xs text-slate-400 block mb-1">Total Planned Expenses</span>
          <div className="text-xl font-black text-slate-200">{formatUZS(totalPlannedExpenses)}</div>
          <span className="text-[11px] text-slate-500">
            {income > 0 ? Math.round((totalPlannedExpenses / income) * 100) : 0}% of income
          </span>
        </div>

        {/* Metric 3 */}
        <div
          className={`p-5 rounded-2xl border ${
            isDeficit
              ? 'bg-rose-500/10 border-rose-500/30'
              : 'bg-[#121A2B] border-[#23324E]'
          }`}
        >
          <span className="text-xs text-slate-400 block mb-1">{t('bs_balance')}</span>
          <div
            className={`text-xl font-black ${
              isDeficit ? 'text-rose-400' : 'text-emerald-400'
            }`}
          >
            {formatUZS(remainingBalance)}
          </div>
          <span className="text-[11px] text-slate-500">
            {isDeficit ? 'Over-budget deficit!' : 'Available buffer'}
          </span>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-[#121A2B] border border-[#23324E]">
          <span className="text-xs text-slate-400 block mb-1">{t('bs_savings_rate')}</span>
          <div
            className={`text-xl font-black ${
              savingsRate >= 20 ? 'text-emerald-400' : 'text-amber-400'
            }`}
          >
            {savingsRate}%
          </div>
          <span className="text-[11px] text-slate-500">
            {savingsRate >= 20 ? 'Target ≥20% met!' : 'Goal: at least 20%'}
          </span>
        </div>
      </div>

      {/* Warnings & Advice Banners */}
      {isDeficit && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{t('bs_warning_deficit')} Reduce entertainment or wants to restore balance.</span>
        </div>
      )}

      {!isDeficit && savingsRate >= 20 && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{t('bs_tip_healthy')} You are building solid resilience.</span>
        </div>
      )}

      {/* Main Grid: Inputs on Left, Interactive Charts on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-5">
            <h2 className="text-base font-bold text-white flex items-center justify-between">
              <span>Adjust Your Cash Flow</span>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('bs_reset_btn')}</span>
              </button>
            </h2>

            {/* Income Input */}
            <div className="p-4 rounded-2xl bg-[#0B1020] border border-[#23324E] space-y-2">
              <label className="text-xs font-semibold text-white block">
                {t('bs_income')} (UZS)
              </label>
              <input
                type="number"
                min="0"
                step="50000"
                value={income}
                onChange={(e) => setIncome(parseSafeNumber(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[#182238] border border-[#23324E] text-white text-sm font-semibold focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Monthly Expense Allocations
              </h3>

              {/* Food */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{t('bs_food')}</span>
                  <span className="text-sky-400 font-semibold">{formatUZS(categories.food)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(income, 1000000)}
                  step="20000"
                  value={categories.food}
                  onChange={(e) =>
                    setCategories({ ...categories, food: parseSafeNumber(e.target.value) })
                  }
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>

              {/* Transport */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{t('bs_transport')}</span>
                  <span className="text-indigo-400 font-semibold">{formatUZS(categories.transport)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(income, 1000000)}
                  step="20000"
                  value={categories.transport}
                  onChange={(e) =>
                    setCategories({ ...categories, transport: parseSafeNumber(e.target.value) })
                  }
                  className="w-full accent-indigo-400 cursor-pointer"
                />
              </div>

              {/* Education */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{t('bs_education')}</span>
                  <span className="text-violet-400 font-semibold">{formatUZS(categories.education)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(income, 1000000)}
                  step="20000"
                  value={categories.education}
                  onChange={(e) =>
                    setCategories({ ...categories, education: parseSafeNumber(e.target.value) })
                  }
                  className="w-full accent-violet-400 cursor-pointer"
                />
              </div>

              {/* Entertainment */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{t('bs_entertainment')}</span>
                  <span className="text-pink-400 font-semibold">{formatUZS(categories.entertainment)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(income, 1000000)}
                  step="20000"
                  value={categories.entertainment}
                  onChange={(e) =>
                    setCategories({ ...categories, entertainment: parseSafeNumber(e.target.value) })
                  }
                  className="w-full accent-pink-400 cursor-pointer"
                />
              </div>

              {/* Savings */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-300 font-bold">{t('bs_savings')} (≥ 20%)</span>
                  <span className="text-emerald-400 font-bold">{formatUZS(categories.savings)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(income, 1000000)}
                  step="20000"
                  value={categories.savings}
                  onChange={(e) =>
                    setCategories({ ...categories, savings: parseSafeNumber(e.target.value) })
                  }
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Other */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{t('bs_other')}</span>
                  <span className="text-slate-400 font-semibold">{formatUZS(categories.other)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(income, 1000000)}
                  step="20000"
                  value={categories.other}
                  onChange={(e) =>
                    setCategories({ ...categories, other: parseSafeNumber(e.target.value) })
                  }
                  className="w-full accent-slate-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-[#23324E] flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {savedSuccess ? 'Saved to profile!' : 'Persists to your session'}
              </span>
              <button
                type="button"
                onClick={handleSaveBudget}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{savedSuccess ? 'Budget Saved! ✓' : t('bs_save_btn')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Visual Analytics (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recharts Pie Chart Breakdown */}
          <div className="p-6 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-4">
            <h3 className="text-sm font-bold text-white">Expense Distribution</h3>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => [formatUZS(Number(val)), 'Amount']}
                    contentStyle={{
                      backgroundColor: '#0B1020',
                      borderColor: '#23324E',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#fff',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Educational 50/30/20 Guide Card */}
          <div className="p-6 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-3 text-xs">
            <div className="flex items-center gap-2 text-sky-400 font-bold">
              <Info className="w-4 h-4" />
              <span>The 50/30/20 Budgeting Philosophy</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Economists recommend splitting your income into three fundamental buckets:
            </p>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 mt-1 shrink-0" />
                <span><strong className="text-white">50% Needs:</strong> Rent, food, metro pass, and internet.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400 mt-1 shrink-0" />
                <span><strong className="text-white">30% Wants:</strong> Coffee, gaming, leisure, and restaurants.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                <span><strong className="text-white">20% Savings:</strong> Emergency fund and tech equipment investments.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
