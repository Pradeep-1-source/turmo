import React from 'react';
import Link from 'next/link';
import { generateWhatsAppGeneralEnquiry } from '@/lib/whatsapp';
import { Home, MessageCircle, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  const whatsappUrl = generateWhatsAppGeneralEnquiry('General Inquiry');

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4 py-24 text-stone-800">
      <div className="max-w-md w-full text-center">
        {/* Visual Badge */}
        <div className="w-20 h-20 rounded-3xl bg-white border border-stone-200 flex items-center justify-center mx-auto mb-8 shadow-md">
          <AlertCircle className="w-10 h-10 text-brand-green" />
        </div>

        {/* 404 Header */}
        <h1 className="text-6xl font-black text-stone-900 mb-2">
          404
        </h1>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Export Page Not Found</h2>
        <p className="text-stone-700 font-medium text-sm leading-relaxed mb-8">
          The agricultural commodity or trade page you are looking for has been moved, renamed, or is currently unavailable.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-green hover:bg-[#984C34] text-white font-bold text-sm shadow-md hover:shadow-xl transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-900 hover:bg-black text-white font-semibold text-sm transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
