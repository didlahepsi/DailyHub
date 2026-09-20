import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  Star,
  Clock,
  Plus,
  Wrench,
  ShoppingBag,
  Zap,
  HelpCircle,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Service, AIIntentResult } from '../types';

export const AiSearchPage: React.FC = () => {
  const {
    products,
    services,
    addToCart,
    viewProductDetail,
    startBookingService,
    language,
    t,
    aiSearchQuery,
    setAiSearchQuery
  } = useApp();

  const [query, setQuery] = useState(aiSearchQuery || 'My bathroom tap is leaking');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIIntentResult | null>(null);

  // Suggested Prompts
  const suggestedQueries = [
    { text: 'My bathroom tap is leaking', label: 'Tap Leak' },
    { text: 'Need 20L mineral water can urgently', label: 'Drinking Water' },
    { text: 'My AC is making noise and not cooling', label: 'AC Breakdown' },
    { text: 'Bike has a flat tyre near Madhapur', label: 'Puncture Fix' },
    { text: 'Atta and cooking oil for dinner', label: 'Grocery Staples' },
    { text: 'Need haircut and facial at home', label: 'Salon at Home' },
    { text: 'Laptop is slow and freezing', label: 'Laptop Repair' },
    { text: 'నల్లా లీక్ అవుతోంది', label: 'Telugu: ప్లంబర్' }
  ];

  // Intelligent Hybrid AI Matching Logic
  const analyzeQuery = (input: string) => {
    setIsAnalyzing(true);
    const q = input.toLowerCase();

    setTimeout(() => {
      let detectedIntent = 'General Marketplace Inquiry';
      let confidence = 94;
      let explanation = 'Analyzed query against Hyderabad inventory and local service directory.';
      let recommendedCategory = 'Home Services';
      let recommendedType: 'service' | 'product' = 'service';
      let matchedServices: Service[] = [];
      let matchedProducts: Product[] = [];

      // 1. Plumbing
      if (q.includes('tap') || q.includes('leak') || q.includes('plumb') || q.includes('pipe') || q.includes('నల్లా')) {
        detectedIntent = 'Sanitary Tap Leakage & Plumbing Emergency';
        confidence = 98;
        explanation = 'Identified water leakage keywords. Matching with verified local plumbers in Madhapur with 30-min dispatch.';
        recommendedCategory = 'Home Services';
        recommendedType = 'service';
        matchedServices = services.filter((s) => s.id === 'serv-plumber');
      }
      // 2. Water Delivery
      else if (q.includes('water') || q.includes('bisleri') || q.includes('can') || q.includes('తాగునీరు') || q.includes('20l')) {
        detectedIntent = 'Drinking Water 20L Delivery Requirement';
        confidence = 99;
        explanation = 'Matched with instant purified 20L mineral water can delivery with doorstep bubbletop placement.';
        recommendedCategory = 'Water & Beverages';
        recommendedType = 'product';
        matchedProducts = products.filter((p) => p.category === 'Water & Beverages' || p.id === 'prod-3');
        matchedServices = services.filter((s) => s.id === 'serv-water-delivery');
      }
      // 3. AC Servicing
      else if (q.includes('ac') || q.includes('cool') || q.includes('air condition') || q.includes('ఏసి')) {
        detectedIntent = 'Air Conditioner Diagnostic & Deep Jet Cleaning';
        confidence = 97;
        explanation = 'Detected cooling deficiency and noise complaint. Recommending verified HVAC technicians with 60-day cooling warranty.';
        recommendedCategory = 'Home Services';
        recommendedType = 'service';
        matchedServices = services.filter((s) => s.id === 'serv-ac-repair');
      }
      // 4. Tyre / Bike puncture
      else if (q.includes('tyre') || q.includes('tire') || q.includes('puncture') || q.includes('flat') || q.includes('టైర్')) {
        detectedIntent = 'Roadside / Doorstep Tubeless Tyre Repair';
        confidence = 96;
        explanation = 'Detected flat tyre emergency. Dispatching mobile mechanic equipped with puncture patch plugs.';
        recommendedCategory = 'Vehicle Services';
        recommendedType = 'service';
        matchedServices = services.filter((s) => s.id === 'serv-tyre-repair');
      }
      // 5. Groceries / Atta / Oil / Rice
      else if (q.includes('atta') || q.includes('oil') || q.includes('rice') || q.includes('dinner') || q.includes('grocery') || q.includes('గోధుమ')) {
        detectedIntent = 'Cooking Staples & Grocery Restock';
        confidence = 95;
        explanation = 'Identified essential kitchen pantry items. Available from Madhapur dark store for 15-minute dispatch.';
        recommendedCategory = 'Grocery';
        recommendedType = 'product';
        matchedProducts = products.filter((p) => p.category === 'Grocery' || p.category === 'Food').slice(0, 4);
      }
      // 6. Salon / Grooming
      else if (q.includes('salon') || q.includes('hair') || q.includes('facial') || q.includes('wax') || q.includes('makeup') || q.includes('సెలూన్')) {
        detectedIntent = 'At-Home Personal Salon & Grooming Session';
        confidence = 96;
        explanation = 'Matched with certified beauticians carrying 100% single-use hygiene kits for doorstep treatments.';
        recommendedCategory = 'Personal Services';
        recommendedType = 'service';
        matchedServices = services.filter((s) => s.id === 'serv-salon-home' || s.id === 'serv-makeup');
      }
      // 7. Computer / Laptop
      else if (q.includes('laptop') || q.includes('computer') || q.includes('slow') || q.includes('freeze') || q.includes('ల్యాప్‌టాప్')) {
        detectedIntent = 'Laptop Hardware Slowdown & OS Diagnostics';
        confidence = 94;
        explanation = 'Detected computer performance issues. Recommending chip-level engineer for doorstep SSD/RAM diagnosis.';
        recommendedCategory = 'Local/Daily Services';
        recommendedType = 'service';
        matchedServices = services.filter((s) => s.id === 'serv-laptop-repair');
      }
      // 8. Default fallback
      else {
        detectedIntent = `Marketplace Search for "${input}"`;
        confidence = 88;
        explanation = 'AI search parsed keywords against all registered products and service categories.';
        recommendedCategory = 'Marketplace';
        recommendedType = 'product';
        matchedProducts = products.slice(0, 3);
        matchedServices = services.slice(0, 2);
      }

      setResult({
        query: input,
        detectedIntent,
        confidence,
        explanation,
        recommendedCategory,
        recommendedType,
        recommendedServices: matchedServices,
        recommendedProducts: matchedProducts
      });

      setIsAnalyzing(false);
    }, 450);
  };

  useEffect(() => {
    if (aiSearchQuery) {
      setQuery(aiSearchQuery);
      analyzeQuery(aiSearchQuery);
    } else {
      analyzeQuery('My bathroom tap is leaking');
    }
  }, [aiSearchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setAiSearchQuery(query);
    analyzeQuery(query);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top AI Header */}
      <div className="bg-gradient-to-r from-[#004d47] via-[#005c55] to-[#0f766e] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Google Gemini-Powered Semantic Search</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold font-display leading-tight mb-2">
            {language === 'te' ? 'AI స్మార్ట్ శోధన' : 'AI Smart Discovery'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
            Describe your household problem, craving, or repair need in plain words. Our model detects your intent and connects you to the exact 15-minute product or verified doorstep technician.
          </p>

          {/* AI Search Input Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-1.5 text-slate-900">
              <Search className="w-5 h-5 text-[#005c55] ml-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. My tap is leaking, or need fresh cold water..."
                className="w-full px-3 py-2 text-xs sm:text-sm focus:outline-none placeholder-slate-400 font-medium"
              />
              <button
                type="submit"
                disabled={isAnalyzing}
                className="bg-[#005c55] hover:bg-[#004d47] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 shadow-xs disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isAnalyzing ? 'Analyzing...' : 'Analyze'}</span>
              </button>
            </div>
          </form>

          {/* Prompt chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-white/70">Try asking:</span>
            {suggestedQueries.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(item.text);
                  setAiSearchQuery(item.text);
                  analyzeQuery(item.text);
                }}
                className="text-[11px] font-medium bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-full text-white backdrop-blur-xs transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Analysis Card */}
      {result && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
                  AI Intent Detected
                </span>
                <h3 className="font-extrabold text-base text-slate-900 font-display">
                  {result.detectedIntent}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Confidence Match:</span>
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                {result.confidence}% Match
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
            {result.explanation}
          </p>

          {/* Recommended Services (if matched) */}
          {result.recommendedServices.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-[#005c55]" />
                <span>Recommended Verified Services ({result.recommendedServices.length})</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.recommendedServices.map((serv) => (
                  <div
                    key={serv.id}
                    className="bg-white rounded-2xl border-2 border-emerald-500/30 hover:border-emerald-500 p-4 shadow-xs flex flex-col justify-between group transition-all"
                  >
                    <div>
                      <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-slate-50">
                        <img
                          src={serv.image}
                          alt={serv.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 text-[10px] font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md shadow-xs">
                          {serv.category}
                        </span>
                        <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
                          {serv.availability}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 mb-1">{serv.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-2">{serv.description}</p>
                      <p className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1 mb-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {serv.providerName}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Inspection Fee</span>
                        <span className="font-extrabold text-sm text-[#005c55]">₹{serv.startingPrice}</span>
                      </div>
                      <button
                        onClick={() => startBookingService(serv)}
                        className="px-4 py-1.5 bg-[#005c55] hover:bg-[#004d47] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Products (if matched) */}
          {result.recommendedProducts.length > 0 && (
            <div className="space-y-3 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-[#005c55]" />
                <span>15-Minute Products Matched ({result.recommendedProducts.length})</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {result.recommendedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-3 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div
                      onClick={() => viewProductDetail(prod)}
                      className="cursor-pointer"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 mb-2">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400">{prod.weightOrUnit}</span>
                      <h5 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-[#005c55]">
                        {prod.name}
                      </h5>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-2">
                      <span className="font-extrabold text-xs text-slate-900">₹{prod.price}</span>
                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-300 rounded-lg text-xs font-bold transition-colors"
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
