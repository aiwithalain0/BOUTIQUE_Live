'use client';

import { Reveal } from '@/components/Reveal';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#00ADB5]">
              Legal & Privacy
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#EEEEEE] mb-6">
            Privacy Policy
          </h1>

          <p className="text-sm text-[#EEEEEE]/70 mb-8 border-b border-white/10 pb-6">
            Effective Date: July 26, 2026 | L’AVENIR Studio & Atelier
          </p>

          <div className="space-y-8 text-[#EEEEEE]/85 text-sm leading-relaxed">
            <section className="bg-[#393E46] p-6 rounded-2xl border border-white/10">
              <h2 className="text-lg font-serif font-semibold text-[#EEEEEE] mb-3">1. Information We Collect</h2>
              <p>
                When you visit L’AVENIR or interact with our digital atelier, we collect information you explicitly provide (such as contact details, atelier appointment requests, and cart selections) and automated technical diagnostic data necessary for optimizing application performance.
              </p>
            </section>

            <section className="bg-[#393E46] p-6 rounded-2xl border border-white/10">
              <h2 className="text-lg font-serif font-semibold text-[#EEEEEE] mb-3">2. How We Use Your Data</h2>
              <p>
                Your personal details are strictly utilized to process your boutique orders, deliver personalized style recommendations, manage bespoke fitting consultations, and refine our user interface. We never sell or transfer your private data to third-party advertisers.
              </p>
            </section>

            <section className="bg-[#393E46] p-6 rounded-2xl border border-white/10">
              <h2 className="text-lg font-serif font-semibold text-[#EEEEEE] mb-3">3. Data Security & Encryption</h2>
              <p>
                All account sessions and payment workflows employ industry-standard SSL encryption and multi-layer authentication safeguards.
              </p>
            </section>

            <section className="bg-[#393E46] p-6 rounded-2xl border border-white/10">
              <h2 className="text-lg font-serif font-semibold text-[#EEEEEE] mb-3">4. Contact Concierge</h2>
              <p>
                For privacy inquiries or data removal requests, please email our concierge desk at{' '}
                <a href="mailto:concierge@lavenir-atelier.com" className="text-[#00ADB5] underline">
                  concierge@lavenir-atelier.com
                </a>.
              </p>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
