'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';
import { Product, Category } from '@/types/database';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  categories: Category[];
  whatsappNumber?: string;
  showAllButton?: boolean;
}

export default function FeaturedProducts({
  products,
  categories,
  whatsappNumber = '919884449843',
  showAllButton = true,
}: FeaturedProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category_id === selectedCategory || p.category?.slug === selectedCategory;
  });

  return (
    <section id="products" className="py-24 bg-navy-deep relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-brand-lime/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-surface border border-brand-green/30 text-brand-green text-xs font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
              Direct From Source
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Export Grade Commodities
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Authentic Indian harvest processed under strict international standards. Enquire
              directly for custom packaging, container-loads, and laboratory specifications.
            </p>
          </div>

          {showAllButton && (
            <div className="mt-6 md:mt-0">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-lime transition-colors group"
              >
                <span>Browse Full Catalogue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase font-semibold pr-2">
            <Filter className="w-3.5 h-3.5 text-brand-green" />
            <span>Filter:</span>
          </div>

          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-brand-green text-navy-dark shadow-glow-green-sm'
                : 'bg-navy-surface text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            All Products ({products.length})
          </button>

          {categories.map((cat) => {
            const count = products.filter(
              (p) => p.category_id === cat.id || p.category?.slug === cat.slug
            ).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-brand-green text-navy-dark shadow-glow-green-sm'
                    : 'bg-navy-surface text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={whatsappNumber}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-2xl bg-navy-surface/50 border border-white/5">
            <p className="text-slate-300 font-semibold mb-2">
              No products found in this category.
            </p>
            <p className="text-xs text-slate-400">
              Please choose another category or contact us on WhatsApp for custom commodity sourcing.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
