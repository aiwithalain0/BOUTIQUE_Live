'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white text-[#222831] rounded-2xl p-6 shadow-xl border border-[#C2D0C0] hover:border-[#435B47] transition-all duration-300 h-full flex flex-col">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={i < testimonial.rating ? 'w-4 h-4 fill-[#435B47] text-[#435B47]' : 'w-4 h-4 text-[#C2D0C0]'}
          />
        ))}
      </div>
      <p className="text-[#222831]/90 leading-relaxed mb-6 flex-1 italic">&quot;{testimonial.quote}&quot;</p>
      <div className="flex items-center gap-3 pt-4 border-t border-[#C2D0C0]">
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#86A386]">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            sizes="48px"
            referrerPolicy="no-referrer"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-[#222831] text-sm">{testimonial.name}</p>
          <p className="text-xs text-[#435B47] font-medium">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

