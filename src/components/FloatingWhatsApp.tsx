'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { generateWhatsAppGeneralEnquiry } from '@/lib/whatsapp';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
}

export default function FloatingWhatsApp({ whatsappNumber = '919884449843' }: FloatingWhatsAppProps) {
  const pathname = usePathname();

  // Hide in admin panel
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const url = generateWhatsAppGeneralEnquiry(undefined, whatsappNumber);

  return (
    <aside
      aria-label="WhatsApp live enquiry support"
      className="fixed bottom-6 right-6 z-50 flex items-center group"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-bold text-sm shadow-glow-green hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
        title="Chat with Urban Fresh on WhatsApp"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-navy-dark opacity-20"></span>
          <MessageCircle className="relative w-6 h-6 fill-navy-dark text-navy-dark" />
        </span>
        <span className="hidden sm:inline-block font-extrabold tracking-wide">
          Enquire on WhatsApp
        </span>
      </a>
    </aside>
  );
}
