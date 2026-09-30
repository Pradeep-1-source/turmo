import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  Award,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { fetchProductBySlug, fetchProducts, fetchSiteSettings } from '@/lib/supabase';
import { generateWhatsAppProductEnquiry } from '@/lib/whatsapp';
import ProductCard from '@/components/ProductCard';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found | Urban Fresh',
    };
  }

  return {
    title: product.seo_title || `${product.title} | Urban Fresh Export`,
    description:
      product.seo_description ||
      product.tagline ||
      `Export specifications, MOQ, and packaging details for ${product.title}.`,
    openGraph: {
      title: product.title,
      description: product.tagline || product.description.slice(0, 160),
      images: product.images?.[0]?.image_url ? [product.images[0].image_url] : [],
    },
  };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: PageProps) {
  const [product, allProducts, site] = await Promise.all([
    fetchProductBySlug(params.slug),
    fetchProducts(),
    fetchSiteSettings(),
  ]);

  if (!product) {
    notFound();
  }

  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0].image_url
      : '/images/turmeric.jpg';

  const whatsappUrl = generateWhatsAppProductEnquiry(product.title, site.whatsapp_number);

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 2);

  return (
    <div className="pt-28 pb-20 bg-navy-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-brand-green transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand-green transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-brand-lime font-medium truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Gallery / Image Column (Left) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-navy-card border border-white/10 shadow-card-dark group">
              <Image
                src={primaryImage}
                alt={product.title}
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent pointer-events-none" />

              {/* Tag / Category Badge */}
              <div className="absolute top-5 left-5">
                <span className="px-3.5 py-1.5 rounded-full bg-navy-dark/90 border border-brand-green/30 text-xs font-bold text-brand-lime uppercase tracking-wider backdrop-blur-md">
                  {product.category?.name || 'Export Commodity'}
                </span>
              </div>
            </div>

            {/* Thumbnail selector placeholder if multiple images */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-20 rounded-xl overflow-hidden border border-brand-green/30 bg-navy-surface cursor-pointer"
                  >
                    <Image
                      src={img.image_url}
                      alt={img.alt_text || product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Quick Export Guarantee Callout */}
            <div className="p-5 rounded-2xl bg-navy-surface/80 border border-brand-green/20 flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-brand-green shrink-0" />
              <div className="text-xs sm:text-sm text-slate-300">
                <strong className="text-white block font-bold">Standard Export Assurance</strong>
                Certified Phytosanitary Inspection, Certificate of Analysis (COA), and customized
                maritime container packing available for this commodity.
              </div>
            </div>
          </div>

          {/* Details & Specs Column (Right) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-brand-lime font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Verified Commercial Batch
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
                {product.title}
              </h1>

              {product.tagline && (
                <p className="text-base sm:text-lg text-brand-lime/90 font-medium leading-snug">
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Primary Action Button (WhatsApp Direct) */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-card to-navy-surface border border-brand-green/40 shadow-glow-green-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-300 font-semibold block uppercase tracking-wider">
                    Commercial Sourcing Inquiry
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pre-filled with product title for instant quote
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-sm shadow-glow-green hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 shrink-0"
                >
                  <MessageCircle className="w-5 h-5 fill-navy-dark text-navy-dark" />
                  <span>Enquire on WhatsApp</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Product Overview Text */}
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-wider font-bold text-slate-300">
                Commodity Overview
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Core Export Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {product.grade && (
                <div className="p-4 rounded-xl bg-navy-surface/80 border border-white/5">
                  <div className="flex items-center gap-2 text-brand-lime text-xs uppercase font-bold tracking-wider mb-1">
                    <Award className="w-3.5 h-3.5" />
                    Grade / Quality
                  </div>
                  <p className="text-sm text-white font-medium">{product.grade}</p>
                </div>
              )}

              {product.moq && (
                <div className="p-4 rounded-xl bg-navy-surface/80 border border-white/5">
                  <div className="flex items-center gap-2 text-brand-green text-xs uppercase font-bold tracking-wider mb-1">
                    <Package className="w-3.5 h-3.5" />
                    Minimum Order Quantity (MOQ)
                  </div>
                  <p className="text-sm text-white font-medium">{product.moq}</p>
                </div>
              )}

              {product.packaging && (
                <div className="p-4 rounded-xl bg-navy-surface/80 border border-white/5 sm:col-span-2">
                  <div className="flex items-center gap-2 text-brand-lime text-xs uppercase font-bold tracking-wider mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    Packaging Options
                  </div>
                  <p className="text-sm text-white font-medium">{product.packaging}</p>
                </div>
              )}

              {product.certifications && (
                <div className="p-4 rounded-xl bg-navy-surface/80 border border-white/5 sm:col-span-2">
                  <div className="flex items-center gap-2 text-brand-green text-xs uppercase font-bold tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Certifications & Compliance
                  </div>
                  <p className="text-sm text-white font-medium">{product.certifications}</p>
                </div>
              )}
            </div>

            {/* Dynamic Export Highlights List */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h3 className="text-sm uppercase tracking-wider font-bold text-slate-300">
                  Export Highlights & Technical Data
                </h3>
                <div className="space-y-2">
                  {product.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-navy-surface/50 border border-white/5 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm">
                        <strong className="text-brand-lime mr-1.5">{h.label}:</strong>
                        <span className="text-slate-300">{h.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-navy-border/60">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Other Export Commodities</h3>
              <Link
                href="/products"
                className="text-sm font-semibold text-brand-green hover:text-brand-lime transition-colors"
              >
                View all commodities →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} whatsappNumber={site.whatsapp_number} />
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to full product catalogue</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
