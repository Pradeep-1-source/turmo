'use client';

import React from 'react';
import { WhyUsItem } from '@/types/database';
import { ShieldCheck, Leaf, PackageCheck, Briefcase } from 'lucide-react';

interface WhyUrbanFreshProps {
  items?: WhyUsItem[];
}

export default function WhyUrbanFresh({
  items = [
    {
      title: 'Responsible Sourcing',
      description:
        'Ethically gathered from nutrient-dense Indian farmlands with complete harvest traceability.',
    },
    {
      title: 'Quality Focus',
      description:
        'Strict laboratory testing, high curcumin and purity thresholds complying with international standards.',
    },
    {
      title: 'Export-Ready Packaging',
      description:
        'Moisture-controlled multi-wall paper sacks, bulk drums, IBCs, and private-label packaging options designed to support the storage and transportation requirements of agricultural and food products.',
    },
    {
      title: 'B2B Global Supply',
      description:
        'Reliable container-load logistics, streamlined phytosanitary clearance, and dedicated trade support.',
    },
  ],
}: WhyUrbanFreshProps) {
  const cardIcons = [
    <Leaf key="leaf" className="w-8 h-8 text-brand-lime" />,
    <ShieldCheck key="shield" className="w-8 h-8 text-brand-green" />,
    <PackageCheck key="pkg" className="w-8 h-8 text-brand-lime" />,
    <Briefcase key="biz" className="w-8 h-8 text-brand-green" />,
  ];

  return (
    <section className="py-24 bg-navy-dark relative overflow-hidden border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-brand-green/30 text-brand-green text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            The Urban Fresh Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            Why International Buyers Choose Us
          </h2>
          <p className="text-base sm:text-lg text-stone-800 font-medium leading-relaxed">
            Delivering consistency, authentic Indian farm heritage, and rigorous export compliance
            for global distributors, manufacturers, and importers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white border border-stone-200 hover:border-brand-green/50 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#FAF8F5] border border-stone-200 group-hover:border-brand-green flex items-center justify-center mb-6 transition-all duration-300">
                  {cardIcons[index % cardIcons.length]}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-brand-green transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-brand-green font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span>Export Standard Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
