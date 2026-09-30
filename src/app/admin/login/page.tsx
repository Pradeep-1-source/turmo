'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@urbanfresh.in');
  const [password, setPassword] = useState('UrbanFreshExport2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          // If user does not exist in Supabase auth yet, allow local fallback if standard admin creds
          if (email === 'admin@urbanfresh.in' && password === 'UrbanFreshExport2026!') {
            localStorage.setItem('uf_admin_auth', 'true');
            router.push('/admin');
            return;
          }
          throw signInError;
        }

        if (data.session) {
          localStorage.setItem('uf_admin_auth', 'true');
          router.push('/admin');
          return;
        }
      } else {
        // Local CMS Demo Mode
        if (email && password) {
          localStorage.setItem('uf_admin_auth', 'true');
          router.push('/admin');
          return;
        } else {
          setError('Please provide email and password.');
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Authentication failed. Please check credentials.');
      } else {
        setError('Authentication failed. Please check credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@urbanfresh.in');
    setPassword('UrbanFreshExport2026!');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-green/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Card */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden border border-brand-green/30 bg-navy-card shadow-glow-green-sm">
            <Image
              src="/images/urban-fresh-logo.jpg"
              alt="Urban Fresh Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Urban Fresh Admin Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
            B2B Content Management System
          </p>
        </div>

        {/* Login Form Box */}
        <div className="rounded-3xl bg-navy-card/90 border border-white/10 p-8 shadow-card-dark backdrop-blur-xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@urbanfresh.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-surface border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-surface border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-sm shadow-glow-green hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs text-brand-lime hover:underline font-semibold"
            >
              Autofill Default Administrator Credentials
            </button>
            <p className="text-[11px] text-slate-400 mt-1">
              admin@urbanfresh.in • UrbanFreshExport2026!
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
