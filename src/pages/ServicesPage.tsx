import React, { useState, useMemo } from 'react';
import {
  Wrench,
  Search,
  Star,
  ShieldCheck,
  Clock,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCategory, Service } from '../types';

export const ServicesPage: React.FC = () => {
  const {
    services,
    startBookingService,
    language,
    t
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const serviceCategories: string[] = [
    'All',
    'Home Services',
    'Vehicle Services',
    'Personal Services',
    'Local/Daily Services'
  ];

  const filteredServices = useMemo(() => {
    return services.filter((serv) => {
      const matchesCategory =
        selectedCategory === 'All' || serv.category === selectedCategory;
      const matchesSearch =
        serv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (serv.nameTe && serv.nameTe.toLowerCase().includes(searchTerm.toLowerCase())) ||
        serv.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        serv.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        serv.providerName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchTerm]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Title */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
                <Wrench className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                {language === 'te' ? 'సేవల మార్కెట్‌ప్లేస్' : 'Doorstep Services Marketplace'}
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              25+ Verified local home, vehicle, personal and daily services with 30-day warranty
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search plumber, electrician, ac, car wash..."
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005c55]/20 focus:border-[#005c55]"
            />
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {serviceCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === 'All'
                ? services.length
                : services.filter((s) => s.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#005c55] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid (All 25 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-slate-200/80 hover:border-[#005c55] hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Service Visual Header */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>

                <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-slate-900 bg-white/95 px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {service.rating} ({service.reviewsCount})
                </span>

                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold text-white bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-300" />
                  {service.availability}
                </span>
              </div>

              {/* Service Information */}
              <div className="p-4">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  {service.category}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-[#005c55] transition-colors">
                  {language === 'te' && service.nameTe ? service.nameTe : service.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {language === 'te' && service.descriptionTe ? service.descriptionTe : service.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-semibold truncate text-[11px]">{service.providerName}</span>
                </div>

                {service.warrantyInfo && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-teal-600" />
                    {service.warrantyInfo}
                  </span>
                )}
              </div>
            </div>

            {/* Price & Book CTA */}
            <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Visiting / Inspection</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-base text-[#005c55]">
                    ₹{service.startingPrice}
                  </span>
                  {service.originalPrice && service.originalPrice > service.startingPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{service.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => startBookingService(service)}
                className="px-4 py-2 bg-[#005c55] hover:bg-[#004d47] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>{t('bookNow')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
          <Wrench className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No services match your search</h3>
          <p className="text-xs text-slate-500 mt-1">Try searching for plumber, cleaning, wash, or repair</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 bg-[#005c55] text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
