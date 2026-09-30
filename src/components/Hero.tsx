'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ArrowRight, ShieldCheck, Globe, Sparkles } from 'lucide-react';
import { generateWhatsAppGeneralEnquiry } from '@/lib/whatsapp';

interface HeroProps {
  headline?: string;
  tagline?: string;
  badge?: string;
  image?: string;
  whatsappNumber?: string;
}

export default function Hero({
  headline = 'Premium Indian Products,\nDelivered Worldwide.',
  tagline = 'Authentic agricultural products sourced with care, processed to premium standards, and prepared for global markets.',
  badge = 'INDIAN ORIGIN • GLOBAL REACH',
  image = '/images/hero-bg.jpg',
  whatsappNumber = '919884449843',
}: HeroProps) {
  const whatsappUrl = generateWhatsAppGeneralEnquiry(
    'B2B Agricultural Export Consultation',
    whatsappNumber
  );

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-navy-dark">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src={image}
          alt="Lush Indian agricultural plantations and export landscape"
          fill
          priority
          className="object-cover object-center opacity-30 transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multitier Vignette and Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/80 to-navy-dark/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-navy-dark/60 to-navy-dark" />
        {/* Soft Green Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-green/10 rounded-full blur-[140px] pointer-events-none animate-glow-pulse" />
      </div>

      {/* Floating Leaf Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute top-1/4 left-[8%] animate-floating-leaf text-brand-green/30 text-3xl">
          🍃
        </div>
        <div
          className="absolute top-1/3 right-[12%] animate-floating-leaf text-brand-lime/25 text-4xl"
          style={{ animationDelay: '2.5s' }}
        >
          🌿
        </div>
        <div
          className="absolute bottom-1/4 left-[18%] animate-floating-leaf text-brand-green/20 text-2xl"
          style={{ animationDelay: '4.5s' }}
        >
          🌱
        </div>
        <div
          className="absolute top-2/3 right-[22%] animate-floating-leaf text-brand-lime/20 text-3xl"
          style={{ animationDelay: '1.5s' }}
        >
          🍃
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-surface/80 border border-brand-green/30 backdrop-blur-md mb-8 shadow-glow-green-sm animate-fadeIn">
          <Sparkles className="w-4 h-4 text-brand-lime" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-slate-200 uppercase">
            {badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          {headline.split('\n').map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                <span className="text-gradient-green drop-shadow-sm">{line}</span>
              ) : (
                <span>{line}</span>
              )}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          {tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-bold text-base shadow-glow-green hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-navy-surface/90 hover:bg-navy-surface border border-brand-green/40 hover:border-brand-green text-white font-semibold text-base backdrop-blur-md hover:scale-105 transition-all duration-300 group shadow-lg"
          >
            <MessageCircle className="w-5 h-5 fill-brand-green text-brand-green group-hover:scale-110 transition-transform" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>

        {/* Trust Badges under CTA */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-green" />
            <span>Certified NABL Lab COA</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-green" />
            <span>Direct Ocean Port Clearance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
            <span>100% Pure & Traceable Origin</span>
          </div>
        </div>
      </div>
    </section>
  );
}
