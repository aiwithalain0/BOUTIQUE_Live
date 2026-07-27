'use client';

import { Reveal } from '@/components/Reveal';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, ChevronDown } from 'lucide-react';
import { faqs } from '@/lib/data';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#F3EDE2] text-[#222831] min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#435B47] hover:underline font-bold mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-[#86A386]/20 text-[#435B47] border border-[#86A386]">
              <HelpCircle className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#435B47]">Atelier Concierge</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#222831] mb-4">Frequently Asked Questions</h1>
          <p className="text-sm text-[#222831]/70 mb-8 border-b border-[#C2D0C0] pb-6">
            Everything you need to know about our boutique orders, custom tailoring, and 7-day return guarantee.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="border border-[#C2D0C0] rounded-2xl bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex justify-between items-center text-base font-bold text-[#222831] hover:text-[#435B47] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={cn('w-5 h-5 text-[#435B47] transition-transform', isOpen && 'rotate-180')} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-[#222831]/80 leading-relaxed border-t border-[#C2D0C0]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
