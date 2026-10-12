export type UserRole = 'user' | 'admin' | 'super_admin';

export interface AdminUserItem {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  isSuspended: boolean;
  totalXP: number;
  currentLevel: number;
  streakDays: number;
  createdAt: string;
}

export interface AdminAuditLogItem {
  id: string;
  actorId?: string;
  actorEmail: string;
  action: string;
  targetType: string;
  targetId?: string;
  details?: Record<string, unknown>;
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  adminCount: number;
  completedMissionsCount: number;
  completedLessonsCount: number;
  totalXPDistributed: number;
}
