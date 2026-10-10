'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  fetchHomepageContent,
  fetchAboutContent,
  fetchQualityContent,
  fetchContactSettings,
  fetchSiteSettings,
  saveHomepageContent,
  saveAboutContent,
  saveQualityContent,
  saveContactSettings,
  saveSiteSettings,
} from '@/lib/supabase';
import {
  HomepageContent,
  AboutContent,
  QualityContent,
  ContactSettings,
  SiteSettings,
} from '@/types/database';
import {
  Save,
  Home,
  FileText,
  Award,
  Phone,
  Settings,
  Sparkles,
  Mail,
  UserCheck,
} from 'lucide-react';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'quality' | 'contact' | 'settings'>('home');
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [quality, setQuality] = useState<QualityContent | null>(null);
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [site, setSite] = useState<SiteSettings | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    const [h, a, q, c, s] = await Promise.all([
      fetchHomepageContent(),
      fetchAboutContent(),
      fetchQualityContent(),
      fetchContactSettings(),
      fetchSiteSettings(),
    ]);
    setHomepage(h);
    setAbout(a);
    setQuality(q);
    setContact(c);
    setSite(s);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveHome = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!homepage) return;
    await saveHomepageContent(homepage);
    showToast('Homepage CMS updated successfully!');
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about) return;
    await saveAboutContent(about);
    showToast('About CMS updated successfully!');
  };

  const handleSaveQuality = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quality) return;
    await saveQualityContent(quality);
    showToast('Quality & Export CMS updated successfully!');
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    await saveContactSettings(contact);
    // If site has email, sync it as well
    if (site && contact.email) {
      await saveSiteSettings({ ...site, email: contact.email });
      setSite({ ...site, email: contact.email });
    }
    showToast('Contact information & email updated successfully!');
  };

  const handleSaveSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!site) return;
    await saveSiteSettings(site);
    // Sync contact email if provided
    if (contact && site.email) {
      await saveContactSettings({ ...contact, email: site.email });
      setContact({ ...contact, email: site.email });
    }
    showToast('Site settings & business email updated successfully!');
  };

  const inputClass =
    'admin-field w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] placeholder:text-[#64748B] text-sm focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all';
  const labelClass = 'block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1';

  return (
    <>
      <AdminHeader
        title="Website Content & Settings CMS"
        subtitle="Live control over headlines, hero copy, export protocols, and contact details"
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-sm shadow-glow-green animate-bounce">
          ✓ {toastMessage}
        </div>
      )}

      <main className="p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1 min-w-0">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-brand-green text-navy-dark shadow-glow-green-sm'
                : 'text-slate-300 hover:bg-navy-surface hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Homepage CMS</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'about'
                ? 'bg-brand-green text-navy-dark shadow-glow-green-sm'
                : 'text-slate-300 hover:bg-navy-surface hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>About Us CMS</span>
          </button>

          <button
            onClick={() => setActiveTab('quality')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'quality'
                ? 'bg-brand-green text-navy-dark shadow-glow-green-sm'
                : 'text-slate-300 hover:bg-navy-surface hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Quality & Export CMS</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'contact'
                ? 'bg-brand-green text-navy-dark shadow-glow-green-sm'
                : 'text-slate-300 hover:bg-navy-surface hover:text-white'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Contact & Office CMS</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-brand-green text-navy-dark shadow-glow-green-sm'
                : 'text-slate-300 hover:bg-navy-surface hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Site & SEO Settings</span>
          </button>
        </div>

        {/* Tab 1: Homepage CMS */}
        {activeTab === 'home' && homepage && (
          <div className="rounded-2xl bg-navy-card border border-white/10 p-6 sm:p-8 shadow-card-dark">
            <form onSubmit={handleSaveHome} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-lime" />
                  Hero Section & Trust Strip
                </h3>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-xs shadow-glow-green hover:scale-105 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Homepage Content</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Hero Headline (Use Enter for newline)
                  </label>
                  <textarea
                    rows={2}
                    value={homepage.hero_headline}
                    onChange={(e) =>
                      setHomepage({ ...homepage, hero_headline: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Hero Tagline / Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={homepage.hero_tagline}
                    onChange={(e) =>
                      setHomepage({ ...homepage, hero_tagline: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Hero Badge Text
                  </label>
                  <input
                    type="text"
                    value={homepage.hero_badge}
                    onChange={(e) =>
                      setHomepage({ ...homepage, hero_badge: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Hero Background Image Path
                  </label>
                  <input
                    type="text"
                    value={homepage.hero_image}
                    onChange={(e) =>
                      setHomepage({ ...homepage, hero_image: e.target.value })
                    }
                    className={`${inputClass} font-mono text-xs`}
                  />
                </div>

                <div className="sm:col-span-2 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white mb-2">Homepage About Strip</h4>
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    About Section Title
                  </label>
                  <input
                    type="text"
                    value={homepage.about_title}
                    onChange={(e) =>
                      setHomepage({ ...homepage, about_title: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    About Section Description
                  </label>
                  <textarea
                    rows={3}
                    value={homepage.about_description}
                    onChange={(e) =>
                      setHomepage({ ...homepage, about_description: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: About CMS */}
        {activeTab === 'about' && about && (
          <div className="rounded-2xl bg-navy-card border border-white/10 p-6 sm:p-8 shadow-card-dark">
            <form onSubmit={handleSaveAbout} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-lime" />
                  About Us Page Content & Leadership
                </h3>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-xs shadow-glow-green hover:scale-105 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save About Content</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>About Title</label>
                    <input
                      type="text"
                      value={about.title}
                      onChange={(e) => setAbout({ ...about, title: e.target.value })}
                      className={inputClass}
                      placeholder="About Urban Fresh"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Main Heading</label>
                    <input
                      type="text"
                      value={about.subtitle}
                      onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
                      className={inputClass}
                      placeholder="From Nature’s Richness to the World’s Markets"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    About Content (Main Narrative)
                  </label>
                  <textarea
                    rows={6}
                    value={about.description}
                    onChange={(e) => setAbout({ ...about, description: e.target.value })}
                    className={`${inputClass} leading-relaxed`}
                    placeholder="At Urban Fresh, we bring the richness of agriculture closer to the world..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Our Commitment (Section Heading & Content)
                    </label>
                    <textarea
                      rows={4}
                      value={about.commitment || about.mission}
                      onChange={(e) =>
                        setAbout({
                          ...about,
                          commitment: e.target.value,
                          mission: e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder="Quality is at the heart of everything we do..."
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Our Vision (Section Heading & Content)
                    </label>
                    <textarea
                      rows={4}
                      value={about.vision}
                      onChange={(e) => setAbout({ ...about, vision: e.target.value })}
                      className={inputClass}
                      placeholder="To establish Urban Fresh as a trusted global name..."
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Closing Statement</label>
                  <input
                    type="text"
                    value={about.closing_statement || 'Growing Together. Delivering Quality. Building Trust.'}
                    onChange={(e) =>
                      setAbout({ ...about, closing_statement: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Growing Together. Delivering Quality. Building Trust."
                  />
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-brand-green" />
                    Managing Director Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Managing Director Name</label>
                      <input
                        type="text"
                        value={about.managing_director || 'Jayasuriya R'}
                        onChange={(e) =>
                          setAbout({ ...about, managing_director: e.target.value })
                        }
                        className={inputClass}
                        placeholder="Jayasuriya R"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Designation</label>
                      <input
                        type="text"
                        value={about.designation || 'Managing Director | Urban Fresh'}
                        onChange={(e) =>
                          setAbout({ ...about, designation: e.target.value })
                        }
                        className={inputClass}
                        placeholder="Managing Director | Urban Fresh"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Quality CMS */}
        {activeTab === 'quality' && quality && (
          <div className="rounded-2xl bg-navy-card border border-white/10 p-6 sm:p-8 shadow-card-dark">
            <form onSubmit={handleSaveQuality} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-lime" />
                  Quality & Export Standards
                </h3>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-xs shadow-glow-green hover:scale-105 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Quality Content</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Section Heading</label>
                  <input
                    type="text"
                    value={quality.title}
                    onChange={(e) => setQuality({ ...quality, title: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Overview Description</label>
                  <textarea
                    rows={3}
                    value={quality.description}
                    onChange={(e) => setQuality({ ...quality, description: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Lab Testing Protocols</label>
                  <textarea
                    rows={3}
                    value={quality.lab_testing_info}
                    onChange={(e) => setQuality({ ...quality, lab_testing_info: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Export-Ready Packaging & Transit Integrity</label>
                  <textarea
                    rows={3}
                    value={quality.packaging_info}
                    onChange={(e) => setQuality({ ...quality, packaging_info: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Tab 4: Contact CMS */}
        {activeTab === 'contact' && contact && (
          <div className="rounded-2xl bg-navy-card border border-white/10 p-6 sm:p-8 shadow-card-dark">
            <form onSubmit={handleSaveContact} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-lime" />
                  Registered Address & Trade Desk
                </h3>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-xs shadow-glow-green hover:scale-105 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact Details</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Company Name</label>
                  <input
                    type="text"
                    value={contact.company_name}
                    onChange={(e) => setContact({ ...contact, company_name: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>WhatsApp Desk Number</label>
                  <input
                    type="text"
                    value={contact.whatsapp}
                    onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                    className={`${inputClass} font-mono`}
                  />
                </div>

                <div>
                  <label className={labelClass}>Telephone</label>
                  <input
                    type="text"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Business & Export Email (Used for Email Enquiries)
                  </label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className={inputClass}
                    placeholder="export@urbanfresh.in"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Address Line 1</label>
                  <input
                    type="text"
                    value={contact.address_line1}
                    onChange={(e) => setContact({ ...contact, address_line1: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Address Line 2</label>
                  <input
                    type="text"
                    value={contact.address_line2}
                    onChange={(e) => setContact({ ...contact, address_line2: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>City, State, Pincode</label>
                  <input
                    type="text"
                    value={`${contact.city}, ${contact.state} - ${contact.postal_code}`}
                    onChange={(e) => {
                      const parts = e.target.value.split(',');
                      if (parts.length > 1) {
                        setContact({
                          ...contact,
                          city: parts[0].trim(),
                          state: parts[1].trim(),
                        });
                      }
                    }}
                    className={inputClass}
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Tab 5: Site Settings */}
        {activeTab === 'settings' && site && (
          <div className="rounded-2xl bg-navy-card border border-white/10 p-6 sm:p-8 shadow-card-dark">
            <form onSubmit={handleSaveSite} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-brand-lime" />
                  Global Site, Email & SEO Settings
                </h3>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-lime text-navy-dark font-extrabold text-xs shadow-glow-green hover:scale-105 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Site Settings</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Brand Tagline</label>
                    <input
                      type="text"
                      value={site.tagline}
                      onChange={(e) => setSite({ ...site, tagline: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Configured Business Email (Enquiry Mailto Target)
                    </label>
                    <input
                      type="email"
                      value={site.email}
                      onChange={(e) => setSite({ ...site, email: e.target.value })}
                      className={inputClass}
                      placeholder="export@urbanfresh.in"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Default SEO Title</label>
                  <input
                    type="text"
                    value={site.default_seo_title}
                    onChange={(e) => setSite({ ...site, default_seo_title: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Default SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={site.default_seo_description}
                    onChange={(e) => setSite({ ...site, default_seo_description: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Footer Narrative Text</label>
                  <textarea
                    rows={3}
                    value={site.footer_text}
                    onChange={(e) => setSite({ ...site, footer_text: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </main>
    </>
  );
}
