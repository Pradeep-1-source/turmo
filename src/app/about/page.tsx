import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  fetchAboutContent,
  fetchSiteSettings,
  fetchHomepageContent,
} from '@/lib/supabase';
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

export const metadata: Metadata = {
  title: 'About Us | Urban Fresh - Rooted in India. Prepared for the World.',
  description:
    'Learn about Urban Fresh: authentic Indian agricultural commodities sourced with care in Tamil Nadu, processed to premium standards, and exported to B2B buyers worldwide.',
};

export const revalidate = 60;

export default async function AboutPage() {
  const [about, site, homepage] = await Promise.all([
    fetchAboutContent(),
    fetchSiteSettings(),
    fetchHomepageContent(),
  ]);

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
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border border-brand-green/30 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-brand-green shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Erode, Tamil Nadu</h4>
                  <p className="text-xs text-slate-300">
                    The heartland of India’s prime turmeric and oilseed cultivation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Connecting Quality Indian Agriculture with Global Buyers
            </h2>

            <div className="space-y-4 text-base text-slate-300 leading-relaxed font-normal">
              {about.description.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-navy-surface/80 border border-white/5">
                <div className="flex items-center gap-2 text-brand-lime font-bold text-sm mb-1">
                  <Target className="w-4 h-4 text-brand-green" />
                  Our Mission
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{about.mission}</p>
              </div>

              <div className="p-4 rounded-xl bg-navy-surface/80 border border-white/5">
                <div className="flex items-center gap-2 text-brand-green font-bold text-sm mb-1">
                  <Compass className="w-4 h-4 text-brand-lime" />
                  Our Vision
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{about.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      {about.highlights && about.highlights.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Operational Standards & Capabilities
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Every shipment is backed by institutional oversight, lab COA verification, and sea-worthy logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.highlights.map((h, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-navy-card border border-white/5 hover:border-brand-green/40 shadow-card-dark transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-surface border border-brand-green/20 flex items-center justify-center text-brand-lime mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{h.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4 Pillars Section */}
      <WhyUrbanFresh items={homepage.why_us_items} />

      {/* WhatsApp CTA */}
      <CTASection
        whatsappNumber={site.whatsapp_number}
        phoneNumber={site.phone_number}
      />
    </div>
  );
}
