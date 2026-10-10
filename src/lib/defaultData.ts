import {
  Category,
  Product,
  HomepageContent,
  AboutContent,
  QualityContent,
  ContactSettings,
  SiteSettings,
} from '@/types/database';

export const defaultCategories: Category[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Spices & Seasonings',
    slug: 'spices',
    description: 'Authentic Indian whole spices and ground powders with high active phytochemicals and export compliance.',
    image_url: '/images/turmeric.jpg',
    published: true,
    sort_order: 1,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Cold-Pressed Oils',
    slug: 'cold-pressed-oils',
    description: 'Pure, unrefined edible and cosmetic oils extracted using traditional temperature-controlled presses.',
    image_url: '/images/coconut-oil.jpg',
    published: true,
    sort_order: 2,
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Agricultural Products',
    slug: 'agricultural-products',
    description: 'Nutrient-rich sun-dried agricultural staples processed for global commercial formulations.',
    image_url: '/images/groundnut-oil.jpg',
    published: true,
    sort_order: 3,
  },
];

export const defaultProducts: Product[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    category_id: '11111111-1111-1111-1111-111111111111',
    title: 'Premium Indian Turmeric Powder & Fingers (High Curcumin Content)',
    slug: 'premium-indian-turmeric-powder-fingers',
    tagline: 'Golden Radiance and Powerful Wellness for Global Food, Pharma, and Cosmetics.',
    description:
      'Harness the natural power of authentic Indian Turmeric, sustainably harvested from nutrient-rich soils famous for producing high-curcumin yields. Carefully sun-cured and processed in sterile environments, our turmeric delivers an intense, deep-golden hue and an earthy, warm spice profile that global buyers demand. Highly sought after across the food service, nutraceutical, wellness, and organic cosmetic sectors, our premium export batches maintain strict microbiological and heavy-metal compliance. Whether you need whole polished fingers for long-term storage or ultra-fine, free-flowing powder for immediate formulation, our supply chain ensures pristine, unadulterated purity from farm to port.',
    applications:
      'Food seasoning, culinary blending, nutraceutical supplements, cosmetic formulating, therapeutic formulations.',
    grade: 'Export Grade Whole Polished / Ultra-Fine Powder',
    moq: '500 KG / 1 Metric Ton (Customizable for trial orders)',
    certifications: 'NABL Lab certified COA, Phytosanitary certification, and FSSAI approved.',
    packaging: 'Moisture-proof multi-layer paper bags, PP bags, or bespoke private labeling.',
    featured: true,
    published: true,
    sort_order: 1,
    seo_title: 'Premium Indian Turmeric Powder & Fingers | High Curcumin | Urban Fresh Export',
    seo_description:
      'Sustainably harvested authentic Indian turmeric with high curcumin content. Whole polished fingers and ultra-fine powder for B2B export.',
    images: [
      {
        id: 'img-1',
        product_id: 'a1111111-1111-1111-1111-111111111111',
        image_url: '/images/turmeric.jpg',
        alt_text: 'Premium Indian Turmeric Powder and Polished Fingers',
        sort_order: 1,
      },
    ],
    highlights: [
      {
        id: 'h-1',
        label: 'Available Forms',
        value: 'Whole Polished Fingers, Semi-polished, and Ultra-Fine Powder.',
        sort_order: 1,
      },
      {
        id: 'h-2',
        label: 'Curcumin Levels',
        value: 'Tested and certified premium curcumin content options available.',
        sort_order: 2,
      },
      {
        id: 'h-3',
        label: 'Global Certifications',
        value: 'NABL Lab certified COA, Phytosanitary certification, and FSSAI approved.',
        sort_order: 3,
      },
      {
        id: 'h-4',
        label: 'Packaging',
        value: 'Moisture-proof multi-layer paper bags, PP bags, or bespoke private labeling.',
        sort_order: 4,
      },
    ],
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222',
    category_id: '22222222-2222-2222-2222-222222222222',
    title: 'Premium Cold-Pressed Coconut Oil (Raw, Multi-Purpose Export Grade)',
    slug: 'premium-cold-pressed-coconut-oil',
    tagline: 'Crystal-Clear Purity for Superfood Formulations, Culinary Excellence, and Personal Care.',
    description:
      'Crafted from freshly harvested, mature coconuts, our Cold-Pressed Coconut Oil sets the international benchmark for crystal-clear purity and stability. Extracted under raw, heat-free conditions to safeguard vital antioxidants, healthy medium-chain triglycerides (MCTs), and its fresh tropical fragrance, this versatile oil is an absolute staple for the global market. It transitions flawlessly between a nutrient-dense gourmet cooking oil, a premium ingredient for health supplements, and a luxurious base for hair and skincare manufacturing. Completely unbleached, non-deodorized, and sulfur-free, it provides global importers with an ultra-clean label product that consumers trust implicitly.',
    applications: 'Food manufacturing, gourmet retail, cosmetic formulating, and therapeutic use.',
    grade: 'Extra Virgin & Pure Cold-Pressed (Raw, Unrefined)',
    moq: '200 Litres / 1 Drum (Bulk options up to 20ft container)',
    certifications: 'Full purity laboratory COA, FSSAI compliance, Phytosanitary clearance.',
    packaging: 'Bulk steel/HDPE drums, intermediate bulk containers (IBCs), or retail glass jars.',
    featured: true,
    published: true,
    sort_order: 2,
    seo_title: 'Raw Cold-Pressed Coconut Oil | Export Grade | Urban Fresh',
    seo_description:
      'Crystal-clear raw cold-pressed virgin coconut oil for international B2B buyers. Food, cosmetic, and wellness export grade.',
    images: [
      {
        id: 'img-2',
        product_id: 'a2222222-2222-2222-2222-222222222222',
        image_url: '/images/coconut-oil.jpg',
        alt_text: 'Raw Cold-Pressed Virgin Coconut Oil in Glass Bottle',
        sort_order: 1,
      },
    ],
    highlights: [
      {
        id: 'h-21',
        label: 'Grade',
        value: 'Extra Virgin & Pure Cold-Pressed (Raw, Unrefined).',
        sort_order: 1,
      },
      {
        id: 'h-22',
        label: 'Moisture Content',
        value: 'Minimal moisture levels for extended shelf life during sea transit.',
        sort_order: 2,
      },
      {
        id: 'h-23',
        label: 'Applications',
        value: 'Food manufacturing, gourmet retail, cosmetic formulating, and therapeutic use.',
        sort_order: 3,
      },
      {
        id: 'h-24',
        label: 'Packaging',
        value: 'Bulk steel/HDPE drums, intermediate bulk containers (IBCs), or retail glass jars.',
        sort_order: 4,
      },
    ],
  },
  {
    id: 'a3333333-3333-3333-3333-333333333333',
    category_id: '22222222-2222-2222-2222-222222222222',
    title: 'Premium Cold-Pressed Groundnut Oil (100% Pure / Unrefined)',
    slug: 'premium-cold-pressed-groundnut-oil',
    tagline: 'High-Smoke Point Versatility Meets Rich, Heart-Healthy Tradition.',
    description:
      'Sourced from the finest, sun-dried oilseeds, our Premium Groundnut Oil is extracted using traditional, temperature-controlled cold-pressing methods to ensure zero nutrient loss. Celebrated globally by B2B food manufacturers, distributors, and health-conscious chefs, this golden oil boasts a naturally high smoke point—perfect for sautéing, deep frying, and daily culinary applications. Free from additives, chemical refining, and trans fats, it delivers a smooth, distinctively nutty aroma that gently enhances flavors without overpowering them. Give your global market access to clean-label, pure-grade vegetable oil engineered for both superior health and exceptional kitchen performance.',
    applications:
      'Commercial food processing, culinary frying & roasting, gourmet dressing, natural condiment formulation.',
    grade: '100% Pure Expeller / Cold-Pressed Unrefined',
    moq: '500 Litres / Bulk Flexitank (Container loads available)',
    certifications: 'Manufactured under strict global food safety regulations with full traceability.',
    packaging: 'Bulk drums (200L), Flexitanks, or custom retail glass/PET bottles (1L, 5L).',
    featured: true,
    published: true,
    sort_order: 3,
    seo_title: 'Pure Cold-Pressed Groundnut Oil | 100% Natural | Urban Fresh Export',
    seo_description:
      'Golden unrefined cold-pressed groundnut peanut oil with high smoke point for global B2B food manufacturers and importers.',
    images: [
      {
        id: 'img-3',
        product_id: 'a3333333-3333-3333-3333-333333333333',
        image_url: '/images/groundnut-oil.jpg',
        alt_text: 'Golden Cold-Pressed Groundnut Peanut Oil for B2B Export',
        sort_order: 1,
      },
    ],
    highlights: [
      {
        id: 'h-31',
        label: 'Processing',
        value: '100% Cold-Pressed / Expeller Pressed, single filtered through cloth.',
        sort_order: 1,
      },
      {
        id: 'h-32',
        label: 'Aroma & Taste',
        value: 'Mild, authentic nutty flavor with zero bitter notes.',
        sort_order: 2,
      },
      {
        id: 'h-33',
        label: 'Packaging Formats',
        value: 'Bulk drums (200L), Flexitanks, or custom retail glass/PET bottles (1L, 5L).',
        sort_order: 3,
      },
      {
        id: 'h-34',
        label: 'Compliance',
        value: 'Manufactured under strict global food safety regulations with full traceability.',
        sort_order: 4,
      },
    ],
  },
];

