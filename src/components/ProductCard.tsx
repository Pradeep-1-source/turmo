'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Product } from '@/types/database';
import { generateWhatsAppProductEnquiry } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
  whatsappNumber?: string;
}

export default function ProductCard({
  product,
  whatsappNumber = '919884449843',
}: ProductCardProps) {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].image_url
      : '/images/turmeric.jpg';

  const categoryName = product.category?.name || 'Export Commodity';
  const whatsappUrl = generateWhatsAppProductEnquiry(product.title, whatsappNumber);

  return (
    <div className="group relative rounded-2xl bg-navy-card border border-navy-border/80 hover:border-brand-green/60 shadow-card-dark transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover flex flex-col overflow-hidden">
      {/* Product Image Section */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-navy-surface"
      >
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-card via-transparent to-transparent opacity-80" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 rounded-full bg-navy-dark/85 border border-brand-green/30 text-[11px] font-semibold text-brand-lime backdrop-blur-md uppercase tracking-wider">
            {categoryName}
          </span>
        </div>

        {product.grade && (
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />
            <span className="truncate font-medium">{product.grade}</span>
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-xl font-bold text-white group-hover:text-brand-green transition-colors leading-snug line-clamp-2 mb-2">
              {product.title}
            </h3>
          </Link>

          {product.tagline && (
            <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
              {product.tagline}
            </p>
          )}

          {/* Highlights Mini Pills */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {product.highlights.slice(0, 2).map((h, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-navy-surface border border-white/5 text-slate-300"
                >
                  <strong className="text-brand-lime">{h.label}:</strong> {h.value.slice(0, 30)}...
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions Bar: NO CART, NO CHECKOUT - ONLY DETAILS + WHATSAPP */}
        <div className="pt-4 border-t border-navy-border/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-navy-surface hover:bg-navy-surface/80 border border-white/10 hover:border-white/20 text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 group/btn text-center"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark text-xs sm:text-sm font-bold shadow-glow-green-sm hover:shadow-glow-green transition-all flex items-center justify-center gap-1.5 text-center active:scale-95"
            title="Enquire on WhatsApp with product details"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-navy-dark text-navy-dark shrink-0" />
            <span className="truncate">WhatsApp Quote</span>
          </a>
        </div>
      </div>
    </div>
  );
}
