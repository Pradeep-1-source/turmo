import React, { useState, useEffect } from 'react';
import { fetchContactSettings, fetchSiteSettings } from '@/lib/supabase';
import { defaultContactSettings, defaultSiteSettings } from '@/lib/defaultData';
import { ContactSettings, SiteSettings } from '@/types/database';
import ContactSection from '@/components/ContactSection';
import CTASection from '@/components/CTASection';
import { Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [contact, setContact] = useState<ContactSettings>(defaultContactSettings);
  const [site, setSite] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    Promise.all([
      fetchContactSettings(),
      fetchSiteSettings(),
    ]).then(([c, s]) => {
      setContact(c);
      setSite(s);
    }).catch(err => console.warn(err));
  }, []);

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
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-100 font-normal leading-relaxed">
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
