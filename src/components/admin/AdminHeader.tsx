import React, { useState } from 'react';
import { Database, ShieldCheck, Menu, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { isSupabaseConfigured, getSupabaseCredentials } from '@/lib/supabase';
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
  const [showConfigModal, setShowConfigModal] = useState(false);
  const currentCreds = getSupabaseCredentials();
  const [supabaseUrlInput, setSupabaseUrlInput] = useState(currentCreds.url || '');
  const [supabaseKeyInput, setSupabaseKeyInput] = useState(currentCreds.key || '');
  const [modalSaved, setModalSaved] = useState(false);

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('uf_supabase_url', supabaseUrlInput.trim());
      localStorage.setItem('uf_supabase_anon_key', supabaseKeyInput.trim());
      setModalSaved(true);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <>
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
          {/* Supabase Status Pill - Clickable to configure */}
          <button
            type="button"
            onClick={() => setShowConfigModal(true)}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold border shadow-sm transition-all hover:scale-105 active:scale-95 ${
              isConnected
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-amber-50 border-amber-400 text-amber-900 animate-pulse'
            }`}
            title={isConnected ? 'Live Cloud Database Connected' : 'Database Disconnected - Click to Connect'}
          >
            <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="hidden xs:inline sm:inline">
              {isConnected ? 'Cloud Synced' : '⚠️ Connect Database'}
            </span>
          </button>

          {/* Secure Admin Role Badge */}
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

      {/* Supabase Connection Dialog */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2 text-stone-900 font-extrabold text-base">
                <Database className="w-5 h-5 text-brand-green" />
                <span>Supabase Cloud Database Settings</span>
              </div>
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              To make new product images and updates appear across all devices (including mobile phones), your app must connect to your Supabase project. Enter your project URL and public anon key below, or set them in your Vercel Environment Variables.
            </p>

            <form onSubmit={handleSaveCredentials} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="url"
                  required
                  value={supabaseUrlInput}
                  onChange={(e) => setSupabaseUrlInput(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] text-xs font-mono focus:outline-none focus:border-brand-green"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1">
                  Supabase Public Anon Key
                </label>
                <input
                  type="text"
                  required
                  value={supabaseKeyInput}
                  onChange={(e) => setSupabaseKeyInput(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                  className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] text-xs font-mono focus:outline-none focus:border-brand-green"
                />
              </div>

              {modalSaved && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Credentials saved! Reloading application...</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:text-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-green text-white text-xs font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  Save & Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
