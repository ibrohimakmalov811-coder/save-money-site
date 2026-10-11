import React from 'react';
import { academyModules } from '@/lib/data/academyData';
import { AcademyClient } from './AcademyClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return academyModules.map((m) => ({ slug: m.slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <AcademyClient slug={slug} />;
}
