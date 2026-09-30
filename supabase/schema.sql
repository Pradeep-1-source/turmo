-- Urban Fresh Database Schema & Seed Data
-- Run this script in your Supabase SQL Editor to set up all tables, RLS policies, and initial sample data.

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    tagline TEXT,
    description TEXT NOT NULL,
    applications TEXT,
    grade TEXT,
    moq TEXT,
    certifications TEXT,
    packaging TEXT,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Product Images Table
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Product Highlights Table
CREATE TABLE IF NOT EXISTS public.product_highlights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- 6. Create Homepage Content Table
CREATE TABLE IF NOT EXISTS public.homepage_content (
    id TEXT PRIMARY KEY DEFAULT 'default',
    hero_headline TEXT NOT NULL DEFAULT 'Premium Indian Products, Delivered Worldwide.',
    hero_tagline TEXT NOT NULL DEFAULT 'Authentic agricultural products sourced with care, processed to premium standards, and prepared for global markets.',
    hero_badge TEXT NOT NULL DEFAULT 'INDIAN ORIGIN • GLOBAL REACH',
    hero_image TEXT DEFAULT '/images/hero-bg.jpg',
    about_title TEXT NOT NULL DEFAULT 'Rooted in India. Prepared for the World.',
    about_description TEXT NOT NULL DEFAULT 'Urban Fresh connects quality Indian agricultural products with global buyers. We specialize in responsible sourcing, pristine processing, and reliable export-ready packaging.',
    about_image TEXT DEFAULT '/images/export-quality.jpg',
    why_us_items JSONB DEFAULT '[
        {"title": "Responsible Sourcing", "description": "Ethically gathered from nutrient-dense Indian farmlands with complete harvest traceability."},
        {"title": "Quality Focus", "description": "Strict laboratory testing, high curcumin and purity thresholds complying with international standards."},
        {"title": "Export-Ready Packaging", "description": "Multi-layer moisture barrier packaging, bulk HDPE drums, or custom private labeling for sea transit."},
        {"title": "B2B Global Supply", "description": "Reliable container-load logistics, streamlined phytosanitary clearance, and dedicated trade support."}
    ]'::jsonb,
    trust_stats JSONB DEFAULT '[
        {"label": "Farm Sourced", "sub": "Pure Origin & Direct Cultivation"},
        {"label": "Quality Focused", "sub": "NABL Lab Tested & Certified"},
        {"label": "Export Ready", "sub": "Standardized Global Packaging"},
        {"label": "Global Supply", "sub": "Worldwide Port Logistics"}
    ]'::jsonb,
    global_export_title TEXT DEFAULT 'From India to Global Markets',
    global_export_description TEXT DEFAULT 'Connecting fertile Indian agricultural regions to international distributors, food manufacturers, and cosmetic formulators across the globe.',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Create About Page Content Table
CREATE TABLE IF NOT EXISTS public.about_content (
    id TEXT PRIMARY KEY DEFAULT 'default',
    title TEXT NOT NULL DEFAULT 'Rooted in India. Prepared for the World.',
    subtitle TEXT NOT NULL DEFAULT 'Premium Agricultural & Food Export Partner',
    description TEXT NOT NULL DEFAULT 'Urban Fresh is established in the agricultural heartland of Tamil Nadu, India. Sourcing directly from certified grower networks, we refine traditional produce into export-grade commodities that meet stringent international regulatory demands.',
    mission TEXT NOT NULL DEFAULT 'To deliver authentic, clean-label Indian agricultural produce to global enterprises with uncompromised purity and transparent trade practices.',
    vision TEXT NOT NULL DEFAULT 'To become the premier trusted export bridge between Indian agricultural excellence and international food, nutraceutical, and cosmetic industries.',
    highlights JSONB DEFAULT '[
        {"title": "Farm-Level Traceability", "desc": "Direct engagement with local farming communities in Erode and surrounding regions."},
        {"title": "Sterile Modern Facilities", "desc": "Temperature-monitored cold pressing and hygienic powder milling facilities."},
        {"title": "Stringent Quality Assurance", "desc": "COA, Phytosanitary, and heavy-metal screening for every export consignment."},
        {"title": "Seamless Port Dispatch", "desc": "Efficient transit via major international seaports with ocean-safe container packaging."}
    ]'::jsonb,
    image_url TEXT DEFAULT '/images/hero-bg.jpg',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Create Quality & Export Content Table
