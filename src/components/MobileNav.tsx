import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Wrench,
  Sparkles,
  ShoppingCart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileNav: React.FC = () => {
  const { currentPage, navigateTo, cartCount, t } = useApp();

  const navs = [
    { id: 'dashboard' as const, label: t('dashboard'), icon: LayoutDashboard },
    { id: 'products' as const, label: t('products'), icon: ShoppingBag },
    { id: 'services' as const, label: t('services'), icon: Wrench },
    { id: 'ai_search' as const, label: 'AI Search', icon: Sparkles, isAi: true },
    { id: 'cart_checkout' as const, label: t('cart'), icon: ShoppingCart, badge: cartCount }
  ];

  return (
    <nav
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-3 shadow-lg"
    >
      <div className="flex items-center justify-around">
        {navs.map((item) => {
          const isActive =
            currentPage === item.id ||
            (item.id === 'products' && currentPage === 'product_detail') ||
            (item.id === 'services' && currentPage === 'service_booking');
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-all relative ${
                isActive
                  ? 'text-[#005c55] font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-[#005c55]' : item.isAi ? 'text-amber-600' : 'text-slate-500'
                  }`}
                />
                {item.badge ? (
                  <span className="absolute -top-1.5 -right-2.5 bg-emerald-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[62px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
