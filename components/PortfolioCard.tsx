'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
}

export function PortfolioCard({ item, onClick }: { item: PortfolioItem; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white text-left w-full border border-[#C2D0C0] hover:border-[#435B47]"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        referrerPolicy="no-referrer"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
        <span className="text-xs uppercase tracking-wider text-[#86A386] font-bold mb-1 block">{item.category}</span>
        <h3 className="font-serif text-xl font-semibold mb-1 text-white">{item.title}</h3>
        <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
      </div>
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#435B47] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10">
        <ArrowUpRight className="w-5 h-5 text-white" />
      </div>
    </button>
  );
}

