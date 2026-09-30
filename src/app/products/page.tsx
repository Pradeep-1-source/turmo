import React from 'react';
import type { Metadata } from 'next';
import FeaturedProducts from '@/components/FeaturedProducts';
import CTASection from '@/components/CTASection';
import { fetchProducts, fetchCategories, fetchSiteSettings } from '@/lib/supabase';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Export Product Catalogue | Urban Fresh B2B Agricultural Exports',
  description:
    'Browse our export-grade Indian agricultural commodities: High-curcumin Turmeric, Raw Virgin Coconut Oil, and Cold-Pressed Groundnut Oil. Inquire directly on WhatsApp.',
};

export const revalidate = 60;

export default async function ProductsPage() {
  const [products, categories, site] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
    fetchSiteSettings(),
  ]);

  return (
    <div className="pt-28 pb-16 bg-navy-dark min-h-screen">
      {/* Page Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-surface border border-brand-green/30 text-brand-green text-xs font-bold tracking-widest uppercase mb-4 shadow-glow-green-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
          Direct Exporter Portfolio
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
          Export Product Catalogue
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          Pure Indian agricultural commodities, precision-tested for international food,
          nutraceutical, and cosmetic formulation. Connect on WhatsApp for FOB/CIF quotes and container quantities.
        </p>
      </div>

      {/* Product List with Filter */}
      <FeaturedProducts
        products={products}
        categories={categories}
        whatsappNumber={site.whatsapp_number}
        showAllButton={false}
      />

      {/* Sourcing Call to action */}
      <CTASection
        whatsappNumber={site.whatsapp_number}
        phoneNumber={site.phone_number}
      />
    </div>
  );
}