export const defaultHomepageContent: HomepageContent = {
  id: 'default',
  hero_headline: 'Premium Indian Products,\nDelivered Worldwide.',
  hero_tagline:
    'Authentic agricultural products sourced with care, processed to premium standards, and prepared for global markets.',
  hero_badge: 'INDIAN ORIGIN • GLOBAL REACH',
  hero_image: '/images/hero-bg.jpg',
  about_title: 'Rooted in India. Prepared for the World.',
  about_description:
    'Urban Fresh connects quality Indian agricultural products with global buyers. We specialize in responsible farm-level sourcing, unadulterated cold-pressing, sterile pulverization, and dependable international export packaging.',
  about_image: '/images/export-quality.jpg',
  why_us_items: [
    {
      title: 'Responsible Sourcing',
      description: 'Direct procurement from verified agricultural hubs in Tamil Nadu with pristine soil integrity and full harvest traceability.',
    },
    {
      title: 'Quality Focus',
      description: 'Strict batch-wise testing, laboratory COA verification, and zero adulteration across entire product portfolios.',
    },
    {
      title: 'Export-Ready Packaging',
      description: 'Moisture-controlled multi-wall paper sacks, bulk drums, IBCs, and private-label packaging options designed to support the storage and transportation requirements of agricultural and food products.',
    },
    {
      title: 'B2B Global Supply',
      description: 'Prompt trade response, reliable container-load logistics, export documentation, and smooth customs dispatch.',
    },
  ],
  trust_stats: [
    { label: 'Farm Sourced', sub: 'Direct Origin Cultivation' },
    { label: 'Quality Focused', sub: 'Stringent COA Verification' },
    { label: 'Export Ready', sub: 'Standardized Transit Packaging' },
    { label: 'Global Supply', sub: 'International Port Dispatch' },
  ],
  global_export_title: 'From India to Global Markets',
  global_export_description:
    'Supplying international importers, food manufacturing giants, wellness brands, and cosmetic formulators across the Middle East, Southeast Asia, Europe, and the Americas.',
};

