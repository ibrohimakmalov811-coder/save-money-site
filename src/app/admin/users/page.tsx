'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import {
  fetchAdminDataAction,
  promoteToAdminServerAction,
  revokeAdminServerAction,
  suspendUserServerAction,
  restoreUserServerAction,
} from '@/app/actions/adminActions';
import { AdminUserItem } from '@/lib/types/admin';
import {
  Search,
  Filter,
  Shield,
  Crown,
  User,
  AlertTriangle,
  CheckCircle2,
  Lock,
  UserX,
  UserCheck,
  ChevronRight,
  Flame,
  Sparkles,
  Info,
} from 'lucide-react';

export default function AdminUsersPage() {
  const { state } = useApp();
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Confirmation modal state
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);
  const [modalAction, setModalAction] = useState<
    'promote' | 'revoke' | 'suspend' | 'restore' | 'view' | null
  >(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  const currentUserRole = state.user.role;
  const isSuperAdmin = currentUserRole === 'super_admin';

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminDataAction();
      setUsers(data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleExecuteAction = async () => {
    if (!selectedUser || !modalAction) return;

    setActionLoading(true);
    setFeedback(null);

    let res: { success: boolean; message: string };

    try {
      if (modalAction === 'promote') {
        res = await promoteToAdminServerAction(
          currentUserRole,
          state.user.email,
          selectedUser.id
        );
      } else if (modalAction === 'revoke') {
        res = await revokeAdminServerAction(
          currentUserRole,
          state.user.email,
          selectedUser.id
        );
      } else if (modalAction === 'suspend') {
        res = await suspendUserServerAction(
          currentUserRole,
          state.user.email,
          selectedUser.id
        );
      } else if (modalAction === 'restore') {
        res = await restoreUserServerAction(
          currentUserRole,
          state.user.email,
          selectedUser.id
        );
      } else {
        setActionLoading(false);
        setModalAction(null);
        return;
      }

      if (res.success) {
        setFeedback({ type: 'success', message: res.message });
        await loadUsers();
      } else {
        setFeedback({ type: 'error', message: res.message });
      }
    } catch (err: unknown) {
      setFeedback({ type: 'error', message: (err as Error).message || 'Action failed.' });
    } finally {
      setActionLoading(false);
      setModalAction(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !u.isSuspended) ||
      (statusFilter === 'suspended' && u.isSuspended);

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            User Directory & Access Control
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage student learning accounts, assign content administrators, and audit user permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#0F172A] border border-[#1E2B45] text-slate-300">
            Total Users: <strong className="text-white">{filteredUsers.length}</strong>
          </span>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center justify-between ${
            feedback.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs opacity-70 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E2B45] flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by student name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Role:</span>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-slate-200 focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin (Owner)</option>
            <option value="admin">Admin</option>
            <option value="user">Student User</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-slate-200 focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-[#0F172A] border border-[#1E2B45] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#090F1E] text-slate-400 font-semibold uppercase tracking-wider border-b border-[#1E2B45]">
              <tr>
                <th className="py-3.5 px-4">User Details</th>
                <th className="py-3.5 px-4">Role & Status</th>
                <th className="py-3.5 px-4">Progress / XP</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A253C]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-500">
                    Loading directory...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-500">
                    No users found matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isAccountSuperAdmin = u.role === 'super_admin';
                  const isAccountAdmin = u.role === 'admin';

                  return (
                    <tr key={u.id} className="hover:bg-[#141E34]/50 transition-colors">
                      {/* Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-sky-400 p-0.5 shrink-0">
                            <div className="w-full h-full bg-[#0B1020] rounded-[10px] flex items-center justify-center font-bold text-white text-[11px]">
                              {u.displayName.substring(0, 2).toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-white flex items-center gap-1.5">
                              <span>{u.displayName}</span>
                              {isAccountSuperAdmin && (
                                <span title="Project Owner">
                                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                                </span>
                              )}
                            </p>
                            <p className="text-[11px] text-slate-400">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role & Status */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1 items-start">
                          {isAccountSuperAdmin ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30 text-[11px]">
                              <Crown className="w-3 h-3" />
                              <span>Super Admin</span>
                            </span>
                          ) : isAccountAdmin ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 font-semibold border border-sky-500/30 text-[11px]">
                              <Shield className="w-3 h-3" />
                              <span>Admin</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700 text-[11px]">
                              <User className="w-3 h-3" />
                              <span>Student</span>
                            </span>
                          )}

                          {u.isSuspended ? (
                            <span className="inline-flex items-center gap-1 text-[10px] text-rose-400 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                              <span>Suspended</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Active</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Gamification Stats */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1 text-violet-300 font-bold text-[11px]">
                            <Sparkles className="w-3 h-3 text-violet-400" />
                            <span>{u.totalXP.toLocaleString()} XP</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span>Lv. {u.currentLevel}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 text-amber-400">
                              <Flame className="w-3 h-3 fill-amber-400" />
                              <span>{u.streakDays}d streak</span>
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Joined Date */}
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isAccountSuperAdmin ? (
                            <span
                              className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-semibold flex items-center gap-1 cursor-default"
                              title="Original Project Owner account is strictly immutable and cannot be modified."
                            >
                              <Lock className="w-3 h-3" />
                              <span>Immutable Owner</span>
                            </span>
                          ) : (
                            <>
                              {/* Promotion / Revocation (Super Admin only) */}
                              {isSuperAdmin && (
                                <>
                                  {isAccountAdmin ? (
                                    <button
                                      onClick={() => {
                                        setSelectedUser(u);
                                        setModalAction('revoke');
                                      }}
                                      className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-semibold transition-colors cursor-pointer"
                                    >
                                      Demote
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setSelectedUser(u);
                                        setModalAction('promote');
                                      }}
                                      className="px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 text-[11px] font-semibold transition-colors cursor-pointer"
                                    >
                                      Promote to Admin
                                    </button>
                                  )}

                                  {/* Suspend / Restore */}
                                  {u.isSuspended ? (
                                    <button
                                      onClick={() => {
                                        setSelectedUser(u);
                                        setModalAction('restore');
                                      }}
                                      className="p-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition-colors cursor-pointer"
                                      title="Restore Account"
                                    >
                                      <UserCheck className="w-3.5 h-3.5" />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setSelectedUser(u);
                                        setModalAction('suspend');
                                      }}
                                      className="p-1 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                                      title="Suspend Account"
                                    >
                                      <UserX className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </>
                              )}

                              <button
                                onClick={() => {
                                  setSelectedUser(u);
                                  setModalAction('view');
                                }}
                                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                                title="View Details"
                              >
                                <Info className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation & View Modals */}
      {modalAction && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-6 space-y-5 shadow-2xl">
            {modalAction === 'promote' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Promote to Administrator</h3>
                    <p className="text-xs text-slate-400">Grant content management permissions</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Are you sure you want to promote <strong className="text-white">{selectedUser.displayName}</strong> ({selectedUser.email}) to <strong className="text-sky-400">Administrator</strong>? They will be able to manage courses, lessons, and financial missions.
                </p>
              </>
            )}

            {modalAction === 'revoke' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Revoke Admin Role</h3>
                    <p className="text-xs text-slate-400">Demote user back to student</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Are you sure you want to revoke administrative privileges for <strong className="text-white">{selectedUser.displayName}</strong>? They will return to standard student permissions.
                </p>
              </>
            )}

            {modalAction === 'suspend' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <UserX className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Suspend Account</h3>
                    <p className="text-xs text-slate-400">Temporarily deactivate user access</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Suspend account for <strong className="text-white">{selectedUser.displayName}</strong>? The user will not be able to log in or earn XP until restored.
                </p>
              </>
            )}

            {modalAction === 'restore' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Restore Account</h3>
                    <p className="text-xs text-slate-400">Reactivate user access</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Restore active status for <strong className="text-white">{selectedUser.displayName}</strong>?
                </p>
              </>
            )}

            {modalAction === 'view' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedUser.displayName}</h3>
                    <p className="text-xs text-slate-400">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#090F1E] border border-[#1E2B45] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account ID:</span>
                    <span className="font-mono text-slate-200">{selectedUser.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Role:</span>
                    <span className="font-semibold text-violet-400 uppercase">{selectedUser.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Experience:</span>
                    <span className="font-bold text-emerald-400">{selectedUser.totalXP} XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Academy Level:</span>
                    <span className="text-white">Level {selectedUser.currentLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Learning Streak:</span>
                    <span className="text-amber-400 font-semibold">{selectedUser.streakDays} days</span>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setModalAction(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                {modalAction === 'view' ? 'Close' : 'Cancel'}
              </button>
              {modalAction !== 'view' && (
                <button
                  onClick={handleExecuteAction}
                  disabled={actionLoading}
                  className={`px-4 py-2 rounded-xl text-white text-xs font-semibold cursor-pointer disabled:opacity-50 ${
                    modalAction === 'revoke' || modalAction === 'suspend'
                      ? 'bg-rose-600 hover:bg-rose-500'
                      : 'bg-violet-600 hover:bg-violet-500'
                  }`}
                >
                  {actionLoading ? 'Processing...' : 'Confirm Action'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
