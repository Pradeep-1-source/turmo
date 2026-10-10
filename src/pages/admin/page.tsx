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

      <main className="p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1 min-w-0">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total Products */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-extrabold text-stone-700 tracking-wider">
                Total Products
              </p>
              <h3 className="text-3xl font-extrabold text-stone-900 mt-1">
                {products.length}
              </h3>
              <p className="text-[11px] text-brand-green mt-1 font-bold">
                In export catalogue
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-stone-50 border border-brand-green/30 flex items-center justify-center text-brand-green">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Active Products */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-extrabold text-stone-700 tracking-wider">
                Published & Active
              </p>
              <h3 className="text-3xl font-extrabold text-brand-green mt-1">
                {activeProductsCount}
              </h3>
              <p className="text-[11px] text-stone-700 mt-1 font-bold">
                Visible to global buyers
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-stone-50 border border-brand-green/30 flex items-center justify-center text-brand-green">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Categories */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-extrabold text-stone-700 tracking-wider">
                Categories
              </p>
              <h3 className="text-3xl font-extrabold text-stone-900 mt-1">
                {categories.length}
              </h3>
              <p className="text-[11px] text-brand-green mt-1 font-bold">
                Commodity sectors
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-stone-50 border border-brand-green/30 flex items-center justify-center text-brand-green">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: WhatsApp Desk Status */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-extrabold text-stone-700 tracking-wider">
                WhatsApp Desk
              </p>
              <h3 className="text-xl font-extrabold text-stone-900 mt-1">+91 9884449843</h3>
              <p className="text-[11px] text-brand-green mt-1 font-bold">
                ● Live & accepting leads
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-stone-50 border border-brand-green/30 flex items-center justify-center text-brand-green">
              <MessageCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Launchpad & Fast Actions */}
        <div className="p-6 rounded-2xl bg-white border border-brand-green/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase font-extrabold text-brand-green tracking-widest">
              Quick Admin Actions
            </span>
            <h3 className="text-xl font-extrabold text-stone-900">
              Manage your export catalogue & website content
            </h3>
            <p className="text-xs text-stone-700 max-w-xl font-medium">
              Any changes made in this admin panel immediately update the live public website and Supabase database.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-green hover:bg-[#984C34] text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>

            <Link
              href="/admin/content"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-300 hover:border-brand-green text-stone-900 font-bold text-xs transition-all shadow-sm"
            >
              <FileText className="w-4 h-4 text-brand-green" />
              <span>Edit Homepage & Content</span>
            </Link>

            <Link
              href="/admin/categories"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-300 hover:border-brand-green text-stone-900 font-bold text-xs transition-all shadow-sm"
            >
              <Layers className="w-4 h-4 text-brand-green" />
              <span>Manage Categories</span>
            </Link>
          </div>
        </div>

        {/* Product Catalogue Table */}
        <div className="rounded-2xl bg-white border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-stone-900">Export Commodities</h3>
              <p className="text-xs text-stone-700 mt-0.5 font-medium">
                Overview of all products registered in the export portfolio
              </p>
            </div>

            <Link
              href="/admin/products"
              className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1 transition-colors"
            >
              <span>Manage all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-stone-700 font-medium">Loading products...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-800">
                <thead className="bg-stone-50 uppercase tracking-wider text-[10px] text-stone-700 font-extrabold border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-6">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">MOQ</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">WhatsApp Link</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {products.map((p) => {
                    const imgUrl = p.images?.[0]?.image_url || '/images/turmeric.jpg';
                    const waUrl = generateWhatsAppProductEnquiry(p.title);

                    return (
                      <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-300 shrink-0">
                              <Image src={imgUrl} alt={p.title} fill className="object-cover" />
                            </div>
                            <div>
                              <strong className="text-stone-900 block font-bold text-sm max-w-xs truncate">
                                {p.title}
                              </strong>
                              <span className="text-[11px] text-stone-700 font-medium block truncate max-w-xs">
                                {p.tagline || p.slug}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 font-bold text-stone-900">
                          {p.category?.name || 'General'}
                        </td>

                        <td className="py-4 px-4 text-stone-800 font-medium">
                          {p.moq || 'Contact Trade Desk'}
                        </td>

                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleTogglePublish(p)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all shadow-sm ${
                              p.published
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                                : 'bg-stone-100 text-stone-700 border border-stone-300'
                            }`}
                          >
                            {p.published ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Published
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 text-stone-500" /> Draft
                              </>
                            )}
                          </button>
                        </td>

                        <td className="py-4 px-4">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-brand-green hover:underline font-bold"
                          >
                            <span>Test WhatsApp</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <Link
                            href="/admin/products"
                            className="inline-block px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-300 text-stone-900 font-bold hover:border-brand-green transition-all shadow-sm"
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
