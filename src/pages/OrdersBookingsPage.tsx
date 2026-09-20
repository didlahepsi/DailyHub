import React, { useState } from 'react';
import {
  Clock,
  Wrench,
  ShoppingBag,
  Truck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  RotateCcw,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order, Booking, OrderStatus, BookingStatus } from '../types';

export const OrdersBookingsPage: React.FC = () => {
  const {
    orders,
    bookings,
    cancelOrder,
    cancelBooking,
    navigateTo,
    language,
    t,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'bookings'>('orders');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);

  const getOrderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Out for Delivery':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Out for Delivery (15m)
          </span>
        );
      case 'Processing':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            Processing at Hub
          </span>
        );
      case 'Delivered':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Delivered
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            {status}
          </span>
        );
    }
  };

  const getBookingStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
            Confirmed & Assigned
          </span>
        );
      case 'Completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
          {language === 'te' ? 'ఆర్డర్లు & సర్వీస్ బుకింగ్స్' : 'Orders & Doorstep Bookings'}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Live tracking for 15-minute product deliveries and assigned service technicians
        </p>
      </div>

      {/* Main Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl w-full sm:w-80">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-white text-[#005c55] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Product Orders ({orders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'bookings'
              ? 'bg-white text-[#005c55] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Services ({bookings.length})</span>
        </button>
      </div>

      {/* TAB 1: PRODUCT ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((order) => {
            const canCancel = order.status === 'Placed' || order.status === 'Processing';

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-sm text-slate-900 font-display">
                      {order.id}
                    </span>
                    <span className="text-xs text-slate-400">• {order.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getOrderStatusBadge(order.status)}
                  </div>
                </div>

                {/* Progress Bar for Delivery Tracker */}
                {order.status !== 'Cancelled' && (
                  <div className="py-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1.5">
                      <span className="text-emerald-700">1. Order Placed</span>
                      <span className={order.status !== 'Placed' ? 'text-emerald-700' : ''}>
                        2. Packed at Hub
                      </span>
                      <span
                        className={
                          order.status === 'Out for Delivery' || order.status === 'Delivered'
                            ? 'text-emerald-700'
                            : ''
                        }
                      >
                        3. Out for Delivery
                      </span>
                      <span className={order.status === 'Delivered' ? 'text-emerald-700' : ''}>
                        4. Delivered
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 transition-all duration-500"
                        style={{
                          width:
                            order.status === 'Delivered'
                              ? '100%'
                              : order.status === 'Out for Delivery'
                              ? '75%'
                              : order.status === 'Processing'
                              ? '45%'
                              : '20%'
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Items preview */}
                <div className="flex flex-wrap items-center gap-4 py-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-xs">
                        <p className="font-bold text-slate-800 line-clamp-1 max-w-[200px]">
                          {item.name}
                        </p>
                        <p className="text-slate-400 text-[11px]">
                          Qty: {item.quantity} • ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer / Meta Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="space-y-0.5">
                    <p className="text-slate-500 flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-xs">{order.deliveryAddress}</span>
                    </p>
                    {order.riderName && order.status === 'Out for Delivery' && (
                      <p className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Rider: {order.riderName} ({order.estimatedArrival})</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Total Paid</span>
                      <span className="font-black text-sm text-[#005c55]">₹{order.totalAmount}</span>
                    </div>

                    <button
                      onClick={() => setSelectedOrderForModal(order)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-xs"
                    >
                      View Receipt
                    </button>

                    {canCancel && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl transition-colors text-xs"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {orders.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">No product orders placed yet.</p>
              <button
                onClick={() => navigateTo('products')}
                className="mt-3 px-4 py-2 bg-[#005c55] text-white text-xs font-bold rounded-xl"
              >
                Shop Fresh Groceries
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SERVICE BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const canCancel = booking.status === 'Confirmed';

            return (
              <div
                key={booking.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-sm text-slate-900 font-display">
                      {booking.id}
                    </span>
                    <span className="text-xs text-slate-400">
                      • {booking.serviceName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getBookingStatusBadge(booking.status)}
                  </div>
                </div>

                {/* Service Details Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.serviceImage}
                      alt={booking.serviceName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-100 bg-slate-50"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{booking.serviceName}</h4>
                      <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {booking.providerName}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Slot: {booking.date} at {booking.timeSlot}
                      </p>
                    </div>
                  </div>

                  {/* OTP Badge for Confirmed Bookings */}
                  {booking.status === 'Confirmed' && (
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-center min-w-[140px]">
                      <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">
                        Service Start OTP
                      </span>
                      <span className="text-2xl font-black text-[#005c55] tracking-widest">
                        {booking.otp}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="text-slate-500">
                    <span className="text-[11px]">Address: {booking.serviceAddress}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right mr-2">
                      <span className="text-[10px] text-slate-400 block">Inspection Fee</span>
                      <span className="font-black text-sm text-[#005c55]">₹{booking.amount}</span>
                    </div>

                    <a
                      href="tel:+919848022338"
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl transition-colors text-xs flex items-center gap-1 border border-emerald-200"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call Tech</span>
                    </a>

                    {canCancel && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl transition-colors text-xs"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {bookings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
              <Wrench className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">No service bookings yet.</p>
              <button
                onClick={() => navigateTo('services')}
                className="mt-3 px-4 py-2 bg-[#005c55] text-white text-xs font-bold rounded-xl"
              >
                Browse Services
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal: Order Receipt Details */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Tax Invoice {selectedOrderForModal.id}
                </h3>
                <span className="text-[10px] text-slate-400">Daily Hub Hyperlocal Hyderabad</span>
              </div>
              <button
                onClick={() => setSelectedOrderForModal(null)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-100">
              {selectedOrderForModal.items.map((it, idx) => (
                <div key={idx} className="pt-2 flex justify-between">
                  <div>
                    <p className="font-bold text-slate-800">{it.name}</p>
                    <p className="text-[10px] text-slate-400">Qty: {it.quantity} x ₹{it.price}</p>
                  </div>
                  <span className="font-bold text-slate-900">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{selectedOrderForModal.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span>{selectedOrderForModal.deliveryFee === 0 ? 'FREE' : `₹${selectedOrderForModal.deliveryFee}`}</span>
              </div>
              {selectedOrderForModal.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount</span>
                  <span>- ₹{selectedOrderForModal.discount}</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Paid</span>
                <span className="text-[#005c55]">₹{selectedOrderForModal.totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => {
                showToast('Receipt PDF downloaded to device!');
                setSelectedOrderForModal(null);
              }}
              className="w-full py-2.5 bg-[#005c55] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Download PDF Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
