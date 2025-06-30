export interface Habit {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  frequency: 'daily' | 'weekly';
  targetCount: number;
  createdAt: Date;
  isActive: boolean;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD format
  count: number;
  completedAt: Date;
}

export interface HabitStats {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number; // percentage
}