export const defaultAboutContent: AboutContent = {
  id: 'default',
  title: 'About Urban Fresh',
  subtitle: 'From Nature’s Richness to the World’s Markets',
  description:
    'At Urban Fresh, we bring the richness of agriculture closer to the world. Driven by quality, trust, and a passion for agricultural products, we aim to connect India’s agricultural potential with opportunities across domestic and international markets.\n\nWe specialize in sourcing and supplying quality agro-based and food products, with a commitment to reliable service, careful handling, and customer satisfaction. From selecting the right products to coordinating dependable deliveries, we strive to make every business relationship meaningful and every transaction trustworthy.',
  commitment:
    'Quality is at the heart of everything we do. We believe in transparent business practices, responsible sourcing, consistent product standards, and building lasting partnerships with farmers, suppliers, distributors, and buyers worldwide.',
  mission:
    'Quality is at the heart of everything we do. We believe in transparent business practices, responsible sourcing, consistent product standards, and building lasting partnerships with farmers, suppliers, distributors, and buyers worldwide.',
  vision:
    'To establish Urban Fresh as a trusted global name in the agricultural and food products industry by delivering quality, creating value, and connecting India’s agricultural resources with markets around the world.',
  closing_statement: 'Growing Together. Delivering Quality. Building Trust.',
  managing_director: 'Jayasuriya R',
  designation: 'Managing Director | Urban Fresh',
  highlights: [
    {
      title: 'Our Commitment',
      desc: 'Quality is at the heart of everything we do. We believe in transparent business practices, responsible sourcing, consistent product standards, and building lasting partnerships with farmers, suppliers, distributors, and buyers worldwide.',
    },
    {
      title: 'Our Vision',
      desc: 'To establish Urban Fresh as a trusted global name in the agricultural and food products industry by delivering quality, creating value, and connecting India’s agricultural resources with markets around the world.',
    },
    {
      title: 'Transparent Sourcing',
      desc: 'Direct grower partnerships and dependable delivery schedules ensuring complete harvest traceability and customer satisfaction.',
    },
    {
      title: 'Global Delivery Standards',
      desc: 'Careful handling, moisture-controlled transit packaging, and prompt coordination connecting India’s richness to world markets.',
    },
  ],
  image_url: '/images/hero-bg.jpg',
};

