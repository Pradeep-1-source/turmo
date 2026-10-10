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
    <div className="pt-28 pb-20 bg-navy-dark min-h-screen text-stone-800">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-green/30 text-brand-green text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-green" />
          <span>{pageTitle}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          {mainHeading}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-brand-green to-brand-lime mx-auto rounded-full mb-6" />
      </div>

      {/* Main Narrative with Facility Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-lg aspect-[4/3] bg-white">
              <Image
                src={about.image_url || '/images/hero-bg.jpg'}
                alt="Urban Fresh agricultural cultivation and export facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>

            {/* Origin Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white/95 border border-stone-200 rounded-2xl p-4 shadow-md backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                <MapPin className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <p className="text-xs text-stone-800 font-bold">Exporter Location</p>
                <p className="text-sm font-bold text-stone-900">Erode, Tamil Nadu, India</p>
              </div>
            </div>
          </div>

          {/* Narrative Text */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-green text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              <span>Dedicated Agricultural Sourcing & Export</span>
            </div>

            <div className="prose prose-stone max-w-none space-y-4">
              <p className="text-stone-800 text-base sm:text-lg leading-relaxed font-normal">
                At Urban Fresh, we bring the richness of agriculture closer to the world. Driven by
                quality, trust, and a passion for agricultural products, we aim to connect India’s
                agricultural potential with opportunities across domestic and international markets.
              </p>
              <p className="text-stone-800 text-base sm:text-lg leading-relaxed font-normal">
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
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 hover:border-brand-green/40 transition-colors shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-brand-green mb-6 shadow-sm">
                <Target className="w-6 h-6 text-brand-green" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-4">
                Our Commitment
              </h2>
              <p className="text-stone-800 text-base leading-relaxed font-medium">
                {commitmentText}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-brand-green">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span>Transparent Sourcing & Consistent Product Standards</span>
            </div>
          </div>

          {/* Our Vision Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 hover:border-brand-green/40 transition-colors shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-brand-green mb-6 shadow-sm">
                <Compass className="w-6 h-6 text-brand-green" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-4">
                Our Vision
              </h2>
              <p className="text-stone-800 text-base leading-relaxed font-medium">
                {visionText}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-brand-green">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span>Trusted Global Presence in Agricultural & Food Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Closing Statement & Managing Director Signature Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#FAF8F5] via-white to-[#FAF8F5] border border-stone-200 shadow-md text-center relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Quote Icon */}
          <div className="w-12 h-12 rounded-full bg-brand-green/10 border border-brand-green/30 mx-auto flex items-center justify-center text-brand-green mb-4">
            <Quote className="w-5 h-5 text-brand-green" />
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight mb-8">
            &ldquo;{closingStatement}&rdquo;
          </h3>

          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-stone-200">
            <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-sm">
              <UserCheck className="w-7 h-7 text-brand-green" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-extrabold text-stone-900 tracking-wide">
                {managingDirector}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-brand-green uppercase tracking-wider mt-0.5">
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
