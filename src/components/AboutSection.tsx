'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Factory, Truck } from 'lucide-react';

interface AboutSectionProps {
  title?: string;
  description?: string;
  image?: string;
}

export default function AboutSection({
  title = 'Rooted in India. Prepared for the World.',
  description = 'Urban Fresh connects quality Indian agricultural products with global buyers. We specialize in responsible farm-level sourcing, unadulterated cold-pressing, sterile pulverization, and dependable international export packaging.',
  image = '/images/export-quality.jpg',
}: AboutSectionProps) {
  const points = [
    {
      title: 'Responsible Farm Sourcing',
      desc: 'Procuring from heritage agricultural belts in Tamil Nadu with rich soil minerals and full cultivation traceability.',
      icon: <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />,
    },
    {
      title: 'Strict Quality Standards',
      desc: 'Batch-wise laboratory analysis covering curcumin thresholds, moisture levels, and total foreign matter elimination.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-lime shrink-0 mt-0.5" />,
    },
    {
      title: 'Hygienic Modern Processing',
      desc: 'Low-heat cold presses and hygienic pulverization environments retaining organic bio-active potency.',
      icon: <Factory className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />,
    },
    {
      title: 'Export-Grade Packaging & Shipping',
      desc: 'Transit-safe multi-wall moisture-barrier sacks and drums engineered for long ocean freight routes.',
      icon: <Truck className="w-5 h-5 text-brand-lime shrink-0 mt-0.5" />,
    },
  ];

  return (
    <section className="py-24 bg-navy-dark relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column (Left) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-green/30 to-brand-lime/10 blur-lg opacity-70 group-hover:opacity-100 transition duration-1000" />

              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-navy-card aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src={image}
                  alt="Urban Fresh Export Quality Testing and Port Operations"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-md flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-green font-bold">
                      Export Ready Infrastructure
                    </p>
                    <p className="text-sm font-semibold text-stone-900">
                      From Erode Heartland to Global Seaports
                    </p>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-brand-green animate-ping" />
                </div>
              </div>
            </div>
          </div>

          {/* Text Column (Right) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-brand-green/30 text-brand-green text-xs font-bold tracking-widest uppercase shadow-sm">
              About Urban Fresh
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              {description}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {points.map((point, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-stone-200 hover:border-brand-green/40 shadow-sm transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {point.icon}
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 mb-1">
                        {point.title}
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Link to full About page */}
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-brand-green hover:text-[#984C34] font-semibold text-sm group"
              >
                <span>Read our complete sourcing philosophy & heritage</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
