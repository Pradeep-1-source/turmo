import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';

// Public Pages
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import QualityPage from '@/pages/QualityPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Admin Pages
import AdminLayout from '@/pages/admin/layout';
import AdminDashboardPage from '@/pages/admin/page';
import AdminLoginPage from '@/pages/admin/login/page';
import AdminProductsPage from '@/pages/admin/products/page';
import AdminCategoriesPage from '@/pages/admin/categories/page';
import AdminContentPage from '@/pages/admin/content/page';

function PublicLayout() {
  return (
    <div className="min-h-screen bg-navy-dark text-slate-100 flex flex-col antialiased selection:bg-brand-green selection:text-navy-dark">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/quality" element={<QualityPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Dedicated Admin Portal Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="content" element={<AdminContentPage />} />
        </Route>
      </Routes>
    </>
  );
}
