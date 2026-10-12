import { UserRole, AdminUserItem, AdminAuditLogItem, AdminStats } from '../types/admin';

export const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || 'owner@moneyquest.uz';

// Seed users for administration system (works seamlessly both with and without Supabase)
let mockUsersList: AdminUserItem[] = [
  {
    id: 'user-superadmin-01',
    displayName: 'Project Owner (Super Admin)',
    email: SUPER_ADMIN_EMAIL,
    role: 'super_admin',
    isSuspended: false,
    totalXP: 2400,
    currentLevel: 5,
    streakDays: 45,
    createdAt: '2026-08-01T10:00:00Z',
  },
  {
    id: 'user-admin-01',
    displayName: 'Akmal Rakhimov (Content Admin)',
    email: 'admin@moneyquest.uz',
    role: 'admin',
    isSuspended: false,
    totalXP: 1250,
    currentLevel: 4,
    streakDays: 14,
    createdAt: '2026-09-10T12:30:00Z',
  },
  {
    id: 'user-student-01',
    displayName: 'Jasur Temirov',
    email: 'jasur@moneyquest.uz',
    role: 'user',
    isSuspended: false,
    totalXP: 240,
    currentLevel: 2,
    streakDays: 3,
    createdAt: '2026-10-01T08:15:00Z',
  },
  {
    id: 'user-student-02',
    displayName: 'Malika Karimova',
    email: 'malika@moneyquest.uz',
    role: 'user',
    isSuspended: false,
    totalXP: 510,
    currentLevel: 3,
    streakDays: 7,
    createdAt: '2026-10-04T14:20:00Z',
  },
  {
    id: 'user-student-03',
    displayName: 'Timur Alimov',
    email: 'timur@moneyquest.uz',
    role: 'user',
    isSuspended: false,
    totalXP: 680,
    currentLevel: 3,
    streakDays: 9,
    createdAt: '2026-10-05T09:40:00Z',
  },
];

let mockAuditLogs: AdminAuditLogItem[] = [
  {
    id: 'log-001',
    actorEmail: SUPER_ADMIN_EMAIL,
    action: 'INITIALIZE_SUPER_ADMIN',
    targetType: 'SYSTEM',
    targetId: 'root',
    details: { message: 'Super Admin owner account securely initialized' },
    createdAt: '2026-10-01T00:00:00Z',
  },
  {
    id: 'log-002',
    actorEmail: SUPER_ADMIN_EMAIL,
    action: 'PROMOTE_TO_ADMIN',
    targetType: 'USER',
    targetId: 'user-admin-01',
    details: { assignedRole: 'admin', reason: 'Educational content moderation' },
    createdAt: '2026-10-05T11:20:00Z',
  },
];

export async function getAdminUsers(): Promise<AdminUserItem[]> {
  return [...mockUsersList];
}

export async function getAdminStats(): Promise<AdminStats> {
  const totalUsers = mockUsersList.length;
  const activeUsers = mockUsersList.filter((u) => !u.isSuspended).length;
  const adminCount = mockUsersList.filter((u) => u.role === 'admin' || u.role === 'super_admin').length;
  const totalXPDistributed = mockUsersList.reduce((acc, u) => acc + u.totalXP, 0);

  return {
    totalUsers,
    activeUsers,
    adminCount,
    completedMissionsCount: 18,
    completedLessonsCount: 34,
    totalXPDistributed,
  };
}

export async function getAuditLogs(): Promise<AdminAuditLogItem[]> {
  return [...mockAuditLogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function logAdminAudit(
  actorEmail: string,
  action: string,
  targetType: string,
  targetId: string,
  details?: Record<string, unknown>
): Promise<void> {
  const newLog: AdminAuditLogItem = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    actorEmail,
    action,
    targetType,
    targetId,
    details,
    createdAt: new Date().toISOString(),
  };
  mockAuditLogs.push(newLog);
}

/**
 * Promote an eligible user to Admin.
 * Strictly restricted to Super Admin.
 */
export async function promoteUserToAdmin(
  actorRole: UserRole,
  actorEmail: string,
  targetUserId: string
): Promise<{ success: boolean; message: string }> {
  if (actorRole !== 'super_admin') {
    throw new Error('Unauthorized: Only the Super Admin (Project Owner) can promote users to Admin.');
  }

  const user = mockUsersList.find((u) => u.id === targetUserId);
  if (!user) {
    throw new Error('Target user not found.');
  }

  if (user.role === 'super_admin') {
    throw new Error('User is already the Super Admin.');
  }

  if (user.role === 'admin') {
    return { success: true, message: 'User is already an Administrator.' };
  }

  user.role = 'admin';

  await logAdminAudit(actorEmail, 'PROMOTE_TO_ADMIN', 'USER', targetUserId, {
    targetEmail: user.email,
  });

  return { success: true, message: `User ${user.displayName} has been promoted to Administrator.` };
}

/**
 * Revoke Admin privileges.
 * Strictly restricted to Super Admin.
 * The original Super Admin CANNOT be demoted or removed!
 */
export async function revokeAdminRole(
  actorRole: UserRole,
  actorEmail: string,
  targetUserId: string
): Promise<{ success: boolean; message: string }> {
  if (actorRole !== 'super_admin') {
    throw new Error('Unauthorized: Only the Super Admin can revoke administrator privileges.');
  }

  const user = mockUsersList.find((u) => u.id === targetUserId);
  if (!user) {
    throw new Error('Target user not found.');
  }

  // CRITICAL IMMUTABILITY CHECK
  if (user.role === 'super_admin') {
    throw new Error('CRITICAL SECURITY VIOLATION: The Super Admin (Project Owner) cannot be demoted or revoked!');
  }

  user.role = 'user';

  await logAdminAudit(actorEmail, 'REVOKE_ADMIN', 'USER', targetUserId, {
    targetEmail: user.email,
  });

  return { success: true, message: `Admin privileges for ${user.displayName} have been revoked.` };
}

/**
 * Suspend a user account.
 * Super Admin cannot be suspended under any circumstances.
 */
export async function suspendUserAccount(
  actorRole: UserRole,
  actorEmail: string,
  targetUserId: string
): Promise<{ success: boolean; message: string }> {
  if (actorRole !== 'super_admin') {
    throw new Error('Unauthorized: Only the Super Admin can suspend accounts.');
  }

  const user = mockUsersList.find((u) => u.id === targetUserId);
  if (!user) {
    throw new Error('Target user not found.');
  }

  // CRITICAL IMMUTABILITY CHECK
  if (user.role === 'super_admin') {
    throw new Error('CRITICAL SECURITY VIOLATION: The Super Admin account cannot be suspended!');
  }

  user.isSuspended = true;

  await logAdminAudit(actorEmail, 'SUSPEND_ACCOUNT', 'USER', targetUserId, {
    targetEmail: user.email,
  });

  return { success: true, message: `Account for ${user.displayName} has been suspended.` };
}

/**
 * Restore a suspended account.
 */
export async function restoreUserAccount(
  actorRole: UserRole,
  actorEmail: string,
  targetUserId: string
): Promise<{ success: boolean; message: string }> {
  if (actorRole !== 'super_admin') {
    throw new Error('Unauthorized: Only the Super Admin can restore suspended accounts.');
  }

  const user = mockUsersList.find((u) => u.id === targetUserId);
  if (!user) {
    throw new Error('Target user not found.');
  }

  user.isSuspended = false;

  await logAdminAudit(actorEmail, 'RESTORE_ACCOUNT', 'USER', targetUserId, {
    targetEmail: user.email,
  });

  return { success: true, message: `Account for ${user.displayName} has been restored to active status.` };
}
