'use client';

import React from 'react';
import { Sprout, Award, PackageCheck, Ship } from 'lucide-react';
import { TrustStat } from '@/types/database';

interface TrustSectionProps {
  stats?: TrustStat[];
}

export default function TrustSection({
  stats = [
    { label: 'Farm Sourced', sub: 'Direct Origin Cultivation' },
    { label: 'Quality Focused', sub: 'Stringent COA Verification' },
    { label: 'Export Ready', sub: 'Standardized Transit Packaging' },
    { label: 'Global Supply', sub: 'Worldwide Port Logistics' },
  ],
}: TrustSectionProps) {
  const icons = [
    <Sprout key="sprout" className="w-7 h-7 text-brand-lime" />,
    <Award key="award" className="w-7 h-7 text-brand-green" />,
    <PackageCheck key="pkg" className="w-7 h-7 text-brand-lime" />,
    <Ship key="ship" className="w-7 h-7 text-brand-green" />,
  ];

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-card-dark border border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center ${
                index > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''
              } group`}
            >
              <div className="w-14 h-14 rounded-2xl bg-navy-surface flex items-center justify-center mb-3 border border-brand-green/20 group-hover:border-brand-green group-hover:shadow-glow-green-sm transition-all duration-300">
                {icons[index % icons.length]}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide group-hover:text-brand-green transition-colors">
                {item.label}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-[180px]">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
