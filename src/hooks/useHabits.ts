import { useState, useCallback, useEffect } from 'react';
import { Habit, HabitCompletion } from '../types/habit';
import { useLocalStorage } from './useLocalStorage';
import { formatDate } from '../utils/dateUtils';

export const useHabits = () => {
  const [rawHabits, setRawHabits] = useLocalStorage<Habit[]>('habits', []);
  const [rawCompletions, setRawCompletions] = useLocalStorage<HabitCompletion[]>('habit-completions', []);
  
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);

  // Convert raw data from localStorage to proper Date objects
  useEffect(() => {
    const processedHabits = rawHabits.map(habit => ({
      ...habit,
      createdAt: new Date(habit.createdAt)
    }));
    setHabits(processedHabits);
  }, [rawHabits]);

  useEffect(() => {
    const processedCompletions = rawCompletions.map(completion => ({
      ...completion,
      completedAt: new Date(completion.completedAt)
    }));
    setCompletions(processedCompletions);
  }, [rawCompletions]);

  const addHabit = useCallback((habit: Omit<Habit, 'id' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setRawHabits(prev => [...prev, newHabit]);
    return newHabit;
  }, [setRawHabits]);

  const updateHabit = useCallback((id: string, updates: Partial<Habit>) => {
    setRawHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  }, [setRawHabits]);

  const deleteHabit = useCallback((id: string) => {
    setRawHabits(prev => prev.filter(habit => habit.id !== id));
    setRawCompletions(prev => prev.filter(completion => completion.habitId !== id));
  }, [setRawHabits, setRawCompletions]);

  const toggleHabitCompletion = useCallback((habitId: string, date: Date = new Date()) => {
    const dateString = formatDate(date);
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    setRawCompletions(prev => {
      const existingCompletion = prev.find(
        c => c.habitId === habitId && c.date === dateString
      );

      if (existingCompletion) {
        const newCount = existingCompletion.count >= habit.targetCount ? 0 : habit.targetCount;
        return prev.map(c =>
          c.id === existingCompletion.id
            ? { ...c, count: newCount, completedAt: new Date() }
            : c
        );
      } else {
        const newCompletion: HabitCompletion = {
          id: crypto.randomUUID(),
          habitId,
          date: dateString,
          count: habit.targetCount,
          completedAt: new Date(),
        };
        return [...prev, newCompletion];
      }
    });
  }, [habits, setRawCompletions]);

  const updateHabitProgress = useCallback((habitId: string, count: number, date: Date = new Date()) => {
    const dateString = formatDate(date);

    setRawCompletions(prev => {
      const existingCompletion = prev.find(
        c => c.habitId === habitId && c.date === dateString
      );

      if (existingCompletion) {
        return prev.map(c =>
          c.id === existingCompletion.id
            ? { ...c, count, completedAt: new Date() }
            : c
        );
      } else if (count > 0) {
        const newCompletion: HabitCompletion = {
          id: crypto.randomUUID(),
          habitId,
          date: dateString,
          count,
          completedAt: new Date(),
        };
        return [...prev, newCompletion];
      }
      return prev;
    });
  }, [setRawCompletions]);

  return {
    habits,
    completions,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    updateHabitProgress,
  };
};