CREATE TABLE IF NOT EXISTS public.quality_content (
    id TEXT PRIMARY KEY DEFAULT 'default',
    title TEXT NOT NULL DEFAULT 'Quality That Travels Worldwide',
    subtitle TEXT NOT NULL DEFAULT 'From Farm to Port: Rigorous Standards Every Step of the Way',
    description TEXT NOT NULL DEFAULT 'We ensure strict microbiological, chemical, and physical quality benchmarks for every product leaving our facilities. Our quality assurance protocol complies with global food safety standards.',
    process_steps JSONB DEFAULT '[
        {"step": "01", "title": "Sourcing", "desc": "Careful harvest selection from verified Indian growers in fertile belts like Erode."},
        {"step": "02", "title": "Processing", "desc": "Temperature-controlled cold-pressing and sterile sun-cured pulverization."},
        {"step": "03", "title": "Quality Control", "desc": "Lab testing for purity, moisture content, active curcumin, and foreign matter."},
        {"step": "04", "title": "Packaging", "desc": "Moisture-barrier multi-layer bags, drums, and food-grade export containers."},
        {"step": "05", "title": "Export Dispatch", "desc": "Phytosanitary documentation, customs clearance, and global ocean freight dispatch."}
    ]'::jsonb,
    certifications_info TEXT DEFAULT 'Our supply chain adheres to FSSAI guidelines, NABL certified laboratory analysis reports, and Phytosanitary export certifications upon request for every shipment.',
    packaging_info TEXT DEFAULT 'Export packaging engineered for humidity control, extended sea transit, and palletized container shipping.',
    lab_testing_info TEXT DEFAULT 'Batch-wise COA verification covering active curcumin levels, moisture content, peroxide value, and micro-organism thresholds.',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Create Contact Settings Table
CREATE TABLE IF NOT EXISTS public.contact_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    company_name TEXT NOT NULL DEFAULT 'Urban Fresh',
    address_line1 TEXT NOT NULL DEFAULT 'D.No-48, VELLI VALASU, Attavanai Anumanpalli',
    address_line2 TEXT NOT NULL DEFAULT 'PO: Arachalur, DIST: Erode',
    city TEXT NOT NULL DEFAULT 'Erode',
    state TEXT NOT NULL DEFAULT 'Tamil Nadu',
    postal_code TEXT NOT NULL DEFAULT '638101',
    country TEXT NOT NULL DEFAULT 'India',
    phone TEXT NOT NULL DEFAULT '+91 9884449843',
    whatsapp TEXT NOT NULL DEFAULT '+91 9884449843',
    email TEXT NOT NULL DEFAULT 'export@urbanfresh.in',
    maps_embed_url TEXT DEFAULT '',
    business_hours TEXT DEFAULT 'Mon - Sat: 9:00 AM - 6:30 PM IST',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Create Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    site_name TEXT NOT NULL DEFAULT 'Urban Fresh',
    tagline TEXT NOT NULL DEFAULT 'GROWN WITH CARE DELIVERED WORLD WIDE',
    logo_url TEXT DEFAULT '/images/urban-fresh-logo.jpg',
    whatsapp_number TEXT NOT NULL DEFAULT '919884449843',
    phone_number TEXT NOT NULL DEFAULT '+91 9884449843',
    email TEXT NOT NULL DEFAULT 'export@urbanfresh.in',
    footer_text TEXT NOT NULL DEFAULT 'Urban Fresh connects quality Indian agricultural products with global buyers. Dedicated to international quality, clean labeling, and seamless B2B worldwide trade.',
    default_seo_title TEXT NOT NULL DEFAULT 'Urban Fresh | Premium Indian Agricultural Products & Global Export',
    default_seo_description TEXT NOT NULL DEFAULT 'Urban Fresh supplies premium Indian agricultural and food products for global B2B buyers, with a focus on quality, responsible sourcing and export-ready supply.',
    social_linkedin TEXT DEFAULT '',
    social_instagram TEXT DEFAULT '',
    social_facebook TEXT DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Row Level Security (RLS) Setup
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public READ Policies
CREATE POLICY "Allow public read published categories" ON public.categories FOR SELECT USING (published = true);
CREATE POLICY "Allow public read published products" ON public.products FOR SELECT USING (published = true);
CREATE POLICY "Allow public read product images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Allow public read product highlights" ON public.product_highlights FOR SELECT USING (true);
CREATE POLICY "Allow public read homepage content" ON public.homepage_content FOR SELECT USING (true);
CREATE POLICY "Allow public read about content" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "Allow public read quality content" ON public.quality_content FOR SELECT USING (true);
CREATE POLICY "Allow public read contact settings" ON public.contact_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read site settings" ON public.site_settings FOR SELECT USING (true);

-- Authenticated Admin Policies (Full Access)
CREATE POLICY "Allow authenticated full access categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access product_images" ON public.product_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access product_highlights" ON public.product_highlights FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access homepage" ON public.homepage_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access about" ON public.about_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access quality" ON public.quality_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access contact" ON public.contact_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 12. Storage Buckets (Execute in Supabase Storage or Dashboard)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
CREATE POLICY "Allow public read product-images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Allow authenticated upload product-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Allow authenticated update product-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images');
CREATE POLICY "Allow authenticated delete product-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images');

