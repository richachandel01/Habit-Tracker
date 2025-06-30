import { Habit, HabitCompletion, HabitStats } from '../types/habit';
import { formatDate, isDateToday } from './dateUtils';

export const calculateStreak = (completions: HabitCompletion[], habit: Habit): number => {
  if (completions.length === 0) return 0;

  const sortedCompletions = completions
    .filter(c => c.count >= habit.targetCount)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (sortedCompletions.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  let currentDate = new Date(today);

  // If today is not completed, start from yesterday
  const todayCompletion = sortedCompletions.find(c => isDateToday(c.date));
  if (!todayCompletion) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  for (let i = 0; i < sortedCompletions.length; i++) {
    const completionDate = formatDate(currentDate);
    const completion = sortedCompletions.find(c => c.date === completionDate);

    if (completion && completion.count >= habit.targetCount) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

export const calculateLongestStreak = (completions: HabitCompletion[], habit: Habit): number => {
  if (completions.length === 0) return 0;

  const sortedCompletions = completions
    .filter(c => c.count >= habit.targetCount)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let longestStreak = 0;
  let currentStreak = 0;
  let lastDate: Date | null = null;

  for (const completion of sortedCompletions) {
    const completionDate = new Date(completion.date);

    if (lastDate) {
      const daysDiff = Math.floor((completionDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }

    lastDate = completionDate;
  }

  return Math.max(longestStreak, currentStreak);
};

export const calculateCompletionRate = (completions: HabitCompletion[], habit: Habit): number => {
  const daysSinceCreation = Math.floor(
    (new Date().getTime() - habit.createdAt.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  const completedDays = completions.filter(c => c.count >= habit.targetCount).length;
  
  return daysSinceCreation > 0 ? Math.round((completedDays / daysSinceCreation) * 100) : 0;
};

export const getHabitStats = (habit: Habit, completions: HabitCompletion[]): HabitStats => {
  const habitCompletions = completions.filter(c => c.habitId === habit.id);

  return {
    habitId: habit.id,
    currentStreak: calculateStreak(habitCompletions, habit),
    longestStreak: calculateLongestStreak(habitCompletions, habit),
    totalCompletions: habitCompletions.filter(c => c.count >= habit.targetCount).length,
    completionRate: calculateCompletionRate(habitCompletions, habit),
  };
};

export const isHabitCompletedToday = (habit: Habit, completions: HabitCompletion[]): boolean => {
  const today = formatDate(new Date());
  const todayCompletion = completions.find(
    c => c.habitId === habit.id && c.date === today
  );
  
  return todayCompletion ? todayCompletion.count >= habit.targetCount : false;
};

export const getTodayProgress = (habit: Habit, completions: HabitCompletion[]): number => {
  const today = formatDate(new Date());
  const todayCompletion = completions.find(
    c => c.habitId === habit.id && c.date === today
  );
  
  return todayCompletion ? todayCompletion.count : 0;
};