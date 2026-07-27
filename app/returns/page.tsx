'use client';

import { Reveal } from '@/components/Reveal';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="bg-[#222831] text-[#EEEEEE] min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#00ADB5] hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-[#00ADB5]/20 text-[#00ADB5] border border-[#00ADB5]/30">
              <RotateCcw className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#00ADB5]">Atelier Guarantee</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#EEEEEE] mb-4">7-Day Easy Returns Policy</h1>
          <p className="text-sm text-[#EEEEEE]/70 mb-8 border-b border-white/10 pb-6">
            Complimentary doorstep pickup for all returns and exchanges within 7 days of delivery.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-[#393E46] border border-white/10 space-y-2">
                <Truck className="w-6 h-6 text-[#00ADB5]" />
                <h3 className="font-bold text-sm text-white">1. Doorstep Pickup</h3>
                <p className="text-[#EEEEEE]/70">Schedule a pickup date from your profile or contact our concierge. Our courier collects at your convenience.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#393E46] border border-white/10 space-y-2">
                <ShieldCheck className="w-6 h-6 text-[#00ADB5]" />
                <h3 className="font-bold text-sm text-white">2. Quality Check</h3>
                <p className="text-[#EEEEEE]/70">Ensure items are unworn, unwashed, and have original security tags intact.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#393E46] border border-white/10 space-y-2">
                <CheckCircle2 className="w-6 h-6 text-[#00ADB5]" />
                <h3 className="font-bold text-sm text-white">3. Instant Refund</h3>
                <p className="text-[#EEEEEE]/70">Refunds are issued to your original payment method within 24 hours of inspection.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#393E46] border border-white/10 space-y-3 text-sm text-[#EEEEEE]/85">
              <h3 className="font-serif font-bold text-lg text-white">Return Eligibility Details</h3>
              <p>• All regular priced items from our Women, Men, Footwear, and Accessories categories are eligible.</p>
              <p>• Sustainable Line items enjoy an extended 14-day exchange period.</p>
              <p>• Custom bespoke tailored items are subject to alteration support rather than full refund.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
