import React, { useState } from 'react';
import {
  ShoppingBag,
  Wrench,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ChevronRight,
  Search,
  Star,
  Plus,
  Truck,
  Droplet,
  Zap,
  Flame,
  ThumbsUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardPage: React.FC = () => {
  const {
    products,
    services,
    addToCart,
    viewProductDetail,
    startBookingService,
    navigateTo,
    orders,
    bookings,
    language,
    t,
    setAiSearchQuery
  } = useApp();

  const [inputSearch, setInputSearch] = useState('');

  // Grab active order if any
  const activeOrder = orders.find(
    (o) => o.status === 'Processing' || o.status === 'Out for Delivery' || o.status === 'Placed'
  );

  // Grab active booking if any
  const activeBooking = bookings.find((b) => b.status === 'Confirmed');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSearch.trim()) return;
    setAiSearchQuery(inputSearch.trim());
    navigateTo('ai_search');
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* 1. Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#004d47] via-[#005c55] to-[#0f766e] text-white p-6 sm:p-10 shadow-lg">
        {/* Background ambient accents */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/4 -bottom-16 w-60 h-60 bg-teal-300/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'te' ? 'హైదరాబాద్‌లో నెం.1 హైపర్‌లోకల్ వేదిక' : 'Hyderabad’s #1 Hyperlocal Platform'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display leading-tight mb-3">
            {language === 'te' ? (
              <>ప్రతి ఉత్పత్తి & సేవ <span className="text-emerald-300">ఒకే ప్లాట్‌ఫామ్‌లో</span></>
            ) : (
              <>Every Product & Service <span className="text-emerald-300">in One Platform</span></>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6 max-w-xl">
            {language === 'te'
              ? 'రోజువారీ నిత్యావసరాలు 15 నిమిషాల్లో డెలివరీ & విశ్వసనీయ నిపుణుల హోమ్ సర్వీసులు మీ చేతివేళ్ల వద్ద.'
              : 'Groceries, drinking water & essentials delivered in 15 minutes, plus verified technicians for home repairs, salon, and vehicle services.'}
          </p>

          {/* Natural Language AI Search Bar on Hero */}
          <form onSubmit={handleSearchSubmit} className="mb-6 relative max-w-xl">
            <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-1.5 border border-white/30 text-slate-900">
              <Search className="w-5 h-5 text-[#005c55] ml-3 shrink-0" />
              <input
                type="text"
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full px-3 py-2 text-xs sm:text-sm focus:outline-none placeholder-slate-400 font-medium"
              />
              <button
                type="submit"
                className="bg-[#005c55] hover:bg-[#004d47] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Search</span>
              </button>
            </div>
            {/* Quick Suggestions Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-[11px] text-emerald-100">
              <span className="text-white/70">Popular:</span>
              <button
                type="button"
                onClick={() => {
                  setAiSearchQuery('Plumber for tap leak');
                  navigateTo('ai_search');
                }}
                className="bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full backdrop-blur-xs transition-colors"
              >
                Tap Leak Plumber
              </button>
              <button
                type="button"
                onClick={() => {
                  setAiSearchQuery('Bisleri 20L water can');
                  navigateTo('ai_search');
                }}
                className="bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full backdrop-blur-xs transition-colors"
              >
                20L Water Can
              </button>
              <button
                type="button"
                onClick={() => {
                  setAiSearchQuery('AC servicing');
                  navigateTo('ai_search');
                }}
                className="bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full backdrop-blur-xs transition-colors"
              >
                AC Deep Cleaning
              </button>
            </div>
          </form>

          {/* Quick Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('products')}
              className="bg-white hover:bg-slate-100 text-[#005c55] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all hover:translate-y-[-1px]"
            >
              <ShoppingBag className="w-4 h-4 text-[#005c55]" />
              <span>Shop Products (15 Mins)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('services')}
              className="bg-emerald-800/80 hover:bg-emerald-800 text-white border border-emerald-400/40 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all hover:translate-y-[-1px]"
            >
              <Wrench className="w-4 h-4 text-emerald-300" />
              <span>Book Doorstep Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Live Active Tracking Banner (if any active order or booking) */}
      {(activeOrder || activeBooking) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeOrder && (
            <div
              onClick={() => navigateTo('orders_bookings')}
              className="cursor-pointer bg-white border-2 border-emerald-500/40 hover:border-emerald-500 p-4 rounded-2xl shadow-xs transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Truck className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">
                      Order {activeOrder.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {activeOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {activeOrder.items[0]?.name} • {activeOrder.estimatedArrival || '15 Mins'}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          )}

          {activeBooking && (
            <div
              onClick={() => navigateTo('orders_bookings')}
              className="cursor-pointer bg-white border border-slate-200 hover:border-[#005c55] p-4 rounded-2xl shadow-xs transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">
                      Service Booking {activeBooking.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                      OTP: {activeBooking.otp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {activeBooking.serviceName} • {activeBooking.date} ({activeBooking.timeSlot})
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      )}

      {/* 3. Quick Categories Strip */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              {language === 'te' ? 'కేటగిరీలు' : 'Explore Categories'}
            </h2>
            <p className="text-xs text-slate-500">Fast delivery products & instant professional services</p>
          </div>
          <button
            onClick={() => navigateTo('products')}
            className="text-xs font-bold text-[#005c55] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: 'Grocery', icon: '🛒', cat: 'Grocery', isService: false },
            { label: 'Water Cans', icon: '💧', cat: 'Water & Beverages', isService: false },
            { label: 'Food Staples', icon: '🌾', cat: 'Food', isService: false },
            { label: 'Plumber', icon: '🔧', cat: 'Home Services', isService: true },
            { label: 'Electrician', icon: '⚡', cat: 'Home Services', isService: true },
            { label: 'AC Repair', icon: '❄️', cat: 'Home Services', isService: true },
            { label: 'Car Wash', icon: '🚗', cat: 'Vehicle Services', isService: true },
            { label: 'Salon At Home', icon: '💇‍♀️', cat: 'Personal Services', isService: true }
          ].map((cat, i) => (
            <button
              key={i}
              onClick={() => navigateTo(cat.isService ? 'services' : 'products')}
              className="p-3 bg-white rounded-2xl border border-slate-200/80 hover:border-[#005c55] hover:shadow-md transition-all text-center group flex flex-col items-center justify-center gap-1.5"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-xs font-semibold text-slate-800 leading-tight">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Popular Products Section (Top 6 Bestsellers) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                {t('popularProducts')}
              </h2>
              <p className="text-xs text-slate-500">Delivered directly to your door in 15 minutes</p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('products')}
            className="text-xs font-bold text-[#005c55] hover:underline flex items-center gap-1"
          >
            <span>See 35+ Products</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {products.slice(0, 6).map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all p-3 flex flex-col justify-between group"
            >
              <div
                onClick={() => viewProductDetail(prod)}
                className="cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden bg-slate-50 mb-2.5 aspect-square flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                  {prod.badge && (
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-extrabold bg-[#005c55] text-white px-1.5 py-0.5 rounded-md shadow-xs">
                      {prod.badge}
                    </span>
                  )}
                  <span className="absolute bottom-1.5 right-1.5 text-[9px] font-bold bg-white/90 text-slate-800 px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-emerald-600" />
                    15m
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                  {prod.weightOrUnit}
                </p>
                <h3 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug group-hover:text-[#005c55] transition-colors mb-1.5 min-h-[32px]">
                  {language === 'te' && prod.nameTe ? prod.nameTe : prod.name}
                </h3>

                <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold mb-2">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{prod.rating}</span>
                  <span className="text-slate-400 text-[10px]">({prod.reviewsCount})</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                <div>
                  <span className="font-extrabold text-sm text-slate-900">
                    ₹{prod.price}
                  </span>
                  {prod.originalPrice > prod.price && (
                    <span className="text-[10px] text-slate-400 line-through ml-1">
                      ₹{prod.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(prod, 1)}
                  className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-300 hover:border-emerald-600 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Top Doorstep Services (Top 4 items) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                {t('topServices')}
              </h2>
              <p className="text-xs text-slate-500">Verified local technicians, clear pricing & 30-day warranty</p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('services')}
            className="text-xs font-bold text-[#005c55] hover:underline flex items-center gap-1"
          >
            <span>See 25+ Services</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.slice(0, 4).map((serv) => (
            <div
              key={serv.id}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-[#005c55] hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-36 overflow-hidden bg-slate-100">
                  <img
                    src={serv.image}
                    alt={serv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-300" />
                    {serv.availability}
                  </span>
                  <span className="absolute top-2 right-2 text-[10px] font-bold bg-white text-slate-900 px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {serv.rating}
                  </span>
                </div>

                <div className="p-3.5">
                  <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider block mb-0.5">
                    {serv.category}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 mb-1">
                    {language === 'te' && serv.nameTe ? serv.nameTe : serv.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {serv.description}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-medium truncate">{serv.providerName}</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starts from</span>
                  <span className="font-extrabold text-base text-[#005c55]">₹{serv.startingPrice}</span>
                </div>
                <button
                  onClick={() => startBookingService(serv)}
                  className="px-3.5 py-1.5 bg-[#005c55] hover:bg-[#004d47] text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
                >
                  {t('bookNow')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Hyderabad Trust Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 rounded-2xl p-6 border border-emerald-200/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white text-emerald-700 shadow-xs flex items-center justify-center shrink-0 border border-emerald-100">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">15-Min Delivery Guarantee</h4>
            <p className="text-[11px] text-slate-600">Local dark stores across Madhapur, Hitec City & Gachibowli.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white text-emerald-700 shadow-xs flex items-center justify-center shrink-0 border border-emerald-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">30-Day Service Warranty</h4>
            <p className="text-[11px] text-slate-600">Complimentary revisit if any issue recurs after repair.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white text-emerald-700 shadow-xs flex items-center justify-center shrink-0 border border-emerald-100">
            <ThumbsUp className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">Pay After Service</h4>
            <p className="text-[11px] text-slate-600">Inspect the work and pay cash or UPI with complete peace of mind.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
