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
  UserCheck,
  Quote,
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
    ])
      .then(([a, s, h]) => {
        setAbout(a);
        setSite(s);
        setHomepage(h);
      })
      .catch((err) => console.warn('Using default content for about page:', err));
  }, []);

  const pageTitle = about.title || 'About Urban Fresh';
  const mainHeading = about.subtitle || 'From Nature’s Richness to the World’s Markets';
  const commitmentText =
    about.commitment ||
    about.mission ||
    'Quality is at the heart of everything we do. We believe in transparent business practices, responsible sourcing, consistent product standards, and building lasting partnerships with farmers, suppliers, distributors, and buyers worldwide.';
  const visionText =
    about.vision ||
    'To establish Urban Fresh as a trusted global name in the agricultural and food products industry by delivering quality, creating value, and connecting India’s agricultural resources with markets around the world.';
  const closingStatement =
    about.closing_statement || 'Growing Together. Delivering Quality. Building Trust.';
  const managingDirector = about.managing_director || 'Jayasuriya R';
  const designation = about.designation || 'Managing Director | Urban Fresh';

  return (
    <div className="pt-28 pb-20 bg-navy-dark min-h-screen text-slate-100">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-surface border border-brand-green/40 text-brand-lime text-xs font-bold tracking-widest uppercase mb-4 shadow-glow-green-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
          <span>{pageTitle}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          {mainHeading}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-brand-green to-brand-lime mx-auto rounded-full mb-6" />
      </div>

      {/* Main Narrative with Facility Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-card-dark aspect-[4/3] bg-navy-card">
              <Image
                src={about.image_url || '/images/hero-bg.jpg'}
                alt="Urban Fresh agricultural cultivation and export facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent opacity-70" />
            </div>

            {/* Origin Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-navy-card border border-brand-green/40 rounded-2xl p-4 shadow-card-hover backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green/20 flex items-center justify-center text-brand-green">
                <MapPin className="w-5 h-5 text-brand-lime" />
              </div>
              <div>
                <p className="text-xs text-slate-300 font-medium">Exporter Location</p>
                <p className="text-sm font-bold text-white">Erode, Tamil Nadu, India</p>
              </div>
            </div>
          </div>

          {/* Narrative Text */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-green text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-brand-lime" />
              <span>Dedicated Agricultural Sourcing & Export</span>
            </div>

            <div className="prose prose-invert max-w-none space-y-4">
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                At Urban Fresh, we bring the richness of agriculture closer to the world. Driven by
                quality, trust, and a passion for agricultural products, we aim to connect India’s
                agricultural potential with opportunities across domestic and international markets.
              </p>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                We specialize in sourcing and supplying quality agro-based and food products, with a
                commitment to reliable service, careful handling, and customer satisfaction. From
                selecting the right products to coordinating dependable deliveries, we strive to
                make every business relationship meaningful and every transaction trustworthy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Commitment & Vision Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Our Commitment Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-navy-card border border-white/10 hover:border-brand-green/40 transition-colors shadow-card-dark flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-navy-surface border border-brand-green/30 flex items-center justify-center text-brand-green mb-6 shadow-glow-green-sm">
                <Target className="w-6 h-6 text-brand-lime" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Our Commitment
              </h2>
              <p className="text-slate-200 text-base leading-relaxed">
                {commitmentText}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-brand-lime">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span>Transparent Sourcing & Consistent Product Standards</span>
            </div>
          </div>

          {/* Our Vision Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-navy-card border border-white/10 hover:border-brand-green/40 transition-colors shadow-card-dark flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-navy-surface border border-brand-lime/30 flex items-center justify-center text-brand-lime mb-6 shadow-glow-green-sm">
                <Compass className="w-6 h-6 text-brand-green" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Our Vision
              </h2>
              <p className="text-slate-200 text-base leading-relaxed">
                {visionText}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-brand-green">
              <CheckCircle2 className="w-4 h-4 text-brand-lime" />
              <span>Trusted Global Presence in Agricultural & Food Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Closing Statement & Managing Director Signature Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-card via-navy-surface to-navy-card border border-brand-green/30 shadow-card-dark text-center relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Quote Icon */}
          <div className="w-12 h-12 rounded-full bg-brand-green/20 border border-brand-green/40 mx-auto flex items-center justify-center text-brand-lime mb-4">
            <Quote className="w-5 h-5 text-brand-lime" />
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-8">
            &ldquo;{closingStatement}&rdquo;
          </h3>

          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-navy-dark border border-brand-green/40 flex items-center justify-center shadow-sm">
              <UserCheck className="w-7 h-7 text-brand-green" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-extrabold text-white tracking-wide">
                {managingDirector}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-brand-lime uppercase tracking-wider mt-0.5">
                {designation}
              </p>
            </div>
          </div>
        </div>
      </div>

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
