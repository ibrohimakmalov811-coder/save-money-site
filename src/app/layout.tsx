import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { DemoBanner } from '@/components/DemoBanner';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'MoneyQuest — Learn Money Skills. Complete Missions. Build Your Future.',
  description: 'Interactive financial literacy web application for school students and IT academy students. Master budgeting, savings goals, economic principles, and scam awareness.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B1020] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-violet-600 selection:text-white">
        <LanguageProvider>
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
      </body>
    </html>
  );
}
