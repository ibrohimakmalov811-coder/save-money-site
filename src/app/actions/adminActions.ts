'use server';

import {
  getAdminUsers,
  getAdminStats,
  getAuditLogs,
  promoteUserToAdmin,
  revokeAdminRole,
  suspendUserAccount,
  restoreUserAccount,
} from '@/lib/server/adminService';
import { UserRole } from '@/lib/types/admin';

export async function fetchAdminDataAction() {
  const [users, stats, auditLogs] = await Promise.all([
    getAdminUsers(),
    getAdminStats(),
    getAuditLogs(),
  ]);
  return { users, stats, auditLogs };
}

export async function promoteToAdminServerAction(
  actorRole: UserRole,
  actorEmail: string,
  targetUserId: string
) {
  try {
    return await promoteUserToAdmin(actorRole, actorEmail, targetUserId);
  } catch (err: unknown) {
    return { success: false, message: (err as Error).message };
  }
}

export async function revokeAdminServerAction(
  actorRole: UserRole,
  actorEmail: string,
  targetUserId: string
) {
  try {
    return await revokeAdminRole(actorRole, actorEmail, targetUserId);
  } catch (err: unknown) {
    return { success: false, message: (err as Error).message };
  }
}

export async function suspendUserServerAction(
  actorRole: UserRole,
  actorEmail: string,
  targetUserId: string
) {
  try {
    return await suspendUserAccount(actorRole, actorEmail, targetUserId);
  } catch (err: unknown) {
    return { success: false, message: (err as Error).message };
  }
}

export async function restoreUserServerAction(
  actorRole: UserRole,
  actorEmail: string,
  targetUserId: string
) {
  try {
    return await restoreUserAccount(actorRole, actorEmail, targetUserId);
  } catch (err: unknown) {
    return { success: false, message: (err as Error).message };
  }
}
