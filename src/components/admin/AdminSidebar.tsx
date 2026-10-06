'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Home,
  FileText,
  LogOut,
  ExternalLink,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useAdmin } from './AdminContext';

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useAdmin();

  const links = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Categories', href: '/admin/categories', icon: Layers },
    { label: 'CMS & Content', href: '/admin/content', icon: FileText },
  ];

  const handleNavClick = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Logo and Brand header */}
        <div className="p-5 sm:p-6 border-b border-navy-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-brand-green/40 bg-navy-card shrink-0">
              <Image
                src="/images/urban-fresh-logo.jpg"
                alt="Urban Fresh"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider text-white block">
                URBAN <span className="text-brand-green">FRESH</span>
              </span>
              <span className="text-[10px] text-brand-lime font-semibold uppercase tracking-widest block">
                Export CMS Portal
              </span>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-surface transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-widest text-slate-400">
            Catalog & CMS
          </div>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark shadow-glow-green-sm'
                    : 'text-slate-300 hover:text-white hover:bg-navy-surface'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-navy-dark' : 'text-brand-green'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-navy-border space-y-2">
        <Link
          href="/"
          target="_blank"
          onClick={handleNavClick}
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-navy-surface transition-all"
        >
          <span className="flex items-center gap-2">
            <Home className="w-4 h-4 text-brand-green" />
            View Live Website
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        <button
          onClick={() => {
            handleNavClick();
            onLogout();
          }}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-64 bg-navy-dark border-r border-navy-border flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Off-canvas Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 max-w-[85vw] bg-navy-dark border-r border-navy-border z-50 transition-transform duration-300 ease-in-out md:hidden select-none shadow-2xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
