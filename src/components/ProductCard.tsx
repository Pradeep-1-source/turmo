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
    <div className="group relative rounded-2xl bg-white border border-stone-200 hover:border-brand-green/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden">
      {/* Product Image Section */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-stone-100"
      >
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-60" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/90 border border-stone-200 text-[11px] font-bold text-brand-green backdrop-blur-md uppercase tracking-wider shadow-sm">
            {categoryName}
          </span>
        </div>

        {product.grade && (
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 text-xs text-white drop-shadow-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />
            <span className="truncate font-semibold">{product.grade}</span>
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 justify-between bg-white">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-xl font-bold text-stone-900 group-hover:text-brand-green transition-colors leading-snug line-clamp-2 mb-2">
              {product.title}
            </h3>
          </Link>

          {product.tagline && (
            <p className="text-xs sm:text-sm text-stone-700 font-medium line-clamp-2 leading-relaxed mb-4">
              {product.tagline}
            </p>
          )}

          {/* Highlights Mini Pills */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {product.highlights.slice(0, 2).map((h, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-800 font-medium"
                >
                  <strong className="text-brand-green font-bold">{h.label}:</strong> {h.value.slice(0, 30)}...
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions Bar */}
        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 py-2.5 px-3 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-900 hover:text-black text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 group/btn text-center"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-full bg-brand-green hover:bg-[#984C34] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-center active:scale-95"
            title="Enquire on WhatsApp with product details"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white text-white shrink-0" />
            <span className="truncate">WhatsApp Quote</span>
          </a>
        </div>
      </div>
    </div>
  );
}
