'use client';

import React from 'react';
import { ProcessStep } from '@/types/database';
import { Sprout, Cog, ShieldCheck, Box, Ship, ArrowRight } from 'lucide-react';

interface QualityExportTimelineProps {
  title?: string;
  subtitle?: string;
  description?: string;
  steps?: ProcessStep[];
  certificationsInfo?: string;
}

export default function QualityExportTimeline({
  title = 'Quality That Travels Worldwide',
  subtitle = 'From Farm to Port: Rigorous Standards Every Step of the Way',
  description = 'We ensure strict microbiological, chemical, and physical quality benchmarks for every product leaving our facilities. Our quality assurance protocol complies with global food safety standards.',
  steps = [
    {
      step: '01',
      title: 'Sourcing',
      desc: 'Direct harvest selection from certified growers in Tamil Nadu with pure soil integrity.',
    },
    {
      step: '02',
      title: 'Processing',
      desc: 'Temperature-monitored cold-pressing and sterile sun-cured pulverization.',
    },
    {
      step: '03',
      title: 'Quality Control',
      desc: 'Batch testing for active curcumin levels, moisture content, and zero adulterants.',
    },
    {
      step: '04',
      title: 'Packaging',
      desc: 'Multi-layer moisture-barrier paper sacks, food-grade HDPE drums, and palletization.',
    },
    {
      step: '05',
      title: 'Export Dispatch',
      desc: 'Phytosanitary documentation, customs clearance, and global ocean freight dispatch.',
    },
  ],
  certificationsInfo,
}: QualityExportTimelineProps) {
  const stepIcons = [
    <Sprout key="s" className="w-6 h-6 text-brand-lime" />,
    <Cog key="p" className="w-6 h-6 text-brand-green" />,
    <ShieldCheck key="qc" className="w-6 h-6 text-brand-lime" />,
    <Box key="pk" className="w-6 h-6 text-brand-green" />,
    <Ship key="ex" className="w-6 h-6 text-brand-lime" />,
  ];

  return (
    <section className="py-24 bg-navy-dark relative overflow-hidden border-t border-navy-border/60">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-green/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-surface border border-brand-green/30 text-brand-lime text-xs font-bold tracking-widest uppercase mb-4 shadow-glow-green-sm">
            Certified Export Supply Chain
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* Desktop Horizontal Timeline / Mobile Vertical */}
        <div className="relative">
          {/* Timeline Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-[45px] left-12 right-12 h-0.5 bg-gradient-to-r from-brand-lime via-brand-green to-navy-border opacity-60 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {steps.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-navy-card border border-navy-border hover:border-brand-green/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge / Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-navy-surface border border-brand-green/20 flex items-center justify-center group-hover:border-brand-green transition-all">
                      {stepIcons[index % stepIcons.length]}
                    </div>
                    <span className="text-xs font-extrabold tracking-wider px-2.5 py-1 rounded-lg bg-navy-surface text-brand-lime border border-brand-green/30">
                      STEP {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-lime transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1 text-[11px] text-brand-lime font-medium">
                  <span>Verified Benchmark</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications note */}
        {certificationsInfo && (
          <div className="mt-12 p-6 rounded-2xl bg-navy-surface/80 border border-brand-green/20 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-brand-green/20 flex items-center justify-center text-brand-green shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Official Compliance & Documentation
              </h4>
              <p className="text-xs sm:text-sm text-slate-100 mt-0.5">
                {certificationsInfo}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
