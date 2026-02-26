'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Exercise } from '@/lib/exercises';
import VisualGuide from './VisualGuide';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';

interface ExercisePlayerProps {
  exercise: Exercise;
  onComplete?: () => void;
  onExit?: () => void;
}

export default function ExercisePlayer({ exercise, onComplete, onExit }: ExercisePlayerProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(exercise.duration);
  const [currentStep, setCurrentStep] = useState(0);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      onComplete?.();
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, onComplete]);

  // Auto-advance instructions based on time
  useEffect(() => {
    if (!isActive) return;

    const timePerStep = exercise.duration / exercise.instructions.length;
    const elapsed = exercise.duration - timeRemaining;
    const step = Math.min(
      Math.floor(elapsed / timePerStep),
      exercise.instructions.length - 1
    );
    setCurrentStep(step);
  }, [isActive, timeRemaining, exercise]);

  const togglePlay = () => {
    setIsActive(!isActive);
  };

  const restart = () => {
    setTimeRemaining(exercise.duration);
    setCurrentStep(0);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((exercise.duration - timeRemaining) / exercise.duration) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={onExit}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          ✕
        </button>
        <span className="text-sm text-gray-500">{exercise.category}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        {/* Exercise name */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {exercise.name}
          </h1>
          <p className="text-gray-600">{exercise.description}</p>
        </div>

        {/* Visual guide */}
        <div className="w-full max-w-lg">
          <VisualGuide pattern={exercise.visualPattern} isActive={isActive} />
        </div>

        {/* Current instruction */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md">
              <p className="text-xs text-blue-600 font-semibold mb-2">
                STEP {currentStep + 1} OF {exercise.instructions.length}
              </p>
              <p className="text-xl text-gray-900 font-medium">
                {exercise.instructions[currentStep]}
              </p>
              {currentStep < exercise.instructions.length - 1 && (
                <ChevronRight className="inline-block mt-2 text-gray-400" size={20} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Timer */}
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-900 mb-2">
            {formatTime(timeRemaining)}
          </div>
          <p className="text-gray-500 text-sm">
            {isActive ? 'Exercise in progress...' : 'Press play to start'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={restart}
            className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw size={24} className="text-gray-600" />
          </button>

          <button
            onClick={togglePlay}
            className="p-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg transition-all transform hover:scale-105"
          >
            {isActive ? (
              <Pause size={32} className="text-white" />
            ) : (
              <Play size={32} className="text-white ml-1" />
            )}
          </button>

          <div className="w-14 h-14" /> {/* Spacer for symmetry */}
        </div>
      </div>

      {/* Benefits footer */}
      <div className="p-6 bg-white border-t">
        <p className="text-xs text-gray-500 text-center">
          ✨ Benefits: {exercise.benefits.join(' • ')}
        </p>
      </div>
    </div>
  );
}
