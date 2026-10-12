import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { DemoBanner } from '@/components/DemoBanner';
import { Footer } from '@/components/Footer';
import { cookies } from 'next/headers';
import Script from 'next/script';
import type { SupportedLanguage } from '@/lib/i18n/types';

export const metadata: Metadata = {
  title: 'MoneyQuest — Learn Money Skills. Complete Missions. Build Your Future.',
  description: 'Interactive financial literacy web application for school students and IT academy students. Master budgeting, savings goals, economic principles, and scam awareness.',
};

async function LocalizedApp({ children }: { children: React.ReactNode }) {
  const savedLanguage = (await cookies()).get('moneyquest_lang')?.value;
  const initialLanguage: SupportedLanguage =
    savedLanguage === 'uz' || savedLanguage === 'ru' ? savedLanguage : 'en';

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <AppProvider>
        <DemoBanner />
        <Suspense fallback={<header className="h-16 border-b border-[#23324E] bg-[#0B1020]" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-slate-500">Loading MoneyQuest...</div>}>
            {children}
          </Suspense>
        </main>
        <Footer />
      </AppProvider>
    </LanguageProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B1020] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-violet-600 selection:text-white">
        <Script id="migrate-language-preference" strategy="beforeInteractive">
          {`try {
  const hasLanguageCookie = document.cookie.split(';').some((cookie) => cookie.trim().startsWith('moneyquest_lang='));
  if (!hasLanguageCookie) {
    const savedLanguage = localStorage.getItem('moneyquest_lang');
    if (savedLanguage === 'en' || savedLanguage === 'uz' || savedLanguage === 'ru') {
      document.cookie = 'moneyquest_lang=' + savedLanguage + '; Path=/; Max-Age=31536000; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
      location.reload();
    }
  }
} catch {}`}
        </Script>
        <Suspense fallback={<div className="min-h-screen bg-[#0B1020]" aria-busy="true" />}>
          <LocalizedApp>{children}</LocalizedApp>
        </Suspense>
      </body>
    </html>
  );
}
