import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

// Public site
import HeroSection from './components/sections/HeroSection';
import Ticker from './components/sections/Ticker';
import ServicesSection from './components/sections/ServicesSection';
import WorksSection from './components/sections/WorksSection';
import StatsSection from './components/sections/StatsSection';
import ProcessSection from './components/sections/ProcessSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import TeamShowcaseSection from './components/sections/TeamShowcaseSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';
import AboutPage from './pages/AboutPage';

// Admin
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const ProtectedRoute = lazy(() => import('./pages/admin/ProtectedRoute'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'));
const AdminClients = lazy(() => import('./pages/admin/AdminClients'));
const AdminTeam = lazy(() => import('./pages/admin/AdminTeam'));
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'));
const AdminJobs = lazy(() => import('./pages/admin/AdminJobs'));
const AdminSEO = lazy(() => import('./pages/admin/AdminSEO'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

function RouteFallback() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--x4-black)', color: 'var(--x4-muted)', fontFamily: 'Space Mono, monospace', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
      Loading...
    </div>
  );
}

function PublicSite() {
  return (
    <>
      <main className="public-site">
        <HeroSection />
        <Ticker />
        <ServicesSection />
        <StatsSection />
        <WorksSection />
        <ProcessSection />
        <TestimonialsSection />
        <TeamShowcaseSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              {/* ── Public website ── */}
              <Route path="/" element={<PublicSite />} />
              <Route path="/about" element={<AboutPage />} />

              {/* ── Admin login ── */}
              <Route path="/admin" element={<AdminLogin />} />

              {/* ── Admin dashboard (protected) ── */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard"    element={<AdminDashboard />} />
                <Route path="projects"     element={<AdminProjects />} />
                <Route path="services"     element={<AdminServices />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="clients"      element={<AdminClients />} />
                <Route path="team"         element={<AdminTeam />} />
                <Route path="blog"         element={<AdminBlog />} />
                <Route path="jobs"         element={<AdminJobs />} />
                <Route path="seo"          element={<AdminSEO />} />
                <Route path="settings"     element={<AdminSettings />} />
              </Route>

              {/* ── Fallback ── */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}
