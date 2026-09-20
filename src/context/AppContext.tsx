import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  PageType,
  Language,
  Product,
  Service,
  CartItem,
  Order,
  Booking,
  UserProfile
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_SERVICES } from '../data/services';
import { INITIAL_USER, INITIAL_ORDERS, INITIAL_BOOKINGS } from '../data/initialState';
import { TRANSLATIONS } from '../data/translations';

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string, phone: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;

  products: Product[];
  services: Service[];

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  orders: Order[];
  placeOrder: (details: {
    deliveryAddress: string;
    customerName: string;
    customerPhone: string;
    paymentMethod: string;
    discount?: number;
  }) => Order;
  cancelOrder: (orderId: string) => void;

  bookings: Booking[];
  createBooking: (details: {
    service: Service;
    date: string;
    timeSlot: string;
    customerName: string;
    customerPhone: string;
    serviceAddress: string;
    notes?: string;
    paymentMode: 'Pay After Service' | 'UPI Online';
  }) => Booking;
  cancelBooking: (bookingId: string) => void;

  currentPage: PageType;
  navigateTo: (page: PageType) => void;

  selectedProduct: Product | null;
  viewProductDetail: (product: Product) => void;

  selectedService: Service | null;
  startBookingService: (service: Service) => void;

  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  toastMessage: string | null;
  showToast: (msg: string) => void;

  aiSearchQuery: string;
  setAiSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or defaults
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('dailyhub_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('dailyhub_auth') !== 'false';
    } catch {
      return true;
    }
  });

  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [services] = useState<Service[]>(INITIAL_SERVICES);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dailyhub_cart');
      return saved ? JSON.parse(saved) : [
        { product: INITIAL_PRODUCTS[0], quantity: 1 },
        { product: INITIAL_PRODUCTS[1], quantity: 1 }
      ];
    } catch {
      return [
        { product: INITIAL_PRODUCTS[0], quantity: 1 },
        { product: INITIAL_PRODUCTS[1], quantity: 1 }
      ];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('dailyhub_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('dailyhub_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(INITIAL_PRODUCTS[1]);
  const [selectedService, setSelectedService] = useState<Service | null>(INITIAL_SERVICES[0]);
  const [language, setLanguageState] = useState<Language>('en');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [aiSearchQuery, setAiSearchQuery] = useState<string>('');

  // Persist key state
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('dailyhub_user', JSON.stringify(user));
      }
      localStorage.setItem('dailyhub_auth', String(isAuthenticated));
      localStorage.setItem('dailyhub_cart', JSON.stringify(cart));
      localStorage.setItem('dailyhub_orders', JSON.stringify(orders));
      localStorage.setItem('dailyhub_bookings', JSON.stringify(bookings));
    } catch {
      // Ignore local storage errors
    }
  }, [user, isAuthenticated, cart, orders, bookings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      ...(user || INITIAL_USER),
      email,
      name: name || user?.name || 'Customer'
    };
    setUser(newUser);
    setIsAuthenticated(true);
    showToast(`Welcome back, ${newUser.name}!`);
    setCurrentPage('dashboard');
  };

  const signup = (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      ...(user || INITIAL_USER),
      id: `usr-${Date.now()}`,
      name,
      email,
      phone
    };
    setUser(newUser);
    setIsAuthenticated(true);
    showToast(`Welcome to Daily Hub, ${name}!`);
    setCurrentPage('dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Logged out safely.');
    setCurrentPage('login');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    showToast('Profile updated successfully!');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    showToast(lang === 'te' ? 'భాష తెలుగులోకి మార్చబడింది' : 'Language switched to English');
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity }];
    });
    showToast(`${product.name.slice(0, 24)}... ${t('addedToCart')}`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProductDetail = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product_detail');
  };

  const startBookingService = (service: Service) => {
    setSelectedService(service);
    navigateTo('service_booking');
  };

  const placeOrder = ({
    deliveryAddress,
    customerName,
    customerPhone,
    paymentMethod,
    discount = 0
  }: {
    deliveryAddress: string;
    customerName: string;
    customerPhone: string;
    paymentMethod: string;
    discount?: number;
  }): Order => {
    const subtotal = cartTotal;
    const deliveryFee = subtotal > 199 ? 0 : 29;
    const platformFee = 5;
    const totalAmount = Math.max(0, subtotal + deliveryFee + platformFee - discount);
    const orderId = `#DH-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      createdAt: 'Just now',
      items: cart.map((ci) => ({
        productId: ci.product.id,
        name: ci.product.name,
        price: ci.product.price,
        quantity: ci.quantity,
        image: ci.product.image,
        weightOrUnit: ci.product.weightOrUnit
      })),
      subtotal,
      deliveryFee,
      discount,
      platformFee,
      totalAmount,
      status: 'Processing',
      deliveryAddress,
      customerName,
      customerPhone,
      paymentMethod,
      estimatedArrival: 'In 15-20 mins',
      riderName: 'Naveen Kumar (Assigned Rider)'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order placed successfully! Order ID: ${orderId}`);
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: 'Cancelled' as const } : ord))
    );
    showToast(`Order ${orderId} has been cancelled.`);
  };

  const createBooking = ({
    service,
    date,
    timeSlot,
    customerName,
    customerPhone,
    serviceAddress,
    notes,
    paymentMode
  }: {
    service: Service;
    date: string;
    timeSlot: string;
    customerName: string;
    customerPhone: string;
    serviceAddress: string;
    notes?: string;
    paymentMode: 'Pay After Service' | 'UPI Online';
  }): Booking => {
    const bookingId = `#BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomOtp = String(Math.floor(1000 + Math.random() * 9000));

    const newBooking: Booking = {
      id: bookingId,
      serviceId: service.id,
      serviceName: service.name,
      serviceImage: service.image,
      providerName: service.providerName,
      date,
      timeSlot,
      amount: service.startingPrice,
      status: 'Confirmed',
      customerName,
      customerPhone,
      serviceAddress,
      notes,
      otp: randomOtp,
      paymentMode
    };

    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Service Booked! Booking ID: ${bookingId} (OTP: ${randomOtp})`);
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((bk) => (bk.id === bookingId ? { ...bk, status: 'Cancelled' as const } : bk))
    );
    showToast(`Booking ${bookingId} has been cancelled.`);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        updateProfile,
        products,
        services,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        orders,
        placeOrder,
        cancelOrder,
        bookings,
        createBooking,
        cancelBooking,
        currentPage,
        navigateTo,
        selectedProduct,
        viewProductDetail,
        selectedService,
        startBookingService,
        language,
        setLanguage,
        t,
        toastMessage,
        showToast,
        aiSearchQuery,
        setAiSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
