'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useShop } from '@/context/ShopContext';
import { SafeImage } from '@/components/SafeImage';

const bridalSlides = [
  {
    id: 1,
    title: 'Royal Ivory & Crimson Wedding Gown',
    subtitle: 'Organza Silhouette with French Lace Draping',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    discount: '30% OFF',
    code: 'BRIDAL30',
    ctaLink: '/collections?category=Bridal%20%26%20Festive',
    category: 'Bridal & Festive',
  },
  {
    id: 2,
    title: 'Empress Zardozi Velvet Heritage Lehenga',
    subtitle: 'Deep Crimson Velvet with Hand-Embroidered Metallic Gold Threading',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80',
    discount: '35% OFF',
    code: 'EMPRESS35',
    ctaLink: '/collections?category=Bridal%20%26%20Festive',
    category: 'Bridal & Festive',
  },
  {
    id: 3,
    title: 'Ethereal Rose Gold Pastel Anarkali Set',
    subtitle: 'Chiffon Silk with Handcrafted Pearl & Crystal Embellishments',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80',
    discount: '25% OFF',
    code: 'ROSE25',
    ctaLink: '/collections?category=Bridal%20%26%20Festive',
    category: 'Bridal & Festive',
  },
];

export function BridalBanner() {
  const { setActiveCategory } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bridalSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = bridalSlides[currentSlide];

  return (
    <section className="relative w-full bg-[#FFFFFF] py-12 sm:py-16 border-y border-[#C2D0C0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-[#C2D0C0] shadow-2xl bg-[#F3EDE2]">
            {/* Background Image Carousel */}
            <div className="relative h-[480px] sm:h-[520px] w-full overflow-hidden">
              <SafeImage
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                referrerPolicy="no-referrer"
                className="object-cover transition-all duration-1000 scale-105"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent sm:w-2/3" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Content Panel */}
              <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-center max-w-xl z-10 text-left">
                {/* Prominent Luxury Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#86A386] text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-lg mb-4 w-fit border border-[#86A386]">
                  <Tag className="w-4 h-4 text-white" />
                  <span>EXCLUSIVE BRIDAL COLLECTION - {slide.discount}</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight mb-3 drop-shadow-md">
                  {slide.title}
                </h2>

                <p className="text-sm sm:text-base text-white/90 mb-6 font-light leading-relaxed drop-shadow">
                  {slide.subtitle}. Enjoy complimentary bespoke fitting and 7-day easy doorstep returns on all bridal orders.
                </p>

                {/* Voucher pill */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="px-3.5 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-xs font-mono font-bold text-white">
                    Code: <span className="text-[#86A386] font-extrabold">{slide.code}</span>
                  </div>
                  <span className="text-xs text-white/80 font-medium">Applied automatically at checkout</span>
                </div>

                {/* Interactive CTA */}
                <div className="flex items-center gap-4">
                  <Link
                    href={slide.ctaLink}
                    onClick={() => setActiveCategory(slide.category)}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold text-sm transition-all duration-300 shadow-2xl hover:scale-105 border border-[#86A386]"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Shop Bridal Couture</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>

                  <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-white bg-black/40 backdrop-blur-md px-4 py-3 rounded-full border border-white/20">
                    <ShieldCheck className="w-4 h-4 text-[#86A386]" />
                    <span>7-Day Easy Returns</span>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? bridalSlides.length - 1 : prev - 1))}
                  aria-label="Previous bridal slide"
                  className="p-2.5 rounded-full bg-black/60 hover:bg-[#435B47] text-white border border-white/30 transition-all backdrop-blur-md"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1.5 px-2">
                  {bridalSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentSlide ? 'w-6 bg-[#86A386]' : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % bridalSlides.length)}
                  aria-label="Next bridal slide"
                  className="p-2.5 rounded-full bg-black/60 hover:bg-[#435B47] text-white border border-white/30 transition-all backdrop-blur-md"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

