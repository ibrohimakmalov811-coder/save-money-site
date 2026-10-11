import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format amounts in Uzbekistani Som (UZS) with space separators
 * Example: 1250000 -> "1 250 000 UZS"
 */
export function formatUZS(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0 UZS';
  }
  const rounded = Math.round(amount);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formatted} UZS`;
}

/**
 * Clean numeric string parsing to safe finite non-negative number
 */
export function parseSafeNumber(val: string | number, min = 0, max = 1_000_000_000): number {
  if (typeof val === 'number') {
    if (isNaN(val) || !isFinite(val)) return min;
    return Math.max(min, Math.min(max, val));
  }
  const clean = val.replace(/[^0-9-]/g, '');
  const num = parseInt(clean, 10);
  if (isNaN(num)) return min;
  return Math.max(min, Math.min(max, num));
}

export interface LevelInfo {
  level: number;
  titleKey: string;
  defaultTitle: string;
  minXP: number;
  nextLevelXP: number;
  progressPercent: number;
}

export function calculateLevel(xp: number): LevelInfo {
  const safeXP = Math.max(0, xp);
  if (safeXP < 200) {
    return {
      level: 1,
      titleKey: 'level_1',
      defaultTitle: 'Money Beginner',
      minXP: 0,
      nextLevelXP: 200,
      progressPercent: Math.min(100, Math.round((safeXP / 200) * 100)),
    };
  } else if (safeXP < 500) {
    return {
      level: 2,
      titleKey: 'level_2',
      defaultTitle: 'Budget Explorer',
      minXP: 200,
      nextLevelXP: 500,
      progressPercent: Math.min(100, Math.round(((safeXP - 200) / 300) * 100)),
    };
  } else if (safeXP < 1000) {
    return {
      level: 3,
      titleKey: 'level_3',
      defaultTitle: 'Saving Strategist',
      minXP: 500,
      nextLevelXP: 1000,
      progressPercent: Math.min(100, Math.round(((safeXP - 500) / 500) * 100)),
    };
  } else if (safeXP < 2000) {
    return {
      level: 4,
      titleKey: 'level_4',
      defaultTitle: 'Smart Spender',
      minXP: 1000,
      nextLevelXP: 2000,
      progressPercent: Math.min(100, Math.round(((safeXP - 1000) / 1000) * 100)),
    };
  } else {
    return {
      level: 5,
      titleKey: 'level_5',
      defaultTitle: 'Financial Master',
      minXP: 2000,
      nextLevelXP: 2000,
      progressPercent: 100,
    };
  }
}

/**
 * Trigger confetti celebration effect safely in browser
 */
export async function triggerConfetti() {
  if (typeof window === 'undefined') return;
  try {
    const confetti = (await import('canvas-confetti')).default;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#38BDF8', '#34D399', '#FBBF24'],
    });
  } catch {
    // Graceful fallback if canvas-confetti is unavailable
  }
}
