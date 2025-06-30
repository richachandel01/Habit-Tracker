import React, { useState, useEffect } from 'react';
import { Habit } from '../types/habit';
import { X } from 'lucide-react';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: Omit<Habit, 'id' | 'createdAt'>) => void;
  editingHabit?: Habit | null;
}

interface HabitFormData {
  name: string;
  description: string;
  color: string;
  icon: string;
  frequency: 'daily' | 'weekly';
  targetCount: number;
  isActive: boolean;
}

const HABIT_COLORS = [
  '#8a9d8a', '#d86464', '#a594bd', '#d97d56', '#708270',
  '#c54747', '#8d78a6', '#c8633a', '#5a6a5a', '#a8502f'
];

const HABIT_ICONS = ['💪', '📚', '🏃', '💧', '🧘', '🎯', '✍️', '🎵', '🍎', '💤'];

export const AddHabitModal: React.FC<AddHabitModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingHabit
}) => {
  const [formData, setFormData] = useState<HabitFormData>({
    name: '',
    description: '',
    color: HABIT_COLORS[0],
    icon: HABIT_ICONS[0],
    frequency: 'daily',
    targetCount: 1,
    isActive: true
  });

  useEffect(() => {
    if (editingHabit) {
      setFormData({
        name: editingHabit.name,
        description: editingHabit.description || '',
        color: editingHabit.color,
        icon: editingHabit.icon,
        frequency: editingHabit.frequency,
        targetCount: editingHabit.targetCount,
        isActive: editingHabit.isActive
      });
    } else {
      setFormData({
        name: '',
        description: '',
        color: HABIT_COLORS[0],
        icon: HABIT_ICONS[0],
        frequency: 'daily',
        targetCount: 1,
        isActive: true
      });
    }
  }, [editingHabit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-charcoal-900/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up shadow-xl border border-cream-200">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-charcoal-800">
              {editingHabit ? 'Edit Habit' : 'Add New Habit'}
            </h2>
            <button
              onClick={onClose}
              className="text-charcoal-400 hover:text-charcoal-600 transition-colors p-1 rounded-lg hover:bg-cream-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-3">
                Habit Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-cream-300 rounded-xl focus:ring-2 focus:ring-rosegold-400 focus:border-transparent bg-white/80 text-charcoal-800 placeholder-charcoal-400 transition-all duration-200"
                placeholder="e.g., Drink 8 glasses of water"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-3">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-cream-300 rounded-xl focus:ring-2 focus:ring-rosegold-400 focus:border-transparent bg-white/80 text-charcoal-800 placeholder-charcoal-400 transition-all duration-200 resize-none"
                placeholder="Optional description..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-3">
                Target Count
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.targetCount}
                onChange={(e) => setFormData({ ...formData, targetCount: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 border border-cream-300 rounded-xl focus:ring-2 focus:ring-rosegold-400 focus:border-transparent bg-white/80 text-charcoal-800 transition-all duration-200"
              />
              <p className="text-xs text-charcoal-500 mt-2">How many times per day?</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-4">
                Choose Icon
              </label>
              <div className="grid grid-cols-5 gap-3">
                {HABIT_ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-200 ${
                      formData.icon === icon
                        ? 'bg-rosegold-100 border-2 border-rosegold-400 shadow-sm'
                        : 'bg-cream-100 border-2 border-transparent hover:bg-cream-200 hover:scale-105'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-4">
                Choose Color
              </label>
              <div className="grid grid-cols-5 gap-3">
                {HABIT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-12 h-12 rounded-xl transition-all duration-200 ${
                      formData.color === color
                        ? 'ring-2 ring-rosegold-400 ring-offset-2 ring-offset-white scale-110'
                        : 'hover:scale-110 shadow-sm'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-cream-300 text-charcoal-700 rounded-xl hover:bg-cream-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-rosegold-500 to-rosegold-600 text-white rounded-xl hover:from-rosegold-600 hover:to-rosegold-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                {editingHabit ? 'Update Habit' : 'Add Habit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};