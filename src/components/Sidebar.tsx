import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Wrench,
  ShoppingCart,
  Clock,
  Sparkles,
  User,
  LogOut,
  LogIn,
  Languages,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageType } from '../types';

export const Sidebar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    cartCount,
    orders,
    bookings,
    language,
    setLanguage,
    t,
    user,
    isAuthenticated,
    logout
  } = useApp();

  const activeOrdersCount = orders.filter(
    (o) => o.status === 'Processing' || o.status === 'Out for Delivery' || o.status === 'Placed'
  ).length;

  const activeBookingsCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const totalActiveActivity = activeOrdersCount + activeBookingsCount;

  interface NavItem {
    id: PageType;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    isAi?: boolean;
  }

  const navItems: NavItem[] = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'products', label: t('products'), icon: ShoppingBag, badge: '35+' },
    { id: 'services', label: t('services'), icon: Wrench, badge: '25+' },
    { id: 'cart_checkout', label: t('cart'), icon: ShoppingCart, badge: cartCount > 0 ? cartCount : undefined },
    { id: 'orders_bookings', label: t('orders'), icon: Clock, badge: totalActiveActivity > 0 ? `${totalActiveActivity} Active` : undefined },
    { id: 'ai_search', label: t('aiSearch'), icon: Sparkles, isAi: true },
    { id: 'profile_settings', label: t('profile'), icon: User }
  ];

  return (
    <aside
      id="desktop-sidebar"
      className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200/80 min-h-screen fixed left-0 top-0 bottom-0 z-40 shadow-xs"
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100">
        <div
          onClick={() => navigateTo('dashboard')}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#005c55] to-[#10b981] flex items-center justify-center text-white shadow-md shadow-[#005c55]/20 group-hover:scale-105 transition-transform duration-200">
            <ShoppingBag className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#005c55] font-display">
                DAILY HUB
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm">
                Live
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
              {language === 'te' ? 'ఉత్పత్తులు & సేవలు ఒకే చోట' : 'Products & Services in One'}
            </p>
          </div>
        </div>

        {/* Hyperlocal location pill */}
        <div className="mt-3.5 bg-slate-50 border border-slate-200/70 rounded-lg p-2 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-[#005c55] shrink-0" />
            <span className="font-semibold truncate">Madhapur, Hyd</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            15m
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3 py-4 overflow-y-auto space-y-1.5">
        <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {language === 'te' ? 'ప్రధాన నావిగేషన్' : 'Main Navigation'}
        </div>

        {navItems.map((item) => {
          const isActive =
            currentPage === item.id ||
            (item.id === 'products' && currentPage === 'product_detail') ||
            (item.id === 'services' && currentPage === 'service_booking');
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => navigateTo(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 text-left group ${
                isActive
                  ? 'bg-[#005c55] text-white font-semibold shadow-sm shadow-[#005c55]/25'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : item.isAi
                      ? 'bg-amber-100 text-amber-700 group-hover:bg-amber-200'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : item.isAi
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isActive ? 'text-white/70' : 'text-slate-400 group-hover:translate-x-0.5'
                  }`}
                />
              </div>
            </button>
          );
        })}

        {/* Promo Quick Card in Sidebar */}
        <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs mb-1">
            <Flame className="w-4 h-4 text-emerald-600" />
            <span>{language === 'te' ? 'తక్షణ సేవా హామీ' : 'Daily Hub Guarantee'}</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {language === 'te'
              ? '30 రోజుల వారంటీ మరియు స్థానిక నిపుణుల సేవలు'
              : 'Verified local technicians & 15-min doorstep grocery delivery.'}
          </p>
        </div>
      </div>

      {/* Language Switcher & User Footer */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/50 space-y-2.5">
        {/* Language Pill Switcher */}
        <div className="flex items-center justify-between px-2 py-1 bg-white rounded-lg border border-slate-200 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <Languages className="w-3.5 h-3.5 text-[#005c55]" />
            <span>Language</span>
          </div>
          <div className="flex items-center bg-slate-100 p-0.5 rounded-md text-[11px] font-semibold">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded transition-colors ${
                language === 'en'
                  ? 'bg-[#005c55] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2 py-0.5 rounded transition-colors ${
                language === 'te'
                  ? 'bg-[#005c55] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              తెలుగు
            </button>
          </div>
        </div>

        {/* User Card */}
        {isAuthenticated && user ? (
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
            <div
              onClick={() => navigateTo('profile_settings')}
              className="flex items-center gap-2.5 cursor-pointer min-w-0"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-emerald-300"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                <p className="text-[10px] text-emerald-700 font-semibold truncate flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {user.memberTier}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigateTo('login')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#005c55] text-white font-semibold text-xs shadow-xs hover:bg-[#004d47] transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t('login')}</span>
          </button>
        )}
      </div>
    </aside>
  );
};