export const defaultQualityContent: QualityContent = {
  id: 'default',
  title: 'Quality That Travels Worldwide',
  subtitle: 'Precision Quality Protocols from Harvest to Seaport',
  description:
    'Our quality infrastructure guarantees that the agricultural riches harvested in India reach global shores in peak condition, complying with international regulatory and food safety benchmarks.',
  process_steps: [
    {
      step: '01',
      title: 'Sourcing',
      desc: 'Careful selection of mature coconuts, sun-dried oilseeds, and fertile turmeric harvests directly from verified partner farms in Erode and surrounding belts.',
    },
    {
      step: '02',
      title: 'Processing',
      desc: 'Temperature-monitored cold-pressing for oils without chemical solvents; sterile pulverization and sun-curing for turmeric to preserve volatile oils and bio-actives.',
    },
    {
      step: '03',
      title: 'Quality Control',
      desc: 'Laboratory testing for active curcumin percentages, moisture parameters, peroxide values, free fatty acids, and zero chemical residue.',
    },
    {
      step: '04',
      title: 'Packaging',
      desc: 'Industrial-grade moisture-barrier multi-ply bags, food-grade HDPE drums, intermediate bulk containers (IBC), and custom private label packaging.',
    },
    {
      step: '05',
      title: 'Export Dispatch',
      desc: 'Phytosanitary inspection, customs documentation, palletized container loading, and ocean freight logistics to global destinations.',
    },
  ],
  certifications_info:
    'All export consignments are supported with batch-wise Certificate of Analysis (COA), Phytosanitary inspection certificates, and FSSAI compliance documents.',
  packaging_info:
    'We employ heavy-duty sea-transit packaging: 25kg / 50kg multi-layer Kraft paper sacks with inner PE liner, 200L HDPE/steel drums, 1000L IBCs, and customized bulk packaging according to destination port requirements.',
  lab_testing_info:
    'Every batch is evaluated for active phytochemical concentration, moisture content, physical purity, and microbiological safety in certified laboratories.',
};

export const defaultContactSettings: ContactSettings = {
  id: 'default',
  company_name: 'Urban Fresh',
  address_line1: 'D.No-48, VELLI VALASU, Attavanai Anumanpalli',
  address_line2: 'PO: Arachalur, DIST: Erode',
  city: 'Erode',
  state: 'Tamil Nadu',
  postal_code: '638101',
  country: 'India',
  phone: '+91 9884449843',
  whatsapp: '+91 9884449843',
  email: 'export@urbanfresh.in',
  maps_embed_url: 'https://maps.google.com/maps?q=Arachalur,+Erode,+Tamil+Nadu&t=&z=13&ie=UTF8&iwloc=&output=embed',
  business_hours: 'Monday - Saturday: 9:00 AM - 6:30 PM IST',
};

export const defaultSiteSettings: SiteSettings = {
  id: 'default',
  site_name: 'Urban Fresh',
  tagline: 'GROWN WITH CARE DELIVERED WORLD WIDE',
  logo_url: '/images/urban-fresh-logo.jpg',
  whatsapp_number: '919884449843',
  phone_number: '+91 9884449843',
  email: 'export@urbanfresh.in',
  footer_text:
    'Urban Fresh is a premier Indian agricultural products and food export enterprise. We bridge authentic Indian farming excellence with international B2B importers, food processors, and cosmetic formulators across the globe.',
  default_seo_title: 'Urban Fresh | Premium Indian Agricultural Products & Global Export',
  default_seo_description:
    'Urban Fresh supplies premium Indian agricultural and food products for global B2B buyers, with a focus on quality, responsible sourcing and export-ready supply.',
  social_linkedin: 'https://linkedin.com',
  social_instagram: 'https://instagram.com',
  social_facebook: 'https://facebook.com',
};
