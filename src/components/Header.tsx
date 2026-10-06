'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { generateWhatsAppGeneralEnquiry } from '@/lib/whatsapp';

interface HeaderProps {
  whatsappNumber?: string;
  phoneNumber?: string;
}

export default function Header({
  whatsappNumber = '919884449843',
  phoneNumber = '+91 9884449843',
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  if (isAdmin) {
    return null; // Header is handled by Admin layout
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Quality & Export', href: '/quality' },
    { label: 'Contact', href: '/contact' },
  ];

  const whatsappUrl = generateWhatsAppGeneralEnquiry('General Export Consultation', whatsappNumber);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHome
            ? 'glass-header py-2.5 sm:py-3 shadow-card-dark'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-brand-green/30 bg-navy-card shadow-glow-green-sm group-hover:border-brand-green transition-all shrink-0">
              <Image
                src="/images/urban-fresh-logo.jpg"
                alt="Urban Fresh Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-2xl tracking-wider text-white flex items-center gap-1.5 leading-none">
                URBAN <span className="text-brand-green">FRESH</span>
              </span>
              <span className="text-[8px] sm:text-[10px] tracking-widest text-slate-300 uppercase font-medium mt-1">
                Grown with Care • Delivered Worldwide
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-brand-green'
                      : 'text-slate-200 hover:text-brand-green'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-lime to-brand-green rounded-full shadow-glow-green" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action / CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-semibold text-sm shadow-glow-green hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 fill-navy-dark text-navy-dark" />
              <span>WhatsApp Enquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-full bg-brand-green text-navy-dark shadow-glow-green"
              aria-label="Enquire on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-navy-dark text-navy-dark" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl bg-navy-surface border border-navy-border text-slate-200 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-navy-dark/98 backdrop-blur-2xl pt-20 px-6 pb-8 flex flex-col justify-between overflow-y-auto animate-fadeIn">
          <div className="space-y-3 pt-4">
            <div className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-3 px-1">
              Menu Navigation
            </div>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-xl text-base sm:text-lg font-medium transition-all ${
                    isActive
                      ? 'bg-navy-surface text-brand-green border-l-4 border-brand-green font-semibold shadow-sm'
                      : 'text-slate-200 hover:bg-navy-surface/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-6 mt-6 border-t border-navy-border space-y-3.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-bold text-sm sm:text-base shadow-glow-green active:scale-95 transition-transform"
            >
              <MessageCircle className="w-5 h-5 fill-navy-dark text-navy-dark" />
              <span>Enquire on WhatsApp</span>
            </a>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 py-1">
              <Phone className="w-3.5 h-3.5 text-brand-green" />
              <span>{phoneNumber}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
