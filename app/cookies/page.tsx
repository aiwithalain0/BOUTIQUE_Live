'use client';

import { Reveal } from '@/components/Reveal';
import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="bg-[#222831] text-[#EEEEEE] min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#00ADB5] hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-[#00ADB5]/20 text-[#00ADB5] border border-[#00ADB5]/30">
              <Cookie className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#00ADB5]">
              Cookie Preferences
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#EEEEEE] mb-6">
            Cookie Policy
          </h1>

          <p className="text-sm text-[#EEEEEE]/70 mb-8 border-b border-white/10 pb-6">
            Effective Date: July 26, 2026 | L’AVENIR Studio & Atelier
          </p>

          <div className="space-y-8 text-[#EEEEEE]/85 text-sm leading-relaxed">
            <section className="bg-[#393E46] p-6 rounded-2xl border border-white/10">
              <h2 className="text-lg font-serif font-semibold text-[#EEEEEE] mb-3">1. Essential Cookies</h2>
              <p>
                We use functional local storage and essential session cookies to retain your cart items, authentication status, and active currency/locale choices across sessions.
              </p>
            </section>

            <section className="bg-[#393E46] p-6 rounded-2xl border border-white/10">
              <h2 className="text-lg font-serif font-semibold text-[#EEEEEE] mb-3">2. Performance & Analytics</h2>
              <p>
                Anonymized performance cookies assist in monitoring page load speeds and navigation flows to ensure a seamless browsing experience on every device.
              </p>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
