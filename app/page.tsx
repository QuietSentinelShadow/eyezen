'use client';

import Link from 'next/link';
import { exercises, getFreeExercises } from '@/lib/exercises';
import { Eye, Timer, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const freeExercises = getFreeExercises();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eye className="mx-auto mb-6 text-blue-500" size={64} />
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              EyeZen
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A calming eye exercise app that guides screen-addicted users through research-backed routines with soothing visuals
            </p>
          </motion.div>

          <div className="flex gap-4 justify-center mt-10">
            <Link
              href="/app"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 shadow-lg transition-all transform hover:scale-105"
            >
              Start Free Exercises
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-blue-300 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <Timer className="text-blue-500 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2">Timed Reminders</h3>
            <p className="text-gray-600">
              Customizable break reminders so you never forget to rest your eyes
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <Eye className="text-purple-500 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2">Visual Guides</h3>
            <p className="text-gray-600">
              Soothing animations that guide your eye movements with calming colors
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <Sparkles className="text-pink-500 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2">Research-Backed</h3>
            <p className="text-gray-600">
              10 exercises based on the 20-20-20 rule, Bates method, and more
            </p>
          </div>
        </div>

        {/* Free Exercises Preview */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Try These Free Exercises
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {freeExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 uppercase">
                    {exercise.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {exercise.duration}s
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{exercise.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {exercise.description}
                </p>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-500">{exercise.benefits[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Teaser */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-12 max-w-4xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-4">
            Unlock 7 More Premium Exercises
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Figure-8 tracing, palming, diagonal movements, and more advanced techniques
          </p>
          <Link
            href="/pricing"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all"
          >
            View Pricing
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-10 text-center text-gray-600">
        <p className="text-sm">
          Built with ❤️ by amtoc01bot • Protect your eyes, one exercise at a time
        </p>
      </footer>
    </main>
  );
}
