'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Product } from '@/lib/data';
import { translations, Language } from '@/lib/translations';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

export type CurrencyType = 'INR' | 'USD' | 'EUR' | 'GBP' | 'JPY';
export type ThemeType = 'dark' | 'light' | 'auto';
export type LanguageType = Language;

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  shopTheLookOpen: boolean;
  setShopTheLookOpen: (open: boolean) => void;

  // Auth & User State
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // Settings State
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;

  // Customer Service Modal State
  csModalOpen: boolean;
  setCsModalOpen: (open: boolean) => void;
  csTab: 'faqs' | 'returns' | 'styling' | 'sizeGuide' | 'company';
  openCustomerService: (tab: 'faqs' | 'returns' | 'styling' | 'sizeGuide' | 'company') => void;
  currencySymbol: string;
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
  notifications: { orderUpdates: boolean; promoOffers: boolean };
  setNotifications: React.Dispatch<React.SetStateAction<{ orderUpdates: boolean; promoOffers: boolean }>>;
  language: LanguageType;
  setLanguage: (l: LanguageType) => void;
  t: (key: string) => string;
  formatPrice: (amountInINR: number | string) => string;

  // Cart & Wishlist Actions
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  addToCartMultiple: (items: { product: Product; quantity?: number; size?: string }[]) => void;
  removeFromCart: (productId: number, size?: string) => void;
  updateCartQuantity: (productId: number, size: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  totalCartItems: number;
  totalCartPrice: number;
  formattedTotalCartPrice: string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const [cartOpen, setCartOpenState] = useState(false);
  const [wishlistOpen, setWishlistOpenState] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [shopTheLookOpen, setShopTheLookOpen] = useState(false);

  // User Auth
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Settings
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyType>('INR');
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [notifications, setNotifications] = useState({ orderUpdates: true, promoOffers: true });
  const [language, setLanguage] = useState<LanguageType>('en');

  // Customer Service Modal State
  const [csModalOpen, setCsModalOpen] = useState(false);
  const [csTab, setCsTab] = useState<'faqs' | 'returns' | 'styling' | 'sizeGuide' | 'company'>('faqs');

  const openCustomerService = (tab: 'faqs' | 'returns' | 'styling' | 'sizeGuide' | 'company') => {
    setCsTab(tab);
    setCsModalOpen(true);
  };

  // Translation helper
  const t = (key: string): string => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('lavenir_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedCart = localStorage.getItem('lavenir_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedUser = localStorage.getItem('lavenir_user');
      if (savedUser) setUser(JSON.parse(savedUser));
      const savedCurrency = localStorage.getItem('lavenir_currency') as CurrencyType;
      if (savedCurrency) setCurrency(savedCurrency);
      const savedTheme = localStorage.getItem('lavenir_theme') as ThemeType;
      if (savedTheme) setTheme(savedTheme);
      const savedLang = localStorage.getItem('lavenir_lang') as LanguageType;
      if (savedLang) setLanguage(savedLang);
    } catch (e) {
      console.error('Failed to load storage:', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lavenir_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('lavenir_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('lavenir_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('lavenir_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('lavenir_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem('lavenir_lang', language);
    } catch (e) {
      console.error(e);
    }
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem('lavenir_theme', theme);
      const isDark =
        theme === 'dark' ||
        (theme === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light-mode');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const currencySymbol =
    currency === 'INR' ? '₹' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '¥';

  // Format prices accurately dynamically across all site sections (including combos & raw string prices)
  const formatPrice = (amountInINR: number | string): string => {
    let numeric = 0;
    if (typeof amountInINR === 'number') {
      numeric = amountInINR;
    } else {
      const cleaned = String(amountInINR).replace(/[^0-9.]/g, '');
      numeric = parseFloat(cleaned) || 0;
    }

    if (currency === 'USD') {
      const usdVal = Math.round(numeric / 85);
      return `$${usdVal.toLocaleString('en-US')}`;
    } else if (currency === 'EUR') {
      const eurVal = Math.round(numeric / 92);
      return `€${eurVal.toLocaleString('de-DE')}`;
    } else if (currency === 'GBP') {
      const gbpVal = Math.round(numeric / 108);
      return `£${gbpVal.toLocaleString('en-GB')}`;
    } else if (currency === 'JPY') {
      const jpyVal = Math.round(numeric * 1.8);
      return `¥${jpyVal.toLocaleString('ja-JP')}`;
    } else {
      return `₹${numeric.toLocaleString('en-IN')}`;
    }
  };

  const setCartOpen = (open: boolean) => {
    if (open && !user) {
      setAuthModalOpen(true);
      toast.info('Please sign in or create an account to proceed.');
      return;
    }
    setCartOpenState(open);
  };

  const setWishlistOpen = (open: boolean) => {
    if (open && !user) {
      setAuthModalOpen(true);
      toast.info('Please sign in or create an account to proceed.');
      return;
    }
    setWishlistOpenState(open);
  };

  const addToCart = (product: Product, quantity = 1, size = 'M') => {
    if (!user) {
      setAuthModalOpen(true);
      toast.info('Please sign in or create an account to proceed.');
      return;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, quantity, selectedSize: size }];
    });
    toast.success(`Added ${product.name} (${size}) to your cart!`);
  };

  const addToCartMultiple = (items: { product: Product; quantity?: number; size?: string }[]) => {
    if (!user) {
      setAuthModalOpen(true);
      toast.info('Please sign in or create an account to proceed.');
      return;
    }

    setCart((prevCart) => {
      const updated = [...prevCart];
      items.forEach(({ product, quantity = 1, size = 'M' }) => {
        const existingIndex = updated.findIndex(
          (item) => item.product.id === product.id && item.selectedSize === size
        );
        if (existingIndex > -1) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
        } else {
          updated.push({ product, quantity, selectedSize: size });
        }
      });
      return updated;
    });
    toast.success(`Complete styled look (${items.length} items) added to cart!`);
    setCartOpenState(true);
  };

  const removeFromCart = (productId: number, size = 'M') => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedSize === size)));
    toast.info('Item removed from cart.');
  };

  const updateCartQuantity = (productId: number, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    if (!user) {
      setAuthModalOpen(true);
      toast.info('Please sign in or create an account to proceed.');
      return;
    }

    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        toast.info(`Removed ${product.name} from your Wishlist.`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        toast.success(`Saved ${product.name} to your Wishlist!`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((p) => p.id === productId);
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalCartPrice = cart.reduce((acc, item) => {
    const numericPrice = parseFloat(item.product.price.replace(/[^0-9.]/g, '')) || 0;
    return acc + numericPrice * item.quantity;
  }, 0);

  const formattedTotalCartPrice = formatPrice(totalCartPrice);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        activeCategory,
        setActiveCategory,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen,
        checkoutOpen,
        setCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        shopTheLookOpen,
        setShopTheLookOpen,
        user,
        setUser,
        authModalOpen,
        setAuthModalOpen,
        settingsOpen,
        setSettingsOpen,
        currency,
        setCurrency,
        csModalOpen,
        setCsModalOpen,
        csTab,
        openCustomerService,
        currencySymbol,
        theme,
        setTheme,
        notifications,
        setNotifications,
        language,
        setLanguage,
        t,
        formatPrice,
        addToCart,
        addToCartMultiple,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        totalCartItems,
        totalCartPrice,
        formattedTotalCartPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
