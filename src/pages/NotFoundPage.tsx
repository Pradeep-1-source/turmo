import React from 'react';
import Link from 'next/link';
import { generateWhatsAppGeneralEnquiry } from '@/lib/whatsapp';
import { Home, MessageCircle, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  const whatsappUrl = generateWhatsAppGeneralEnquiry('General Inquiry');

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full text-center">
        {/* Visual Badge */}
        <div className="w-20 h-20 rounded-3xl bg-navy-card border border-brand-green/30 flex items-center justify-center mx-auto mb-8 shadow-card-hover">
          <AlertCircle className="w-10 h-10 text-brand-lime" />
        </div>

        {/* 404 Header */}
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-4">Export Page Not Found</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          The agricultural commodity or trade page you are looking for has been moved, renamed, or is currently unavailable.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-bold text-sm shadow-glow-green hover:shadow-xl transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-navy-surface border border-white/10 hover:border-brand-green/30 text-white font-semibold text-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 text-brand-green" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
