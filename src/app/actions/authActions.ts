'use server';

import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '@/lib/validation/auth';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';

export async function registerServerAction(rawData: unknown) {
  const result = registerSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Please resolve form validation issues.',
    };
  }

  const { fullName, email, password } = result.data;

  // Real Supabase Auth if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: fullName,
            role: 'user', // NEVER allow privilege escalation on registration
          },
        },
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return {
        success: true,
        message: 'Registration successful! Verification email has been sent if enabled.',
        user: { id: data.user?.id, email, displayName: fullName, role: 'user' },
      };
    } catch (err: unknown) {
      return { success: false, message: (err as Error).message || 'Server error during registration.' };
    }
  }

  // Demo fallback mode (validated on server)
  return {
    success: true,
    message: 'Student account successfully created in Demo Mode.',
    user: {
      id: `demo-user-${Date.now()}`,
      email,
      displayName: fullName,
      role: 'user', // Always user role
    },
  };
}

export async function loginServerAction(rawData: unknown) {
  const result = loginSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Invalid credentials format.',
    };
  }

  const { email, password } = result.data;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Safe, non-revealing error
        return { success: false, message: 'Invalid email or password combination.' };
      }

      return {
        success: true,
        message: 'Login successful.',
        user: data.user,
      };
    } catch {
      return { success: false, message: 'Authentication service temporarily unavailable.' };
    }
  }

  // Demo mode check
  return {
    success: true,
    message: 'Signed in successfully in Demo Mode.',
    user: {
      id: `demo-${Date.now()}`,
      email,
      displayName: email.split('@')[0],
      role: email.includes('owner') ? 'super_admin' : email.includes('admin') ? 'admin' : 'user',
    },
  };
}

export async function forgotPasswordServerAction(rawData: unknown) {
  const result = forgotPasswordSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      message: 'Please provide a valid email address.',
    };
  }

  const { email } = result.data;

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
      });
    } catch {
      // Intentionally silent for privacy
    }
  }

  // Safe response that does not leak email existence
  return {
    success: true,
    message: 'If an account matches that email address, password reset instructions have been sent.',
  };
}

export async function resetPasswordServerAction(rawData: unknown) {
  const result = resetPasswordSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      message: 'Password does not meet complexity requirements.',
    };
  }

  const { password } = result.data;

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        return { success: false, message: error.message };
      }
    } catch {
      return { success: false, message: 'Password update failed. Token may have expired.' };
    }
  }

  return {
    success: true,
    message: 'Your password has been reset successfully. You may now sign in.',
  };
}
