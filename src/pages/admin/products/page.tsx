'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  fetchAllProductsAdmin,
  fetchAllCategoriesAdmin,
  saveProduct,
  deleteProduct,
  uploadProductImage,
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
  Upload,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import { generateWhatsAppProductEnquiry } from '@/lib/whatsapp';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedProduct) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit. Please select a smaller image.');
      return;
    }

    try {
      setIsUploadingImage(true);
      const uploadedUrl = await uploadProductImage(file);
      const newImages = [...(selectedProduct.images || [])];
      if (newImages.length > 0) {
        newImages[0] = { ...newImages[0], image_url: uploadedUrl };
      } else {
        newImages.push({
          id: `img-${Date.now()}`,
          image_url: uploadedUrl,
          sort_order: 1,
        });
      }
      setSelectedProduct({ ...selectedProduct, images: newImages });
      showToast('Product image uploaded successfully!');
    } catch (err) {
      console.error('Image upload failed', err);
      alert('Failed to upload image. Please try another file or enter an image URL.');
    } finally {
      setIsUploadingImage(false);
      e.target.value = '';
    }
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

      <main className="p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1 min-w-0">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="text-xs uppercase font-extrabold text-stone-800 tracking-wider">
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
              className="admin-field py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] text-xs font-semibold focus:outline-none focus:border-brand-green w-full sm:w-auto"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.published ? 'Published' : 'Draft'})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handleAddNew}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-brand-green text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New</span>
            </button>

            {selectedProduct && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 hover:border-brand-green text-stone-900 font-bold text-xs transition-all active:scale-95 shadow-sm"
              >
                <Edit className="w-4 h-4 text-brand-green" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit'}</span>
              </button>
            )}

            {selectedProduct && (
              <button
                onClick={() => handleDelete(selectedProduct.id)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-700 font-bold text-xs transition-all active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden xs:inline">Delete</span>
              </button>
            )}
          </div>
        </div>

        {/* Split Screen Layout: Left Form / Right Live Preview */}
        {selectedProduct ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* LEFT: Product Form / Editor */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-5 sm:p-8 shadow-sm">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-green" />
                    Product Specifications Editor
                  </h3>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-green hover:bg-[#984C34] text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save to Live Website</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1">
                      Product Title
                    </label>
                    <input
                      type="text"
                      required
                      value={selectedProduct.title}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, title: e.target.value })
                      }
                      className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] placeholder:text-[#64748B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      required
                      value={selectedProduct.slug}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, slug: e.target.value })
                      }
                      className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 font-mono text-xs"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={selectedProduct.category_id || ''}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, category_id: e.target.value })
                      }
                      className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
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
                    <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1">
                      Tagline / Subheading
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.tagline || ''}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, tagline: e.target.value })
                      }
                      className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] placeholder:text-[#64748B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    />
                  </div>

                  {/* Product Image Upload & Settings */}
                  <div className="sm:col-span-2 space-y-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider">
                        Product Visual & Image Upload
                      </label>
                      <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider">
                        Live Preview Enabled
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Image Preview Thumbnail */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white border-2 border-brand-green/30 shrink-0 shadow-sm group">
                        <Image
                          src={primaryImage}
                          alt={selectedProduct.title || 'Product'}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Upload Button & Dropzone */}
                      <div className="flex-1 w-full space-y-2">
                        <label
                          className={`w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border-2 border-dashed ${
                            isUploadingImage
                              ? 'border-brand-green bg-brand-green/10'
                              : 'border-brand-green/40 hover:border-brand-green bg-white hover:bg-stone-50'
                          } cursor-pointer transition-all text-xs font-bold text-stone-900 group active:scale-[0.99] shadow-sm`}
                        >
                          {isUploadingImage ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-brand-green" />
                              <span className="text-brand-green">Uploading and processing image...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 text-brand-green group-hover:scale-110 transition-transform" />
                              <span className="text-stone-900 group-hover:text-brand-green transition-colors font-bold">
                                Upload Product Image from Device
                              </span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isUploadingImage}
                            onChange={handleImageFileChange}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-stone-700 font-medium">
                          Supports JPG, PNG, WEBP, AVIF. Selected file instantly uploads & updates catalogue.
                        </p>
                      </div>
                    </div>

                    {/* Presets or Direct Path */}
                    <div className="pt-2 border-t border-stone-200 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-800 font-bold">Or choose high-res commodity preset:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Turmeric Fingers', url: '/images/turmeric.jpg' },
                          { label: 'Virgin Coconut Oil', url: '/images/coconut-oil.jpg' },
                          { label: 'Groundnut Cold Pressed', url: '/images/groundnut-oil.jpg' },
                          { label: 'Export Quality Lab', url: '/images/export-quality.jpg' },
                        ].map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() => {
                              const newImages = [...(selectedProduct.images || [])];
                              if (newImages.length > 0) {
                                newImages[0] = { ...newImages[0], image_url: preset.url };
                              } else {
                                newImages.push({
                                  id: `img-${Date.now()}`,
                                  image_url: preset.url,
                                  sort_order: 1,
                                });
                              }
                              setSelectedProduct({ ...selectedProduct, images: newImages });
                              showToast(`Applied preset: ${preset.label}`);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                              primaryImage === preset.url
                                ? 'bg-brand-green text-white border-brand-green shadow-sm'
                                : 'bg-white border-stone-300 text-stone-800 hover:text-black hover:border-brand-green/60 shadow-sm'
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>

                      {/* Manual Image Path Input */}
                      <div className="pt-1">
                        <label className="block text-[10px] uppercase font-bold text-stone-800 tracking-wider mb-1">
                          Direct Image URL / Path (Optional)
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
                          placeholder="/images/your-image.jpg or https://..."
                          className="w-full py-2 px-3 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs focus:outline-none focus:border-brand-green font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1">
                      Full Product Description
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={selectedProduct.description}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, description: e.target.value })
                      }
                      className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] placeholder:text-[#64748B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 leading-relaxed"
                    />
                  </div>

                  {/* Grade */}
                  <div>
                    <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1">
                      Grade / Quality
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.grade || ''}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, grade: e.target.value })
                      }
                      className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] placeholder:text-[#64748B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    />
                  </div>

                  {/* MOQ */}
                  <div>
                    <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1">
                      Minimum Order Quantity (MOQ)
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.moq || ''}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, moq: e.target.value })
                      }
                      className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] placeholder:text-[#64748B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    />
                  </div>

                  {/* Packaging */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1">
                      Packaging Formats
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.packaging || ''}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, packaging: e.target.value })
                      }
                      className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] placeholder:text-[#64748B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    />
                  </div>

                  {/* Certifications */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1">
                      Certifications & Compliance
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.certifications || ''}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, certifications: e.target.value })
                      }
                      className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] placeholder:text-[#64748B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    />
                  </div>
                </div>

                {/* Structured Highlights Repeatable Fields */}
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">
                      Technical Highlights & Specifications
                    </label>
                    <button
                      type="button"
                      onClick={addHighlight}
                      className="text-xs text-brand-green hover:text-[#984C34] font-bold flex items-center gap-1"
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
                          className="admin-field w-1/3 py-2 px-3 rounded-lg bg-white border border-[#CBD5E1] text-xs text-[#17212B] font-bold"
                        />
                        <input
                          type="text"
                          value={h.value}
                          onChange={(e) => updateHighlight(idx, 'value', e.target.value)}
                          placeholder="Value (e.g. 5.5% High Curcumin)"
                          className="admin-field flex-1 py-2 px-3 rounded-lg bg-white border border-[#CBD5E1] text-xs text-[#17212B] font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => removeHighlight(idx)}
                          className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                          title="Remove Highlight"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publish Toggle */}
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedProduct.published}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, published: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-brand-green focus:ring-brand-green"
                    />
                    <span className="text-sm font-bold text-stone-900">
                      Publish to public export catalogue
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-green hover:bg-[#984C34] text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
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
                <span className="text-xs uppercase font-extrabold text-brand-green tracking-widest flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Live Card Preview
                </span>
                <a
                  href={`/products/${selectedProduct.slug}`}
                  target="_blank"
                  className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1"
                >
                  <span>Open Full Detail Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Preview Container */}
              <div className="rounded-2xl bg-white border border-stone-200 shadow-md overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={primaryImage}
                    alt={selectedProduct.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-stone-900/90 text-[11px] font-bold text-white uppercase shadow-sm">
                      {categories.find((c) => c.id === selectedProduct.category_id)?.name || 'Spices'}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h4 className="text-lg font-extrabold text-stone-900 leading-snug">
                    {selectedProduct.title}
                  </h4>
                  {selectedProduct.tagline && (
                    <p className="text-xs text-stone-700 font-medium line-clamp-2">
                      {selectedProduct.tagline}
                    </p>
                  )}

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {selectedProduct.highlights?.map((h, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-900 font-medium shadow-sm"
                      >
                        <strong className="text-brand-green font-bold mr-1">{h.label}:</strong> {h.value}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
                    <a
                      href={waPreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-brand-green hover:bg-[#984C34] text-white font-extrabold text-xs shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-white" />
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
