'use client';

import React, { useState, useEffect } from 'react';
import { fetchAdminDataAction } from '@/app/actions/adminActions';
import { AdminAuditLogItem } from '@/lib/types/admin';
import {
  FileText,
  Search,
  Filter,
  ShieldCheck,
  Lock,
  Clock,
  User,
  Database,
  Code,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AdminAuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchActor, setSearchActor] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<AdminAuditLogItem | null>(null);

  useEffect(() => {
    async function loadLogs() {
      try {
        setLoading(true);
        const data = await fetchAdminDataAction();
        setLogs(data.auditLogs);
      } catch (err) {
        console.error('Failed to load audit logs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesActor =
      log.actorEmail.toLowerCase().includes(searchActor.toLowerCase()) ||
      log.action.toLowerCase().includes(searchActor.toLowerCase()) ||
      (log.targetId ? log.targetId.toLowerCase().includes(searchActor.toLowerCase()) : false);
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    return matchesActor && matchesAction;
  });

  const uniqueActions = Array.from(new Set(logs.map((l) => l.action)));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Security & Compliance Audit Trail
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cryptographically verifiable, append-only records of all administrative actions and security events.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Tamper-Proof Logging Active</span>
        </div>
      </div>

      {/* Security Guarantee Banner */}
      <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E2B45] flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center shrink-0 mt-0.5">
          <Lock className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-1">
          <p className="font-semibold text-white">
            PostgreSQL Append-Only Integrity
          </p>
          <p className="text-slate-400 leading-relaxed">
            Every permission modification, account status change, and role upgrade is written to the{' '}
            <code className="text-violet-300 bg-slate-900 px-1 py-0.5 rounded">admin_audit_logs</code> table.
            SQL triggers prevent UPDATE and DELETE operations on this table, guaranteeing an immutable forensic history.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E2B45] flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by actor email, action, or target..."
            value={searchActor}
            onChange={(e) => setSearchActor(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#080D1A] border border-[#1E2B45] text-xs text-slate-200 focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            <option value="all">All Actions</option>
            {uniqueActions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-2xl bg-[#0F172A] border border-[#1E2B45] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#090F1E] text-slate-400 font-semibold uppercase tracking-wider border-b border-[#1E2B45]">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Target Type & ID</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A253C]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-500">
                    Loading audit trail...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-500">
                    No audit records matching search filter.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const isPromotion = log.action.includes('PROMOTE');
                  const isRevocation = log.action.includes('REVOKE') || log.action.includes('SUSPEND');

                  return (
                    <tr key={log.id} className="hover:bg-[#141E34]/50 transition-colors">
                      {/* Timestamp */}
                      <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{new Date(log.createdAt).toLocaleString()}</span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                            isPromotion
                              ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                              : isRevocation
                              ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                              : 'bg-violet-500/15 text-violet-300 border-violet-500/30'
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>

                      {/* Actor */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-200">{log.actorEmail}</span>
                      </td>

                      {/* Target */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] uppercase font-mono">
                            {log.targetType}
                          </span>
                          <span className="font-mono text-slate-300 text-[11px] truncate max-w-[120px]">
                            {log.targetId}
                          </span>
                        </div>
                      </td>

                      {/* Details View */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          Inspect JSON
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Inspection Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0F172A] border border-[#1E2B45] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-violet-400">
                <Code className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Audit Entry Payload
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">ID: {selectedLog.id}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#080D1A] border border-[#1E2B45] overflow-x-auto text-xs font-mono text-emerald-400 max-h-72">
              <pre>{JSON.stringify(selectedLog, null, 2)}</pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
