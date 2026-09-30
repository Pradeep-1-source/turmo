import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import AboutSection from '@/components/AboutSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import QualityExportTimeline from '@/components/QualityExportTimeline';
import GlobalExportMap from '@/components/GlobalExportMap';
import WhyUrbanFresh from '@/components/WhyUrbanFresh';
import CTASection from '@/components/CTASection';
import ContactSection from '@/components/ContactSection';
import {
  fetchHomepageContent,
  fetchProducts,
  fetchCategories,
  fetchContactSettings,
  fetchQualityContent,
  fetchSiteSettings,
} from '@/lib/supabase';
import {
  defaultHomepageContent,
  defaultProducts,
  defaultCategories,
  defaultContactSettings,
  defaultQualityContent,
  defaultSiteSettings,
} from '@/lib/defaultData';
import {
  HomepageContent,
  Product,
  Category,
  ContactSettings,
  QualityContent,
  SiteSettings,
} from '@/types/database';

export default function HomePage() {
  const [homepage, setHomepage] = useState<HomepageContent>(defaultHomepageContent);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [contact, setContact] = useState<ContactSettings>(defaultContactSettings);
  const [quality, setQuality] = useState<QualityContent>(defaultQualityContent);
  const [site, setSite] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    Promise.all([
      fetchHomepageContent(),
      fetchProducts(),
      fetchCategories(),
      fetchContactSettings(),
      fetchQualityContent(),
      fetchSiteSettings(),
    ]).then(([h, p, c, ct, q, s]) => {
      setHomepage(h);
      setProducts(p);
      setCategories(c);
      setContact(ct);
      setQuality(q);
      setSite(s);
    }).catch(err => {
      console.warn('Using default content:', err);
    });
  }, []);

  return (
    <>
      {/* 1. Cinematic Hero */}
      <Hero
        headline={homepage.hero_headline}
        tagline={homepage.hero_tagline}
        badge={homepage.hero_badge}
        image={homepage.hero_image}
        whatsappNumber={site.whatsapp_number}
      />

      {/* 2. Trust Stats Bar */}
      <TrustSection stats={homepage.trust_stats} />

      {/* 3. About Urban Fresh */}
      <AboutSection
        title={homepage.about_title}
        description={homepage.about_description}
        image={homepage.about_image}
      />

      {/* 4. Featured Product Catalogue */}
      <FeaturedProducts
        products={products}
        categories={categories}
        whatsappNumber={site.whatsapp_number}
      />

      {/* 5. Quality & Export Process Timeline */}
      <QualityExportTimeline
        title={quality.title}
        subtitle={quality.subtitle}
        description={quality.description}
        steps={quality.process_steps}
        certificationsInfo={quality.certifications_info}
      />

      {/* 6. Global Export Map Visual */}
      <GlobalExportMap
        title={homepage.global_export_title}
        description={homepage.global_export_description}
      />

      {/* 7. Why Urban Fresh (4 Cards) */}
      <WhyUrbanFresh items={homepage.why_us_items} />

      {/* 8. CTA Section */}
      <CTASection
        whatsappNumber={site.whatsapp_number}
        phoneNumber={site.phone_number}
      />

      {/* 9. Contact Details Section */}
      <ContactSection contact={contact} />
    </>
  );
}
