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

      if (!error && data && data.length > 0) {
        return data as Product[];
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
        return data as Product[];
      }
    } catch (e) {
      console.warn('Falling back to local products for admin', e);
    }
  }
  return getLocalOverride('products', defaultProducts);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
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

export async function saveProduct(product: Product): Promise<boolean> {
  const currentProducts = await fetchAllProductsAdmin();
  const existingIdx = currentProducts.findIndex((p) => p.id === product.id);
  let updatedProducts: Product[];
  if (existingIdx >= 0) {
    updatedProducts = [...currentProducts];
    updatedProducts[existingIdx] = product;
  } else {
    updatedProducts = [product, ...currentProducts];
  }
  setLocalOverride('products', updatedProducts);

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('products').upsert({
        id: product.id,
        category_id: product.category_id,
        title: product.title,
        slug: product.slug,
        tagline: product.tagline,
        description: product.description,
        applications: product.applications,
        grade: product.grade,
        moq: product.moq,
        certifications: product.certifications,
        packaging: product.packaging,
        featured: product.featured,
        published: product.published,
        sort_order: product.sort_order,
        seo_title: product.seo_title,
        seo_description: product.seo_description,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
    } catch (e) {
      console.error('Supabase saveProduct failed', e);
      return false;
    }
  }
  return true;
}

export async function deleteProduct(productId: string): Promise<boolean> {
  const currentProducts = await fetchAllProductsAdmin();
  const updatedProducts = currentProducts.filter((p) => p.id !== productId);
  setLocalOverride('products', updatedProducts);

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) throw error;
    } catch (e) {
      console.error('Supabase deleteProduct failed', e);
      return false;
    }
  }
  return true;
}

export async function saveCategory(category: Category): Promise<boolean> {
  const currentCategories = await fetchAllCategoriesAdmin();
  const existingIdx = currentCategories.findIndex((c) => c.id === category.id);
  let updatedCategories: Category[];
  if (existingIdx >= 0) {
    updatedCategories = [...currentCategories];
    updatedCategories[existingIdx] = category;
  } else {
    updatedCategories = [...currentCategories, category];
  }
  setLocalOverride('categories', updatedCategories);

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('categories').upsert(category);
      if (error) throw error;
    } catch (e) {
      console.error('Supabase saveCategory failed', e);
      return false;
    }
  }
  return true;
}

export async function deleteCategory(categoryId: string): Promise<boolean> {
  const currentCategories = await fetchAllCategoriesAdmin();
  const updated = currentCategories.filter((c) => c.id !== categoryId);
  setLocalOverride('categories', updated);

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('categories').delete().eq('id', categoryId);
      if (error) throw error;
    } catch (e) {
      console.error('Supabase deleteCategory failed', e);
      return false;
    }
  }
  return true;
}
