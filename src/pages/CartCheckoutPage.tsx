import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  MapPin,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  Tag,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartCheckoutPage: React.FC = () => {
  const {
    cart,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
    navigateTo,
    user,
    language,
    t,
    showToast
  } = useApp();

  const [address, setAddress] = useState(
    user?.address || 'Flat 402, Sri Sai Nilayam, 100ft Road, Ayyappa Society, Madhapur'
  );
  const [city, setCity] = useState(user?.city || 'Hyderabad');
  const [pincode, setPincode] = useState(user?.pincode || '500081');
  const [name, setName] = useState(user?.name || 'Sai Srinivas Varma');
  const [phone, setPhone] = useState(user?.phone || '+91 98480 22338');

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

  // Bill Calculations
  const subtotal = cartTotal;
  const deliveryFee = subtotal > 199 ? 0 : 29;
  const platformFee = 5;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee + platformFee - discountAmount);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (code === 'DAILY50') {
      if (subtotal < 200) {
        showToast('DAILY50 requires a minimum cart subtotal of ₹200');
        return;
      }
      setAppliedCoupon({ code: 'DAILY50', discount: 50 });
      showToast('Coupon DAILY50 applied: ₹50 Saved!');
    } else if (code === 'HACKATHON') {
      setAppliedCoupon({ code: 'HACKATHON', discount: 75 });
      showToast('Coupon HACKATHON applied: ₹75 Saved!');
    } else {
      showToast('Invalid coupon. Try "DAILY50" or "HACKATHON"');
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setIsPlacing(true);

    const paymentLabel =
      paymentMethod === 'upi'
        ? 'UPI (GooglePay/PhonePe)'
        : paymentMethod === 'cod'
        ? 'Cash on Delivery'
        : 'Credit/Debit Card';

    const fullAddress = `${address}, ${city} - ${pincode}`;

    setTimeout(() => {
      const order = placeOrder({
        deliveryAddress: fullAddress,
        customerName: name,
        customerPhone: phone,
        paymentMethod: paymentLabel,
        discount: discountAmount
      });
      setIsPlacing(false);
      setOrderConfirmedId(order.id);
    }, 600);
  };

  // If order was just confirmed, show modal dialog
  if (orderConfirmedId) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-xl my-8 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          Order Placed Successfully
        </span>
        <h2 className="text-2xl font-bold font-display text-slate-900 mt-3 mb-1">
          {orderConfirmedId}
        </h2>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Your order has been routed to Daily Hub Madhapur Hub. Estimated arrival in <strong>15 mins</strong>.
        </p>

        <div className="bg-slate-50 rounded-2xl p-4 text-xs text-left mb-6 space-y-2 border border-slate-200/80">
          <div className="flex justify-between">
            <span className="text-slate-500">Delivery Address:</span>
            <span className="font-semibold text-slate-800 text-right truncate max-w-[200px]">{address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Amount Paid / Due:</span>
            <span className="font-extrabold text-[#005c55]">₹{grandTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Live Rider:</span>
            <span className="font-semibold text-emerald-800">Assigning nearest rider...</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              setOrderConfirmedId(null);
              navigateTo('orders_bookings');
            }}
            className="flex-1 py-3 bg-[#005c55] hover:bg-[#004d47] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Track Order Live
          </button>
          <button
            onClick={() => {
              setOrderConfirmedId(null);
              navigateTo('products');
            }}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs my-8">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold font-display text-slate-900 mb-1">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 mb-6">
          Add fresh groceries, water cans, or snacks to get 15-minute delivery.
        </p>
        <button
          onClick={() => navigateTo('products')}
          className="px-6 py-2.5 bg-[#005c55] hover:bg-[#004d47] text-white font-bold text-xs rounded-xl shadow-md transition-colors inline-flex items-center gap-2"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
          {language === 'te' ? 'కార్ట్ & చెక్‌అవుట్' : 'Cart & Express Checkout'}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review items, select doorstep address and payment method
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items & Delivery Address */}
        <div className="lg:col-span-7 space-y-6">
          {/* Cart Items List */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span>Items in Cart</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {cart.length}
                </span>
              </h3>
              <button
                onClick={clearCart}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
              >
                Clear All
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-xl bg-slate-50 border border-slate-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {language === 'te' && product.nameTe ? product.nameTe : product.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {product.weightOrUnit} • ₹{product.price} each
                      </p>
                      <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                        <Clock className="w-2.5 h-2.5" /> 15m Delivery
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Stepper */}
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-bold">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="p-1 hover:bg-white rounded transition-colors text-slate-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-slate-900">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="p-1 hover:bg-white rounded transition-colors text-slate-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-extrabold text-xs text-slate-900 min-w-[50px] text-right">
                      ₹{product.price * quantity}
                    </span>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-slate-300 hover:text-rose-500 p-1 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Form */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#005c55]" />
                <span>Doorstep Delivery Address</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Hyderabad Hub
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  House / Flat / Street Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005c55]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005c55]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005c55]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Receiver Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005c55]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Mobile Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005c55]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Method & Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Payment Method Selector */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#005c55]" />
              <span>Select Payment Method</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <label
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#005c55] bg-emerald-50/50'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="text-[#005c55] focus:ring-[#005c55]"
                  />
                  <div>
                    <strong className="block font-bold text-slate-900">UPI (GooglePay / PhonePe / Paytm)</strong>
                    <span className="text-[11px] text-slate-500">Instant contactless & zero fee</span>
                  </div>
                </div>
                <Smartphone className="w-4 h-4 text-emerald-600" />
              </label>

              <label
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#005c55] bg-emerald-50/50'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="text-[#005c55] focus:ring-[#005c55]"
                  />
                  <div>
                    <strong className="block font-bold text-slate-900">Cash on Delivery (COD)</strong>
                    <span className="text-[11px] text-slate-500">Pay cash to rider upon 15-min delivery</span>
                  </div>
                </div>
                <Banknote className="w-4 h-4 text-emerald-600" />
              </label>

              <label
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#005c55] bg-emerald-50/50'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="text-[#005c55] focus:ring-[#005c55]"
                  />
                  <div>
                    <strong className="block font-bold text-slate-900">Cards & Net Banking</strong>
                    <span className="text-[11px] text-slate-500">Visa, MasterCard, RuPay & NetBanking</span>
                  </div>
                </div>
                <CreditCard className="w-4 h-4 text-emerald-600" />
              </label>
            </div>
          </div>

          {/* Coupon Code Section */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#005c55]" />
                Apply Coupon Code
              </span>
              {appliedCoupon && (
                <button
                  onClick={() => {
                    setAppliedCoupon(null);
                    showToast('Coupon removed.');
                  }}
                  className="text-[11px] text-rose-600 font-bold hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter DAILY50 or HACKATHON"
                className="flex-1 text-xs uppercase px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005c55]"
              />
              <button
                type="button"
                onClick={() => handleApplyCoupon()}
                className="px-3 py-2 bg-[#005c55] hover:bg-[#004d47] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
              >
                Apply
              </button>
            </div>

            {/* Quick coupon suggestions */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleApplyCoupon('DAILY50')}
                className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md hover:bg-emerald-100"
              >
                DAILY50 (₹50 OFF)
              </button>
              <button
                onClick={() => handleApplyCoupon('HACKATHON')}
                className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md hover:bg-teal-100"
              >
                HACKATHON (₹75 OFF)
              </button>
            </div>
          </div>

          {/* Bill Summary Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
              {t('orderSummary')}
            </h3>

            <div className="flex justify-between text-slate-600">
              <span>{t('subtotal')}</span>
              <span className="font-semibold text-slate-900">₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span className="flex items-center gap-1">
                {t('deliveryFee')}
                {deliveryFee === 0 && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 rounded font-bold">
                    Free above ₹199
                  </span>
                )}
              </span>
              <span className="font-semibold text-slate-900">
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>{t('platformFee')}</span>
              <span className="font-semibold text-slate-900">₹{platformFee}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Coupon ({appliedCoupon?.code})</span>
                <span>- ₹{discountAmount}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <span className="font-extrabold text-sm text-slate-900 block leading-tight">
                  {t('totalToPay')}
                </span>
                <span className="text-[10px] text-slate-400">Inclusive of all local GST taxes</span>
              </div>
              <span className="text-2xl font-black text-[#005c55]">₹{grandTotal}</span>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={isPlacing}
              className="w-full mt-2 py-3.5 px-4 bg-[#005c55] hover:bg-[#004d47] text-white font-bold text-xs rounded-xl shadow-md shadow-[#005c55]/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isPlacing ? (
                <span>Routing to Nearest Delivery Fleet...</span>
              ) : (
                <>
                  <span>Place Order • ₹{grandTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Secure 256-bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
