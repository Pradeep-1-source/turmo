import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  fetchQualityContent,
  fetchSiteSettings,
  fetchHomepageContent,
} from '@/lib/supabase';
import QualityExportTimeline from '@/components/QualityExportTimeline';
import GlobalExportMap from '@/components/GlobalExportMap';
import CTASection from '@/components/CTASection';
import { ShieldCheck, FileCheck, Layers, FlaskConical, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Export Quality Standards & Compliance | Urban Fresh',
  description:
    'Explore Urban Fresh quality benchmarks: Lab COA testing, sterile pulverization, cold-pressed extraction, moisture barrier packaging, and phytosanitary certification.',
};

export const revalidate = 60;

export default async function QualityPage() {
  const [quality, site, homepage] = await Promise.all([
    fetchQualityContent(),
    fetchSiteSettings(),
    fetchHomepageContent(),
  ]);

  return (
    <div className="pt-28 pb-20 bg-navy-dark min-h-screen">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-surface border border-brand-green/30 text-brand-green text-xs font-bold tracking-widest uppercase mb-4 shadow-glow-green-sm">
          <Award className="w-3.5 h-3.5 text-brand-lime" />
          International Quality Compliance
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
          {quality.title}
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          {quality.subtitle}
        </p>
      </div>

      {/* Main Timeline */}
      <QualityExportTimeline
        title={quality.title}
        subtitle={quality.subtitle}
        description={quality.description}
        steps={quality.process_steps}
        certificationsInfo={quality.certifications_info}
      />

      {/* Quality Architecture 3 Pillar Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Lab Testing */}
          <div className="p-8 rounded-2xl bg-navy-card border border-white/10 shadow-card-dark flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-navy-surface border border-brand-green/20 flex items-center justify-center text-brand-green mb-6">
                <FlaskConical className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Laboratory Verification</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {quality.lab_testing_info}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-brand-lime font-semibold">
              ✓ Batch-Wise COA Provided
            </div>
          </div>

          {/* Card 2: Packaging Integrity */}
          <div className="p-8 rounded-2xl bg-navy-card border border-white/10 shadow-card-dark flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-navy-surface border border-brand-lime/20 flex items-center justify-center text-brand-lime mb-6">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Export Packaging Formats</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {quality.packaging_info}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-brand-green font-semibold">
              ✓ Maritime Humidity Barrier
            </div>
          </div>

          {/* Card 3: Regulatory & Phytosanitary */}
          <div className="p-8 rounded-2xl bg-navy-card border border-white/10 shadow-card-dark flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-navy-surface border border-brand-green/20 flex items-center justify-center text-brand-green mb-6">
                <FileCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Clearance & Certifications</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {quality.certifications_info}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-brand-lime font-semibold">
              ✓ Complete Port Documentation
            </div>
          </div>
        </div>
      </div>

      {/* Global Trade Visual */}
      <GlobalExportMap
        title={homepage.global_export_title}
        description={homepage.global_export_description}
      />

      {/* WhatsApp Trade Desk CTA */}
      <CTASection
        whatsappNumber={site.whatsapp_number}
        phoneNumber={site.phone_number}
      />
    </div>
  );
}
