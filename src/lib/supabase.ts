import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  Category,
  Product,
  HomepageContent,
  AboutContent,
  QualityContent,
  ContactSettings,
  SiteSettings,
} from '@/types/database';
import {
  defaultCategories,
  defaultProducts,
  defaultHomepageContent,
  defaultAboutContent,
  defaultQualityContent,
  defaultContactSettings,
  defaultSiteSettings,
} from './defaultData';

const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  '';

const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  '';

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SaveResult {
  success: boolean;
  error?: string;
}

export function isValidUUID(uuid?: string | null): boolean {
  if (!uuid) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}

export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Helper to check for client-side local overrides (from Admin in demo mode)
const getLocalOverride = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(`uf_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

export const setLocalOverride = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`uf_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving local override', e);
  }
};

/* ========================================================
   FETCH FUNCTIONS (SUPABASE WITH AUTOMATIC FALLBACK)
======================================================== */

export async function fetchCategories(): Promise<Category[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch (e) {
      console.warn('Falling back to default categories', e);
    }
  }
  return getLocalOverride('categories', defaultCategories);
}

export async function fetchAllCategoriesAdmin(): Promise<Category[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data) {
        return data as Category[];
      }
    } catch (e) {
      console.warn('Falling back to local categories for admin', e);
    }
  }
  return getLocalOverride('categories', defaultCategories);
}

