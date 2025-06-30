import React from 'react';
import { Habit, HabitCompletion } from '../types/habit';
import { getHabitStats, isHabitCompletedToday, getTodayProgress } from '../utils/habitUtils';
import { CheckCircle2, Circle, Plus, Minus, Flame, Target, TrendingUp } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  completions: HabitCompletion[];
  onToggle: (habitId: string) => void;
  onUpdateProgress: (habitId: string, count: number) => void;
  onEdit: (habit: Habit) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  completions,
  onToggle,
  onUpdateProgress,
  onEdit,
}) => {
  const stats = getHabitStats(habit, completions);
  const isCompleted = isHabitCompletedToday(habit, completions);
  const todayProgress = getTodayProgress(habit, completions);
  const progressPercentage = (todayProgress / habit.targetCount) * 100;

  const handleIncrement = () => {
    if (todayProgress < habit.targetCount) {
      onUpdateProgress(habit.id, todayProgress + 1);
    }
  };

  const handleDecrement = () => {
    if (todayProgress > 0) {
      onUpdateProgress(habit.id, todayProgress - 1);
    }
  };

  return (
    <div 
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
        isCompleted ? 'border-sage-300 bg-sage-50/50' : 'border-cream-200'
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-semibold shadow-sm`}
              style={{ backgroundColor: habit.color }}
            >
              {habit.icon}
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-800 text-lg">{habit.name}</h3>
              {habit.description && (
                <p className="text-charcoal-600 text-sm mt-1">{habit.description}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => onEdit(habit)}
            className="text-charcoal-400 hover:text-charcoal-600 transition-colors p-1 rounded-lg hover:bg-cream-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>

        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-charcoal-700">
              Today's Progress
            </span>
            <span className="text-sm text-charcoal-600 font-medium">
              {todayProgress} / {habit.targetCount}
            </span>
          </div>
          
          <div className="w-full bg-cream-200 rounded-full h-2.5 mb-4">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${
                isCompleted ? 'bg-gradient-to-r from-sage-400 to-sage-500' : 'bg-gradient-to-r from-rosegold-400 to-rosegold-500'
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>

          {/* Progress Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleDecrement}
                disabled={todayProgress === 0}
                className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center hover:bg-cream-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                <Minus className="w-4 h-4 text-charcoal-600" />
              </button>
              
              <button
                onClick={handleIncrement}
                disabled={todayProgress >= habit.targetCount}
                className="w-9 h-9 rounded-full bg-rosegold-100 flex items-center justify-center hover:bg-rosegold-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                <Plus className="w-4 h-4 text-rosegold-600" />
              </button>
            </div>

            <button
              onClick={() => onToggle(habit.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                isCompleted
                  ? 'bg-sage-100 text-sage-700 hover:bg-sage-200'
                  : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
              <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cream-200">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Flame className="w-4 h-4 text-rosegold-500 mr-1" />
              <span className="text-lg font-semibold text-charcoal-800">{stats.currentStreak}</span>
            </div>
            <p className="text-xs text-charcoal-600 font-medium">Current Streak</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Target className="w-4 h-4 text-sage-500 mr-1" />
              <span className="text-lg font-semibold text-charcoal-800">{stats.totalCompletions}</span>
            </div>
            <p className="text-xs text-charcoal-600 font-medium">Total</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-lavender-500 mr-1" />
              <span className="text-lg font-semibold text-charcoal-800">{stats.completionRate}%</span>
            </div>
            <p className="text-xs text-charcoal-600 font-medium">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};