'use client';

import { useState } from 'react';
import { exercises } from '@/lib/exercises';
import ExercisePlayer from '@/components/ExercisePlayer';
import SettingsModal from '@/components/SettingsModal';
import { Lock, Play, Settings } from 'lucide-react';

export default function AppPage() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  if (selectedExercise) {
    const exercise = exercises.find(e => e.id === selectedExercise);
    if (exercise) {
      return (
        <ExercisePlayer
          exercise={exercise}
          onComplete={() => {
            alert('Great job! Exercise complete! 🎉');
            setSelectedExercise(null);
          }}
          onExit={() => setSelectedExercise(null)}
        />
      );
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">EyeZen</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSettings(true)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Settings size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="container mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">Choose an Exercise</h2>
          <p className="text-gray-600">Select an exercise to begin your eye relaxation session</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => {
            const isLocked = exercise.isPremium;

            return (
              <div
                key={exercise.id}
                className={`relative bg-white rounded-2xl p-6 border-2 transition-all ${
                  isLocked
                    ? 'border-gray-200 opacity-75'
                    : 'border-gray-100 hover:border-blue-300 hover:shadow-lg cursor-pointer'
                }`}
                onClick={() => !isLocked && setSelectedExercise(exercise.id)}
              >
                {/* Premium badge */}
                {isLocked && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      <Lock size={12} />
                      <span>PREMIUM</span>
                    </div>
                  </div>
                )}

                {/* Category & duration */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 uppercase">
                    {exercise.category}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {exercise.duration}s
                  </span>
                </div>

                {/* Exercise info */}
                <h3 className="font-bold text-xl mb-2">{exercise.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {exercise.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2 mb-4">
                  {exercise.benefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-gray-500">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Play button */}
                {!isLocked && (
                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                    <Play size={16} />
                    <span>Start Exercise</span>
                  </div>
                )}

                {/* Upgrade CTA */}
                {isLocked && (
                  <div className="mt-4 pt-4 border-t">
                    <button
                      className="text-sm text-blue-600 font-medium hover:text-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Navigate to pricing
                        alert('Upgrade to Premium to unlock this exercise!');
                      }}
                    >
                      Upgrade to unlock →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </main>
  );
}
