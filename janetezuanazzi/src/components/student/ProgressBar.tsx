"use client";
import React from 'react';

type Props = { percent: number };

export default function ProgressBar({ percent }: Props) {
  const pct = Math.max(0, Math.min(100, percent));
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-700">Progresso</span>
        <span className="text-sm text-gray-600">{pct}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}


