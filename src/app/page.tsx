import React from 'react';
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

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  const [homepage, products, categories, contact, quality, site] = await Promise.all([
    fetchHomepageContent(),
    fetchProducts(),
    fetchCategories(),
    fetchContactSettings(),
    fetchQualityContent(),
    fetchSiteSettings(),
  ]);

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
