import React, { useState } from 'react';
import {
  User,
  MapPin,
  Globe,
  Bell,
  Wallet,
  ShieldCheck,
  CreditCard,
  LogOut,
  ShoppingBag,
  Wrench,
  Check,
  Plus,
  Edit2,
  Trash2,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileSettingsPage: React.FC = () => {
  const {
    user,
    orders,
    bookings,
    logout,
    language,
    setLanguage,
    t,
    showToast,
    navigateTo
  } = useApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);

  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr-1',
      title: 'Home (Default)',
      address: 'Flat 402, Sri Sai Nilayam, Ayyappa Society, Madhapur, Hyderabad - 500081',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Office',
      address: '5th Floor, Tower B, Cyber Towers, Hitec City, Hyderabad - 500081',
      isDefault: false
    }
  ]);

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newTitle, setNewTitle] = useState('Parent House');
  const [newAddressText, setNewAddressText] = useState('Plot 88, Jubilee Hills, Hyderabad - 500033');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressText.trim()) return;
    setSavedAddresses([
      ...savedAddresses,
      {
        id: `addr-${Date.now()}`,
        title: newTitle,
        address: newAddressText,
        isDefault: false
      }
    ]);
    setIsAddingAddress(false);
    showToast('New address saved to your account!');
  };

  const handleDeleteAddress = (id: string) => {
    setSavedAddresses(savedAddresses.filter((a) => a.id !== id));
    showToast('Address removed.');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
          {language === 'te' ? 'ప్రొఫైల్ & సెట్టింగ్‌లు' : 'Profile & Account Settings'}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your personal details, delivery addresses, wallet and language
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: User Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main User Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs text-center relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-[#005c55] text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-3 shadow-md">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'SS'}
            </div>

            <h2 className="text-lg font-bold font-display text-slate-900">
              {user?.name || 'Sai Srinivas Varma'}
            </h2>
            <p className="text-xs text-slate-500">{user?.email || 'sai.srinivas@dailyhub.in'}</p>
            <p className="text-xs text-slate-500 font-medium">{user?.phone || '+91 98480 22338'}</p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Hyderabad Resident</span>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-slate-100 text-left">
              <div
                onClick={() => navigateTo('orders_bookings')}
                className="p-3 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingBag className="w-4 h-4 text-[#005c55]" />
                  <span className="text-[10px] uppercase font-bold text-slate-400">Orders</span>
                </div>
                <span className="text-xl font-black text-slate-900">{orders.length}</span>
              </div>

              <div
                onClick={() => navigateTo('orders_bookings')}
                className="p-3 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Wrench className="w-4 h-4 text-[#005c55]" />
                  <span className="text-[10px] uppercase font-bold text-slate-400">Services</span>
                </div>
                <span className="text-xl font-black text-slate-900">{bookings.length}</span>
              </div>
            </div>
          </div>

          {/* Daily Hub Wallet Card */}
          <div className="bg-gradient-to-r from-[#004d47] to-[#005c55] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                  Daily Hub Cash Wallet
                </span>
              </div>
              <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="mb-4">
              <span className="text-3xl font-black">₹{user?.walletBalance ?? 150}</span>
              <p className="text-[11px] text-emerald-100 mt-1">
                Usable on both 15-minute groceries and local doorstep services.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => showToast('₹200 added to your wallet for testing!')}
                className="flex-1 py-2 bg-white text-[#005c55] text-xs font-bold rounded-xl shadow-xs hover:bg-emerald-50 transition-colors"
              >
                + Add Cash
              </button>
              <button
                onClick={() => showToast('Referral code DH-VARMA copied! Share with friends to get ₹100.')}
                className="flex-1 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Refer & Earn ₹100
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Address Management */}
        <div className="lg:col-span-7 space-y-6">
          {/* Saved Addresses Section */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#005c55]" />
                <span>Saved Delivery Addresses</span>
              </h3>
              <button
                onClick={() => setIsAddingAddress(!isAddingAddress)}
                className="text-xs font-bold text-[#005c55] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Address</span>
              </button>
            </div>

            {/* Add Address Collapsible Form */}
            {isAddingAddress && (
              <form
                onSubmit={handleAddAddress}
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tag / Label</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Parents, Gym, Studio"
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Complete Address</label>
                  <input
                    type="text"
                    required
                    value={newAddressText}
                    onChange={(e) => setNewAddressText(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#005c55] text-white font-bold rounded-lg"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingAddress(false)}
                    className="px-3 py-1.5 bg-slate-200 text-slate-700 font-bold rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* List of Addresses */}
            <div className="space-y-2.5">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-3.5 rounded-2xl border border-slate-200 flex items-start justify-between gap-3 bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs font-bold text-slate-900">{addr.title}</strong>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{addr.address}</p>
                  </div>

                  {!addr.isDefault && (
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Preferences & Language Toggle */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#005c55]" />
              <span>Language & Regional Preferences</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  language === 'en'
                    ? 'border-[#005c55] bg-emerald-50 text-[#005c55] font-bold'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="block font-bold">English</span>
                  <span className="text-[10px] text-slate-400">Default Interface</span>
                </div>
                {language === 'en' && <Check className="w-4 h-4 text-[#005c55]" />}
              </button>

              <button
                type="button"
                onClick={() => setLanguage('te')}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  language === 'te'
                    ? 'border-[#005c55] bg-emerald-50 text-[#005c55] font-bold'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="block font-bold">తెలుగు (Telugu)</span>
                  <span className="text-[10px] text-slate-400">హైదరాబాద్ ప్రాంతీయ భాష</span>
                </div>
                {language === 'te' && <Check className="w-4 h-4 text-[#005c55]" />}
              </button>
            </div>

            {/* Notification Toggles */}
            <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-bold">WhatsApp Order Tracking</strong>
                  <span className="text-slate-500 text-[11px]">Receive live delivery ETA & technician OTP on WhatsApp</span>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappUpdates}
                  onChange={(e) => setWhatsappUpdates(e.target.checked)}
                  className="rounded text-[#005c55] focus:ring-[#005c55] w-4 h-4"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-bold">SMS Notifications</strong>
                  <span className="text-slate-500 text-[11px]">Receive OTP and invoice SMS for services</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="rounded text-[#005c55] focus:ring-[#005c55] w-4 h-4"
                />
              </div>
            </div>
          </div>

          {/* Log Out Button */}
          <div className="pt-2">
            <button
              onClick={logout}
              className="w-full py-3 px-4 rounded-2xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out from Daily Hub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
