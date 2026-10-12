'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { academyModules, AcademyModule } from '@/lib/data/academyData';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Sparkles,
  Clock,
  HelpCircle,
  Layers,
  CheckCircle2,
  Check,
} from 'lucide-react';

export default function AdminContentPage() {
  const [modules, setModules] = useState<AcademyModule[]>(academyModules);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<AcademyModule | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // New module form
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Foundations');
  const [formDuration, setFormDuration] = useState('10');
  const [formXpReward, setFormXpReward] = useState('40');
  const [formSummary, setFormSummary] = useState('');

  const categories = Array.from(new Set(modules.map((m) => m.category)));

  const filteredModules = modules.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newSlug = formTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newMod: AcademyModule = {
      id: `module-${Date.now()}`,
      slug: newSlug || `module-${Date.now()}`,
      title: formTitle,
      titleUz: formTitle,
      titleRu: formTitle,
      category: formCategory,
      durationMin: parseInt(formDuration) || 10,
      xpReward: parseInt(formXpReward) || 40,
      iconName: 'BookOpen',
      summary: formSummary || 'Practical financial knowledge for students.',
      summaryUz: formSummary || 'Amaliy moliyaviy bilimlar.',
      summaryRu: formSummary || 'Практические финансовые знания.',
      sections: [
        {
          heading: 'Introduction',
          body: 'This module covers essential money fundamentals and actionable rules.',
        },
      ],
      quiz: [
        {
          id: `q-${Date.now()}-1`,
          question: `What is the key takeaway of ${formTitle}?`,
          options: [
            'Consistent discipline and smart budgeting',
            'Relying on impulse purchases',
            'Avoiding any financial planning',
            'Ignoring bank accounts',
          ],
          correctIndex: 0,
          explanation: 'Consistent discipline is the foundation of long-term wealth.',
        },
      ],
    };

    setModules([newMod, ...modules]);
    setIsCreateOpen(false);
    setFormTitle('');
    setFormSummary('');
    setSuccessMsg(`Module "${formTitle}" was successfully created and published!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModule) return;

    setModules(
      modules.map((m) =>
        m.id === editingModule.id ? editingModule : m
      )
    );
    setEditingModule(null);
    setSuccessMsg('Module updated successfully!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleDeleteModule = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete module "${title}"?`)) {
      setModules(modules.filter((m) => m.id !== id));
      setSuccessMsg(`Module "${title}" deleted.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Academy Course & Lesson Management
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Create, update, and sequence educational modules and interactive quizzes.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Module</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E2B45] flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search module title or summary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-slate-200 focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modules List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredModules.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-5 space-y-4 hover:border-[#2C3E63] transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-semibold">
                  {m.category}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingModule(m)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Edit Lesson"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteModule(m.id, m.title)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                    title="Delete Lesson"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white leading-snug">{m.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{m.summary}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1C273E] flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-violet-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span>+{m.xpReward} XP</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{m.durationMin}m</span>
                </span>
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{m.quiz.length} Qs</span>
                </span>
              </div>

              <Link
                href={`/academy/${m.slug}`}
                target="_blank"
                className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium hover:underline text-[11px]"
              >
                <span>Preview</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Create Module Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Create New Academy Module</h3>
                <p className="text-xs text-slate-400">Define lesson content, XP, and quiz parameters</p>
              </div>
            </div>

            <form onSubmit={handleCreateModule} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Module Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Credit Cards vs Debit Cards"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="Foundations">Foundations</option>
                    <option value="Budgeting">Budgeting</option>
                    <option value="Banking">Banking</option>
                    <option value="Investing">Investing</option>
                    <option value="Security">Security</option>
                    <option value="Career">Career</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Duration (min)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">XP Reward</label>
                  <input
                    type="number"
                    min="10"
                    max="200"
                    value={formXpReward}
                    onChange={(e) => setFormXpReward(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Summary & Objectives
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain what the student will learn in this lesson..."
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-violet-600/30"
                >
                  Publish Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Module Modal */}
      {editingModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Edit2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Edit Module Parameters</h3>
                <p className="text-xs text-slate-400">{editingModule.title}</p>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editingModule.title}
                  onChange={(e) =>
                    setEditingModule({ ...editingModule, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">XP Reward</label>
                  <input
                    type="number"
                    value={editingModule.xpReward}
                    onChange={(e) =>
                      setEditingModule({
                        ...editingModule,
                        xpReward: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Duration (min)</label>
                  <input
                    type="number"
                    value={editingModule.durationMin}
                    onChange={(e) =>
                      setEditingModule({
                        ...editingModule,
                        durationMin: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Summary</label>
                <textarea
                  rows={3}
                  value={editingModule.summary}
                  onChange={(e) =>
                    setEditingModule({ ...editingModule, summary: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingModule(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-sky-600/30"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
