import React from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  MapPin,
  Sparkles,
  Search,
  Languages,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    navigateTo,
    cartCount,
    language,
    setLanguage,
    t,
    orders,
    bookings,
    setAiSearchQuery
  } = useApp();

  const activeCount =
    orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled').length +
    bookings.filter((b) => b.status === 'Confirmed').length;

  return (
    <header
      id="app-top-header"
      className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Mobile / Tablet Brand */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-2 text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#005c55] to-[#10b981] flex items-center justify-center text-white shadow-xs">
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-[#005c55] font-display block leading-none">
                DAILY HUB
              </span>
              <span className="text-[10px] font-semibold text-emerald-700">15m Delivery</span>
            </div>
          </button>
        </div>

        {/* Hyperlocal Address Selector (Desktop and Mobile) */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-full cursor-pointer transition-colors text-xs">
          <MapPin className="w-3.5 h-3.5 text-[#005c55]" />
          <div className="flex items-center gap-1 font-semibold text-slate-800">
            <span>Madhapur, Hyderabad</span>
            <span className="text-slate-400">·</span>
            <span className="text-emerald-700 font-bold">15 Mins</span>
          </div>
        </div>

        {/* Search Bar / AI Quick Input in Header */}
        <div className="flex-1 max-w-xl mx-2 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val) {
                    setAiSearchQuery(val);
                    navigateTo('ai_search');
                  }
                }
              }}
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs border border-slate-200 rounded-full pl-9 pr-24 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005c55]/30 focus:border-[#005c55] transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <button
              onClick={() => navigateTo('ai_search')}
              className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 bg-[#005c55] hover:bg-[#004d47] text-white rounded-full text-[10px] font-bold flex items-center gap-1 transition-colors shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>AI Search</span>
            </button>
          </div>
        </div>

        {/* Right actions: Language toggle, Orders quick view, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick AI search icon button on mobile */}
          <button
            onClick={() => navigateTo('ai_search')}
            title="AI Smart Search"
            className="md:hidden p-2 rounded-full bg-amber-50 text-amber-800 border border-amber-200"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Language Switch Button */}
          <button
            id="header-lang-switch"
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors text-slate-700"
          >
            <Languages className="w-3.5 h-3.5 text-[#005c55]" />
            <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
          </button>

          {/* Active Orders / Bookings chip */}
          {activeCount > 0 && (
            <button
              onClick={() => navigateTo('orders_bookings')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>{activeCount} Active</span>
            </button>
          )}

          {/* Cart Icon & Checkout button */}
          <button
            id="header-cart-btn"
            onClick={() => navigateTo('cart_checkout')}
            className="relative flex items-center gap-2 bg-[#005c55] hover:bg-[#004d47] text-white px-3.5 py-1.5 rounded-xl font-semibold text-xs transition-colors shadow-xs"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">{t('cart')}</span>
            {cartCount > 0 && (
              <span className="bg-emerald-400 text-emerald-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
