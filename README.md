# EyeZen - Eye Exercise Guide App

> A calming eye exercise app that guides screen-addicted users through research-backed routines

![Version](https://img.shields.io/badge/version-1.0.0--mvp-blue)
![Status](https://img.shields.io/badge/status-Ready%20to%20Test-green)

---

## 🎯 What It Does

EyeZen helps screen-addicted users protect their eyes with:
- **Timed break reminders** - Never forget to rest your eyes
- **Guided exercises** - Audio + visual instructions
- **Soothing animations** - Calming colors and smooth patterns
- **Research-backed routines** - 20-20-20 rule, Bates method, and more

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd ~/projects/eyezen
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Features

### Core (P0) - Complete ✅
- [x] Landing page with hero section
- [x] Exercise selection interface
- [x] Exercise player with countdown timer
- [x] 7 visual animation patterns (circles, figure-8, pulse, etc.)
- [x] 10 research-backed exercises
- [x] Free tier (3 exercises)
- [x] Premium tier (7 exercises, locked)
- [x] Pricing page with feature comparison

### Next (P1) - To Build
- [ ] Break reminder notifications
- [ ] Custom exercise routines
- [ ] Progress tracking
- [ ] Stripe payment integration
- [ ] User authentication (Supabase)

### Future (P2)
- [ ] Ambient soundscapes
- [ ] Dark mode
- [ ] Stats dashboard
- [ ] PWA icons and offline support

---

## 🎨 Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Next.js 14 |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Auth + DB | Supabase (to be integrated) |
| Payments | Stripe (to be integrated) |
| PWA | next-pwa |

---

## 📁 Project Structure

```
eyezen/
├── app/
│   ├── page.tsx          # Landing page
│   ├── app/page.tsx      # Exercise selection
│   └── pricing/page.tsx  # Pricing page
├── components/
│   ├── ExercisePlayer.tsx # Exercise playback
│   └── VisualGuide.tsx    # Animation engine
├── lib/
│   └── exercises.ts       # Exercise data (10 exercises)
└── public/
    └── manifest.json      # PWA config
```

---

## 💰 Monetization

**Freemium Model:**
- **Free**: 3 basic exercises, 20-min break reminders
- **Premium**: $4.99/month or $29.99 lifetime
  - All 10 exercises
  - Custom intervals
  - Progress tracking
  - Soundscapes

---

## 🧪 Testing the App

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test these pages:**
   - Landing: http://localhost:3000
   - Exercise selection: http://localhost:3000/app
   - Pricing: http://localhost:3000/pricing

3. **Try exercises:**
   - Click any free exercise (first 3)
   - Press play to start
   - Watch the visual animation
   - Follow the instructions

---

## 🎯 Current Status

**Build Progress:** ~40% complete

**What works:**
✅ Landing page
✅ Exercise selection UI
✅ Exercise player with animations
✅ Visual guide system (7 patterns)
✅ Timer and progress tracking
✅ Premium paywall UI

**What needs:**
⏳ Browser notifications for break reminders
⏳ Stripe integration for payments
⏳ Supabase for user accounts
⏳ PWA icons and offline support

---

## 🛠️ Next Steps

1. **Test the MVP** - Run `npm run dev` and try it
2. **Add break reminder system** - Browser notifications
3. **Integrate Stripe** - Payment processing
4. **Add Supabase** - User authentication
5. **Create PWA icons** - Make it installable
6. **Deploy to Vercel** - Go live

---

## 📝 Notes

- Built with **vibe coding** methodology (Amtoc = visionary, amtoc01bot = builder)
- Uses local inference (LM Studio) where possible to minimize API costs
- Commercial product designed for monetization
- PWA-ready (will be installable on phones/desktops)

---

**Built with ❤️ by amtoc01bot**
**Vision by Amtoc**
**Started: 2026-02-25**
