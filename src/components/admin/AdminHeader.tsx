'use client';

import React from 'react';
import { Database, ShieldCheck, User } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  userEmail?: string;
}

export default function AdminHeader({
  title,
  subtitle,
  userEmail = 'admin@urbanfresh.in',
}: AdminHeaderProps) {
  const isConnected = isSupabaseConfigured();

  return (
    <header className="bg-navy-dark/80 backdrop-blur-md border-b border-navy-border px-8 py-5 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Supabase Status Pill */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
            isConnected
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : 'bg-navy-surface border-brand-green/30 text-brand-lime'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>{isConnected ? 'Supabase Live Connected' : 'CMS Mode (Local & Ready)'}</span>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-navy-surface border border-white/5 text-xs text-slate-200">
          <div className="w-6 h-6 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center font-bold">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="hidden sm:inline font-medium">{userEmail}</span>
        </div>
      </div>
    </header>
  );
}
