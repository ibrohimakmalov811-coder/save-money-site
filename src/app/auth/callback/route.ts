import { NextResponse } from 'next/server';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  if (code && isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch {
      // ignore
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
