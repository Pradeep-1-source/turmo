import React, { useState, useEffect } from 'react';
import {
  fetchQualityContent,
  fetchSiteSettings,
  fetchHomepageContent,
} from '@/lib/supabase';
import {
  defaultQualityContent,
  defaultSiteSettings,
  defaultHomepageContent,
} from '@/lib/defaultData';
import { QualityContent, SiteSettings, HomepageContent } from '@/types/database';
import QualityExportTimeline from '@/components/QualityExportTimeline';
import CTASection from '@/components/CTASection';
import { ShieldCheck, FileCheck, Layers, FlaskConical, Award } from 'lucide-react';

export default function QualityPage() {
  const [quality, setQuality] = useState<QualityContent>(defaultQualityContent);
  const [site, setSite] = useState<SiteSettings>(defaultSiteSettings);
  const [homepage, setHomepage] = useState<HomepageContent>(defaultHomepageContent);

  useEffect(() => {
    Promise.all([
      fetchQualityContent(),
      fetchSiteSettings(),
      fetchHomepageContent(),
    ]).then(([q, s, h]) => {
      setQuality(q);
      setSite(s);
      setHomepage(h);
    }).catch(err => console.warn(err));
  }, []);

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
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-100 font-normal leading-relaxed">
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
                <FlaskConical className="w-7 h-7 text-brand-lime" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">NABL Laboratory Testing</h3>
              <p className="text-sm text-slate-100 leading-relaxed mb-6 font-normal">
                {quality.lab_testing_info ||
                  'Batch-wise COA verification covering active curcumin levels, moisture content, peroxide value, and micro-organism thresholds.'}
              </p>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-100 pt-4 border-t border-white/10">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                Heavy metal screening (Pb, Cd, As, Hg)
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                Pesticide residue testing below MRL
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                Microbiological safety verification
              </li>
            </ul>
          </div>

          {/* Card 2: Packaging Protection */}
          <div className="p-8 rounded-2xl bg-navy-card border border-white/10 shadow-card-dark flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-navy-surface border border-brand-green/30 flex items-center justify-center text-brand-green mb-6 shadow-glow-green-sm">
                <Layers className="w-7 h-7 text-brand-lime" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Export-Ready Packaging</h3>
              <p className="text-sm text-slate-200 leading-relaxed mb-6 font-normal">
                {quality.packaging_info ||
                  'Moisture-controlled multi-wall paper sacks, bulk drums, IBCs, and private-label packaging options designed to support the storage and transportation requirements of agricultural and food products.'}
              </p>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-200 pt-4 border-t border-white/10">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-lime shrink-0" />
                Moisture-barrier multi-wall craft bags
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-lime shrink-0" />
                Food-grade HDPE drums & IBC totes
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-lime shrink-0" />
                Fumigated heat-treated export pallets
              </li>
            </ul>
          </div>

          {/* Card 3: International Certifications */}
          <div className="p-8 rounded-2xl bg-navy-card border border-white/10 shadow-card-dark flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-navy-surface border border-brand-green/20 flex items-center justify-center text-brand-green mb-6">
                <FileCheck className="w-7 h-7 text-brand-lime" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Export Compliance</h3>
              <p className="text-sm text-slate-100 leading-relaxed mb-6 font-normal">
                {quality.certifications_info ||
                  'FSSAI regulatory adherence, Phytosanitary clearance, and transparent Certificate of Origin documentation for every shipment.'}
              </p>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-100 pt-4 border-t border-white/10">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                Government Phytosanitary certificate
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                FSSAI Central Exporter License
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                Non-GMO & purity compliance
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sourcing Call to action */}
      <CTASection
        whatsappNumber={site.whatsapp_number}
        phoneNumber={site.phone_number}
      />
    </div>
  );
}
