'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  fetchAllProductsAdmin,
  fetchAllCategoriesAdmin,
  saveProduct,
} from '@/lib/supabase';
import { Product, Category } from '@/types/database';
import {
  Package,
  Layers,
  FileText,
  MessageCircle,
  Plus,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { generateWhatsAppProductEnquiry } from '@/lib/whatsapp';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [p, c] = await Promise.all([
      fetchAllProductsAdmin(),
      fetchAllCategoriesAdmin(),
    ]);
    setProducts(p);
    setCategories(c);
    setLoading(false);
  };

  const handleTogglePublish = async (product: Product) => {
    const updated = { ...product, published: !product.published };
    await saveProduct(updated);
    setProducts((prev) =>
      prev.map((item) => (item.id === product.id ? updated : item))
    );
  };

  const activeProductsCount = products.filter((p) => p.published).length;

  return (
    <>
      <AdminHeader
        title="Export CMS Dashboard"
        subtitle="Manage products, categories, and live website content without code modifications"
      />

      <main className="p-6 sm:p-8 space-y-8 flex-1">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total Products */}
          <div className="p-6 rounded-2xl bg-navy-card border border-white/5 shadow-card-dark flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Total Products
              </p>
              <h3 className="text-3xl font-extrabold text-white mt-1">
                {products.length}
              </h3>
              <p className="text-[11px] text-brand-lime mt-1 font-medium">
                In export catalogue
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-navy-surface border border-brand-green/30 flex items-center justify-center text-brand-green">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Active Products */}
          <div className="p-6 rounded-2xl bg-navy-card border border-white/5 shadow-card-dark flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Published & Active
              </p>
              <h3 className="text-3xl font-extrabold text-brand-green mt-1">
                {activeProductsCount}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">
                Visible to global buyers
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-navy-surface border border-brand-green/30 flex items-center justify-center text-brand-green">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Categories */}
          <div className="p-6 rounded-2xl bg-navy-card border border-white/5 shadow-card-dark flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Categories
              </p>
              <h3 className="text-3xl font-extrabold text-white mt-1">
                {categories.length}
              </h3>
              <p className="text-[11px] text-brand-lime mt-1 font-medium">
                Commodity sectors
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-navy-surface border border-brand-lime/30 flex items-center justify-center text-brand-lime">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: WhatsApp Desk Status */}
          <div className="p-6 rounded-2xl bg-navy-card border border-white/5 shadow-card-dark flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                WhatsApp Desk
              </p>
              <h3 className="text-xl font-extrabold text-white mt-1">+91 9884449843</h3>
              <p className="text-[11px] text-brand-green mt-1 font-medium">
                ● Live & accepting leads
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-navy-surface border border-brand-green/30 flex items-center justify-center text-brand-green">
              <MessageCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Launchpad & Fast Actions */}
        <div className="p-6 rounded-2xl bg-navy-card/90 border border-brand-green/30 shadow-glow-green-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase font-bold text-brand-lime tracking-widest">
              Quick Admin Actions
            </span>
            <h3 className="text-xl font-bold text-white">
              Manage your export catalogue & website content
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Any changes made in this admin panel immediately update the live public website and Supabase database.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-xs shadow-glow-green hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>

            <Link
              href="/admin/content"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-surface border border-white/10 hover:border-brand-green text-white font-semibold text-xs transition-all"
            >
              <FileText className="w-4 h-4 text-brand-green" />
              <span>Edit Homepage & Content</span>
            </Link>

            <Link
              href="/admin/categories"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-surface border border-white/10 hover:border-brand-lime text-white font-semibold text-xs transition-all"
            >
              <Layers className="w-4 h-4 text-brand-lime" />
              <span>Manage Categories</span>
            </Link>
          </div>
        </div>

        {/* Product Catalogue Table */}
        <div className="rounded-2xl bg-navy-card border border-white/5 shadow-card-dark overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Export Commodities</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Overview of all products registered in the export portfolio
              </p>
            </div>

            <Link
              href="/admin/products"
              className="text-xs font-semibold text-brand-green hover:text-brand-lime flex items-center gap-1 transition-colors"
            >
              <span>Manage all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-slate-400">Loading products...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-navy-surface/80 uppercase tracking-wider text-[10px] text-slate-400 border-b border-white/5">
                  <tr>
                    <th className="py-3 px-6">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">MOQ</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">WhatsApp Link</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((p) => {
                    const imgUrl = p.images?.[0]?.image_url || '/images/turmeric.jpg';
                    const waUrl = generateWhatsAppProductEnquiry(p.title);

                    return (
                      <tr key={p.id} className="hover:bg-navy-surface/40 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-navy-surface border border-white/10 shrink-0">
                              <Image src={imgUrl} alt={p.title} fill className="object-cover" />
                            </div>
                            <div>
                              <strong className="text-white block font-semibold text-sm max-w-xs truncate">
                                {p.title}
                              </strong>
                              <span className="text-[11px] text-slate-400 block truncate max-w-xs">
                                {p.tagline || p.slug}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 font-medium text-slate-200">
                          {p.category?.name || 'General'}
                        </td>

                        <td className="py-4 px-4 text-slate-300">
                          {p.moq || 'Contact Trade Desk'}
                        </td>

                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleTogglePublish(p)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all ${
                              p.published
                                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {p.published ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" /> Published
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3" /> Draft
                              </>
                            )}
                          </button>
                        </td>

                        <td className="py-4 px-4">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-brand-green hover:underline font-semibold"
                          >
                            <span>Test WhatsApp</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <Link
                            href="/admin/products"
                            className="inline-block px-3 py-1.5 rounded-lg bg-navy-surface hover:bg-navy-surface/80 border border-white/10 text-white font-medium hover:border-brand-green transition-all"
                          >
                            Edit in CMS
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
