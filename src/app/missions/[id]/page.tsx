import React from 'react';
import { missions } from '@/lib/data/missionsData';
import { MissionClient } from './MissionClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return missions.map((m) => ({ id: m.id }));
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <MissionClient id={id} />;
}
