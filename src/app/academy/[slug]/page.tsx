import React, { Suspense } from 'react';
import { academyModules } from '@/lib/data/academyData';
import { AcademyClient } from './AcademyClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return academyModules.map((m) => ({ slug: m.slug }));
}

async function AcademyPage({ params }: PageProps) {
  const { slug } = await params;
  return <AcademyClient slug={slug} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-slate-500">
          Loading academy module...
        </div>
      }
    >
      <AcademyPage params={params} />
    </Suspense>
  );
}
