import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, MessageCircle } from 'lucide-react';
import { generateWhatsAppGeneralEnquiry } from '@/lib/whatsapp';

export default function NotFound() {
  const whatsappUrl = generateWhatsAppGeneralEnquiry('General Inquiry');

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-navy-surface border border-brand-green/30 flex items-center justify-center text-brand-green shadow-glow-green">
          <span className="text-3xl font-extrabold">404</span>
        </div>

        <h1 className="text-3xl font-extrabold text-white">Commodity Page Not Found</h1>

        <p className="text-sm text-slate-300">
          The requested export commodity or page could not be located. Explore our product catalogue or
          reach out to our WhatsApp trade desk.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-green text-navy-dark font-bold text-sm shadow-glow-green hover:scale-105 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-surface border border-white/10 hover:border-brand-green/40 text-slate-200 text-sm font-semibold hover:text-white transition-all"
          >
            <MessageCircle className="w-4 h-4 text-brand-green" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
