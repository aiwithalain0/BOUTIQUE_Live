'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            'rounded-2xl overflow-hidden transition-all duration-300 border border-white/5',
            open === i ? 'bg-[#393E46] text-[#EEEEEE] shadow-xl border-white/10' : 'bg-[#222831]/80 text-[#EEEEEE] hover:bg-[#393E46]/60'
          )}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <span className="font-medium text-[#EEEEEE]">{item.question}</span>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-[#00ADB5] transition-transform duration-300 flex-shrink-0 ml-4',
                open === i && 'rotate-180'
              )}
            />
          </button>
          <div
            className={cn(
              'grid transition-all duration-300',
              open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            )}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-5 text-[#EEEEEE]/80 leading-relaxed text-sm">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
