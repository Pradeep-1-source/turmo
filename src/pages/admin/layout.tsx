'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { AdminProvider } from '@/components/admin/AdminContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Outlet } from 'react-router-dom';

export default function AdminLayout({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Check local session storage first
      const localAuth = localStorage.getItem('uf_admin_auth');
      if (localAuth === 'true') {
        setIsAuthenticated(true);
        if (isLoginPage) {
          router.push('/admin');
        }
        return;
      }

      // 2. Check Supabase session if configured
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            setIsAuthenticated(true);
            localStorage.setItem('uf_admin_auth', 'true');
            if (isLoginPage) {
              router.push('/admin');
            }
            return;
          }
        } catch (e) {
          console.error('Auth check error', e);
        }
      }

      // Not authenticated
      setIsAuthenticated(false);
      if (!isLoginPage) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    localStorage.removeItem('uf_admin_auth');
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  // If on login page, render children without sidebar
  if (isLoginPage) {
    return <div className="min-h-screen bg-navy-dark text-slate-100">{children || <Outlet />}</div>;
  }

  // Loading or checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-navy-dark flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  // If authenticated, render full responsive dashboard layout
  return (
    <AdminProvider>
      <div className="admin-panel min-h-screen bg-navy-dark text-slate-100 flex flex-col md:flex-row w-full overflow-x-hidden">
        <AdminSidebar onLogout={handleLogout} />
        <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-navy-deep overflow-y-auto">
          {children || <Outlet />}
        </div>
      </div>
    </AdminProvider>
  );
}
