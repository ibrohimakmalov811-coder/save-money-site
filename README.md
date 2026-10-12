# MoneyQuest 🚀
> **Learn Money Skills. Complete Missions. Build Your Future.**
> *A professional, fully responsive financial literacy platform with modern dark fintech UI, Supabase authentication, and a 3-tier role-based admin system.*

---

## 🌟 Overview

**MoneyQuest** empowers high school and IT academy students to understand money management through interactive missions, gamification, realistic financial scenarios, budgeting tools, savings goals, quizzes, and educational challenges.

All simulated cash flows use **Uzbekistani som (UZS)** with student-tailored realistic figures (stipends, lunch canteen costs, tech equipment, transit cards, and internet access).

---

## 🔐 3-Tier Role-Based Access Control (RBAC) & Security Architecture

MoneyQuest implements enterprise-grade Role-Based Access Control with server-side authorization and PostgreSQL Row Level Security:

| Role | Authority Tier | Capabilities & Scope | Immutability Safeguards |
| :--- | :--- | :--- | :--- |
| **`super_admin`** | **Tier 1 (Root Owner)** | Full platform authority (`owner@moneyquest.uz`). Manages administrators, audits, system configuration, maintenance mode, and user standing. | **Strictly Immutable**: Protected by PostgreSQL trigger `prevent_super_admin_tampering` and `prevent_super_admin_deletion`. Cannot be demoted, deleted, or suspended by any admin. |
| **`admin`** | **Tier 2 (Content Staff)** | Educational content creation & publishing (modules, lessons, interactive quizzes, financial missions). Inspects permitted aggregate KPIs and student directory. | **Bounded**: Cannot manage or promote other admins, cannot tamper with the Super Admin, cannot modify root platform settings. |
| **`user`** | **Tier 3 (Student Learner)** | Accesses student learning dashboard, missions, 50/30/20 budget calculator, savings goal tracker, life simulator, and scam radar. | **Strict Sandbox**: Default role assigned upon registration. Strictly prevented from privilege escalation via server action validation. |

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router with Partial Prerendering & Server Actions)
- **Frontend Library**: React 19 & TypeScript (strict type checking across all components)
- **Styling & Design System**: Tailwind CSS v4, custom fintech dark theme (#080D1A, #0F172A, #121A2B), glassmorphism
- **Charts & Visualizations**: Recharts interactive responsive charts (Area charts, Bar charts, Donut charts)
- **Validation**: Zod schema validation on both client and server actions
- **Icons**: Lucide React
- **Audio Feedback**: Native Web Audio API synthesizer for instant gamification feedback
- **Gamification Effects**: Canvas-Confetti celebration triggers
- **Database & Auth**: Supabase PostgreSQL 15+ with Row Level Security (RLS) policies and PostgreSQL audit triggers
- **Fallback / Evaluation Mode**: Full-featured interactive Demo Mode with instant role switching between Owner, Admin, and Student

---

## 🧭 System Architecture & Routes

### 1. 🎓 Student Experience
- `/` — Premium fintech landing page with hero, curriculum highlights, feature breakdown, and FAQ.
- `/dashboard` — Student command center: active missions, XP progress, daily streaks, and quick calculators.
- `/missions` & `/missions/[id]` — 5 interactive missions (50/30/20 Budgeting, Needs vs Wants, Laptop Savings Plan, Emergency Fund, Scam Detection).
- `/academy` & `/academy/[slug]` — 8 modular courses with lesson readings and interactive quizzes.
- `/budget-simulator` — Interactive 50/30/20 budget planner with income presets and Recharts breakdown.
- `/savings-goals` — Milestones tracker with automated timeline estimates and simulated deposits.
- `/life-simulator` — 3-month branching decision tree with Cash, Safety buffer, Happiness, and Financial IQ vitals.
- `/scam-radar` — Fraud radar dissecting phishing SMS, crypto bots, pyramid schemes, and job scams.
- `/profile` — Student profile, avatar selector, achievement gallery, and language preferences.

### 2. 🔑 Authentication Subsystem
- `/login` — Secure sign-in with remembered sessions, validation, and demo role switcher.
- `/register` — Full registration with Zod validation, live password security checklist (min 8 chars, uppercase, lowercase, number), terms acceptance, and forced `user` role assignment.
- `/forgot-password` — Privacy-preserving password reset email request.
- `/reset-password` — Password reset form with complexity verification.
- `/auth/callback` — Server route handler for Supabase OAuth/magic-link code exchange.

### 3. 🛡️ Administration Console (`/admin`)
- `/admin` — High-level platform health, KPI metrics, recent audit preview, and RBAC architecture summary.
- `/admin/users` — Searchable user directory with role filters, promote to Admin, revoke admin, suspend/restore accounts, and immutable Super Admin protection.
- `/admin/content` — Module and lesson manager: create, edit, preview, and archive academy courses.
- `/admin/missions` — Challenge configuration: adjust XP rewards, difficulty, and add new financial scenarios.
- `/admin/analytics` — Engagement KPIs with Recharts Area/Bar/Donut charts and CSV export.
- `/admin/audit-logs` — Tamper-proof activity log viewer with actor, action, timestamp, and JSON payload inspector.
- `/admin/settings` — Super Admin exclusive root controls: maintenance mode, open registrations, XP multiplier, and database RLS health.

---

## 💻 Local Development & Testing

### 1. Installation
```bash
# Navigate to project directory
cd moneyquest

# Install dependencies
npm install
```

### 2. Run Automated Test Suite
```bash
npm test
```
Executes two independent test suites:
1. `tests/financial-logic.test.ts`: UZS currency formatting, numeric sanitation, level math, budget deficit logic, and savings goal projections (6 tests).
2. `tests/rbac-auth.test.ts`: Zod auth schemas, privilege escalation prevention, Super Admin immutability safeguards, authorized promotions/demotions/suspensions, and audit trail generation (7 tests).

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
```
Generates clean optimized production build with 44 prerendered routes.

---

## 🗄️ Database & Supabase Migrations

The repository contains two production-ready PostgreSQL migrations in `supabase/migrations/`:

1. `001_initial_schema.sql`: Base tables with Row Level Security:
   - `profiles`, `missions`, `mission_completions`, `lessons`, `quiz_questions`, `quiz_attempts`, `user_progress`, `savings_goals`, `budgets`.
2. `002_roles_and_admin_system.sql`: Role-Based Access Control and security audit tables:
   - `user_roles` (`user_id`, `role`, `is_suspended`)
   - `user_xp_transactions`
   - `courses` & `admin_audit_logs`
   - Triggers: `prevent_super_admin_tampering()` and `prevent_super_admin_deletion()`
   - Procedure: `initialize_super_admin(p_email)`

### To connect a live Supabase project:
1. Run both SQL files in your Supabase SQL Editor.
2. In `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPER_ADMIN_EMAIL=owner@moneyquest.uz
   ```
3. Restart `npm run dev`.

---

© 2026 MoneyQuest. Built for youth financial empowerment.