export async function fetchProducts(): Promise<Product[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          images:product_images(*),
          highlights:product_highlights(*)
        `)
        .eq('published', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        data.forEach((p: any) => {
          if (Array.isArray(p.images)) {
            p.images.sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
          }
          if (Array.isArray(p.highlights)) {
            p.highlights.sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
          }
        });
        return data as Product[];
      }
      if (error) {
        console.error('fetchProducts Supabase error:', error);
      }
    } catch (e) {
      console.warn('Falling back to default products', e);
    }
  }
  return getLocalOverride('products', defaultProducts);
}

export async function fetchAllProductsAdmin(): Promise<Product[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          images:product_images(*),
          highlights:product_highlights(*)
        `)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        data.forEach((p: any) => {
          if (Array.isArray(p.images)) {
            p.images.sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
          }
          if (Array.isArray(p.highlights)) {
            p.highlights.sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
          }
        });
        return data as Product[];
      }
      if (error) {
        console.error('fetchAllProductsAdmin Supabase error:', error);
      }
    } catch (e) {
      console.warn('Falling back to local products for admin', e);
    }
  }
  return getLocalOverride('products', defaultProducts);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (!slug) return null;

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          images:product_images(*),
          highlights:product_highlights(*)
        `)
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (!error && data) {
        if (Array.isArray(data.images)) {
          data.images.sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        }
        if (Array.isArray(data.highlights)) {
          data.highlights.sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        }
        return data as Product;
      }
      if (error) {
        console.error('fetchProductBySlug Supabase error:', error);
      }
    } catch (e) {
      console.warn('Falling back for fetchProductBySlug', e);
    }
  }

  const products = await fetchProducts();
  const product = products.find((p) => p.slug === slug);
  return product || null;
}

export async function fetchHomepageContent(): Promise<HomepageContent> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('*')
        .eq('id', 'default')
        .single();

      if (!error && data) {
        return data as HomepageContent;
      }
    } catch (e) {
      console.warn('Falling back to default homepage content', e);
    }
  }
  return getLocalOverride('homepage_content', defaultHomepageContent);
}

export async function fetchAboutContent(): Promise<AboutContent> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .eq('id', 'default')
        .single();

      if (!error && data) {
        return data as AboutContent;
      }
    } catch (e) {
      console.warn('Falling back to default about content', e);
    }
  }
  return getLocalOverride('about_content', defaultAboutContent);
}

export async function fetchQualityContent(): Promise<QualityContent> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('quality_content')
        .select('*')
        .eq('id', 'default')
        .single();

      if (!error && data) {
        return data as QualityContent;
      }
    } catch (e) {
      console.warn('Falling back to default quality content', e);
    }
  }
  return getLocalOverride('quality_content', defaultQualityContent);
}

export async function fetchContactSettings(): Promise<ContactSettings> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_settings')
        .select('*')
        .eq('id', 'default')
        .single();

      if (!error && data) {
        return data as ContactSettings;
      }
    } catch (e) {
      console.warn('Falling back to default contact settings', e);
    }
  }
  return getLocalOverride('contact_settings', defaultContactSettings);
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'default')
        .single();

      if (!error && data) {
        return data as SiteSettings;
      }
    } catch (e) {
      console.warn('Falling back to default site settings', e);
    }
  }
  return getLocalOverride('site_settings', defaultSiteSettings);
}

/* ========================================================
   SAVE / UPDATE MUTATIONS FOR ADMIN CMS
======================================================== */

export async function saveHomepageContent(content: HomepageContent): Promise<boolean> {
  setLocalOverride('homepage_content', content);
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('homepage_content')
        .upsert({ ...content, id: 'default', updated_at: new Date().toISOString() });
      if (error) throw error;
    } catch (e) {
      console.error('Supabase update failed:', e);
      return false;
    }
  }
  return true;
}

export async function saveAboutContent(content: AboutContent): Promise<boolean> {
  setLocalOverride('about_content', content);
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('about_content')
        .upsert({ ...content, id: 'default', updated_at: new Date().toISOString() });
      if (error) throw error;
    } catch (e) {
      console.error('Supabase update failed:', e);
      return false;
    }
  }
  return true;
}

export async function saveQualityContent(content: QualityContent): Promise<boolean> {
  setLocalOverride('quality_content', content);
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('quality_content')
        .upsert({ ...content, id: 'default', updated_at: new Date().toISOString() });
      if (error) throw error;
    } catch (e) {
      console.error('Supabase update failed:', e);
      return false;
    }
  }
  return true;
}

export async function saveContactSettings(settings: ContactSettings): Promise<boolean> {
  setLocalOverride('contact_settings', settings);
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('contact_settings')
        .upsert({ ...settings, id: 'default', updated_at: new Date().toISOString() });
      if (error) throw error;
    } catch (e) {
      console.error('Supabase update failed:', e);
      return false;
    }
  }
  return true;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<boolean> {
  setLocalOverride('site_settings', settings);
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ ...settings, id: 'default', updated_at: new Date().toISOString() });
      if (error) throw error;
    } catch (e) {
      console.error('Supabase update failed:', e);
      return false;
    }
  }
  return true;
}

export async function saveProduct(product: Product): Promise<SaveResult> {
  if (!product) {
    return { success: false, error: 'No product data provided.' };
  }

  const title = product.title?.trim();
  if (!title) {
    return { success: false, error: 'Product title is required.' };
  }

  const slug = product.slug?.trim();
  if (!slug) {
    return { success: false, error: 'Product slug is required.' };
  }

  const description = product.description?.trim();
  if (!description) {
    return { success: false, error: 'Product description is required.' };
  }

  const productId = isValidUUID(product.id) ? product.id : generateUUID();
  const validCategoryId = isValidUUID(product.category_id) ? product.category_id : null;

  if (isSupabaseConfigured() && supabase) {
    try {
      // 1. Upsert product record
      const productRow = {
        id: productId,
        category_id: validCategoryId,
        title,
        slug,
        tagline: product.tagline?.trim() || null,
        description,
        applications: product.applications?.trim() || null,
        grade: product.grade?.trim() || null,
        moq: product.moq?.trim() || null,
        certifications: product.certifications?.trim() || null,
        packaging: product.packaging?.trim() || null,
        featured: Boolean(product.featured),
        published: Boolean(product.published),
        sort_order: typeof product.sort_order === 'number' ? product.sort_order : 0,
        seo_title: product.seo_title?.trim() || null,
        seo_description: product.seo_description?.trim() || null,
        updated_at: new Date().toISOString(),
      };

      const { error: prodError } = await supabase
        .from('products')
        .upsert(productRow, { onConflict: 'id' });

      if (prodError) {
        console.error('Supabase save product error:', prodError);
        if (prodError.message?.includes('duplicate key') || prodError.message?.includes('unique constraint')) {
          return { success: false, error: 'A product with this URL slug already exists. Please choose a unique slug.' };
        }
        return { success: false, error: `Database error: ${prodError.message}` };
      }

      // 2. Synchronize product images in public.product_images
      const { error: delImgErr } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', productId);

      if (delImgErr) {
        console.error('Supabase delete old product_images error:', delImgErr);
        return { success: false, error: `Failed to update product images: ${delImgErr.message}` };
      }

      const rawImages = product.images || [];
      const imagesToInsert = rawImages
        .filter((img) => img.image_url && img.image_url.trim() !== '')
        .map((img, idx) => ({
          product_id: productId,
          image_url: img.image_url.trim(),
          alt_text: img.alt_text?.trim() || title,
          sort_order: typeof img.sort_order === 'number' ? img.sort_order : idx + 1,
        }));

      if (imagesToInsert.length > 0) {
        const { error: insImgErr } = await supabase
          .from('product_images')
          .insert(imagesToInsert);

        if (insImgErr) {
          console.error('Supabase insert product_images error:', insImgErr);
          return { success: false, error: `Failed to save product images: ${insImgErr.message}` };
        }
      }

      // 3. Synchronize product highlights in public.product_highlights
      const { error: delHighErr } = await supabase
        .from('product_highlights')
        .delete()
        .eq('product_id', productId);

      if (delHighErr) {
        console.error('Supabase delete old product_highlights error:', delHighErr);
        return { success: false, error: `Failed to update product highlights: ${delHighErr.message}` };
      }

      const rawHighlights = product.highlights || [];
      const highlightsToInsert = rawHighlights
        .filter((h) => h.label && h.label.trim() !== '' && h.value && h.value.trim() !== '')
        .map((h, idx) => ({
          product_id: productId,
          label: h.label.trim(),
          value: h.value.trim(),
          sort_order: typeof h.sort_order === 'number' ? h.sort_order : idx + 1,
        }));

      if (highlightsToInsert.length > 0) {
        const { error: insHighErr } = await supabase
          .from('product_highlights')
          .insert(highlightsToInsert);

        if (insHighErr) {
          console.error('Supabase insert product_highlights error:', insHighErr);
          return { success: false, error: `Failed to save product highlights: ${insHighErr.message}` };
        }
      }
    } catch (e: any) {
      console.error('Supabase saveProduct failed with exception:', e);
      return { success: false, error: e?.message || 'Unexpected database error while saving product.' };
    }
  }

  // Update local override cache only after database operations succeed
  const normalizedProduct: Product = {
    ...product,
    id: productId,
    category_id: validCategoryId || undefined,
    title,
    slug,
    description,
  };

  const currentProducts = await fetchAllProductsAdmin();
  const existingIdx = currentProducts.findIndex((p) => p.id === productId);
  let updatedProducts: Product[];
  if (existingIdx >= 0) {
    updatedProducts = [...currentProducts];
    updatedProducts[existingIdx] = normalizedProduct;
  } else {
    updatedProducts = [normalizedProduct, ...currentProducts];
  }
  setLocalOverride('products', updatedProducts);

  return { success: true };
}

export async function deleteProduct(productId: string): Promise<SaveResult> {
  if (!productId) {
    return { success: false, error: 'Product ID is required for deletion.' };
  }

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) {
        console.error('Supabase deleteProduct error:', error);
        return { success: false, error: `Failed to delete product: ${error.message}` };
      }
    } catch (e: any) {
      console.error('Supabase deleteProduct failed with exception:', e);
      return { success: false, error: e?.message || 'Unexpected database error while deleting product.' };
    }
  }

  const currentProducts = await fetchAllProductsAdmin();
  const updatedProducts = currentProducts.filter((p) => p.id !== productId);
  setLocalOverride('products', updatedProducts);
  return { success: true };
}

export async function saveCategory(category: Category): Promise<SaveResult> {
  if (!category || !category.name?.trim()) {
    return { success: false, error: 'Category name is required.' };
  }

  const catId = isValidUUID(category.id) ? category.id : generateUUID();
  const normalizedCategory: Category = {
    ...category,
    id: catId,
    name: category.name.trim(),
    slug: category.slug.trim(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('categories').upsert(normalizedCategory, { onConflict: 'id' });
      if (error) {
        console.error('Supabase saveCategory failed:', error);
        return { success: false, error: error.message };
      }
    } catch (e: any) {
      console.error('Supabase saveCategory failed with exception:', e);
      return { success: false, error: e?.message || 'Unexpected error while saving category.' };
    }
  }

  const currentCategories = await fetchAllCategoriesAdmin();
  const existingIdx = currentCategories.findIndex((c) => c.id === catId);
  let updatedCategories: Category[];
  if (existingIdx >= 0) {
    updatedCategories = [...currentCategories];
    updatedCategories[existingIdx] = normalizedCategory;
  } else {
    updatedCategories = [...currentCategories, normalizedCategory];
  }
  setLocalOverride('categories', updatedCategories);
  return { success: true };
}

export async function deleteCategory(categoryId: string): Promise<SaveResult> {
  if (!categoryId) {
    return { success: false, error: 'Category ID is required.' };
  }

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('categories').delete().eq('id', categoryId);
      if (error) {
        console.error('Supabase deleteCategory failed:', error);
        return { success: false, error: error.message };
      }
    } catch (e: any) {
      console.error('Supabase deleteCategory failed with exception:', e);
      return { success: false, error: e?.message || 'Unexpected error while deleting category.' };
    }
  }

  const currentCategories = await fetchAllCategoriesAdmin();
  const updated = currentCategories.filter((c) => c.id !== categoryId);
  setLocalOverride('categories', updated);
  return { success: true };
}

export async function uploadProductImage(file: File): Promise<string> {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  // 1. Try Supabase Storage if configured
  if (isSupabaseConfigured() && supabase) {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `products/${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      throw new Error(`Storage upload failed: ${error.message}`);
    }

    if (data) {
      const { data: publicData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      if (publicData?.publicUrl) {
        return publicData.publicUrl;
      }
    }
    throw new Error('Storage upload succeeded but could not generate public URL.');
  }

  // 2. Only if Supabase is explicitly NOT configured (local development / offline demo fallback)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

