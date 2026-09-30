'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  fetchAllProductsAdmin,
  fetchAllCategoriesAdmin,
  saveProduct,
  deleteProduct,
} from '@/lib/supabase';
import { Product, Category, ProductHighlight } from '@/types/database';
import {
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  XCircle,
  Eye,
  MessageCircle,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { generateWhatsAppProductEnquiry } from '@/lib/whatsapp';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
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
    if (p.length > 0 && !selectedProduct) {
      setSelectedProduct(p[0]);
    }
    setLoading(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddNew = () => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: 'New Export Commodity',
      slug: `new-commodity-${Date.now().toString().slice(-4)}`,
      tagline: 'High quality Indian agricultural produce for international B2B export.',
      description: 'Carefully harvested and processed under sterile standards for global export.',
      category_id: categories[0]?.id || '',
      grade: 'Export Grade 1',
      moq: '500 KG / 1 MT',
      packaging: 'Multi-layer Kraft paper sacks or food-grade bulk drums',
      certifications: 'NABL Certified COA, Phytosanitary Certificate, FSSAI',
      applications: 'Food processing, culinary formulations, cosmetics',
      featured: true,
      published: true,
      sort_order: products.length + 1,
      seo_title: 'New Export Commodity | Urban Fresh',
      seo_description: 'Export grade Indian commodity ready for international B2B buyers.',
      images: [
        {
          id: `img-${Date.now()}`,
          image_url: '/images/turmeric.jpg',
          alt_text: 'Export Commodity',
          sort_order: 1,
        },
      ],
      highlights: [
        { label: 'Available Forms', value: 'Whole and fine powder' },
        { label: 'Quality Threshold', value: '100% pure and lab verified' },
      ],
    };

    setSelectedProduct(newProduct);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    await saveProduct(selectedProduct);
    await loadData();
    setIsEditing(false);
    showToast('Product saved successfully to Supabase / Live CMS!');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      await loadData();
      if (selectedProduct?.id === id) {
        setSelectedProduct(products.find((p) => p.id !== id) || null);
      }
      showToast('Product deleted successfully.');
    }
  };

  const addHighlight = () => {
    if (!selectedProduct) return;
    const currentHighlights = selectedProduct.highlights || [];
    setSelectedProduct({
      ...selectedProduct,
      highlights: [...currentHighlights, { label: 'New Highlight', value: 'Specification detail' }],
    });
  };

  const updateHighlight = (index: number, field: 'label' | 'value', text: string) => {
    if (!selectedProduct || !selectedProduct.highlights) return;
    const updated = [...selectedProduct.highlights];
    updated[index] = { ...updated[index], [field]: text };
    setSelectedProduct({ ...selectedProduct, highlights: updated });
  };

  const removeHighlight = (index: number) => {
    if (!selectedProduct || !selectedProduct.highlights) return;
    const updated = selectedProduct.highlights.filter((_, i) => i !== index);
    setSelectedProduct({ ...selectedProduct, highlights: updated });
  };

  const primaryImage =
    selectedProduct?.images?.[0]?.image_url || '/images/turmeric.jpg';

  const waPreviewUrl = selectedProduct
    ? generateWhatsAppProductEnquiry(selectedProduct.title)
    : '#';

  return (
    <>
      <AdminHeader
        title="Product Catalogue Manager"
        subtitle="Create, update, and manage export products with live instant preview"
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-sm shadow-glow-green animate-bounce">
          ✓ {toastMessage}
        </div>
      )}

      <main className="p-6 sm:p-8 space-y-8 flex-1">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Select Product:
            </span>
            <select
              value={selectedProduct?.id || ''}
              onChange={(e) => {
                const found = products.find((p) => p.id === e.target.value);
                if (found) {
                  setSelectedProduct(found);
                  setIsEditing(false);
                }
              }}
              className="py-2 px-4 rounded-xl bg-navy-card border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-brand-green"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.published ? 'Published' : 'Draft'})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-bold text-xs shadow-glow-green hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>

            {selectedProduct && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-surface border border-white/10 hover:border-brand-green text-white font-semibold text-xs transition-all"
              >
                <Edit className="w-4 h-4 text-brand-green" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Product'}</span>
              </button>
            )}

            {selectedProduct && (
              <button
                onClick={() => handleDelete(selectedProduct.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-300 font-semibold text-xs transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>

        {/* Split Screen Layout: Left Form / Right Live Preview */}
        {selectedProduct ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: Product Form / Editor */}
            <div className="lg:col-span-7 bg-navy-card rounded-2xl border border-white/10 p-6 sm:p-8 shadow-card-dark">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-lime" />
                    Product Specifications Editor
                  </h3>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-xs shadow-glow-green hover:scale-105 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save to Live Website</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Product Title
                    </label>
                    <input
                      type="text"
                      required
                      value={selectedProduct.title}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, title: e.target.value })
                      }
                      className="w-full py-2.5 px-3.5 rounded-xl bg-navy-surface border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      required
                      value={selectedProduct.slug}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, slug: e.target.value })
                      }
                      className="w-full py-2.5 px-3.5 rounded-xl bg-navy-surface border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green font-mono text-xs"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={selectedProduct.category_id || ''}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, category_id: e.target.value })
                      }
                      className="w-full py-2.5 px-3.5 rounded-xl bg-navy-surface border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tagline */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Tagline / Subheading
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.tagline || ''}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, tagline: e.target.value })
                      }
                      className="w-full py-2.5 px-3.5 rounded-xl bg-navy-surface border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green"
                    />
                  </div>

                  {/* Image URL */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Product Image Path / URL
                    </label>
                    <input
                      type="text"
                      value={primaryImage}
                      onChange={(e) => {
                        const newImages = [...(selectedProduct.images || [])];
                        if (newImages.length > 0) {
                          newImages[0] = { ...newImages[0], image_url: e.target.value };
                        } else {
                          newImages.push({
                            id: `img-${Date.now()}`,
                            image_url: e.target.value,
                            sort_order: 1,
                          });
                        }
                        setSelectedProduct({ ...selectedProduct, images: newImages });
                      }}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-navy-surface border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green font-mono text-xs"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Available presets: /images/turmeric.jpg, /images/coconut-oil.jpg, /images/groundnut-oil.jpg
                    </p>
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Full Product Description
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={selectedProduct.description}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, description: e.target.value })
                      }
                      className="w-full py-2.5 px-3.5 rounded-xl bg-navy-surface border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green leading-relaxed"
                    />
                  </div>

                  {/* Grade */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Grade / Quality
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.grade || ''}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, grade: e.target.value })
                      }
                      className="w-full py-2.5 px-3.5 rounded-xl bg-navy-surface border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green"
                    />
                  </div>

                  {/* MOQ */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Minimum Order Quantity (MOQ)
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.moq || ''}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, moq: e.target.value })
                      }
                      className="w-full py-2.5 px-3.5 rounded-xl bg-navy-surface border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green"
                    />
                  </div>

                  {/* Packaging */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Packaging Formats
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.packaging || ''}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, packaging: e.target.value })
                      }
                      className="w-full py-2.5 px-3.5 rounded-xl bg-navy-surface border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green"
                    />
                  </div>

                  {/* Certifications */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Certifications & Compliance
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.certifications || ''}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, certifications: e.target.value })
                      }
                      className="w-full py-2.5 px-3.5 rounded-xl bg-navy-surface border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green"
                    />
                  </div>
                </div>

                {/* Structured Highlights Repeatable Fields */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Technical Highlights & Specifications
                    </label>
                    <button
                      type="button"
                      onClick={addHighlight}
                      className="text-xs text-brand-green hover:text-brand-lime font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Highlight Field
                    </button>
                  </div>

                  <div className="space-y-2">
                    {selectedProduct.highlights?.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={h.label}
                          onChange={(e) => updateHighlight(idx, 'label', e.target.value)}
                          placeholder="Label (e.g. Curcumin)"
                          className="w-1/3 py-2 px-3 rounded-lg bg-navy-surface border border-white/10 text-xs text-brand-lime font-semibold"
                        />
                        <input
                          type="text"
                          value={h.value}
                          onChange={(e) => updateHighlight(idx, 'value', e.target.value)}
                          placeholder="Value (e.g. 5.5% High Curcumin)"
                          className="flex-1 py-2 px-3 rounded-lg bg-navy-surface border border-white/10 text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => removeHighlight(idx)}
                          className="p-2 text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publish Toggle */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedProduct.published}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, published: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-brand-green focus:ring-brand-green"
                    />
                    <span className="text-sm font-semibold text-white">
                      Publish to public export catalogue
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-xs shadow-glow-green hover:scale-105 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT: Live Preview Card */}
            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-brand-lime tracking-widest flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Live Card Preview
                </span>
                <a
                  href={`/products/${selectedProduct.slug}`}
                  target="_blank"
                  className="text-xs text-brand-green hover:underline flex items-center gap-1"
                >
                  <span>Open Full Detail Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Preview Container */}
              <div className="rounded-2xl bg-navy-card border border-brand-green/40 shadow-card-hover overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-surface">
                  <Image
                    src={primaryImage}
                    alt={selectedProduct.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-navy-dark/90 border border-brand-green/30 text-[11px] font-semibold text-brand-lime uppercase">
                      {categories.find((c) => c.id === selectedProduct.category_id)?.name || 'Spices'}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h4 className="text-lg font-bold text-white leading-snug">
                    {selectedProduct.title}
                  </h4>
                  {selectedProduct.tagline && (
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {selectedProduct.tagline}
                    </p>
                  )}

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {selectedProduct.highlights?.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-navy-surface border border-white/5 text-slate-300"
                      >
                        <strong className="text-brand-lime">{h.label}:</strong> {h.value}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <a
                      href={waPreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-xs shadow-glow-green flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4 fill-navy-dark text-navy-dark" />
                      <span>Test WhatsApp Enquiry Link</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 bg-navy-card rounded-2xl border border-white/5">
            Select a product to edit or click &quot;Add New Product&quot;.
          </div>
        )}
      </main>
    </>
  );
}
