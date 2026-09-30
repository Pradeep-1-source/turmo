import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  fetchAboutContent,
  fetchSiteSettings,
  fetchHomepageContent,
} from '@/lib/supabase';
import {
  defaultAboutContent,
  defaultSiteSettings,
  defaultHomepageContent,
} from '@/lib/defaultData';
import { AboutContent, SiteSettings, HomepageContent } from '@/types/database';
import WhyUrbanFresh from '@/components/WhyUrbanFresh';
import CTASection from '@/components/CTASection';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Target,
  Compass,
} from 'lucide-react';

export default function AboutPage() {
  const [about, setAbout] = useState<AboutContent>(defaultAboutContent);
  const [site, setSite] = useState<SiteSettings>(defaultSiteSettings);
  const [homepage, setHomepage] = useState<HomepageContent>(defaultHomepageContent);

  useEffect(() => {
    Promise.all([
      fetchAboutContent(),
      fetchSiteSettings(),
      fetchHomepageContent(),
    ]).then(([a, s, h]) => {
      setAbout(a);
      setSite(s);
      setHomepage(h);
    }).catch(err => console.warn(err));
  }, []);

  return (
    <div className="pt-28 pb-20 bg-navy-dark min-h-screen">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-surface border border-brand-green/30 text-brand-green text-xs font-bold tracking-widest uppercase mb-4 shadow-glow-green-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
          Agricultural Heritage & Export Quality
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 max-w-4xl mx-auto">
          {about.title}
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          {about.subtitle}
        </p>
      </div>

      {/* Main Narrative with Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-card-dark aspect-[4/3] bg-navy-card">
              <Image
                src={about.image_url || '/images/hero-bg.jpg'}
                alt="Urban Fresh agricultural cultivation and export facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Origin Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-navy-card/95 border border-brand-green/30 rounded-2xl p-4 shadow-card-hover backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green/20 flex items-center justify-center text-brand-green">
                <MapPin className="w-5 h-5 text-brand-lime" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Exporter Location</p>
                <p className="text-sm font-bold text-white">Erode, Tamil Nadu, India</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-brand-green text-sm font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-brand-lime" />
              Responsible Indian Exporter
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-snug">
              Bridging Traditional Indian Farming with Global Regulatory Rigor
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-6 font-normal whitespace-pre-line">
              {about.description}
            </p>

            {/* Mission & Vision Mini Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-5 rounded-2xl bg-navy-surface border border-white/10 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-brand-green font-bold text-sm">
                  <Target className="w-4 h-4 text-brand-lime" />
                  Our Mission
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {about.mission}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-navy-surface border border-white/10 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-brand-green font-bold text-sm">
                  <Compass className="w-4 h-4 text-brand-lime" />
                  Our Vision
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {about.vision}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights / Operational Pillars */}
      {about.highlights && about.highlights.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Our Core Operational Competencies
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Engineered to meet the exact procurement benchmarks of commercial international importers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-navy-card border border-white/10 hover:border-brand-green/30 transition-colors shadow-card-dark"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-surface border border-brand-green/20 flex items-center justify-center text-brand-green mb-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-lime" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Why Choose Urban Fresh */}
      <WhyUrbanFresh items={homepage.why_us_items} />

      {/* Sourcing Call to action */}
      <CTASection
        whatsappNumber={site.whatsapp_number}
        phoneNumber={site.phone_number}
      />
    </div>
  );
}
