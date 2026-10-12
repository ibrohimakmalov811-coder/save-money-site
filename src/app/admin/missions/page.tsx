'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { missions, Mission } from '@/lib/data/missionsData';
import {
  Compass,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Sparkles,
  Clock,
  Layers,
  CheckCircle2,
  Sliders,
  Archive,
} from 'lucide-react';

export default function AdminMissionsPage() {
  const [missionList, setMissionList] = useState<Mission[]>(missions);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // New Mission form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Budgeting' | 'Saving' | 'Spending' | 'Safety' | 'Planning'>('Budgeting');
  const [newDifficulty, setNewDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [newXpReward, setNewXpReward] = useState('60');
  const [newDuration, setNewDuration] = useState('10');
  const [newDesc, setNewDesc] = useState('');

  const filteredMissions = missionList.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = difficultyFilter === 'all' || m.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  const handleCreateMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newM: Mission = {
      id: `custom-mission-${Date.now()}`,
      title: newTitle,
      titleUz: newTitle,
      titleRu: newTitle,
      category: newCategory,
      difficulty: newDifficulty,
      durationMin: parseInt(newDuration) || 10,
      xpReward: parseInt(newXpReward) || 60,
      description: newDesc || 'Interactive practical mission for personal finance mastery.',
      descriptionUz: newDesc || 'Amaliy interaktiv moliya topshirig‘i.',
      descriptionRu: newDesc || 'Практическая интерактивная финансовая миссия.',
      learningObjectives: ['Complete realistic financial tasks', 'Practice sound money decision-making'],
      type: 'scenario_choice',
      content: {
        story: newDesc || 'Scenario description for students.',
        instructions: 'Read each option carefully and choose the optimal financial strategy.',
      },
    };

    setMissionList([newM, ...missionList]);
    setIsCreateOpen(false);
    setNewTitle('');
    setNewDesc('');
    setSuccessMsg(`Mission "${newTitle}" configured and added to platform!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMission) return;

    setMissionList(
      missionList.map((m) => (m.id === editingMission.id ? editingMission : m))
    );
    setEditingMission(null);
    setSuccessMsg('Mission parameters updated successfully!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleArchiveMission = (id: string, title: string) => {
    if (confirm(`Archive mission "${title}"?`)) {
      setMissionList(missionList.filter((m) => m.id !== id));
      setSuccessMsg(`Mission "${title}" archived.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Missions & Financial Challenges
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure XP rewards, challenge difficulty, and scenario simulations.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Financial Challenge</span>
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
            placeholder="Search missions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-slate-200 focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMissions.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-5 space-y-4 hover:border-[#2C3E63] transition-colors flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-semibold">
                  {m.category}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingMission(m)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Edit Mission"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleArchiveMission(m.id, m.title)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                    title="Archive Mission"
                  >
                    <Archive className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{m.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{m.description}</p>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <span
                  className={`px-2 py-0.5 rounded-md font-semibold ${
                    m.difficulty === 'Beginner'
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : m.difficulty === 'Intermediate'
                      ? 'bg-amber-500/15 text-amber-300'
                      : 'bg-rose-500/15 text-rose-300'
                  }`}
                >
                  {m.difficulty}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{m.durationMin} mins</span>
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1C273E] flex items-center justify-between">
              <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+{m.xpReward} XP Reward</span>
              </div>

              <Link
                href={`/missions/${m.id}`}
                target="_blank"
                className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium hover:underline text-xs"
              >
                <span>Preview</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Create Mission Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Create New Financial Mission</h3>
                <p className="text-xs text-slate-400">Add an interactive scenario or challenge</p>
              </div>
            </div>

            <form onSubmit={handleCreateMission} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mission Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navigating Bank Loan APRs"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as 'Budgeting' | 'Saving' | 'Spending' | 'Safety' | 'Planning')
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="Budgeting">Budgeting</option>
                    <option value="Saving">Saving</option>
                    <option value="Spending">Spending</option>
                    <option value="Safety">Safety</option>
                    <option value="Planning">Planning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) =>
                      setNewDifficulty(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced')
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">XP Reward</label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={newXpReward}
                    onChange={(e) => setNewXpReward(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Duration (min)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Scenario Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the student challenge or dilemma..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
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
                  Add Mission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Mission Modal */}
      {editingMission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Adjust Mission Settings</h3>
                <p className="text-xs text-slate-400">{editingMission.title}</p>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editingMission.title}
                  onChange={(e) =>
                    setEditingMission({ ...editingMission, title: e.target.value })
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
                    value={editingMission.xpReward}
                    onChange={(e) =>
                      setEditingMission({
                        ...editingMission,
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
                    value={editingMission.durationMin}
                    onChange={(e) =>
                      setEditingMission({
                        ...editingMission,
                        durationMin: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingMission.description}
                  onChange={(e) =>
                    setEditingMission({ ...editingMission, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMission(null)}
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
