import React, { useState, useEffect } from 'react';
import FeaturedProducts from '@/components/FeaturedProducts';
import CTASection from '@/components/CTASection';
import { fetchProducts, fetchCategories, fetchSiteSettings } from '@/lib/supabase';
import { defaultProducts, defaultCategories, defaultSiteSettings } from '@/lib/defaultData';
import { Product, Category, SiteSettings } from '@/types/database';
import { Sparkles } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [site, setSite] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    Promise.all([
      fetchProducts(),
      fetchCategories(),
      fetchSiteSettings(),
    ]).then(([p, c, s]) => {
      setProducts(p);
      setCategories(c);
      setSite(s);
    }).catch(err => console.warn(err));
  }, []);

  return (
    <div className="pt-28 pb-16 bg-navy-dark min-h-screen">
      {/* Page Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-surface border border-brand-green/30 text-brand-lime text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
          Direct Exporter Portfolio
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
          Export Product Catalogue
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
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
