"use client";
import React from 'react';

type Tab = {
  key: string;
  label: string;
  content: React.ReactNode;
};

type Props = {
  tabs: Tab[];
  initial?: string;
};

export default function Tabs({ tabs, initial }: Props) {
  const [active, setActive] = React.useState(initial ?? tabs[0]?.key);

  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div>
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          {tabs.map((t) => {
            const isActive = t.key === current.key;
            return (
              <button
                key={t.key}
                className={`whitespace-nowrap py-3 text-sm font-medium border-b-2 ${
                  isActive
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
                onClick={() => setActive(t.key)}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div>{current?.content}</div>
    </div>
  );
}


