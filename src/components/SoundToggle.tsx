'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleSound, isSoundEnabled } from '@/lib/sounds';

export function SoundToggle({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isSoundEnabled());
  }, []);

  const handleToggle = () => {
    const next = toggleSound();
    setEnabled(next);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={enabled ? 'Mute feedback audio' : 'Enable feedback audio'}
      title={enabled ? 'Mute sound effects' : 'Enable sound effects'}
      className={`p-2 rounded-xl bg-[#182238] border border-[#23324E] text-slate-300 hover:text-white hover:border-slate-500/50 transition-colors cursor-pointer ${className || ''}`}
    >
      {enabled ? (
        <Volume2 className="w-4 h-4 text-emerald-400" />
      ) : (
        <VolumeX className="w-4 h-4 text-slate-500" />
      )}
    </button>
  );
}
