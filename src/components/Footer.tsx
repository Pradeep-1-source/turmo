'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  ShieldCheck,
  Globe2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { generateWhatsAppGeneralEnquiry } from '@/lib/whatsapp';

interface FooterProps {
  whatsappNumber?: string;
  phoneNumber?: string;
  email?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export default function Footer({
  whatsappNumber = '919884449843',
  phoneNumber = '+91 9884449843',
  email = 'export@urbanfresh.in',
  addressLine1 = 'D.No-48, VELLI VALASU, Attavanai Anumanpalli',
  addressLine2 = 'PO: Arachalur, DIST: Erode',
  city = 'Erode',
  state = 'Tamil Nadu',
  postalCode = '638101',
  country = 'India',
}: FooterProps) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl = generateWhatsAppGeneralEnquiry('Export Enquiry & Pricing', whatsappNumber);

  return (
    <footer className="bg-[#141211] text-stone-100 border-t border-stone-800 relative overflow-hidden pb-24 sm:pb-14">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-green/10 blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-brand-green/30 bg-stone-900 shadow-sm group-hover:border-brand-green transition-all">
                <Image
                  src="/images/urban-fresh-logo.jpg"
                  alt="Urban Fresh Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-wider text-white flex items-center gap-1.5">
                  URBAN <span className="text-brand-green">FRESH</span>
                </span>
                <span className="text-[10px] tracking-widest text-stone-200 uppercase font-bold block">
                  GROWN WITH CARE DELIVERED WORLD WIDE
                </span>
              </div>
            </Link>

            <p className="text-sm text-stone-200 leading-relaxed max-w-sm font-normal">
              Connecting pure Indian agricultural heritage with international B2B importers, food
              manufacturers, and cosmetic enterprises worldwide. Clean-label, farm-traceable, and
              prepared for international commerce.
            </p>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-brand-green hover:bg-[#984C34] text-white text-sm font-semibold transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>Quick WhatsApp Trade Desk</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-brand-green" />
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-stone-200 hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3 h-3 text-brand-green" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-200 hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3 h-3 text-brand-green" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-stone-200 hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3 h-3 text-brand-green" />
                  Export Catalogue
                </Link>
              </li>
              <li>
                <Link href="/quality" className="text-stone-200 hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3 h-3 text-brand-green" />
                  Quality & Standards
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-200 hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ArrowRight className="w-3 h-3 text-brand-green" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <Lock className="w-3 h-3 text-brand-lime" />
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Commodities */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              Key Exports
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/products/premium-indian-turmeric-powder-fingers"
                  className="text-stone-200 hover:text-white transition-colors font-medium block"
                >
                  High Curcumin Turmeric
                </Link>
              </li>
              <li>
                <Link
                  href="/products/premium-cold-pressed-coconut-oil"
                  className="text-stone-200 hover:text-white transition-colors font-medium block"
                >
                  Cold-Pressed Virgin Coconut Oil
                </Link>
              </li>
              <li>
                <Link
                  href="/products/premium-cold-pressed-groundnut-oil"
                  className="text-stone-200 hover:text-white transition-colors font-medium block"
                >
                  Pure Cold-Pressed Groundnut Oil
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-brand-lime hover:text-white font-semibold transition-colors block">
                  View Full Catalogue →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Registered Office
            </h4>
            <ul className="space-y-3 text-sm text-stone-100">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {addressLine1}, {addressLine2}, {city}, {state} - {postalCode}, {country}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-green shrink-0" />
                <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="hover:text-white text-stone-100 font-medium">
                  {phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-green shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white text-stone-100 font-medium">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-300 text-center md:text-left pr-0 md:pr-48">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
            <span>
              © {new Date().getFullYear()} <strong className="text-white font-bold">Urban Fresh</strong>. All rights reserved. B2B Agricultural Exports.
            </span>
            <span className="hidden sm:inline text-stone-400">•</span>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-white hover:text-brand-lime transition-all font-semibold px-2.5 py-1 rounded-md bg-stone-800/90 hover:bg-stone-700 border border-stone-700 hover:border-brand-green/60 shadow-sm"
              title="Secure Administrator Access"
            >
              <Lock className="w-3.5 h-3.5 text-brand-lime" />
              <span>Admin Access</span>
            </Link>
          </div>

          <div className="flex items-center gap-5 text-stone-200 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              <span>FSSAI & APEDA Export Compliant</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
