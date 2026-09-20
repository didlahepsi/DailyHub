export type PageType =
  | 'login'
  | 'auth'
  | 'dashboard'
  | 'products'
  | 'product_detail'
  | 'cart_checkout'
  | 'services'
  | 'service_booking'
  | 'orders_bookings'
  | 'ai_search'
  | 'profile_settings';

export type Language = 'en' | 'te';

export type ProductCategory =
  | 'Grocery'
  | 'Water & Beverages'
  | 'Food'
  | 'Electronics'
  | 'Fashion'
  | 'Home & Kitchen'
  | 'Books & Stationery'
  | 'Beauty'
  | 'Gifts & Flowers'
  | 'Pet Supplies';

export type ServiceCategory =
  | 'Home Services'
  | 'Vehicle Services'
  | 'Personal Services'
  | 'Local/Daily Services';

export interface Product {
  id: string;
  name: string;
  nameTe?: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  deliveryTime: string;
  description: string;
  descriptionTe?: string;
  weightOrUnit: string;
  badge?: string;
  isBestseller?: boolean;
}

export interface Service {
  id: string;
  name: string;
  nameTe?: string;
  category: ServiceCategory;
  startingPrice: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  availability: string;
  image: string;
  providerName: string;
  description: string;
  descriptionTe?: string;
  warrantyInfo?: string;
  duration?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'Placed'
  | 'Processing'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type BookingStatus =
  | 'Requested'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weightOrUnit: string;
}

export interface Order {
  id: string; // e.g. #DH-9281
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  platformFee: number;
  totalAmount: number;
  status: OrderStatus;
  deliveryAddress: string;
  customerName: string;
  customerPhone: string;
  paymentMethod: string;
  estimatedArrival?: string;
  riderName?: string;
}

export interface Booking {
  id: string; // e.g. #BK-7709
  serviceId: string;
  serviceName: string;
  serviceImage: string;
  providerName: string;
  date: string;
  timeSlot: string;
  amount: number;
  status: BookingStatus;
  customerName: string;
  customerPhone: string;
  serviceAddress: string;
  notes?: string;
  otp: string;
  paymentMode: 'Pay After Service' | 'UPI Online';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  avatar: string;
  memberTier: string;
  walletBalance?: number;
  savedAddresses: { label: string; address: string }[];
}

export interface AIIntentResult {
  query: string;
  detectedIntent: string;
  confidence: number;
  explanation: string;
  recommendedCategory: string;
  recommendedType: 'service' | 'product';
  recommendedServices: Service[];
  recommendedProducts: Product[];
}
