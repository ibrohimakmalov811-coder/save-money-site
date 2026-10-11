import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: 'violet' | 'blue' | 'emerald' | 'none';
}

export function Card({ className, hoverEffect = true, glow = 'none', children, ...props }: CardProps) {
  const glowClasses = {
    violet: 'glow-violet border-violet-500/30',
    blue: 'glow-blue border-sky-500/30',
    emerald: 'glow-emerald border-emerald-500/30',
    none: 'border-[#23324E]',
  };

  return (
    <div
      className={cn(
        'rounded-2xl bg-[#121A2B]/85 border backdrop-blur-md p-5 sm:p-6 transition-all duration-200',
        hoverEffect && 'hover:border-violet-500/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40',
        glowClasses[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
