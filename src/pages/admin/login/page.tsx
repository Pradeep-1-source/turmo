'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cleanEmail = email.trim();
    const cleanPassword = password;

    if (!cleanEmail || !cleanPassword) {
      setError('Please provide both administrator email and password.');
      setLoading(false);
      return;
    }

    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (signInError) {
          // If user does not exist in Supabase auth yet, allow local fallback with configured admin creds
          if (cleanEmail.toLowerCase() === 'admin@urbanfresh.in' && cleanPassword === 'Urban112') {
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
        // Secure CMS Mode Authentication
        if (cleanEmail.toLowerCase() === 'admin@urbanfresh.in' && cleanPassword === 'Urban112') {
          localStorage.setItem('uf_admin_auth', 'true');
          router.push('/admin');
          return;
        } else {
          setError('Invalid administrator email or password.');
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

  return (
    <div className="admin-panel min-h-screen bg-navy-dark flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] bg-brand-green/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Card */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3.5 rounded-2xl overflow-hidden border border-brand-green/30 bg-navy-card shadow-glow-green-sm">
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
          <p className="text-[11px] sm:text-xs text-slate-300 mt-1 uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-lime" />
            <span>Secure Content Management System</span>
          </p>
        </div>

        {/* Login Form Box */}
        <div className="rounded-2xl sm:rounded-3xl bg-navy-card border border-white/10 p-6 sm:p-8 shadow-card-dark backdrop-blur-xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 z-10" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter administrator email"
                  autoComplete="username"
                  className="admin-field w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] placeholder:text-[#64748B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 z-10" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  autoComplete="current-password"
                  className="admin-field w-full pl-10 pr-11 py-3 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] placeholder:text-[#64748B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#17212B] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-[#03111F] font-extrabold text-sm shadow-glow-green hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 mt-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
              <span>Restricted administrative portal. Authorized access only.</span>
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
