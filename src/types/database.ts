export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  published: boolean;
  sort_order: number;
  created_at?: string;
}

export interface ProductHighlight {
  id?: string;
  product_id?: string;
  label: string;
  value: string;
  sort_order?: number;
}

export interface ProductImage {
  id?: string;
  product_id?: string;
  image_url: string;
  alt_text?: string;
  sort_order?: number;
}

export interface Product {
  id: string;
  category_id?: string;
  category?: Category;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  applications?: string;
  grade?: string;
  moq?: string;
  certifications?: string;
  packaging?: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
  images?: ProductImage[];
  highlights?: ProductHighlight[];
}

export interface WhyUsItem {
  title: string;
  description: string;
}

export interface TrustStat {
  label: string;
  sub: string;
}

export interface HomepageContent {
  id: string;
  hero_headline: string;
  hero_tagline: string;
  hero_badge: string;
  hero_image: string;
  about_title: string;
  about_description: string;
  about_image: string;
  why_us_items: WhyUsItem[];
  trust_stats: TrustStat[];
  global_export_title: string;
  global_export_description: string;
  updated_at?: string;
}

export interface AboutHighlight {
  title: string;
  desc: string;
}

export interface AboutContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  commitment?: string;
  closing_statement?: string;
  managing_director?: string;
  designation?: string;
  highlights: AboutHighlight[];
  image_url: string;
  updated_at?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface QualityContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  process_steps: ProcessStep[];
  certifications_info: string;
  packaging_info: string;
  lab_testing_info: string;
  updated_at?: string;
}

export interface ContactSettings {
  id: string;
  company_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  maps_embed_url: string;
  business_hours: string;
  updated_at?: string;
}

export interface SiteSettings {
  id: string;
  site_name: string;
  tagline: string;
  logo_url: string;
  whatsapp_number: string;
  phone_number: string;
  email: string;
  footer_text: string;
  default_seo_title: string;
  default_seo_description: string;
  social_linkedin?: string;
  social_instagram?: string;
  social_facebook?: string;
  updated_at?: string;
}
