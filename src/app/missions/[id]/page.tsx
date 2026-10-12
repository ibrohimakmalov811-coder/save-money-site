import React, { Suspense } from 'react';
import { missions } from '@/lib/data/missionsData';
import { MissionClient } from './MissionClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return missions.map((m) => ({ id: m.id }));
}

async function MissionPage({ params }: PageProps) {
  const { id } = await params;
  return <MissionClient id={id} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-slate-500">
          Loading mission...
        </div>
      }
    >
      <MissionPage params={params} />
    </Suspense>
  );
}