CREATE POLICY "Allow public read site-assets" ON storage.objects FOR SELECT USING (bucket_id = 'site-assets');
CREATE POLICY "Allow authenticated upload site-assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-assets');
CREATE POLICY "Allow authenticated update site-assets" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-assets');
CREATE POLICY "Allow authenticated delete site-assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-assets');

-- 13. Seed Initial Singleton Content
INSERT INTO public.homepage_content (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.about_content (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.quality_content (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.contact_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.site_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;

-- 14. Seed Initial Categories
INSERT INTO public.categories (id, name, slug, description, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Spices & Seasonings', 'spices', 'Authentic Indian whole spices and ground powders with high active phytochemicals and export compliance.', 1),
('22222222-2222-2222-2222-222222222222', 'Cold-Pressed Oils', 'cold-pressed-oils', 'Pure, unrefined edible and cosmetic oils extracted using traditional temperature-controlled presses.', 2),
('33333333-3333-3333-3333-333333333333', 'Agricultural Commodities', 'agricultural-products', 'Nutrient-rich sun-dried agricultural staples processed for global commercial formulations.', 3)
ON CONFLICT (slug) DO NOTHING;

-- 15. Seed 3 Core Products
INSERT INTO public.products (
    id, category_id, title, slug, tagline, description, applications, grade, moq, certifications, packaging, featured, published, sort_order, seo_title, seo_description
) VALUES
(
    'a1111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    'Premium Indian Turmeric Powder & Fingers (High Curcumin Content)',
    'premium-indian-turmeric-powder-fingers',
    'Golden Radiance and Powerful Wellness for Global Food, Pharma, and Cosmetics.',
    'Harness the natural power of authentic Indian Turmeric, sustainably harvested from nutrient-rich soils famous for producing high-curcumin yields. Carefully sun-cured and processed in sterile environments, our turmeric delivers an intense, deep-golden hue and an earthy, warm spice profile that global buyers demand. Highly sought after across the food service, nutraceutical, wellness, and organic cosmetic sectors, our premium export batches maintain strict microbiological and heavy-metal compliance. Whether you need whole polished fingers for long-term storage or ultra-fine, free-flowing powder for immediate formulation, our supply chain ensures pristine, unadulterated purity from farm to port.',
    'Food seasoning, culinary blending, nutraceutical supplements, cosmetic formulating, therapeutic formulations.',
    'Export Grade Whole Polished / Ultra-Fine Powder',
    '500 KG / 1 Metric Ton (Customizable for trial orders)',
    'NABL Lab certified COA, Phytosanitary certification, and FSSAI approved.',
    'Moisture-proof multi-layer paper bags, PP bags, or bespoke private labeling.',
    true,
    true,
    1,
    'Premium Indian Turmeric Powder & Fingers | High Curcumin | Urban Fresh Export',
    'Sustainably harvested authentic Indian turmeric with high curcumin content. Whole polished fingers and ultra-fine powder for B2B export.'
),
(
    'a2222222-2222-2222-2222-222222222222',
    '22222222-2222-2222-2222-222222222222',
    'Premium Cold-Pressed Coconut Oil (Raw, Multi-Purpose Export Grade)',
    'premium-cold-pressed-coconut-oil',
    'Crystal-Clear Purity for Superfood Formulations, Culinary Excellence, and Personal Care.',
    'Crafted from freshly harvested, mature coconuts, our Cold-Pressed Coconut Oil sets the international benchmark for crystal-clear purity and stability. Extracted under raw, heat-free conditions to safeguard vital antioxidants, healthy medium-chain triglycerides (MCTs), and its fresh tropical fragrance, this versatile oil is an absolute staple for the global market. It transitions flawlessly between a nutrient-dense gourmet cooking oil, a premium ingredient for health supplements, and a luxurious base for hair and skincare manufacturing. Completely unbleached, non-deodorized, and sulfur-free, it provides global importers with an ultra-clean label product that consumers trust implicitly.',
    'Food manufacturing, gourmet retail, cosmetic formulating, and therapeutic use.',
    'Extra Virgin & Pure Cold-Pressed (Raw, Unrefined)',
    '200 Litres / 1 Drum (Bulk options up to 20ft container)',
    'Full purity laboratory COA, FSSAI compliance, Phytosanitary clearance.',
    'Bulk steel/HDPE drums, intermediate bulk containers (IBCs), or retail glass jars.',
    true,
    true,
    2,
    'Raw Cold-Pressed Coconut Oil | Export Grade | Urban Fresh',
    'Crystal-clear raw cold-pressed virgin coconut oil for international B2B buyers. Food, cosmetic, and wellness export grade.'
),
(
    'a3333333-3333-3333-3333-333333333333',
    '22222222-2222-2222-2222-222222222222',
    'Premium Cold-Pressed Groundnut Oil (100% Pure / Unrefined)',
    'premium-cold-pressed-groundnut-oil',
    'High-Smoke Point Versatility Meets Rich, Heart-Healthy Tradition.',
    'Sourced from the finest, sun-dried oilseeds, our Premium Groundnut Oil is extracted using traditional, temperature-controlled cold-pressing methods to ensure zero nutrient loss. Celebrated globally by B2B food manufacturers, distributors, and health-conscious chefs, this golden oil boasts a naturally high smoke point—perfect for sautéing, deep frying, and daily culinary applications. Free from additives, chemical refining, and trans fats, it delivers a smooth, distinctively nutty aroma that gently enhances flavors without overpowering them. Give your global market access to clean-label, pure-grade vegetable oil engineered for both superior health and exceptional kitchen performance.',
    'Commercial food processing, culinary frying & roasting, gourmet dressing, natural condiment formulation.',
    '100% Pure Expeller / Cold-Pressed Unrefined',
    '500 Litres / Bulk Flexitank (Container loads available)',
    'Manufactured under strict global food safety regulations with full traceability.',
    'Bulk drums (200L), Flexitanks, or custom retail glass/PET bottles (1L, 5L).',
    true,
    true,
    3,
    'Pure Cold-Pressed Groundnut Oil | 100% Natural | Urban Fresh Export',
    'Golden unrefined cold-pressed groundnut peanut oil with high smoke point for global B2B food manufacturers and importers.'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    tagline = EXCLUDED.tagline,
    description = EXCLUDED.description,
    applications = EXCLUDED.applications,
    grade = EXCLUDED.grade,
    moq = EXCLUDED.moq,
    certifications = EXCLUDED.certifications,
    packaging = EXCLUDED.packaging,
    updated_at = now();

-- 16. Seed Product Highlights
INSERT INTO public.product_highlights (product_id, label, value, sort_order) VALUES
('a1111111-1111-1111-1111-111111111111', 'Available Forms', 'Whole Polished Fingers, Semi-polished, and Ultra-Fine Powder', 1),
('a1111111-1111-1111-1111-111111111111', 'Curcumin Levels', 'Tested and certified premium curcumin content options available', 2),
('a1111111-1111-1111-1111-111111111111', 'Global Certifications', 'NABL Lab certified COA, Phytosanitary certification, and FSSAI approved', 3),
('a1111111-1111-1111-1111-111111111111', 'Packaging', 'Moisture-proof multi-layer paper bags, PP bags, or bespoke private labeling', 4),

('a2222222-2222-2222-2222-222222222222', 'Grade', 'Extra Virgin & Pure Cold-Pressed (Raw, Unrefined)', 1),
('a2222222-2222-2222-2222-222222222222', 'Moisture Content', 'Minimal moisture levels for extended shelf life during sea transit', 2),
('a2222222-2222-2222-2222-222222222222', 'Applications', 'Food manufacturing, gourmet retail, cosmetic formulating, and therapeutic use', 3),
('a2222222-2222-2222-2222-222222222222', 'Packaging', 'Bulk steel/HDPE drums, intermediate bulk containers (IBCs), or retail glass jars', 4),

('a3333333-3333-3333-3333-333333333333', 'Processing', '100% Cold-Pressed / Expeller Pressed, single filtered through cloth', 1),
('a3333333-3333-3333-3333-333333333333', 'Aroma & Taste', 'Mild, authentic nutty flavor with zero bitter notes', 2),
('a3333333-3333-3333-3333-333333333333', 'Packaging Formats', 'Bulk drums (200L), Flexitanks, or custom retail glass/PET bottles (1L, 5L)', 3),
('a3333333-3333-3333-3333-333333333333', 'Compliance', 'Manufactured under strict global food safety regulations with full traceability', 4);

-- 17. Seed Product Images
INSERT INTO public.product_images (product_id, image_url, alt_text, sort_order) VALUES
('a1111111-1111-1111-1111-111111111111', '/images/turmeric.jpg', 'Premium Indian Turmeric Powder and Polished Fingers', 1),
('a2222222-2222-2222-2222-222222222222', '/images/coconut-oil.jpg', 'Raw Cold-Pressed Virgin Coconut Oil in Glass Bottle', 1),
('a3333333-3333-3333-3333-333333333333', '/images/groundnut-oil.jpg', 'Golden Cold-Pressed Groundnut Peanut Oil for B2B Export', 1);
