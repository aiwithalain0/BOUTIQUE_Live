'use client';

import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail, ArrowRight, HelpCircle, RotateCcw, Sparkles, Ruler, Building } from 'lucide-react';
import { useState } from 'react';
import { useShop } from '@/context/ShopContext';

const sitemap = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', href: '/collections' },
      { label: 'Women', href: '/collections?category=Women' },
      { label: 'Men', href: '/collections?category=Men' },
      { label: 'Accessories', href: '/collections?category=Accessories' },
      { label: 'Sustainable Line', href: '/collections?category=Sustainable+Line' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const socials = [
  { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com/lavenir.atelier' },
  { Icon: Twitter, label: 'Twitter', href: 'https://twitter.com/lavenir_studio' },
  { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com/lavenir.atelier' },
  { Icon: Mail, label: 'Email', href: 'mailto:concierge@lavenir-atelier.com' },
];

export function Footer() {
  const { openCustomerService } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#435B47] text-white pt-20 pb-8 mt-24 border-t border-[#86A386]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-16">
          {/* Brand Intro */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-3xl font-serif font-bold text-white tracking-wider">L’AVENIR</h3>
            <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-sm">
              A luxury fashion boutique & digital studio crafting sustainable organic style and bespoke web experiences.
            </p>
            <div className="flex gap-3 pt-2">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#86A386] hover:text-white transition-all flex items-center justify-center text-white border border-[#C2D0C0]/30"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop & Studio Sitemap */}
          {sitemap.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-[#86A386]">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Concierge & Customer Service Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-[#86A386]">
              Customer Service
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/80">
              <li>
                <button
                  onClick={() => openCustomerService('faqs')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#86A386]" />
                  <span>FAQs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openCustomerService('returns')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#86A386]" />
                  <span>7-Day Returns</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openCustomerService('styling')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#86A386]" />
                  <span>Styling Consultation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openCustomerService('sizeGuide')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#86A386]" />
                  <span>Size Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openCustomerService('company')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Building className="w-3.5 h-3.5 text-[#86A386]" />
                  <span>Company & Legal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-[#86A386]">
              Concierge Dispatch
            </h4>
            <p className="text-xs text-white/80 mb-3">Get private collection notes in your inbox.</p>
            <form onSubmit={subscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-white/10 border border-[#C2D0C0]/40 rounded-full pl-4 pr-12 py-2.5 text-xs text-white placeholder:text-white/60 focus:outline-none focus:border-[#86A386] transition-colors"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#86A386] hover:bg-white transition-colors flex items-center justify-center text-white hover:text-[#435B47]"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-[#86A386] font-semibold mt-2 animate-fade-in">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        {/* Footer Bottom Legal Bar */}
        <div className="border-t border-[#86A386]/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/70">
          <p>© {new Date().getFullYear()} L’AVENIR Atelier & Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => openCustomerService('company')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => openCustomerService('company')} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <button onClick={() => openCustomerService('company')} className="hover:text-white transition-colors">
              Cookies Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

