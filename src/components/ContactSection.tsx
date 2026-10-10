'use client';

import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { ContactSettings } from '@/types/database';
import { generateWhatsAppGeneralEnquiry } from '@/lib/whatsapp';

interface ContactSectionProps {
  contact?: ContactSettings;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const companyName = contact?.company_name || 'Urban Fresh';
  const addressLine1 = contact?.address_line1 || 'D.No-48, VELLI VALASU, Attavanai Anumanpalli';
  const addressLine2 = contact?.address_line2 || 'PO: Arachalur, DIST: Erode';
  const city = contact?.city || 'Erode';
  const state = contact?.state || 'Tamil Nadu';
  const postalCode = contact?.postal_code || '638101';
  const country = contact?.country || 'India';
  const phone = contact?.phone || '+91 9884449843';
  const whatsapp = contact?.whatsapp || '+91 9884449843';
  const email = contact?.email || 'export@urbanfresh.in';
  const businessHours = contact?.business_hours || 'Mon - Sat: 9:00 AM - 6:30 PM IST';

  const whatsappUrl = generateWhatsAppGeneralEnquiry('Export Partnership Discussion', whatsapp);

  return (
    <section id="contact" className="py-24 bg-navy-dark relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-green/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-brand-green/30 text-brand-green text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            Connect With Export Team
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            Direct Trade & Export Enquiries
          </h2>
          <p className="text-base sm:text-lg text-stone-800 font-medium leading-relaxed">
            Connect directly with our international trade desk via WhatsApp or phone. No tedious forms
            or waiting queues—we discuss your exact cargo specifications instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Company & Office Cards */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="rounded-2xl bg-white p-8 border border-stone-200 shadow-md">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-brand-green">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900">{companyName}</h3>
                  <p className="text-xs uppercase tracking-wider text-brand-green font-semibold">
                    Registered Exporter HQ
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-sm text-stone-800">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">Headquarters & Processing Hub:</strong>
                    <p className="leading-relaxed mt-0.5 font-normal">
                      {addressLine1},<br />
                      {addressLine2},<br />
                      {city}, {state} - {postalCode}, {country}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <Phone className="w-5 h-5 text-brand-green shrink-0" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">Direct Telephone:</strong>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-brand-green transition-colors font-medium text-stone-900">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <MessageCircle className="w-5 h-5 text-brand-green shrink-0" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">WhatsApp Trade Desk:</strong>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors font-medium text-stone-900">
                      {whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <Mail className="w-5 h-5 text-brand-green shrink-0" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">Export Email:</strong>
                    <a href={`mailto:${email}`} className="hover:text-brand-green transition-colors font-medium text-stone-900">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <Clock className="w-5 h-5 text-brand-green shrink-0" />
                  <div>
                    <strong className="text-stone-900 block font-semibold">Operating Hours:</strong>
                    <span className="font-medium text-stone-900">{businessHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Assurance */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-brand-green shrink-0" />
              <div className="text-xs sm:text-sm text-stone-800 font-medium">
                <strong className="text-stone-900 block font-bold">Fast Documentation Verification</strong>
                Phytosanitary certificates, Certificates of Analysis (COA), and packaging samples dispatched promptly for verified B2B importers.
              </div>
            </div>
          </div>

          {/* Action Card: WHATSAPP DIRECT (NO FORMS!) */}
          <div className="lg:col-span-6 rounded-2xl bg-white p-8 sm:p-10 border border-stone-200 shadow-lg flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-wider mb-6">
                Fastest Response
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-4">
                Looking for reliable Indian agricultural products for your business?
              </h3>

              <p className="text-base text-stone-800 font-medium leading-relaxed mb-6">
                Let&apos;s discuss your requirement. Skip lengthy forms and get real-time answers directly from our trade directors on WhatsApp.
              </p>

              <div className="space-y-3.5 mb-8">
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-green mt-1.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-stone-800 font-medium">
                    <strong className="text-stone-900">Container Loads & MOQ:</strong> Share your destination port (CIF / FOB terms).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-green mt-1.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-stone-800 font-medium">
                    <strong className="text-stone-900">Custom Packaging:</strong> Private labeling, multi-ply bags, IBCs or bulk drums.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-green mt-1.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-stone-800 font-medium">
                    <strong className="text-stone-900">Pre-Shipment Samples:</strong> Courier dispatch of verified harvest samples.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-200">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-brand-green hover:bg-[#984C34] text-white font-extrabold text-base shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 fill-white text-white shrink-0" />
                <span>Send Enquiry on WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-center text-xs text-stone-700 font-semibold">
                Direct WhatsApp channel: <strong>+91 9884449843</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
