import React from 'react';
import { Habit, HabitCompletion } from '../types/habit';
import { getHabitStats } from '../utils/habitUtils';
import { TrendingUp, Target, Flame, Calendar } from 'lucide-react';

interface StatsOverviewProps {
  habits: Habit[];
  completions: HabitCompletion[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ habits, completions }) => {
  const activeHabits = habits.filter(h => h.isActive);
  
  const totalCompletions = completions.filter(c => {
    const habit = habits.find(h => h.id === c.habitId);
    return habit && c.count >= habit.targetCount;
  }).length;

  const longestStreak = activeHabits.length > 0
    ? Math.max(
        ...activeHabits.map(habit => {
          const stats = getHabitStats(habit, completions);
          return stats.longestStreak;
        })
      )
    : 0;

  const todayCompletions = completions.filter(c => {
    const today = new Date().toISOString().split('T')[0];
    const habit = habits.find(h => h.id === c.habitId);
    return c.date === today && habit && c.count >= habit.targetCount;
  }).length;

  const stats = [
    {
      label: 'Active Habits',
      value: activeHabits.length,
      icon: Target,
      color: 'text-sage-600',
      bgColor: 'bg-sage-100'
    },
    {
      label: 'Today Completed',
      value: `${todayCompletions}/${activeHabits.length}`,
      icon: Calendar,
      color: 'text-blush-600',
      bgColor: 'bg-blush-100'
    },
    {
      label: 'Total Completions',
      value: totalCompletions,
      icon: TrendingUp,
      color: 'text-lavender-600',
      bgColor: 'bg-lavender-100'
    },
    {
      label: 'Best Streak',
      value: longestStreak,
      icon: Flame,
      color: 'text-rosegold-600',
      bgColor: 'bg-rosegold-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-cream-200 p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal-600 mb-2">{stat.label}</p>
              <p className="text-2xl font-semibold text-charcoal-800">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center shadow-sm`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};