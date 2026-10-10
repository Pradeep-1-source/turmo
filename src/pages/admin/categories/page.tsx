'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  fetchAllCategoriesAdmin,
  saveCategory,
  deleteCategory,
} from '@/lib/supabase';
import { Category } from '@/types/database';
import { Plus, Trash2, Edit, Save, Layers, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    const data = await fetchAllCategoriesAdmin();
    setCategories(data);
    if (data.length > 0 && !selectedCategory) {
      setSelectedCategory(data[0]);
    }
    setLoading(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddNew = () => {
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: 'New Commodity Sector',
      slug: `sector-${Date.now().toString().slice(-4)}`,
      description: 'Export agricultural commodity sector',
      published: true,
      sort_order: categories.length + 1,
    };
    setSelectedCategory(newCat);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    await saveCategory(selectedCategory);
    await loadCategories();
    showToast('Category updated successfully!');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
      await loadCategories();
      setSelectedCategory(null);
      showToast('Category removed.');
    }
  };

  return (
    <>
      <AdminHeader
        title="Commodity Categories Manager"
        subtitle="Organize export product groups and classifications"
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-sm shadow-glow-green animate-bounce">
          ✓ {toastMessage}
        </div>
      )}

      <main className="p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-lime" />
            Categories Portfolio ({categories.length})
          </h2>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-bold text-xs shadow-glow-green hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Categories List */}
          <div className="lg:col-span-6 rounded-2xl bg-navy-card border border-white/10 p-6 shadow-card-dark divide-y divide-white/5">
            {loading ? (
              <p className="text-xs text-slate-200">Loading categories...</p>
            ) : (
              categories.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCategory(c)}
                  className={`py-4 px-3 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                    selectedCategory?.id === c.id
                      ? 'bg-navy-surface border border-brand-green/30'
                      : 'hover:bg-navy-surface/40'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-white">{c.name}</h4>
                    <p className="text-xs text-slate-200 mt-0.5">{c.description || c.slug}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        c.published ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-200'
                      }`}
                    >
                      {c.published ? 'Active' : 'Draft'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(c.id);
                      }}
                      className="p-1.5 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Category Edit Form */}
          {selectedCategory && (
            <div className="lg:col-span-6 rounded-2xl bg-navy-card border border-brand-green/30 p-6 shadow-card-dark">
              <form onSubmit={handleSave} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-sm font-bold text-white">Edit Category</h3>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-xs shadow-glow-green hover:scale-105 transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Category</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedCategory.name}
                    onChange={(e) =>
                      setSelectedCategory({ ...selectedCategory, name: e.target.value })
                    }
                    className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] placeholder:text-[#64748B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedCategory.slug}
                    onChange={(e) =>
                      setSelectedCategory({ ...selectedCategory, slug: e.target.value })
                    }
                    className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] text-xs font-mono focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={selectedCategory.description || ''}
                    onChange={(e) =>
                      setSelectedCategory({ ...selectedCategory, description: e.target.value })
                    }
                    className="admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] placeholder:text-[#64748B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategory.published}
                      onChange={(e) =>
                        setSelectedCategory({ ...selectedCategory, published: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-brand-green"
                    />
                    <span className="text-xs font-semibold text-white">Active in Catalogue</span>
                  </label>

                  <span className="text-xs text-slate-200">
                    Sort Order: {selectedCategory.sort_order}
                  </span>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
