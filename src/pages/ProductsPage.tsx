import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Star,
  Plus,
  Minus,
  Clock,
  Sparkles,
  Check,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory, Product } from '../types';

export const ProductsPage: React.FC = () => {
  const {
    products,
    cart,
    addToCart,
    updateQuantity,
    viewProductDetail,
    language,
    t
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'priceLow' | 'priceHigh' | 'rating'>('featured');

  const categories: string[] = [
    'All',
    'Grocery',
    'Water & Beverages',
    'Food',
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Books & Stationery',
    'Beauty',
    'Gifts & Flowers',
    'Pet Supplies'
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.nameTe && p.nameTe.toLowerCase().includes(searchTerm.toLowerCase())) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'priceLow') return a.price - b.price;
        if (sortBy === 'priceHigh') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default order
      });
  }, [products, selectedCategory, searchTerm, sortBy]);

  const getCartQuantity = (productId: string) => {
    const item = cart.find((ci) => ci.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Search Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <ShoppingBag className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                {language === 'te' ? 'ఉత్పత్తుల మార్కెట్‌ప్లేస్' : 'Products Marketplace'}
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              35+ Authentic groceries, fresh water cans, electronics & essentials • Delivered in 15 mins
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search rice, water, oil..."
                className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005c55]/20 focus:border-[#005c55]"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#005c55]/20"
            >
              <option value="featured">Featured / Best Match</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Categories Horizontal Filter Chips */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === 'All'
                ? products.length
                : products.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
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

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.map((product) => {
          const qty = getCartQuantity(product.id);

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all p-3 flex flex-col justify-between group"
            >
              <div
                onClick={() => viewProductDetail(product)}
                className="cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative rounded-xl overflow-hidden bg-slate-50 mb-2.5 aspect-square flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                  {product.badge && (
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-extrabold bg-[#005c55] text-white px-2 py-0.5 rounded-md shadow-xs">
                      {product.badge}
                    </span>
                  )}
                  <span className="absolute bottom-1.5 right-1.5 text-[9px] font-bold bg-white/95 text-slate-800 px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-emerald-600" />
                    {product.deliveryTime}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 font-medium line-clamp-1 mb-0.5">
                  {product.weightOrUnit} • <span className="text-emerald-700 font-semibold">{product.category}</span>
                </div>

                <h3 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug group-hover:text-[#005c55] transition-colors mb-1.5 min-h-[32px]">
                  {language === 'te' && product.nameTe ? product.nameTe : product.name}
                </h3>

                <div className="flex items-center gap-1.5 text-[11px] text-amber-600 font-semibold mb-2">
                  <span className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded text-amber-700">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {product.rating}
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    ({product.reviewsCount.toLocaleString()})
                  </span>
                </div>
              </div>

              {/* Price & Quantity Controls */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                <div>
                  <span className="font-extrabold text-sm text-slate-900">
                    ₹{product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-[10px] text-slate-400 line-through ml-1">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {qty > 0 ? (
                  <div className="flex items-center bg-[#005c55] text-white rounded-lg p-0.5 text-xs font-bold shadow-xs">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="px-1.5 py-0.5 hover:bg-white/20 rounded transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2">{qty}</span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="px-1.5 py-0.5 hover:bg-white/20 rounded transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-300 hover:border-emerald-600 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No products match your search</h3>
          <p className="text-xs text-slate-500 mt-1">Try searching for rice, oil, biscuits, or water cans</p>
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
