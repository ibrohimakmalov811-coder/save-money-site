'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateLevel, triggerConfetti } from '@/lib/utils';
import { playSuccessSound, playCoinSound } from '@/lib/sounds';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import { UserRole } from '@/lib/types/admin';

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  isDemo: boolean;
  avatarSeed: string;
}

export interface BudgetCategories {
  food: number;
  transport: number;
  education: number;
  entertainment: number;
  savings: number;
  other: number;
}

export interface BudgetState {
  monthlyIncome: number;
  categories: BudgetCategories;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  category: string;
}

export interface AppState {
  user: UserProfile;
  totalXP: number;
  streakDays: number;
  lastActiveDate: string;
  completedMissions: string[];
  unlockedAchievements: string[];
  completedLessons: string[];
  quizScores: Record<string, number>;
  budget: BudgetState;
  savingsGoals: SavingsGoal[];
}

export interface AppContextType {
  state: AppState;
  levelInfo: ReturnType<typeof calculateLevel>;
  isSupabaseActive: boolean;
  awardXP: (amount: number, reason?: string) => void;
  completeMission: (missionId: string, xpReward: number) => boolean;
  completeLessonQuiz: (lessonId: string, score: number, xpReward: number) => void;
  updateBudget: (budget: BudgetState) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  depositToGoal: (goalId: string, amount: number) => void;
  deleteSavingsGoal: (goalId: string) => void;
  unlockAchievement: (achievementId: string, xpBonus?: number) => void;
  loginAsDemoUser: (name: string, email: string, role?: UserRole) => void;
  switchDemoRole: (newRole: UserRole) => void;
  logoutUser: () => void;
  resetProgress: () => void;
}

