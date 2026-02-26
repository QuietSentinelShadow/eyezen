// Exercise types
export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number; // seconds
  category: 'movement' | 'focus' | 'relaxation';
  instructions: string[];
  visualPattern: VisualPattern;
  isPremium: boolean;
  benefits: string[];
}

export type VisualPattern = 'circle' | 'figure8' | 'horizontal' | 'vertical' | 'diagonal' | 'pulse' | 'blink';

// Research-backed eye exercises
export const exercises: Exercise[] = [
  {
    id: '20-20-20',
    name: '20-20-20 Rule',
    description: 'Every 20 minutes, look at something 20 feet away for 20 seconds',
    duration: 20,
    category: 'focus',
    instructions: [
      'Look away from your screen',
      'Focus on an object at least 20 feet away',
      'Hold your gaze for 20 seconds',
      'Breathe deeply and relax'
    ],
    visualPattern: 'pulse',
    isPremium: false,
    benefits: ['Reduces eye strain', 'Prevents digital eye fatigue', 'Improves focus flexibility']
  },
  {
    id: 'eye-rolling',
    name: 'Eye Rolling',
    description: 'Gently roll your eyes in circles to relieve tension',
    duration: 15,
    category: 'movement',
    instructions: [
      'Close your eyes gently',
      'Slowly roll them clockwise 3 times',
      'Then roll counter-clockwise 3 times',
      'Open and blink a few times'
    ],
    visualPattern: 'circle',
    isPremium: false,
    benefits: ['Relaxes eye muscles', 'Improves blood circulation', 'Reduces tension']
  },
  {
    id: 'focus-shift',
    name: 'Focus Shift',
    description: 'Alternate focus between near and far objects',
    duration: 20,
    category: 'focus',
    instructions: [
      'Hold your finger 10 inches from your face',
      'Focus on your finger for 5 seconds',
      'Now focus on something far away for 5 seconds',
      'Repeat 4 times'
    ],
    visualPattern: 'horizontal',
    isPremium: false,
    benefits: ['Strengthens eye muscles', 'Improves focusing ability', 'Reduces blur']
  },
  {
    id: 'figure-eight',
    name: 'Figure-8 Tracing',
    description: 'Trace a figure-8 pattern with your eyes',
    duration: 20,
    category: 'movement',
    instructions: [
      'Imagine a large figure-8 about 10 feet away',
      'Trace it slowly with your eyes',
      'Do this for 10 seconds one direction',
      'Then reverse direction for 10 seconds'
    ],
    visualPattern: 'figure8',
    isPremium: true,
    benefits: ['Improves eye coordination', 'Enhances flexibility', 'Mental relaxation']
  },
  {
    id: 'blinking',
    name: 'Conscious Blinking',
    description: 'Intentional blinking to moisturize eyes',
    duration: 15,
    category: 'relaxation',
    instructions: [
      'Blink rapidly for 5 seconds',
      'Then close eyes for 5 seconds',
      'Repeat 3 times',
      'Notice how refreshed your eyes feel'
    ],
    visualPattern: 'blink',
    isPremium: false,
    benefits: ['Moisturizes dry eyes', 'Clears debris', 'Reduces irritation']
  },
  {
    id: 'palming',
    name: 'Palming',
    description: 'Warm your eyes with your palms for deep relaxation',
    duration: 30,
    category: 'relaxation',
    instructions: [
      'Rub your hands together to warm them',
      'Close your eyes',
      'Cup your palms over your eyes (don\'t press)',
      'Relax in darkness for 30 seconds'
    ],
    visualPattern: 'pulse',
    isPremium: true,
    benefits: ['Deep relaxation', 'Relieves eye strain', 'Calms nervous system']
  },
  {
    id: 'near-far',
    name: 'Near-Far Focus',
    description: 'Advanced focus shifting exercise',
    duration: 25,
    category: 'focus',
    instructions: [
      'Focus on the tip of your nose for 3 seconds',
      'Focus on a near object (1-2 feet) for 3 seconds',
      'Focus on a far object (10+ feet) for 3 seconds',
      'Repeat sequence 3 times'
    ],
    visualPattern: 'vertical',
    isPremium: true,
    benefits: ['Maximum focus training', 'Strengthens eye muscles', 'Improves clarity']
  },
  {
    id: 'side-to-side',
    name: 'Lateral Eye Movement',
    description: 'Move eyes side to side to stretch eye muscles',
    duration: 15,
    category: 'movement',
    instructions: [
      'Keep your head still',
      'Look as far left as possible (3 sec)',
      'Look as far right as possible (3 sec)',
      'Repeat 5 times'
    ],
    visualPattern: 'horizontal',
    isPremium: true,
    benefits: ['Stretches eye muscles', 'Improves peripheral vision', 'Reduces stiffness']
  },
  {
    id: 'up-down',
    name: 'Vertical Eye Movement',
    description: 'Move eyes up and down to strengthen vertical muscles',
    duration: 15,
    category: 'movement',
    instructions: [
      'Keep your head still',
      'Look up as far as possible (3 sec)',
      'Look down as far as possible (3 sec)',
      'Repeat 5 times'
    ],
    visualPattern: 'vertical',
    isPremium: true,
    benefits: ['Strengthens vertical muscles', 'Improves range of motion', 'Relieves tension']
  },
  {
    id: 'diagonal',
    name: 'Diagonal Stretching',
    description: 'Move eyes diagonally for full range of motion',
    duration: 20,
    category: 'movement',
    instructions: [
      'Look to top-left corner (3 sec)',
      'Look to bottom-right corner (3 sec)',
      'Look to top-right corner (3 sec)',
      'Look to bottom-left corner (3 sec)'
    ],
    visualPattern: 'diagonal',
    isPremium: true,
    benefits: ['Full range of motion', 'Stretches all eye muscles', 'Improves coordination']
  }
];

// Helper to get free exercises
export const getFreeExercises = () => exercises.filter(e => !e.isPremium);

// Helper to get premium exercises
export const getPremiumExercises = () => exercises.filter(e => e.isPremium);

// Default beginner routine
export const beginnerRoutine: Exercise[] = [
  exercises.find(e => e.id === '20-20-20')!,
  exercises.find(e => e.id === 'blinking')!,
  exercises.find(e => e.id === 'eye-rolling')!
];
