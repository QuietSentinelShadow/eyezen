'use client';

import { motion } from 'framer-motion';
import { VisualPattern } from '@/lib/exercises';

interface VisualGuideProps {
  pattern: VisualPattern;
  isActive: boolean;
}

export default function VisualGuide({ pattern, isActive }: VisualGuideProps) {
  if (!isActive) return null;

  const renderPattern = () => {
    switch (pattern) {
      case 'circle':
        return <CirclePattern />;
      case 'figure8':
        return <Figure8Pattern />;
      case 'horizontal':
        return <HorizontalPattern />;
      case 'vertical':
        return <VerticalPattern />;
      case 'diagonal':
        return <DiagonalPattern />;
      case 'pulse':
        return <PulsePattern />;
      case 'blink':
        return <BlinkPattern />;
      default:
        return <PulsePattern />;
    }
  };

  return (
    <div className="relative w-full h-96 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden">
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-200 rounded-full opacity-30"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%'
            }}
            animate={{
              y: ['-10%', '110%'],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Main animation */}
      <div className="relative z-10">
        {renderPattern()}
      </div>
    </div>
  );
}

// Circle pattern - eyes follow in a circle
function CirclePattern() {
  return (
    <motion.div
      className="w-32 h-32"
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full shadow-lg" />
    </motion.div>
  );
}

// Figure-8 pattern
function Figure8Pattern() {
  return (
    <motion.div
      className="w-48 h-32 relative"
      animate={{
        x: [0, 48, 0, -48, 0],
        y: [0, 32, 0, 32, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full shadow-lg" />
    </motion.div>
  );
}

// Horizontal left-right
function HorizontalPattern() {
  return (
    <motion.div
      className="relative"
      animate={{
        x: [-80, 80, -80]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-lg" />
    </motion.div>
  );
}

// Vertical up-down
function VerticalPattern() {
  return (
    <motion.div
      className="relative"
      animate={{
        y: [-80, 80, -80]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-full shadow-lg" />
    </motion.div>
  );
}

// Diagonal corners
function DiagonalPattern() {
  return (
    <motion.div
      className="relative"
      animate={{
        x: [-80, 80, 80, -80, -80],
        y: [-80, -80, 80, 80, -80]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full shadow-lg" />
    </motion.div>
  );
}

// Pulsing circle - for focus exercises
function PulsePattern() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <div className="w-32 h-32 border-4 border-blue-300 rounded-full" />
      <div className="absolute w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full shadow-lg" />
    </motion.div>
  );
}

// Blink animation
function BlinkPattern() {
  return (
    <motion.div
      animate={{
        opacity: [1, 0, 1, 0, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full shadow-lg" />
    </motion.div>
  );
}