const initialDefaultState: AppState = {
  user: {
    id: 'demo-student-01',
    displayName: 'Jasur Temirov',
    email: 'jasur.student@moneyquest.uz',
    role: 'user',
    isDemo: true,
    avatarSeed: 'jasur',
  },
  totalXP: 240,
  streakDays: 3,
  lastActiveDate: '2026-10-11',
  completedMissions: ['build-first-budget'],
  unlockedAchievements: ['first-mission', 'budget-master'],
  completedLessons: ['module-1'],
  quizScores: { 'module-1': 100 },
  budget: {
    monthlyIncome: 1000000,
    categories: {
      food: 400000,
      transport: 150000,
      education: 150000,
      entertainment: 100000,
      savings: 200000,
      other: 0,
    },
  },
  savingsGoals: [
    {
      id: 'goal-laptop',
      name: 'Refurbished Coding Laptop',
      targetAmount: 5000000,
      currentAmount: 2200000,
      monthlyContribution: 400000,
      category: 'Tech & Education',
    },
    {
      id: 'goal-emergency',
      name: '3-Month Safety Buffer',
      targetAmount: 1800000,
      currentAmount: 750000,
      monthlyContribution: 200000,
      category: 'Emergency',
    },
  ],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'moneyquest_app_state_v2';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialDefaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState((prev) => ({
          ...prev,
          ...parsed,
          user: {
            ...prev.user,
            ...(parsed.user || {}),
            role: parsed.user?.role || prev.user.role || 'user',
          },
          budget: parsed.budget || prev.budget,
          savingsGoals: parsed.savingsGoals || prev.savingsGoals,
        }));
      }
    } catch {
      // ignore
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, isLoaded]);

  const levelInfo = calculateLevel(state.totalXP);

  const unlockAchievement = (achievementId: string, xpBonus = 50) => {
    if (state.unlockedAchievements.includes(achievementId)) return;
    setState((prev) => ({
      ...prev,
      unlockedAchievements: [...prev.unlockedAchievements, achievementId],
      totalXP: prev.totalXP + xpBonus,
    }));
    playSuccessSound();
    triggerConfetti();
  };

  const awardXP = (amount: number) => {
    if (amount <= 0) return;
    setState((prev) => ({
      ...prev,
      totalXP: prev.totalXP + amount,
    }));
    playCoinSound();
  };

  const completeMission = (missionId: string, xpReward: number): boolean => {
    if (state.completedMissions.includes(missionId)) {
      return false; // Prevent duplicate claiming
    }
    setState((prev) => {
      const nextCompleted = [...prev.completedMissions, missionId];
      const nextXP = prev.totalXP + xpReward;
      const nextAchievements = [...prev.unlockedAchievements];
      if (!nextAchievements.includes('first-mission')) {
        nextAchievements.push('first-mission');
      }
      return {
        ...prev,
        completedMissions: nextCompleted,
        totalXP: nextXP,
        unlockedAchievements: nextAchievements,
      };
    });
    playSuccessSound();
    triggerConfetti();
    return true;
  };

  const completeLessonQuiz = (lessonId: string, score: number, xpReward: number) => {
    setState((prev) => {
      const isFirstTime = !prev.completedLessons.includes(lessonId);
      const nextCompleted = isFirstTime ? [...prev.completedLessons, lessonId] : prev.completedLessons;
      const nextXP = isFirstTime ? prev.totalXP + xpReward : prev.totalXP;
      const nextAchievements = [...prev.unlockedAchievements];
      if (score === 100 && !nextAchievements.includes('quiz-champion')) {
        nextAchievements.push('quiz-champion');
      }
      return {
        ...prev,
        completedLessons: nextCompleted,
        totalXP: nextXP,
        quizScores: { ...prev.quizScores, [lessonId]: score },
        unlockedAchievements: nextAchievements,
      };
    });
    playSuccessSound();
  };

  const updateBudget = (newBudget: BudgetState) => {
    setState((prev) => {
      const nextAchievements = [...prev.unlockedAchievements];
      if (!nextAchievements.includes('budget-master')) {
        nextAchievements.push('budget-master');
      }
      return {
        ...prev,
        budget: newBudget,
        unlockedAchievements: nextAchievements,
      };
    });
    playCoinSound();
  };

  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id'>) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
    };
    setState((prev) => {
      const nextAchievements = [...prev.unlockedAchievements];
      if (!nextAchievements.includes('savings-starter')) {
        nextAchievements.push('savings-starter');
      }
      return {
        ...prev,
        savingsGoals: [...prev.savingsGoals, newGoal],
        unlockedAchievements: nextAchievements,
      };
    });
    playSuccessSound();
  };

  const depositToGoal = (goalId: string, amount: number) => {
    setState((prev) => ({
      ...prev,
      savingsGoals: prev.savingsGoals.map((g) => {
        if (g.id === goalId) {
          const updated = Math.min(g.targetAmount, g.currentAmount + amount);
          return { ...g, currentAmount: updated };
        }
        return g;
      }),
    }));
    playCoinSound();
  };

  const deleteSavingsGoal = (goalId: string) => {
    setState((prev) => ({
      ...prev,
      savingsGoals: prev.savingsGoals.filter((g) => g.id !== goalId),
    }));
  };

  const loginAsDemoUser = (name: string, email: string, explicitRole?: UserRole) => {
    let resolvedRole: UserRole = explicitRole || 'user';
    if (!explicitRole) {
      if (email.toLowerCase().includes('owner') || email.toLowerCase().includes('superadmin')) {
        resolvedRole = 'super_admin';
      } else if (email.toLowerCase().includes('admin')) {
        resolvedRole = 'admin';
      }
    }

    setState((prev) => ({
      ...prev,
      user: {
        id: `demo-${Date.now()}`,
        displayName: name,
        email: email,
        role: resolvedRole,
        isDemo: true,
        avatarSeed: name.toLowerCase().replace(/\s+/g, '-'),
      },
    }));
  };

  const switchDemoRole = (newRole: UserRole) => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        role: newRole,
      },
    }));
  };

  const logoutUser = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    setState((prev) => ({
      ...prev,
      user: {
        id: 'guest',
        displayName: 'Guest Student',
        email: 'guest@moneyquest.uz',
        role: 'user',
        isDemo: true,
        avatarSeed: 'guest',
      },
    }));
  };

  const resetProgress = () => {
    setState(initialDefaultState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        levelInfo,
        isSupabaseActive: isSupabaseConfigured,
        awardXP,
        completeMission,
        completeLessonQuiz,
        updateBudget,
        addSavingsGoal,
        depositToGoal,
        deleteSavingsGoal,
        unlockAchievement,
        loginAsDemoUser,
        switchDemoRole,
        logoutUser,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
