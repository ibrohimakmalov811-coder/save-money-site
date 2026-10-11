-- MoneyQuest Database Schema Migration
-- Compatible with PostgreSQL 15+ / Supabase
-- Includes Row Level Security (RLS) policies

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    preferred_language VARCHAR(5) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 2. USER PROGRESS
CREATE TABLE IF NOT EXISTS public.user_progress (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    total_xp INTEGER NOT NULL DEFAULT 0 CHECK (total_xp >= 0),
    current_level INTEGER NOT NULL DEFAULT 1 CHECK (current_level >= 1 AND current_level <= 5),
    current_streak INTEGER NOT NULL DEFAULT 1 CHECK (current_streak >= 0),
    last_activity_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3. MISSIONS
CREATE TABLE IF NOT EXISTS public.missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'Beginner',
    estimated_minutes INTEGER NOT NULL DEFAULT 10,
    xp_reward INTEGER NOT NULL DEFAULT 50 CHECK (xp_reward > 0),
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 4. MISSION COMPLETIONS
CREATE TABLE IF NOT EXISTS public.mission_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    mission_id UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    result JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT unique_user_mission UNIQUE (user_id, mission_id)
);

-- 5. LESSONS
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    module VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'Beginner',
    xp_reward INTEGER NOT NULL DEFAULT 25 CHECK (xp_reward > 0),
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 6. QUIZ QUESTIONS
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer_options JSONB NOT NULL,
    correct_answer INTEGER NOT NULL,
    explanation TEXT NOT NULL
);

-- 7. QUIZ ATTEMPTS
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 8. SAVINGS GOALS
CREATE TABLE IF NOT EXISTS public.savings_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    target_amount NUMERIC(15, 2) NOT NULL CHECK (target_amount > 0),
    current_amount NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (current_amount >= 0),
    monthly_contribution NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (monthly_contribution >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 9. BUDGETS
CREATE TABLE IF NOT EXISTS public.budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    monthly_income NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (monthly_income >= 0),
    categories JSONB NOT NULL DEFAULT '{
        "food": 0,
        "transport": 0,
        "education": 0,
        "entertainment": 0,
        "savings": 0,
        "other": 0
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    CONSTRAINT unique_user_budget UNIQUE (user_id)
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mission_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;

-- Public read for published educational missions and lessons
CREATE POLICY "Public can view published missions" 
    ON public.missions FOR SELECT 
    USING (published = true);

CREATE POLICY "Public can view published lessons" 
    ON public.lessons FOR SELECT 
    USING (published = true);

CREATE POLICY "Public can view quiz questions" 
    ON public.quiz_questions FOR SELECT 
    USING (true);

-- User-specific data protection
CREATE POLICY "Users can manage their own profile" 
    ON public.profiles FOR ALL 
    USING (auth.uid() = id);

CREATE POLICY "Users can view and update their own progress" 
    ON public.user_progress FOR ALL 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their mission completions" 
    ON public.mission_completions FOR ALL 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their quiz attempts" 
    ON public.quiz_attempts FOR ALL 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their savings goals" 
    ON public.savings_goals FOR ALL 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their budgets" 
    ON public.budgets FOR ALL 
    USING (auth.uid() = user_id);
