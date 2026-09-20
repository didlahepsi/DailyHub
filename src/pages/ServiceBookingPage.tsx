import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Phone,
  User,
  AlertCircle,
  Wrench,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServiceBookingPage: React.FC = () => {
  const {
    selectedService,
    createBooking,
    navigateTo,
    user,
    language,
    t
  } = useApp();

  const [selectedDate, setSelectedDate] = useState('Today (Instant)');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [name, setName] = useState(user?.name || 'Sai Srinivas Varma');
  const [phone, setPhone] = useState(user?.phone || '+91 98480 22338');
  const [address, setAddress] = useState(
    user?.address || 'Flat 402, Sri Sai Nilayam, Ayyappa Society, Madhapur, Hyderabad - 500081'
  );
  const [notes, setNotes] = useState('');
  const [paymentMode, setPaymentMode] = useState<'Pay After Service' | 'UPI Online'>('Pay After Service');
  const [confirmedBooking, setConfirmedBooking] = useState<{ id: string; otp: string } | null>(null);

  if (!selectedService) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="text-sm font-semibold text-slate-700">No service selected for booking.</p>
        <button
          onClick={() => navigateTo('services')}
          className="mt-3 px-4 py-2 bg-[#005c55] text-white text-xs font-bold rounded-xl"
        >
          Browse All Services
        </button>
      </div>
    );
  }

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM'
  ];

  const dates = [
    'Today (Instant)',
    'Tomorrow',
    'Oct 26 (Friday)',
    'Oct 27 (Saturday)'
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const booking = createBooking({
      service: selectedService,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      customerName: name,
      customerPhone: phone,
      serviceAddress: address,
      notes: notes.trim() || undefined,
      paymentMode
    });

    setConfirmedBooking({ id: booking.id, otp: booking.otp });
  };

  // If booking is confirmed, show celebratory modal card
  if (confirmedBooking) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-xl my-8 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full">
          Doorstep Booking Confirmed
        </span>
        <h2 className="text-2xl font-bold font-display text-slate-900 mt-3 mb-1">
          {confirmedBooking.id}
        </h2>

        {/* Security OTP Card */}
        <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md">
          <span className="text-xs text-emerald-100 uppercase tracking-wider font-semibold block">
            Security Service Start OTP
          </span>
          <span className="text-3xl font-black tracking-widest block my-1">
            {confirmedBooking.otp}
          </span>
          <p className="text-[11px] text-emerald-100">
            Share this 4-digit code with the technician only when they arrive at your door.
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 text-xs text-left mb-6 space-y-2 border border-slate-200/80">
          <div className="flex justify-between">
            <span className="text-slate-500">Service:</span>
            <span className="font-bold text-slate-800">{selectedService.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Assigned Partner:</span>
            <span className="font-semibold text-slate-800">{selectedService.providerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Scheduled Slot:</span>
            <span className="font-semibold text-slate-800">{selectedDate} ({selectedTimeSlot})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Inspection Fee:</span>
            <span className="font-extrabold text-[#005c55]">₹{selectedService.startingPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Payment:</span>
            <span className="font-semibold text-slate-800">{paymentMode}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              setConfirmedBooking(null);
              navigateTo('orders_bookings');
            }}
            className="flex-1 py-3 bg-[#005c55] hover:bg-[#004d47] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            View in Bookings
          </button>
          <button
            onClick={() => {
              setConfirmedBooking(null);
              navigateTo('services');
            }}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            Explore More Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigateTo('services')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#005c55] bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-2xs transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Services</span>
      </button>

      {/* Booking Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Booking Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleConfirmBooking} className="space-y-6">
            {/* Slot & Date Picker Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#005c55]" />
                <span>Select Service Date</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {dates.map((d) => {
                  const isSelected = selectedDate === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`p-3 rounded-2xl border text-xs font-semibold text-center transition-all ${
                        isSelected
                          ? 'border-[#005c55] bg-emerald-50 text-[#005c55] shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>

              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 pt-3 border-t border-slate-100">
                <Clock className="w-4 h-4 text-[#005c55]" />
                <span>Select Preferred Time Slot</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#005c55] bg-emerald-50 text-[#005c55] shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{slot}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#005c55]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Address & Contact Information */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#005c55]" />
                <span>Doorstep Address & Contact Info</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005c55]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Phone (Technician Calling)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005c55]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Detailed Doorstep Address</label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005c55]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Describe Problem / Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Kitchen tap leaking at faucet connection, or AC fan making noise"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#005c55]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Mode Selection */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <h3 className="font-bold text-sm text-slate-900 mb-2">
                Payment Mode
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-2.5 transition-all ${
                    paymentMode === 'Pay After Service'
                      ? 'border-[#005c55] bg-emerald-50'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="bookingPay"
                    checked={paymentMode === 'Pay After Service'}
                    onChange={() => setPaymentMode('Pay After Service')}
                    className="text-[#005c55] mt-0.5"
                  />
                  <div>
                    <strong className="block text-slate-900 font-bold">Pay After Service (Recommended)</strong>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Inspect technician work first. Pay cash or UPI only after complete satisfaction.
                    </span>
                  </div>
                </label>

                <label
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-2.5 transition-all ${
                    paymentMode === 'UPI Online'
                      ? 'border-[#005c55] bg-emerald-50'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="bookingPay"
                    checked={paymentMode === 'UPI Online'}
                    onChange={() => setPaymentMode('UPI Online')}
                    className="text-[#005c55] mt-0.5"
                  />
                  <div>
                    <strong className="block text-slate-900 font-bold">Prepay via UPI</strong>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Fast contactless payment via GPay or PhonePe with 100% refund guarantee.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Confirm CTA */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-[#005c55] hover:bg-[#004d47] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#005c55]/25 flex items-center justify-center gap-2 transition-all hover:translate-y-[-1px]"
            >
              <span>{t('confirmBooking')} • ₹{selectedService.startingPrice}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Service Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs overflow-hidden">
            <div className="relative h-40 rounded-2xl overflow-hidden mb-4 bg-slate-100">
              <img
                src={selectedService.image}
                alt={selectedService.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                {selectedService.category}
              </span>
            </div>

            <h2 className="text-lg font-bold font-display text-slate-900 mb-1">
              {language === 'te' && selectedService.nameTe ? selectedService.nameTe : selectedService.name}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              {selectedService.description}
            </p>

            <div className="space-y-2.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Service Partner:</span>
                <span className="font-bold flex items-center gap-1 text-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedService.providerName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Visiting Fee:</span>
                <span className="font-extrabold text-[#005c55] text-sm">₹{selectedService.startingPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-semibold text-slate-800">{selectedService.duration || '45-60 Mins'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Service Guarantee:</span>
                <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                  {selectedService.warrantyInfo || '30-Day Warranty'}
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#005c55] shrink-0 mt-0.5" />
              <span>
                Standard inspection fee applies to diagnosis. Any material or spare parts required will be quoted on-site before commencing work.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
