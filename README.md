# MoneyQuest 🚀
> **Learn Money Skills. Complete Missions. Build Your Future.**
> *A professional, fully responsive financial literacy platform for high school students and IT academy learners.*

---

## 🌟 Overview

**MoneyQuest** helps young people understand money management through interactive lessons, gamification, realistic financial scenarios, budgeting tools, savings goals, quizzes, and educational challenges.

All simulated cash flows use **Uzbekistani som (UZS)** with student-tailored realistic figures (stipends, lunch canteen costs, tech equipment, transit cards, and internet access).

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router with Partial Prerendering & Server/Client components)
- **Frontend Library**: React 19 & TypeScript (strict type checking)
- **Styling & Design System**: Tailwind CSS v4, custom glassmorphism, responsive mobile-first architecture
- **Charts & Visualizations**: Recharts interactive responsive charts
- **Icons**: Lucide React
- **Audio Feedback**: Native Web Audio API synthesizer for offline instant gamification feedback
- **Gamification Effects**: Canvas-Confetti celebration triggers
- **Database & Auth**: Supabase PostgreSQL 15+ with Row Level Security (RLS) policies
- **Fallback**: Graceful, full-featured Interactive Demo Mode using browser `localStorage` persistence

---

## 🚀 Key Features

### 1. 🎯 Interactive Mission Engine (`/missions`, `/missions/[id]`)
- **Build Your First Budget**: Interactive allocation of 1,000,000 UZS into Needs, Wants, and Savings using the 50/30/20 rule.
- **Needs vs. Wants Sorting**: Card sorting exercise classifying 6 real student purchases (Metro pass, battlepass skin, canteen lunch, sneakers, internet, latte).
- **Save for Your First Laptop**: Mathematical calculation of 6,000,000 UZS savings plan over 5 months vs predatory 42% microloans.
- **Survive an Unexpected Expense**: Cracked smartphone screen emergency scenario testing reserve funds vs toxic debt.
- **Spot the Financial Scam**: Inspection of suspicious Telegram bots and identification of 3 red flags.

### 2. 📊 Smart Budget Simulator (`/budget-simulator`)
- Real-time calculations: Total planned expenses, unallocated balance, and savings percentage.
- Recharts distribution pie chart with tooltips and legend.
- Deficit detection and healthy budget guidance banners.
- Quick student presets: School Student (600k UZS), University Student (1.2M UZS), IT Intern (2.5M UZS).
- Save to profile persistence.

### 3. 🎯 Savings Goal Tracker (`/savings-goals`)
- Create and track custom student milestones (Refurbished laptop, English exams, emergency buffer).
- Automated time projections: `ceil((Target - Saved) / Monthly contribution)`.
- Interactive "Simulate Deposit" button (+100k UZS) with progress bar animations.
- 100% completion celebration state.

### 4. 🧭 Financial Life Simulator (`/life-simulator`)
- Signature 3-month branching life simulation:
  - Month 1: Friend's birthday dinner vs budget boundaries.
  - Month 2: Laptop charger power surge emergency repair.
  - Month 3: First paid IT freelance micro-gig.
- Live Vitals HUD: Cash, Emergency Buffer, Student Happiness Index, and Financial IQ rating.

### 5. 📚 Financial Academy (`/academy`, `/academy/[slug]`)
- 8 structured curriculum modules:
  1. Understanding Money & Currency
  2. Budgeting Fundamentals & 50/30/20 Rule
  3. Mastering Needs vs. Wants
  4. Saving Strategies & Emergency Buffers
  5. Banking Fundamentals & Compound Interest (Rule of 72)
  6. Inflation: The Hidden Cost
  7. Responsible Borrowing & Debt Traps
  8. Recognizing Digital Scams & Card Safety
- Interactive quizzes with instant scoring and economic explanations.

### 6. 🛡️ Scam Awareness Centre (`/scam-radar`)
- Threat analysis laboratory dissecting SMS bank phishing, Telegram crypto multiplier bots, referral pyramids, and fake job registration fees.

### 7. 🏆 Gamification System
- **XP Progression**: Earn XP on missions (40-80 XP), academy quizzes (30-40 XP), and life simulation (100 XP).
- **5 Meaningful Ranks**:
  - Level 1: Money Beginner (0–199 XP)
  - Level 2: Budget Explorer (200–499 XP)
  - Level 3: Saving Strategist (500–999 XP)
  - Level 4: Smart Spender (1000–1999 XP)
  - Level 5: Financial Master (2000+ XP)
- **Achievements Gallery**: 6 badges (First Step to Wealth, Budget Architect, Goal Setter, Academy Scholar, Scam Detective, Consistent Learner).

### 8. 🌐 Trilingual Support (i18n)
- Seamless switching between **Uzbek (O'zbekcha)**, **English**, and **Russian (Русский)** via navbar or profile settings.

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js v20+ or v24+
- npm v10+

### 2. Installation
```bash
# Clone or navigate into the project directory
cd moneyquest

# Install dependencies
npm install
```

### 3. Run Automated Tests
```bash
npm test
```
Runs the financial and business logic test suite covering currency formatting, safe numeric sanitation, level thresholds, budget deficit calculations, savings timelines, and quiz evaluations.

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
```
Creates an optimized static/partial-prerender production build.

---

## 🗄️ Database & Supabase Setup

MoneyQuest works immediately out-of-the-box in **Interactive Demo Mode** without any external dependencies.

To enable live PostgreSQL authentication and cloud persistence:
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard and run the migration script located at:
   `supabase/migrations/001_initial_schema.sql`
3. Copy your project URL and anon public key into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Restart your Next.js server (`npm run dev`). The top banner will indicate **"Connected to Supabase (PostgreSQL + RLS)"**.

---

## 🔒 Security & Privacy

- **Safe Sandbox**: Zero real banking credentials or account connections.
- **Minor Protection**: No invasive tracking or public exposure of student financial simulation data.
- **Row Level Security**: When Supabase is configured, all user rows are strictly isolated using `auth.uid() = user_id`.

---

© 2026 MoneyQuest. Built for youth financial empowerment.
