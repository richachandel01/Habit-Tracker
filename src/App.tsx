import { useState } from 'react';
import { Plus, Calendar, BarChart3 } from 'lucide-react';
import { useHabits } from './hooks/useHabits';
import { HabitCard } from './components/HabitCard';
import { AddHabitModal } from './components/AddHabitModal';
import { WeeklyCalendar } from './components/WeeklyCalendar';
import { StatsOverview } from './components/StatsOverview';
import { Habit } from './types/habit';
import * as habitUtils from './utils/habitUtils';

type ViewMode = 'today' | 'calendar' | 'stats';

function App() {
  const {
    habits,
    completions,
    addHabit,
    updateHabit,
    toggleHabitCompletion,
    updateHabitProgress
  } = useHabits();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('today');

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const handleSaveHabit = (habitData: Omit<Habit, 'id' | 'createdAt'>) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, habitData);
      setEditingHabit(null);
    } else {
      addHabit(habitData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingHabit(null);
  };

  const activeHabits = habits.filter(h => h.isActive);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-rosegold-400 to-rosegold-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <h1 className="text-xl font-semibold text-charcoal-800">Habit Tracker</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Tabs */}
              <div className="flex bg-cream-100 rounded-xl p-1 shadow-inner">
                <button
                  onClick={() => setViewMode('today')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === 'today'
                      ? 'bg-white text-charcoal-800 shadow-sm'
                      : 'text-charcoal-600 hover:text-charcoal-800 hover:bg-white/50'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === 'calendar'
                      ? 'bg-white text-charcoal-800 shadow-sm'
                      : 'text-charcoal-600 hover:text-charcoal-800 hover:bg-white/50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('stats')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === 'stats'
                      ? 'bg-white text-charcoal-800 shadow-sm'
                      : 'text-charcoal-600 hover:text-charcoal-800 hover:bg-white/50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-rosegold-500 to-rosegold-600 text-white px-5 py-2.5 rounded-xl hover:from-rosegold-600 hover:to-rosegold-700 transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Add Habit</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'today' && (
          <>
            <StatsOverview habits={habits} completions={completions} />
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-charcoal-800 mb-6">Today's Habits</h2>
              
              {activeHabits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeHabits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      completions={completions}
                      onToggle={toggleHabitCompletion}
                      onUpdateProgress={updateHabitProgress}
                      onEdit={handleEditHabit}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-cream-200 to-cream-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Plus className="w-10 h-10 text-charcoal-400" />
                  </div>
                  <h3 className="text-xl font-medium text-charcoal-800 mb-3">No habits yet</h3>
                  <p className="text-charcoal-600 mb-8 max-w-md mx-auto">
                    Start building better habits by adding your first one. Small steps lead to big changes.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-rosegold-500 to-rosegold-600 text-white px-8 py-3 rounded-xl hover:from-rosegold-600 hover:to-rosegold-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Add Your First Habit
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {viewMode === 'calendar' && (
          <WeeklyCalendar
            habits={habits}
            completions={completions}
            onToggleCompletion={toggleHabitCompletion}
          />
        )}

        {viewMode === 'stats' && (
          <div className="space-y-8">
            <StatsOverview habits={habits} completions={completions} />
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-cream-200 p-8">
              <h2 className="text-xl font-semibold text-charcoal-800 mb-8">Habit Statistics</h2>
              
              {activeHabits.length > 0 ? (
                <div className="space-y-6">
                  {activeHabits.map((habit) => {
                    const stats = habitUtils.getHabitStats(habit, completions);
                    return (
                      <div key={habit.id} className="flex items-center justify-between p-6 bg-cream-50 rounded-xl border border-cream-200">
                        <div className="flex items-center space-x-4">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm"
                            style={{ backgroundColor: habit.color }}
                          >
                            {habit.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-charcoal-800">{habit.name}</h3>
                            <p className="text-sm text-charcoal-600">Target: {habit.targetCount} per day</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-8 text-center">
                          <div>
                            <div className="text-lg font-semibold text-charcoal-800">{stats.currentStreak}</div>
                            <div className="text-xs text-charcoal-600 font-medium">Current Streak</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-charcoal-800">{stats.longestStreak}</div>
                            <div className="text-xs text-charcoal-600 font-medium">Best Streak</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-charcoal-800">{stats.totalCompletions}</div>
                            <div className="text-xs text-charcoal-600 font-medium">Total</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-charcoal-800">{stats.completionRate}%</div>
                            <div className="text-xs text-charcoal-600 font-medium">Success Rate</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-charcoal-500">
                  <p>No habits to show statistics for yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Habit Modal */}
      <AddHabitModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveHabit}
        editingHabit={editingHabit}
      />
    </div>
  );
}

export default App;