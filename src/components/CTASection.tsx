'use client';

import React from 'react';
import { MessageCircle, Phone, ArrowUpRight, Clock, ShieldCheck } from 'lucide-react';
import { generateWhatsAppGeneralEnquiry } from '@/lib/whatsapp';

interface CTASectionProps {
  whatsappNumber?: string;
  phoneNumber?: string;
}

export default function CTASection({
  whatsappNumber = '919884449843',
  phoneNumber = '+91 9884449843',
}: CTASectionProps) {
  const whatsappUrl = generateWhatsAppGeneralEnquiry(
    'B2B Commercial Sourcing Requirement',
    whatsappNumber
  );

  return (
    <section className="py-20 bg-navy-dark relative overflow-hidden border-t border-navy-border/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-b from-navy-card to-navy-surface border border-brand-green/40 p-8 sm:p-14 text-center shadow-card-hover overflow-hidden">
          {/* Subtle glow lights */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-green/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-lime/10 rounded-full blur-[100px] pointer-events-none" />

          <span className="inline-block px-4 py-1.5 rounded-full bg-navy-dark/90 border border-brand-green/30 text-xs sm:text-sm font-bold tracking-widest text-brand-lime uppercase mb-6">
            B2B Trade & Global Supply Desk
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight mb-4">
            Looking for reliable Indian agricultural products for your business?
          </h2>

          <p className="text-base sm:text-xl text-slate-300 font-medium mb-10 max-w-xl mx-auto">
            Let&apos;s discuss your requirement. Connect directly with our export desk for specifications,
            batch COA certificates, and competitive CIF/FOB pricing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-base shadow-glow-green hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 fill-navy-dark text-navy-dark" />
              <span>Send Enquiry on WhatsApp</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>

            <a
              href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-navy-surface border border-white/10 hover:border-brand-green/40 text-slate-200 font-semibold text-base hover:text-white transition-all"
            >
              <Phone className="w-4 h-4 text-brand-green" />
              <span>Direct Call: {phoneNumber}</span>
            </a>
          </div>

          {/* Quick SLA / Info points */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-green" />
              <span>Typical Response Time: &lt; 2 Hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-lime" />
              <span>Full Export Documentation Provided</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
