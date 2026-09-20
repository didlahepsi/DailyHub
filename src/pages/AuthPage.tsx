import React, { useState } from 'react';
import {
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  Zap,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthPage: React.FC = () => {
  const { login, signup, navigateTo, language, t } = useApp();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState('sai.srinivas@dailyhub.in');
  const [password, setPassword] = useState('DailyHub@2025');
  const [name, setName] = useState('Sai Srinivas Varma');
  const [phone, setPhone] = useState('+91 98480 22338');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginTab) {
      login(emailOrPhone, name || 'Customer');
    } else {
      signup(name, emailOrPhone, phone);
    }
  };

  const handleQuickDemoLogin = () => {
    login('sai.srinivas@dailyhub.in', 'Sai Srinivas Varma');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Brand Visual & Value Propositions */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#004d47] via-[#005c55] to-[#0f766e] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white border border-white/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight font-display">
                  DAILY HUB
                </span>
                <span className="text-[10px] block text-emerald-200 uppercase tracking-widest font-semibold">
                  Hyperlocal Platform
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display leading-tight mb-3">
              {language === 'te'
                ? 'ప్రతి ఉత్పత్తి & సేవ ఒకే ప్లాట్‌ఫామ్‌లో.'
                : 'Every Product & Service in One Platform.'}
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed mb-6">
              From fresh groceries in 15 minutes to verified plumbers and electricians at your doorstep.
            </p>

            {/* Feature List */}
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-300 mt-0.5">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-white font-semibold">15-Min Express Delivery</strong>
                  <span className="text-emerald-200/80 text-[11px]">Instant delivery for grocery and water cans</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-300 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-white font-semibold">Verified Professionals</strong>
                  <span className="text-emerald-200/80 text-[11px]">Police-verified experts with 30-day service warranty</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-300 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-white font-semibold">AI Smart Discovery</strong>
                  <span className="text-emerald-200/80 text-[11px]">Ask problems naturally in English or Telugu</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-200">
            <span>Trusted across Hyderabad</span>
            <span className="font-semibold text-white">4.8 ★ (45k+ users)</span>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          {/* Quick Demo Login Banner */}
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-950">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold">Hackathon Instant Reviewer Mode</span>
                <p className="text-[11px] text-emerald-800">One-click sign in with preloaded Hyderabad account</p>
              </div>
            </div>
            <button
              onClick={handleQuickDemoLogin}
              className="px-3 py-1.5 bg-[#005c55] hover:bg-[#004d47] text-white text-xs font-bold rounded-lg transition-colors shrink-0 shadow-xs"
            >
              Demo Login
            </button>
          </div>

          {/* Form Switcher Tabs */}
          <div className="flex border-b border-slate-200 mb-6">
            <button
              onClick={() => setIsLoginTab(true)}
              className={`pb-3 px-4 text-sm font-bold transition-all relative ${
                isLoginTab
                  ? 'text-[#005c55] border-b-2 border-[#005c55]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {language === 'te' ? 'లాగిన్' : 'Sign In'}
            </button>
            <button
              onClick={() => setIsLoginTab(false)}
              className={`pb-3 px-4 text-sm font-bold transition-all relative ${
                !isLoginTab
                  ? 'text-[#005c55] border-b-2 border-[#005c55]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {language === 'te' ? 'ఖాతా సృష్టించండి' : 'Create Account'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginTab && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005c55]/20 focus:border-[#005c55]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="sai.srinivas@dailyhub.in or +91 98480 22338"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005c55]/20 focus:border-[#005c55]"
                />
              </div>
            </div>

            {!isLoginTab && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (for Order SMS)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98480 22338"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005c55]/20 focus:border-[#005c55]"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                {isLoginTab && (
                  <button
                    type="button"
                    onClick={() => alert('Demo password is reset to DailyHub@2025')}
                    className="text-[11px] font-semibold text-[#005c55] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005c55]/20 focus:border-[#005c55]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-[#005c55] hover:bg-[#004d47] text-white font-bold text-xs rounded-xl shadow-md shadow-[#005c55]/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>{isLoginTab ? 'Sign In & Continue' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Privacy notice */}
            <p className="text-[11px] text-slate-500 text-center mt-3">
              By continuing, you agree to Daily Hub Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
