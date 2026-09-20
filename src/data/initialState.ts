import { UserProfile, Order, Booking } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr-hyderabad-101',
  name: 'Sai Srinivas Varma',
  email: 'sai.srinivas@dailyhub.in',
  phone: '+91 98480 22338',
  address: 'Flat 402, Sri Sai Nilayam, 100ft Road, Ayyappa Society, Madhapur',
  city: 'Hyderabad',
  pincode: '500081',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  memberTier: 'DailyHub Gold Member',
  savedAddresses: [
    { label: 'Home (Default)', address: 'Flat 402, Sri Sai Nilayam, Ayyappa Society, Madhapur, Hyderabad - 500081' },
    { label: 'Office', address: 'Floor 5, Mindspace IT Park, Building 12C, Hitec City, Hyderabad - 500081' }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#DH-8491',
    createdAt: 'Today, 2:15 PM',
    items: [
      {
        productId: 'prod-2',
        name: 'Tata Sampann Unpolished Toor Dal 1kg',
        price: 185,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf0MZmmdlIvZiR5VBIndfyB7rr_dm8-K6wN_Gvec8cH2mETysktvcpda1jHJWuanzhzUHOu2LzR-SyRR-xbgZuRgtxEom0mv2V23WWqAQwrySEh-gmrlGLg3r7qaUvcacoAIw6jodiP77PallDMDGe8-piK-qN8-iOLzrLkhExfsfgmoZubqr5o9h7fZdrpH-ZiJrg-lG_-wVGmJfzXyV8hjvs3og1xLqfGkDaxRzKgNCy5akCjWxN',
        weightOrUnit: '1 kg Pack'
      },
      {
        productId: 'prod-1',
        name: 'Fortune Sunlite Refined Sunflower Oil 1L',
        price: 138,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeGSSrv9ZcPRUJhcxSXF4G2akJ9tRazdzU6phG9vuwjd1tN3aMpgazXKePQcdBUc830oFDEbPz6f7cONyeZD1zWRItdRCPEvv9mFPSjEpgdBoLcbsZt_ASk3vKmSUN7anrP2xyhRtzUKgctS_pDlp8YzZI-IsdoTPYCWXj4Hm8-2SP5WSLafwVp4DEBGTyd0qJ1r9Kt7Af30FFg5QqCuOc87i1bB3mKTCxfaQf_UuSzE3AGGTOfXeB',
        weightOrUnit: '1 L Pouch'
      }
    ],
    subtotal: 323,
    deliveryFee: 0,
    discount: 25,
    platformFee: 5,
    totalAmount: 303,
    status: 'Out for Delivery',
    deliveryAddress: 'Flat 402, Sri Sai Nilayam, Ayyappa Society, Madhapur, Hyderabad - 500081',
    customerName: 'Sai Srinivas Varma',
    customerPhone: '+91 98480 22338',
    paymentMethod: 'UPI (GPay)',
    estimatedArrival: 'In 9 mins (Rider nearby)',
    riderName: 'Ramesh Reddy (TVS iQube - TS 09 EA 4410)'
  },
  {
    id: '#DH-8120',
    createdAt: 'Yesterday, 09:30 AM',
    items: [
      {
        productId: 'prod-3',
        name: 'Bisleri Pure Mineral Water 20L Can',
        price: 90,
        quantity: 2,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzMOJhS66QKisPubvZSz8E4fwVWyNgP-ypv5vbw6vUsGgRl3nFpdUspn4vMERuxZRE0Ehavm8swTQdi2f3Je3JrodLSVCHy8syMr9noWmAjzw1f6A13EocVqtw6plOWW8yTWuskagX662dUb-9evrPeaA_4FLl6ZTYn-PERSR4Pc_KABGbGb9k3C1KOksUPDOsP4xwlr6K85l2RZgalKs3yrXwkqALhlxqONT1Y2KMoOrT5hRyAbjc',
        weightOrUnit: '20 Litre Can'
      }
    ],
    subtotal: 180,
    deliveryFee: 0,
    discount: 0,
    platformFee: 5,
    totalAmount: 185,
    status: 'Delivered',
    deliveryAddress: 'Flat 402, Sri Sai Nilayam, Ayyappa Society, Madhapur, Hyderabad - 500081',
    customerName: 'Sai Srinivas Varma',
    customerPhone: '+91 98480 22338',
    paymentMethod: 'Cash on Delivery'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: '#BK-4102',
    serviceId: 'serv-plumber',
    serviceName: 'Plumber',
    serviceImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY_X1C_vyM0zpMtuj9-SaMMNVubG23VGSjh5pvL7Z4QGvmzHt_2n3Kz3quY61mGP7lZzShEr1IiFSjtoj9bsPh2oXUg2vCLphdYqo1o_H8X0c9E8JlDWLOZ8ZQRDkW8K_z-XLUA84CZjBCiwVUXiI2D66icYvkni4M7z0xmESpXwRXPi4AZ4kIt-EmCUcTkaV4KmfAJkElmR5eb4E-g3-xL4-IxHQsrRASXSvj7qtb_VEOWoIO5tiE',
    providerName: 'Suresh V. (Verified Plumber)',
    date: 'Tomorrow',
    timeSlot: '11:00 AM - 12:00 PM',
    amount: 199,
    status: 'Confirmed',
    customerName: 'Sai Srinivas Varma',
    customerPhone: '+91 98480 22338',
    serviceAddress: 'Flat 402, Sri Sai Nilayam, Ayyappa Society, Madhapur, Hyderabad - 500081',
    notes: 'Kitchen sink tap has slow drip leak, please check washer.',
    otp: '4821',
    paymentMode: 'Pay After Service'
  },
  {
    id: '#BK-3918',
    serviceId: 'serv-car-wash',
    serviceName: 'Car Wash',
    serviceImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBToapIoosUQrPI074T1nGksjD2OQCprqDm6MHmiD_Nz9VbI8OABCp-iD-UkQK7Q0V_lj_mzAacCbdZXUQ48kc1cdDNaM0uvlhCTrLF7GMNiNHObwO3nsUULr0YHMN13Q0pLkN3tJ0mhAvr0BfWbJlw1Mo27_xZ7XBChRs6glZQZnW8Ck_MnBk_UxrSMk_c__f897FrknhyQmiZ9nGZm6mB14WCtwwxWBDcNL79qpXa34vUMWZ9TgYZ',
    providerName: 'Speedy Wash Crew',
    date: 'Yesterday',
    timeSlot: '04:30 PM',
    amount: 299,
    status: 'Completed',
    customerName: 'Sai Srinivas Varma',
    customerPhone: '+91 98480 22338',
    serviceAddress: 'Apartment Stilt Parking Slot B-14, Madhapur',
    notes: 'Hyundai i20 White, interior vacuum required.',
    otp: '9103',
    paymentMode: 'UPI Online'
  }
];
