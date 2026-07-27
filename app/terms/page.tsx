'use client';

import { Reveal } from '@/components/Reveal';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
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
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#00ADB5]">
              Terms of Service
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#EEEEEE] mb-6">
            Terms of Service
          </h1>

          <p className="text-sm text-[#EEEEEE]/70 mb-8 border-b border-white/10 pb-6">
            Effective Date: July 26, 2026 | L’AVENIR Studio & Atelier
          </p>

          <div className="space-y-8 text-[#EEEEEE]/85 text-sm leading-relaxed">
            <section className="bg-[#393E46] p-6 rounded-2xl border border-white/10">
              <h2 className="text-lg font-serif font-semibold text-[#EEEEEE] mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing L’AVENIR, you agree to abide by these Terms of Service and all applicable trade and commerce regulations governing bespoke apparel and digital web applications.
              </p>
            </section>

            <section className="bg-[#393E46] p-6 rounded-2xl border border-white/10">
              <h2 className="text-lg font-serif font-semibold text-[#EEEEEE] mb-3">2. Boutique Orders & Tailoring</h2>
              <p>
                All boutique orders and custom fitting bookings are subject to item availability and confirmation. Item pricing is displayed in INR (₹) inclusive of applicable taxes.
              </p>
            </section>

            <section className="bg-[#393E46] p-6 rounded-2xl border border-white/10">
              <h2 className="text-lg font-serif font-semibold text-[#EEEEEE] mb-3">3. Intellectual Property</h2>
              <p>
                All designs, imagery, code, brand marks, and digital assets associated with L’AVENIR remain the exclusive property of L’AVENIR Studio.
              </p>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
