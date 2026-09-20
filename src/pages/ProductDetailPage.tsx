import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    navigateTo,
    addToCart,
    products,
    viewProductDetail,
    language,
    t,
    showToast
  } = useApp();

  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="text-sm font-semibold text-slate-700">No product selected.</p>
        <button
          onClick={() => navigateTo('products')}
          className="mt-3 px-4 py-2 bg-[#005c55] text-white text-xs font-bold rounded-xl"
        >
          Return to Products
        </button>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    navigateTo('cart_checkout');
  };

  const relatedProducts = products
    .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 4);

  return (
    <div className="space-y-8 pb-12">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('products')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#005c55] bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <button
          onClick={() => showToast('Product link copied to clipboard!')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-2 rounded-xl border border-slate-200/80 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Product Image */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center relative p-4 group">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            {selectedProduct.badge && (
              <span className="absolute top-4 left-4 bg-[#005c55] text-white text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-xs">
                {selectedProduct.badge}
              </span>
            )}
          </div>

          <div className="w-full mt-4 p-3 bg-emerald-50 border border-emerald-200/60 rounded-xl flex items-center justify-around text-xs text-emerald-900">
            <div className="flex items-center gap-1.5 font-bold">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>15-Min Delivery</span>
            </div>
            <div className="h-4 w-px bg-emerald-200"></div>
            <div className="flex items-center gap-1.5 font-bold">
              <RotateCcw className="w-4 h-4 text-emerald-600" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>

        {/* Right: Info & Purchase Controls */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
              <span>{selectedProduct.category}</span>
              <span>•</span>
              <span>{selectedProduct.weightOrUnit}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-tight mb-2">
              {language === 'te' && selectedProduct.nameTe
                ? selectedProduct.nameTe
                : selectedProduct.name}
            </h1>

            {/* Rating & Stock Status */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{selectedProduct.rating}</span>
                <span className="text-slate-400 font-normal">
                  ({selectedProduct.reviewsCount.toLocaleString()} ratings)
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>In Stock ({selectedProduct.stock} units available nearby)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 mb-6 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#005c55]">
                ₹{selectedProduct.price}
              </span>
              {selectedProduct.originalPrice > selectedProduct.price && (
                <>
                  <span className="text-base text-slate-400 line-through">
                    ₹{selectedProduct.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Save ₹{selectedProduct.originalPrice - selectedProduct.price}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Description & Origin
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {language === 'te' && selectedProduct.descriptionTe
                  ? selectedProduct.descriptionTe
                  : selectedProduct.description}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs text-slate-700">
              <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Packaging Unit</span>
                <span className="font-bold">{selectedProduct.weightOrUnit}</span>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Delivery Time</span>
                <span className="font-bold text-emerald-700">Within 15 mins</span>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Seller & Fulfillment</span>
                <span className="font-bold">Daily Hub Madhapur DarkStore</span>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Quality Guarantee</span>
                <span className="font-bold">100% Sealed & Genuine</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-slate-300 rounded-xl p-1 bg-slate-50 w-full sm:w-auto justify-center">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 hover:bg-white rounded-lg text-slate-700 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-bold text-sm text-slate-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 hover:bg-white rounded-lg text-slate-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(selectedProduct, quantity)}
              className="w-full sm:flex-1 py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-[#005c55] border-2 border-[#005c55] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{t('addToCart')}</span>
            </button>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              className="w-full sm:flex-1 py-3 px-4 bg-[#005c55] hover:bg-[#004d47] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#005c55]/25 transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>{t('buyNow')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
            Similar in {selectedProduct.category}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => viewProductDetail(rel)}
                className="bg-white rounded-2xl border border-slate-200/80 p-3 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden mb-2">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[11px] text-slate-400">{rel.weightOrUnit}</p>
                <h4 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-[#005c55] transition-colors">
                  {rel.name}
                </h4>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">₹{rel.price}</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    15m
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
