/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { FloatingWidgets } from './components/FloatingWidgets';

import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceBookingPage } from './pages/ServiceBookingPage';
import { OrdersBookingsPage } from './pages/OrdersBookingsPage';
import { AiSearchPage } from './pages/AiSearchPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

const MainLayout: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'auth':
      case 'login':
        return <AuthPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'products':
        return <ProductsPage />;
      case 'product_detail':
        return <ProductDetailPage />;
      case 'cart_checkout':
        return <CartCheckoutPage />;
      case 'services':
        return <ServicesPage />;
      case 'service_booking':
        return <ServiceBookingPage />;
      case 'orders_bookings':
        return <OrdersBookingsPage />;
      case 'ai_search':
        return <AiSearchPage />;
      case 'profile_settings':
        return <ProfileSettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-800 flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Desktop Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0 pb-16 lg:pb-8">
        {/* Top Header */}
        <Header />

        {/* Page View Container */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav />

      {/* Global Interactive Widgets (Toast Notification & Live Help Chat) */}
      <FloatingWidgets />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
