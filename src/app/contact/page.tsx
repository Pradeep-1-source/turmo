import React from 'react';
import type { Metadata } from 'next';
import { fetchContactSettings, fetchSiteSettings } from '@/lib/supabase';
import ContactSection from '@/components/ContactSection';
import CTASection from '@/components/CTASection';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Urban Fresh - B2B Agricultural Exports Desk',
  description:
    'Contact Urban Fresh in Erode, Tamil Nadu. Connect directly via WhatsApp or telephone for B2B export quotes, container quantities, and product specifications.',
};

export const revalidate = 60;

export default async function ContactPage() {
  const [contact, site] = await Promise.all([
    fetchContactSettings(),
    fetchSiteSettings(),
  ]);

  return (
    <div className="pt-28 pb-20 bg-navy-dark min-h-screen">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-surface border border-brand-green/30 text-brand-green text-xs font-bold tracking-widest uppercase mb-4 shadow-glow-green-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
          Direct Trade Communication
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
          Contact Our Export Desk
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          Skip generic email tickets and online checkout forms. Chat directly with our trade directors
          on WhatsApp for fast specification review and competitive container pricing.
        </p>
      </div>

      {/* Main Contact Section */}
      <ContactSection contact={contact} />

      {/* Quick Trade CTA */}
      <CTASection
        whatsappNumber={site.whatsapp_number}
        phoneNumber={site.phone_number}
      />
    </div>
  );
}
