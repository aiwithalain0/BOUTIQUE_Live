'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, Compass } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/data';

const trendHighlights = [
  {
    id: 't1',
    title: '3D Cyber-Linen & Organic Tailoring',
    subtitle: 'Autumn / Winter 2026 Forecast',
    description: 'Crisp structured silhouettes crafted from zero-waste organic linen with 3D digital precision tailoring.',
    image: 'https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=800',
    stat: '+340% Search Volume',
    tag: '#1 Trend',
  },
  {
    id: 't2',
    title: 'Minimalist Cashmere & Sculptural Coats',
    subtitle: 'Contemporary Heritage',
    description: 'Earth-tone heavy cashmere knits and oversized trench coats rendered with refined Cotswolds aesthetics.',
    image: 'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=800',
    stat: 'High Demand',
    tag: '#2 Trend',
  },
  {
    id: 't3',
    title: 'Hand-Finished Eco Footwear & Leather',
    subtitle: 'Street Luxury',
    description: 'Handcrafted Italian leather loafers and lug-sole boots infused with refined bespoke accents.',
    image: 'https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=800',
    stat: 'Editor Pick',
    tag: '#3 Trend',
  },
];

export default function TrendsPage() {
  const trendingProducts = products.filter(
    (p) => p.badges && p.badges.some((b) => b.includes('Trending') || b.includes('New') || b.includes('Exclusive'))
  );

  return (
    <div className="bg-[#F3EDE2] text-[#222831] min-h-screen pt-28 pb-20">
      {/* Hero Banner */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-[#C2D0C0] bg-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#86A386]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#86A386]/20 border border-[#86A386] text-[#435B47] text-xs font-bold uppercase tracking-widest mb-6 shadow-md">
              <Flame className="w-4 h-4 text-[#435B47]" />
              <span>Fashion Trends & Style Radar 2026</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-serif font-bold text-[#222831] tracking-tight mb-6">
              The Style <span className="text-[#435B47]">Report</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#222831]/80 max-w-2xl font-light leading-relaxed mb-8">
              Curated trend insights, runway highlights, and trending luxury pieces direct from L’AVENIR Atelier.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/collections"
                className="px-8 py-3.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold text-sm transition-all shadow-xl hover:scale-105 flex items-center gap-2 border border-[#435B47]"
              >
                <span>Shop Trending Catalog</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <a
                href="#editorials"
                className="px-8 py-3.5 rounded-full bg-[#F3EDE2] hover:bg-[#86A386]/20 text-[#222831] font-semibold text-sm border border-[#C2D0C0] backdrop-blur-md transition-all"
              >
                Read Runway Notes
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Editorial Trend Stories */}
      <section id="editorials" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#435B47]">Key Movements</span>
              <h2 className="text-3xl font-serif font-bold text-[#222831] mt-1">2026 Editorial Forecast</h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#222831]/60">
              <Compass className="w-4 h-4 text-[#435B47]" />
              <span>Updated Weekly</span>
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {trendHighlights.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 150}>
              <div className="bg-white border border-[#C2D0C0] rounded-3xl overflow-hidden hover:border-[#435B47] transition-all duration-300 group flex flex-col h-full shadow-xl">
                <div className="relative h-64 overflow-hidden bg-[#F3EDE2]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#435B47] text-white text-xs font-bold shadow-md z-10">
                    {item.tag}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#C2D0C0] text-[#222831] text-xs font-medium z-10">
                    {item.stat}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-[#86A386]">{item.subtitle}</span>
                    <h3 className="text-xl font-serif font-bold text-[#222831] mt-1 group-hover:text-[#435B47] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#222831]/70 mt-2 leading-relaxed">{item.description}</p>
                  </div>

                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#435B47] hover:text-[#354938] transition-colors uppercase tracking-wider pt-2 border-t border-[#C2D0C0]"
                  >
                    <span>View Related Looks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trending Products Grid */}
      <section className="py-16 bg-white border-t border-b border-[#C2D0C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#435B47]">Most Wanted</span>
              <h2 className="text-4xl font-serif font-bold text-[#222831] mt-2">Trending In Store</h2>
              <p className="text-sm text-[#222831]/70 mt-2">
                Pieces with highest customer engagement and global runway demand.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingProducts.slice(0, 8).map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold text-sm transition-all shadow-xl hover:scale-105 border border-[#435B47]"
            >
              <span>Explore All {products.length} Products</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

