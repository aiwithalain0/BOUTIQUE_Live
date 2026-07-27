'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useShop, CurrencyType, ThemeType, LanguageType } from '@/context/ShopContext';
import { Settings, Sun, Moon, Monitor, DollarSign, Bell, Globe, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsModal() {
  const {
    settingsOpen,
    setSettingsOpen,
    currency,
    setCurrency,
    theme,
    setTheme,
    notifications,
    setNotifications,
    language,
    setLanguage,
  } = useShop();

  const currencies: { id: CurrencyType; label: string; symbol: string }[] = [
    { id: 'INR', label: 'Indian Rupee', symbol: '₹' },
    { id: 'USD', label: 'US Dollar', symbol: '$' },
    { id: 'EUR', label: 'Euro', symbol: '€' },
    { id: 'GBP', label: 'British Pound', symbol: '£' },
    { id: 'JPY', label: 'Japanese Yen', symbol: '¥' },
  ];

  const languages: { id: LanguageType; label: string; native: string }[] = [
    { id: 'en', label: 'English', native: 'English (US)' },
    { id: 'ja', label: 'Japanese', native: '日本語' },
    { id: 'fr', label: 'French', native: 'Français' },
    { id: 'es', label: 'Spanish', native: 'Español' },
    { id: 'hi', label: 'Hindi', native: 'हिंदी' },
  ];

  const handleCurrencyChange = (c: CurrencyType) => {
    setCurrency(c);
    toast.success(`Currency switched to ${c}`);
  };

  const handleThemeChange = (t: ThemeType) => {
    setTheme(t);
    toast.success(`Theme updated to ${t.charAt(0).toUpperCase() + t.slice(1)}`);
  };

  const handleLanguageChange = (l: LanguageType) => {
    setLanguage(l);
    toast.success(`Language set to ${languages.find((lang) => lang.id === l)?.label}`);
  };

  return (
    <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
      <DialogContent className="max-w-md w-[92vw] sm:w-full bg-[#393E46] border border-white/15 text-[#EEEEEE] p-0 overflow-hidden rounded-3xl shadow-2xl">
        <div className="bg-[#222831] p-6 text-center border-b border-white/10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ADB5]/20 text-[#00ADB5] border border-[#00ADB5]/40 text-xs font-bold uppercase tracking-widest mb-1">
            <Settings className="w-3.5 h-3.5 text-[#00ADB5]" />
            <span>Preferences</span>
          </div>
          <DialogTitle className="text-2xl font-serif font-bold text-[#EEEEEE]">
            Boutique Settings
          </DialogTitle>
          <DialogDescription className="text-xs text-[#EEEEEE]/70 mt-1">
            Customize display theme, display currency & notifications
          </DialogDescription>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Theme Customization */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#00ADB5] flex items-center gap-2 mb-3">
              <Sun className="w-4 h-4 text-[#00ADB5]" />
              <span>Theme Customization</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleThemeChange('dark')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
                  theme === 'dark'
                    ? 'bg-[#00ADB5] text-[#222831] border-[#00ADB5] shadow-md'
                    : 'bg-[#222831] text-[#EEEEEE]/70 border-white/10 hover:bg-white/10'
                }`}
              >
                <Moon className="w-4 h-4 mb-1.5" />
                <span>Dark Luxury</span>
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange('light')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
                  theme === 'light'
                    ? 'bg-[#00ADB5] text-[#222831] border-[#00ADB5] shadow-md'
                    : 'bg-[#222831] text-[#EEEEEE]/70 border-white/10 hover:bg-white/10'
                }`}
              >
                <Sun className="w-4 h-4 mb-1.5" />
                <span>Soft Ivory</span>
              </button>
              <button
                type="button"
                onClick={() => handleThemeChange('auto')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
                  theme === 'auto'
                    ? 'bg-[#00ADB5] text-[#222831] border-[#00ADB5] shadow-md'
                    : 'bg-[#222831] text-[#EEEEEE]/70 border-white/10 hover:bg-white/10'
                }`}
              >
                <Monitor className="w-4 h-4 mb-1.5" />
                <span>System Auto</span>
              </button>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* Currency Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#00ADB5] flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-[#00ADB5]" />
              <span>Display Currency</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {currencies.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleCurrencyChange(c.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    currency === c.id
                      ? 'bg-[#00ADB5] text-[#222831] border-[#00ADB5] shadow-md'
                      : 'bg-[#222831] text-[#EEEEEE]/80 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="truncate">{c.label} ({c.symbol})</span>
                  {currency === c.id && <Check className="w-3.5 h-3.5 text-[#222831] shrink-0 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* Preferences: Notification Toggles */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#00ADB5] flex items-center gap-2 mb-3">
              <Bell className="w-4 h-4 text-[#00ADB5]" />
              <span>Notifications & Alerts</span>
            </label>
            <div className="space-y-3 bg-[#222831]/60 p-4 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#EEEEEE]">Order Tracking Updates</p>
                  <p className="text-[10px] text-[#EEEEEE]/60">SMS & WhatsApp status alerts</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setNotifications((prev) => ({ ...prev, orderUpdates: !prev.orderUpdates }))
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    notifications.orderUpdates ? 'bg-[#00ADB5]' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      notifications.orderUpdates ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="border-t border-white/5 pt-2 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#EEEEEE]">VIP Drops & Invites</p>
                  <p className="text-[10px] text-[#EEEEEE]/60">Exclusive private trunk show alerts</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setNotifications((prev) => ({ ...prev, promoOffers: !prev.promoOffers }))
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    notifications.promoOffers ? 'bg-[#00ADB5]' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      notifications.promoOffers ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* Language Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#00ADB5] flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-[#00ADB5]" />
              <span>Boutique Language</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => handleLanguageChange(l.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all ${
                    language === l.id
                      ? 'bg-[#00ADB5] text-[#222831] border-[#00ADB5] shadow-md'
                      : 'bg-[#222831] text-[#EEEEEE]/80 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span>{l.native}</span>
                  {language === l.id && <Check className="w-4 h-4 text-[#222831]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#222831] border-t border-white/10 text-center">
          <button
            type="button"
            onClick={() => setSettingsOpen(false)}
            className="w-full py-2.5 rounded-xl bg-[#00ADB5] hover:bg-[#008B92] text-[#222831] text-xs font-bold transition-all"
          >
            Save & Close Preferences
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
