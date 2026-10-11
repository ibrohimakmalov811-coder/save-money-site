import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  value: number; // 0 to 100
  color?: 'violet' | 'emerald' | 'blue' | 'amber';
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  color = 'violet',
  height = 'md',
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  const colorStyles = {
    violet: 'bg-gradient-to-r from-violet-600 to-indigo-500 shadow-sm shadow-violet-500/50',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50',
    blue: 'bg-gradient-to-r from-sky-500 to-blue-500 shadow-sm shadow-sky-500/50',
    amber: 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-sm shadow-amber-500/50',
  };

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-medium">
          <span>Progress</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className={cn('w-full bg-[#182238] rounded-full overflow-hidden border border-[#23324E]', heightStyles[height])}>
        <div
          className={cn('h-full transition-all duration-500 ease-out rounded-full', colorStyles[color])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
