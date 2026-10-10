'use client';

import React from 'react';
import { Database, ShieldCheck, Menu } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useAdmin } from './AdminContext';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({
  title,
  subtitle,
}: AdminHeaderProps) {
  const isConnected = isSupabaseConfigured();
  const { toggleSidebar } = useAdmin();

  return (
    <header className="bg-navy-dark/95 backdrop-blur-md border-b border-navy-border px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Hamburger Drawer Toggle */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:text-black hover:border-brand-green/40 transition-colors shrink-0 shadow-sm"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5 text-brand-green" />
        </button>

        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-extrabold text-stone-900 tracking-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-stone-700 font-medium mt-0.5 truncate hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Supabase Status Pill */}
        <div
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold border shadow-sm ${
            isConnected
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-stone-100 border-brand-green/40 text-brand-green'
          }`}
          title={isConnected ? 'Supabase Live Connected' : 'CMS Mode (Local & Ready)'}
        >
          <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="hidden xs:inline sm:inline">
            {isConnected ? 'Live Connected' : 'CMS Mode'}
          </span>
        </div>

        {/* Secure Admin Role Badge (No email or ID exposed) */}
        <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white border border-stone-300 text-[11px] sm:text-xs text-stone-900 shadow-sm">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <span className="font-bold text-stone-900">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
