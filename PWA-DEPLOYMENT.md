# EyeZen PWA Deployment Guide

## PWA Status

| Component | Status |
|-----------|--------|
| Service Worker | ✅ Created |
| Manifest.json | ✅ Updated |
| Icons (72-512px) | ✅ Generated |
| Maskable Icon | ✅ Created |
| Apple Touch Icon | ✅ Created |
| Offline Page | ✅ Created |
| Meta Tags | ✅ Added |
| Git Push | ✅ Pushed |

---

## Step 1: Configure eyezen.app Domain on Vercel

1. Go to https://vercel.com/dashboard
2. Select "eyezen" project (or eyezen-two)
3. Go to **Settings** → **Domains**
4. Add domain: `eyezen.app`
5. Add domain: `www.eyezen.app` (redirect to eyezen.app)

Vercel will provide DNS records. Configure at your domain registrar:

**DNS Configuration:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Step 2: Build Play Store App (TWA)

### Option A: Bubblewrap (Recommended)

```bash
# Install Bubblewrap CLI
npm install -g @anthropic/bubblewrap

# Initialize TWA project
cd ~/projects/eyezen
bubblewrap init --manifest="https://eyezen.app/manifest.json"

# Build Android App Bundle
bubblewrap build
```

### Option B: PWABuilder

1. Go to https://pwabuilder.com
2. Enter: https://eyezen.app
3. Click "Generate Package" → Android
4. Download the .aab file
5. Upload to Play Console

---

## Step 3: Build App Store App

1. Go to https://pwabuilder.com
2. Enter: https://eyezen.app
3. Click "Generate Package" → iOS
4. Download the .ipa file
5. Upload via Transporter app
6. Submit to App Store Connect

---

## Step 4: Test PWA

```bash
# Local test
cd ~/projects/eyezen
npm run dev

# Lighthouse audit (after deployment)
npx lighthouse https://eyezen.app --view
```

---

## Files Created

| File | Purpose |
|------|---------|
| public/sw.js | Service worker for offline |
| public/offline.html | Fallback page |
| public/manifest.json | PWA manifest |
| public/icons/* | All icon sizes |
| app/layout.tsx | Updated with meta tags |

---

## App Store Requirements

### Play Store
- ✅ Developer account ($25 one-time)
- ✅ App Bundle (.aab)
- ✅ Privacy policy URL
- ✅ Content rating questionnaire
- ✅ Screenshots (phone, tablet)

### App Store
- ✅ Developer account ($99/year)
- ✅ iOS App Package (.ipa)
- ✅ Privacy policy URL
- ✅ App Store screenshots
- ✅ App Review Information

---

## Next Steps

1. **You:** Add eyezen.app domain in Vercel dashboard
2. **You:** Configure DNS at registrar
3. **Me:** Generate Play Store package once domain is live
4. **Me:** Generate App Store package once domain is live

---

Let me know when domain is configured and I'll generate the app store packages.
