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
    <header className="bg-navy-dark/90 backdrop-blur-md border-b border-navy-border px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Hamburger Drawer Toggle */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-xl bg-navy-surface border border-white/10 text-slate-200 hover:text-white hover:border-brand-green/40 transition-colors shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5 text-brand-green" />
        </button>

        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-200 mt-0.5 truncate hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Supabase Status Pill */}
        <div
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border ${
            isConnected
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : 'bg-navy-surface border-brand-green/30 text-brand-lime'
          }`}
          title={isConnected ? 'Supabase Live Connected' : 'CMS Mode (Local & Ready)'}
        >
          <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="hidden xs:inline sm:inline">
            {isConnected ? 'Live Connected' : 'CMS Mode'}
          </span>
        </div>

        {/* Secure Admin Role Badge (No email or ID exposed) */}
        <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-navy-surface border border-brand-green/20 text-[11px] sm:text-xs text-slate-200 shadow-sm">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <span className="font-semibold text-slate-200">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
