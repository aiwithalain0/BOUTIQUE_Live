'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Menu,
  ArrowRight,
  Heart,
  Sparkles,
  User,
  Settings as SettingsIcon,
  LogOut,
  ChevronDown,
  MessageCircle,
} from 'lucide-react';
import { useScrolled } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { products } from '@/lib/data';
import { useShop } from '@/context/ShopContext';
import { toast } from 'sonner';
import { SafeImage } from '@/components/SafeImage';

export function Navbar() {
  const scrolled = useScrolled(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const {
    wishlist,
    setCartOpen,
    setWishlistOpen,
    setShopTheLookOpen,
    setSelectedProduct,
    totalCartItems,
    user,
    setUser,
    setAuthModalOpen,
    setSettingsOpen,
    openCustomerService,
    currencySymbol,
    t,
    formatPrice,
  } = useShop();

  const shopCategories = [
    {
      name: 'Bridal & Festive Wear',
      description: 'Zardozi lehengas, silk sarees, heavy wedding gowns & reception suits',
      href: '/collections?category=Bridal%20%26%20Festive',
    },
    {
      name: 'Jacket Sets & Indo-Western',
      description: 'Hand-embroidered standing jacket sets, sherwanis & tailored blazers',
      href: '/collections?category=Jacket%20Sets%20%26%20Indo-Western',
    },
    {
      name: 'Men’s Royal Ethnic',
      description: 'Italian suits, raw silk sherwanis & bandhgala jackets',
      href: '/collections?category=Men’s%20Royal%20Ethnic',
    },
    {
      name: 'Accessories & Footwear',
      description: 'Handcrafted juttis, embellished clutches & ethnic jewelry',
      href: '/collections?category=Accessories%20%26%20Footwear',
    },
    {
      name: 'Sustainable Line',
      description: '100% organic un-dyed cotton, mulberry silk & eco-certified linen',
      href: '/collections?category=Sustainable%20Line',
    },
  ];

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/collections', hasDropdown: true },
    { label: 'Bridal Couture', href: '/collections?category=Bridal%20%26%20Festive' },
    { label: 'Festive Sets', href: '/collections?category=Jacket%20Sets%20%26%20Indo-Western' },
    { label: 'Our Story', href: '/about' },
  ];

  const query = searchQuery.toLowerCase().trim();
  const filteredSearch = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query)) ||
          (p.color && p.color.toLowerCase().includes(query)) ||
          (p.badges && p.badges.some((b) => b.toLowerCase().includes(query)))
      )
    : products.slice(0, 6);

  const handleSignOut = () => {
    setUser(null);
    setUserDropdownOpen(false);
    toast.info('Signed out of L’AVENIR.');
  };

  const handleCartClick = () => {
    if (!user) {
      setAuthModalOpen(true);
      toast.error('Authentication required to add items or access your cart.');
    } else {
      setCartOpen(true);
    }
  };

  const handleWishlistClick = () => {
    if (!user) {
      setAuthModalOpen(true);
      toast.error('Authentication required to add items or access your cart.');
    } else {
      setWishlistOpen(true);
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919876543210?text=Hello%20L%E2%80%99AVENIR%20Concierge%2C%20I%20would%20like%20assistance%20with%20boutique%20orders.', '_blank');
  };

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT TICKER BAR */}
      <div className="bg-[#435B47] text-white text-[11px] sm:text-xs font-semibold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-3 border-b border-[#354938] relative z-50 shadow-sm">
        <span className="truncate">
          Worldwide Express Shipping | 100% Handcrafted Luxury Couture | Direct WhatsApp Assistance: +91 98765 43210
        </span>
        <button
          onClick={handleWhatsAppClick}
          className="hidden md:inline-flex items-center gap-1 text-[10px] uppercase font-bold bg-[#86A386] hover:bg-[#6e8a6e] px-2.5 py-0.5 rounded-full transition-all text-white shrink-0 shadow-sm"
        >
          <MessageCircle className="w-3 h-3 text-white" />
          <span>Chat Live</span>
        </button>
      </div>

      <header
        className={cn(
          'sticky top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-[#F3EDE2]/95 backdrop-blur-xl shadow-md border-b border-[#C2D0C0] py-2.5 sm:py-3 text-[#222831]'
            : 'bg-[#F3EDE2] border-b border-[#C2D0C0] py-3 sm:py-4 text-[#222831]'
        )}
      >
        <nav className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 grid grid-cols-[auto_1fr_auto] sm:grid-cols-3 items-center gap-1 sm:gap-4">
          {/* LEFT: Primary Navigation Links */}
          <div className="flex items-center justify-start gap-2 sm:gap-3">
            {/* Mobile Sheet Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open Mobile Menu"
                  className="lg:hidden p-2 rounded-full bg-[#FFFFFF] text-[#435B47] hover:bg-[#435B47] hover:text-white border border-[#C2D0C0] transition-all shadow-sm"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#F3EDE2] border-r border-[#C2D0C0] text-[#222831] w-[85vw] max-w-sm p-6">
                <SheetHeader className="text-left border-b border-[#C2D0C0] pb-4 mb-4">
                  <SheetTitle className="text-2xl font-serif font-bold text-[#435B47] tracking-widest">
                    L’AVENIR
                  </SheetTitle>
                  <SheetDescription className="text-xs text-[#222831]/60 font-light">
                    Haute Couture & Atelier Storefront
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-2.5 overflow-y-auto max-h-[75vh] pr-1">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold text-[#222831] hover:text-[#435B47] transition-colors py-2 border-b border-[#C2D0C0]/50 flex items-center justify-between"
                  >
                    <span>Home</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#435B47]" />
                  </Link>
                  <Link
                    href="/collections"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold text-[#222831] hover:text-[#435B47] transition-colors py-2 border-b border-[#C2D0C0]/50 flex items-center justify-between"
                  >
                    <span>Shop Collections</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#435B47]" />
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold text-[#222831] hover:text-[#435B47] transition-colors py-2 border-b border-[#C2D0C0]/50 flex items-center justify-between"
                  >
                    <span>About Us / Our Story</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#435B47]" />
                  </Link>
                  <Link
                    href="/collections?category=Bridal%20%26%20Festive"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold text-[#222831] hover:text-[#435B47] transition-colors py-2 border-b border-[#C2D0C0]/50 flex items-center justify-between"
                  >
                    <span>Bridal Couture</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#435B47]" />
                  </Link>
                  <Link
                    href="/collections?category=Jacket%20Sets%20%26%20Indo-Western"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold text-[#222831] hover:text-[#435B47] transition-colors py-2 border-b border-[#C2D0C0]/50 flex items-center justify-between"
                  >
                    <span>Festive Sets</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#435B47]" />
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openCustomerService('styling');
                    }}
                    className="w-full text-left text-sm font-semibold text-[#222831] hover:text-[#435B47] transition-colors py-2 border-b border-[#C2D0C0]/50 flex items-center justify-between"
                  >
                    <span>Virtual Stylist</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#435B47]" />
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShopTheLookOpen(true);
                    }}
                    className="w-full mt-4 py-3 rounded-full bg-[#435B47] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:bg-[#354938]"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>{t('nav.shopLook')}</span>
                  </button>

                  {/* Social Media Quick Links */}
                  <div className="pt-6 border-t border-[#C2D0C0] mt-4 space-y-2">
                    <p className="text-[11px] font-bold text-[#435B47] uppercase tracking-wider">Connect With Atelier</p>
                    <div className="flex items-center gap-3 pt-1">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-white border border-[#C2D0C0] flex items-center justify-center text-[#435B47] hover:bg-[#435B47] hover:text-white transition-all shadow-sm text-xs font-bold"
                        title="Instagram"
                      >
                        ig
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-white border border-[#C2D0C0] flex items-center justify-center text-[#435B47] hover:bg-[#435B47] hover:text-white transition-all shadow-sm text-xs font-bold"
                        title="Facebook"
                      >
                        fb
                      </a>
                      <a
                        href="https://pinterest.com"
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-white border border-[#C2D0C0] flex items-center justify-center text-[#435B47] hover:bg-[#435B47] hover:text-white transition-all shadow-sm text-xs font-bold"
                        title="Pinterest"
                      >
                        pt
                      </a>
                      <button
                        onClick={handleWhatsAppClick}
                        className="w-9 h-9 rounded-full bg-emerald-600 border border-emerald-500 flex items-center justify-center text-white hover:bg-emerald-700 transition-all shadow-sm"
                        title="WhatsApp Concierge"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Left Links */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6 bg-white/80 backdrop-blur-md px-5 py-2 rounded-full border border-[#C2D0C0] shadow-sm">
              {links.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setShopDropdownOpen(true)}
                      onMouseLeave={() => setShopDropdownOpen(false)}
                    >
                      <button
                        onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                        className="text-xs xl:text-sm font-bold text-[#222831] hover:text-[#435B47] transition-colors flex items-center gap-1 py-0.5"
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            'w-3.5 h-3.5 text-[#86A386] transition-transform duration-200',
                            shopDropdownOpen && 'rotate-180'
                          )}
                        />
                      </button>

                      {/* Dropdown Card on #F3EDE2 Surface */}
                      {shopDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-[340px] bg-[#F3EDE2] border border-[#C2D0C0] rounded-3xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                          <div className="p-2 border-b border-[#C2D0C0] mb-2 flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#435B47]">
                              Curated Categories
                            </span>
                            <span className="text-[10px] text-[#222831]/60">Atelier Selection</span>
                          </div>

                          <div className="space-y-1">
                            {shopCategories.map((cat) => (
                              <Link
                                key={cat.name}
                                href={cat.href}
                                onClick={() => setShopDropdownOpen(false)}
                                className="block p-2.5 rounded-2xl hover:bg-[#C2D0C0]/40 transition-all group border border-transparent hover:border-[#86A386]"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-[#222831] group-hover:text-[#435B47] transition-colors">
                                    {cat.name}
                                  </span>
                                  <ArrowRight className="w-3.5 h-3.5 text-[#435B47] opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                                </div>
                                <p className="text-[10px] text-[#222831]/70 line-clamp-1 mt-0.5 font-light">
                                  {cat.description}
                                </p>
                              </Link>
                            ))}
                          </div>

                          <div className="mt-3 pt-2 border-t border-[#C2D0C0] text-center">
                            <Link
                              href="/collections"
                              onClick={() => setShopDropdownOpen(false)}
                              className="inline-block text-[11px] font-bold text-[#435B47] hover:underline"
                            >
                              Explore All Collections &rarr;
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs xl:text-sm font-bold text-[#222831] hover:text-[#435B47] transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CENTER: Dead-Centered Brand Logo in Deep Forest Green #435B47 */}
          <div className="flex items-center justify-center text-center -ml-1 sm:ml-0">
            <Link href="/" className="flex items-center justify-center gap-1.5 shrink-0 group">
              <span className="text-base sm:text-2xl lg:text-3xl font-serif font-bold text-[#435B47] tracking-[0.1em] sm:tracking-[0.2em] group-hover:text-[#354938] transition-colors text-center whitespace-nowrap">
                L’AVENIR
              </span>
            </Link>
          </div>

          {/* RIGHT: Utility Icons Toolbar */}
          <div className="h-12 flex items-center justify-end gap-1.5 sm:gap-4 shrink-0">
            {/* Shop the Look Quick Button */}
            <button
              onClick={() => setShopTheLookOpen(true)}
              className="hidden xl:flex h-9 px-3.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white border border-[#435B47] text-xs font-bold items-center gap-1.5 transition-all shadow-sm hover:scale-105 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{t('nav.shopLook')}</span>
            </button>

            {/* Settings Trigger */}
            <button
              aria-label="Settings"
              onClick={() => setSettingsOpen(true)}
              className="hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 items-center justify-center rounded-full bg-white hover:bg-[#F3EDE2] text-[#435B47] border border-[#C2D0C0] transition-all shadow-sm hover:scale-105 shrink-0"
              title={t('nav.settings')}
            >
              <SettingsIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Search Trigger */}
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white hover:bg-[#F3EDE2] text-[#435B47] border border-[#C2D0C0] transition-all shadow-sm hover:scale-105 shrink-0"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Wishlist Trigger */}
            <button
              aria-label="Wishlist"
              onClick={handleWishlistClick}
              className="hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 items-center justify-center rounded-full bg-white hover:bg-[#F3EDE2] text-[#435B47] border border-[#C2D0C0] transition-all shadow-sm hover:scale-105 relative shrink-0"
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {user && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#86A386] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              aria-label="Cart"
              onClick={handleCartClick}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold transition-all shadow-md hover:scale-105 border border-[#435B47] relative shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {user && totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#86A386] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* User Profile / Auth Trigger with Dynamic Extracted Name */}
            <div className="relative shrink-0 flex items-center">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="h-9 flex items-center gap-2 pl-0.5 pr-2.5 rounded-full bg-white hover:bg-[#F3EDE2] text-[#222831] border border-[#C2D0C0] transition-all shadow-sm shrink-0"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#435B47] text-white flex items-center justify-center text-sm font-semibold border border-[#86A386] shrink-0 overflow-hidden">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                      ) : (
                        <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                      )}
                    </div>
                    <span className="hidden md:inline-block text-xs font-medium text-[#222831] truncate max-w-[100px]">
                      {user.name ? user.name.split(' ')[0] : 'Account'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#222831]/60 hidden sm:inline-block shrink-0" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-[#F3EDE2] border border-[#C2D0C0] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-3 py-2 border-b border-[#C2D0C0]">
                        <p className="text-xs font-bold text-[#435B47] truncate">{user.name}</p>
                        <p className="text-[10px] text-[#222831]/60 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setWishlistOpen(true);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-[#222831] hover:bg-[#C2D0C0]/30 rounded-xl flex items-center gap-2 mt-1 transition-colors sm:hidden"
                      >
                        <Heart className="w-3.5 h-3.5 text-[#435B47]" />
                        <span>Wishlist ({wishlist.length})</span>
                      </button>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setSettingsOpen(true);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-[#222831] hover:bg-[#C2D0C0]/30 rounded-xl flex items-center gap-2 mt-1 transition-colors"
                      >
                        <SettingsIcon className="w-3.5 h-3.5 text-[#435B47]" />
                        <span>Preferences ({currencySymbol})</span>
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-500/10 rounded-xl flex items-center gap-2 transition-colors mt-1 font-semibold"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-600" />
                        <span>{t('nav.signOut')}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold text-xs transition-all shadow-sm hover:scale-105 border border-[#435B47] shrink-0"
                >
                  <User className="w-3.5 h-3.5 text-white" />
                  <span>{t('nav.signIn')}</span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Interactive Search Modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-xl bg-[#F3EDE2] text-[#222831] border border-[#C2D0C0] p-6 rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif text-[#435B47]">Search Luxury Catalog</DialogTitle>
          </DialogHeader>

          <div className="mt-3 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jackets, silk dresses, cashmere, trousers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#C2D0C0] rounded-2xl px-4 py-3 pl-11 text-sm text-[#222831] placeholder:text-[#222831]/50 focus:outline-none focus:border-[#435B47]"
              />
              <Search className="w-4 h-4 text-[#222831]/50 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-[#222831]/60 font-medium">
                {searchQuery ? 'Matching Products' : 'Featured Recommendations'}
              </p>
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                {filteredSearch.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedProduct(item);
                      setSearchOpen(false);
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white hover:bg-[#C2D0C0]/30 transition-colors border border-[#C2D0C0] cursor-pointer"
                  >
                    <div className="relative w-10 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="40px"
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-[#222831] truncate">{item.name}</p>
                      <p className="text-[10px] text-[#435B47] font-semibold">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

