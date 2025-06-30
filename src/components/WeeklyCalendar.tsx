import React from 'react';
import { Habit, HabitCompletion } from '../types/habit';
import { getWeekDays, getDayName, getDayNumber, formatDate, isDateToday } from '../utils/dateUtils';
import { CheckCircle2, Circle } from 'lucide-react';

interface WeeklyCalendarProps {
  habits: Habit[];
  completions: HabitCompletion[];
  onToggleCompletion: (habitId: string, date: Date) => void;
}

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  habits,
  completions,
  onToggleCompletion
}) => {
  const weekDays = getWeekDays();

  const isHabitCompletedOnDate = (habit: Habit, date: Date): boolean => {
    const dateString = formatDate(date);
    const completion = completions.find(
      c => c.habitId === habit.id && c.date === dateString
    );
    return completion ? completion.count >= habit.targetCount : false;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-cream-200 p-8">
      <h2 className="text-xl font-semibold text-charcoal-800 mb-8">Weekly Overview</h2>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-8 gap-3 mb-6">
            <div className="text-sm font-medium text-charcoal-600 p-3">Habit</div>
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="text-center">
                <div className="text-xs font-medium text-charcoal-600 mb-1">
                  {getDayName(day)}
                </div>
                <div className={`text-lg font-semibold ${
                  isDateToday(formatDate(day)) ? 'text-rosegold-600' : 'text-charcoal-800'
                }`}>
                  {getDayNumber(day)}
                </div>
              </div>
            ))}
          </div>

          {/* Habits */}
          <div className="space-y-4">
            {habits.filter(h => h.isActive).map((habit) => (
              <div key={habit.id} className="grid grid-cols-8 gap-3 items-center">
                <div className="flex items-center space-x-3 p-3 bg-cream-50 rounded-xl">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm shadow-sm"
                    style={{ backgroundColor: habit.color }}
                  >
                    {habit.icon}
                  </div>
                  <span className="text-sm font-medium text-charcoal-800 truncate">
                    {habit.name}
                  </span>
                </div>
                
                {weekDays.map((day) => {
                  const isCompleted = isHabitCompletedOnDate(habit, day);
                  const isToday = isDateToday(formatDate(day));
                  
                  return (
                    <div key={day.toISOString()} className="flex justify-center">
                      <button
                        onClick={() => onToggleCompletion(habit.id, day)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                          isCompleted
                            ? 'text-sage-600 hover:text-sage-700'
                            : 'text-cream-400 hover:text-charcoal-400'
                        } ${isToday ? 'ring-2 ring-rosegold-300 ring-offset-2 ring-offset-white' : ''}`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-7 h-7" />
                        ) : (
                          <Circle className="w-7 h-7" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {habits.filter(h => h.isActive).length === 0 && (
            <div className="text-center py-12 text-charcoal-500">
              <p>No active habits yet. Add your first habit to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};