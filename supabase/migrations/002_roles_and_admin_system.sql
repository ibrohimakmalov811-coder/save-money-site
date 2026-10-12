-- MoneyQuest Migration 002: Roles, RBAC, Admin Audit Logs, and Super Admin Security
-- PostgreSQL 15+ compatible with Row Level Security (RLS)

-- 1. USER ROLES TABLE
CREATE TABLE IF NOT EXISTS public.user_roles (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
    is_suspended BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 2. USER XP TRANSACTIONS (Authoritative Server-side XP Ledger)
CREATE TABLE IF NOT EXISTS public.user_xp_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL CHECK (amount > 0),
    category TEXT NOT NULL,
    reference_id TEXT NOT NULL, -- Idempotency key (e.g. "mission:build-first-budget")
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    CONSTRAINT unique_user_xp_ref UNIQUE (user_id, reference_id)
);

-- 3. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    difficulty TEXT NOT NULL DEFAULT 'Beginner',
    order_index INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 4. ADMIN AUDIT LOGS (Immutable Activity Log)
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    actor_email TEXT NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 5. FUNCTION & TRIGGER: Prevent Demoting or Modifying Super Admin
CREATE OR REPLACE FUNCTION public.prevent_super_admin_tampering()
RETURNS TRIGGER AS $$
BEGIN
    -- If target account was already super_admin, verify immutability
    IF OLD.role = 'super_admin' THEN
        -- Prevent changing role away from super_admin
        IF NEW.role != 'super_admin' THEN
            RAISE EXCEPTION 'Security Violation: The Super Admin (Project Owner) cannot be demoted or removed by any administrator.';
        END IF;
        -- Prevent suspending the Super Admin
        IF NEW.is_suspended = true THEN
            RAISE EXCEPTION 'Security Violation: The Super Admin account cannot be suspended.';
        END IF;
    END IF;

    -- Prevent non-super_admin from creating a new super_admin
    IF NEW.role = 'super_admin' AND OLD.role != 'super_admin' THEN
        -- Only internal service-role or designated initialization can provision super_admin
        IF current_setting('request.jwt.claims', true)::jsonb->>'role' != 'service_role' THEN
            RAISE EXCEPTION 'Security Violation: Only the verified deployment process can initialize or grant the Super Admin role.';
        END IF;
    END IF;

    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_prevent_super_admin_tampering ON public.user_roles;
CREATE TRIGGER trg_prevent_super_admin_tampering
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_super_admin_tampering();

-- 6. PREVENT DELETION OF SUPER ADMIN FROM USER_ROLES
CREATE OR REPLACE FUNCTION public.prevent_super_admin_deletion()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.role = 'super_admin' THEN
        RAISE EXCEPTION 'Security Violation: The Super Admin account cannot be deleted.';
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_prevent_super_admin_deletion ON public.user_roles;
CREATE TRIGGER trg_prevent_super_admin_deletion
    BEFORE DELETE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_super_admin_deletion();

-- 7. SECURE SUPER ADMIN INITIALIZATION (Idempotent server-side procedure)
CREATE OR REPLACE FUNCTION public.initialize_super_admin(p_email TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    v_user_id UUID;
    v_existing_super_admin_count INTEGER;
BEGIN
    -- Check if a super admin already exists
    SELECT COUNT(*) INTO v_existing_super_admin_count FROM public.user_roles WHERE role = 'super_admin';
    
    -- Find user by email in profiles
    SELECT id INTO v_user_id FROM public.profiles WHERE preferred_language IS NOT NULL AND id IN (
        SELECT id FROM auth.users WHERE email = p_email
    );

    IF v_user_id IS NULL THEN
        RETURN false;
    END IF;

    -- Ensure uniqueness: if no super admin exists yet, elevate this verified owner
    IF v_existing_super_admin_count = 0 THEN
        INSERT INTO public.user_roles (user_id, role, is_suspended)
        VALUES (v_user_id, 'super_admin', false)
        ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin', is_suspended = false;

        -- Record into audit log
        INSERT INTO public.admin_audit_logs (actor_id, actor_email, action, target_type, target_id, details)
        VALUES (v_user_id, p_email, 'INITIALIZE_SUPER_ADMIN', 'user_roles', v_user_id::text, jsonb_build_object('reason', 'Initial owner setup'));

        RETURN true;
    ELSIF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = v_user_id AND role = 'super_admin') THEN
        -- Already the Super Admin
        RETURN true;
    ELSE
        RAISE EXCEPTION 'Super Admin has already been provisioned with another owner identity.';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check role in RLS
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS TEXT AS $$
    SELECT role FROM public.user_roles WHERE user_id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- USER ROLES POLICIES:
-- Users can view their own role
CREATE POLICY "Users can read own role" 
    ON public.user_roles FOR SELECT 
    USING (auth.uid() = user_id);

-- Admins and Super Admin can view all roles
CREATE POLICY "Admins can view all roles" 
    ON public.user_roles FOR SELECT 
    USING (public.get_auth_role() IN ('admin', 'super_admin'));

-- Only Super Admin can update roles (promote/demote/suspend)
CREATE POLICY "Super Admin can update roles" 
    ON public.user_roles FOR UPDATE 
    USING (public.get_auth_role() = 'super_admin');

-- USER XP TRANSACTIONS POLICIES:
CREATE POLICY "Users can view own XP transactions" 
    ON public.user_xp_transactions FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Service or server actions can insert XP" 
    ON public.user_xp_transactions FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- COURSES POLICIES:
CREATE POLICY "Public can view published courses" 
    ON public.courses FOR SELECT 
    USING (published = true);

CREATE POLICY "Admins can manage courses" 
    ON public.courses FOR ALL 
    USING (public.get_auth_role() IN ('admin', 'super_admin'));

-- ADMIN AUDIT LOGS POLICIES:
-- Only Admins and Super Admins can view audit logs
CREATE POLICY "Admins can view audit logs" 
    ON public.admin_audit_logs FOR SELECT 
    USING (public.get_auth_role() IN ('admin', 'super_admin'));

-- Logs are immutable: No UPDATE or DELETE allowed for anyone
-- INSERT allowed to authenticated admins
CREATE POLICY "Admins can insert audit logs" 
    ON public.admin_audit_logs FOR INSERT 
    WITH CHECK (public.get_auth_role() IN ('admin', 'super_admin'));
