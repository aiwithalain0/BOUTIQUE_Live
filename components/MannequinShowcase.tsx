'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Check, Sparkles, ShieldCheck, Shirt, Eye } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useShop } from '@/context/ShopContext';
import { toast } from 'sonner';

interface ColorSwatch {
  name: string;
  hex: string;
  image: string;
}

interface MannequinSet {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  numericPrice: number;
  category: string;
  description: string;
  swatches: ColorSwatch[];
}

const mannequinSets: MannequinSet[] = [
  {
    id: 901,
    title: 'Hand-Embroidered Jacket Set',
    subtitle: 'Full-length embroidered jacket with tailored inner kurta & flared pants',
    price: '₹14,999',
    numericPrice: 14999,
    category: 'Jacket Sets & Suits',
    description: 'Precision draped standing mannequin showcase highlighting intricate zari & resham threadwork, structured shoulder pads, and fluid motion draping.',
    swatches: [
      {
        name: 'Fuchsia Pink',
        hex: '#EC4899',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Royal Blue',
        hex: '#2563EB',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Olive Green',
        hex: '#65A30D',
        image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 902,
    title: 'Royal Draped Velvet Suit & Dupatta',
    subtitle: 'Heavy micro-velvet shirt with zardozi borders & sheer organza dupatta',
    price: '₹12,999',
    numericPrice: 12999,
    category: 'Bridal & Festive Wear',
    description: 'Bespoke atelier velvet ensemble showcasing gold foil embossing, regal neckline cutouts, and handcrafted border trims.',
    swatches: [
      {
        name: 'Royal Navy',
        hex: '#1E3A8A',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Emerald Green',
        hex: '#059669',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Ruby Red',
        hex: '#DC2626',
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 903,
    title: 'Bespoke Zardozi Tailored Sherwani Set',
    subtitle: 'Classic asymmetrical crossover jacket set with churidar & brocade stole',
    price: '₹16,999',
    numericPrice: 16999,
    category: 'Jacket Sets & Suits',
    description: 'Heritage menswear tailoring displayed on atelier mannequin showcasing sharp shoulder construction, metallic dori embroidery, and regal collar.',
    swatches: [
      {
        name: 'Champagne Gold',
        hex: '#EAB308',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Midnight Charcoal',
        hex: '#374151',
        image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Slate Teal',
        hex: '#0D9488',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
];

export function MannequinShowcase() {
  const { user, setAuthModalOpen, addToCart, formatPrice, setSelectedProduct } = useShop();

  // Track active color swatch index for each mannequin set
  const [activeSwatches, setActiveSwatches] = useState<Record<number, number>>({
    901: 0,
    902: 0,
    903: 0,
  });

  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});

  const handleSwatchSelect = (setId: number, swatchIdx: number) => {
    setActiveSwatches((prev) => ({ ...prev, [setId]: swatchIdx }));
  };

  const handleQuickAdd = (set: MannequinSet) => {
    if (!user) {
      setAuthModalOpen(true);
      toast.error('Authentication required to add items or access your cart.');
      return;
    }

    const currentSwatchIdx = activeSwatches[set.id] || 0;
    const selectedSwatch = set.swatches[currentSwatchIdx];

    const productObj = {
      id: set.id * 10 + currentSwatchIdx,
      name: `${set.title} (${selectedSwatch.name})`,
      price: set.price,
      category: set.category,
      image: selectedSwatch.image,
      imageUrl: selectedSwatch.image,
      color: selectedSwatch.name,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      is7DayReturn: true,
      returnEligible: true,
      inStock: true,
      description: set.description,
      stockCount: 5,
      dateAdded: '2026-07-25',
      badges: ['Mannequin Display', '7-Day Returns'],
    };

    addToCart(productObj, 1, 'M');
    setAddedItems((prev) => ({ ...prev, [set.id]: true }));
    toast.success(`Added ${set.title} (${selectedSwatch.name}) to cart!`);

    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [set.id]: false }));
    }, 2000);
  };

  const handleQuickInspect = (set: MannequinSet) => {
    const currentSwatchIdx = activeSwatches[set.id] || 0;
    const selectedSwatch = set.swatches[currentSwatchIdx];

    const productObj = {
      id: set.id * 10 + currentSwatchIdx,
      name: `${set.title} (${selectedSwatch.name})`,
      price: set.price,
      category: set.category,
      image: selectedSwatch.image,
      imageUrl: selectedSwatch.image,
      color: selectedSwatch.name,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      is7DayReturn: true,
      returnEligible: true,
      inStock: true,
      description: set.description,
      stockCount: 5,
      dateAdded: '2026-07-25',
      badges: ['Mannequin Display', '7-Day Returns'],
    };

    setSelectedProduct(productObj);
  };

  return (
    <section className="py-16 bg-[#F3EDE2] border-b border-[#C2D0C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#86A386]/20 border border-[#86A386] text-[#435B47] text-xs font-bold uppercase tracking-widest mb-3">
            <Shirt className="w-4 h-4 text-[#435B47]" />
            <span>Standing Garment Mannequin Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#222831]">
            Real Mannequin Display & Draping
          </h2>
          <p className="text-sm sm:text-base text-[#222831]/70 mt-2 max-w-2xl mx-auto font-light">
            Observe garment tailoring, embroidery depth, and full outfit draping on standing mannequin sets. Click any color swatch to preview real-time variations.
          </p>
        </Reveal>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mannequinSets.map((set, i) => {
            const currentSwatchIdx = activeSwatches[set.id] || 0;
            const currentSwatch = set.swatches[currentSwatchIdx];
            const isAdded = !!addedItems[set.id];

            return (
              <Reveal key={set.id} delay={i * 120}>
                <div className="bg-white text-[#222831] rounded-3xl overflow-hidden border border-[#C2D0C0] shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between h-full group">
                  <div>
                    {/* Mannequin Image Box */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#F3EDE2]">
                      <Image
                        src={currentSwatch.image}
                        alt={`${set.title} in ${currentSwatch.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        referrerPolicy="no-referrer"
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                        <span className="px-3 py-1 rounded-full bg-[#435B47] text-white text-[11px] font-extrabold shadow-md">
                          Mannequin Fit
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#86A386] text-white text-[10px] font-bold shadow-md">
                          7-Day Returns
                        </span>
                      </div>

                      {/* Quick Inspect Button */}
                      <button
                        onClick={() => handleQuickInspect(set)}
                        className="absolute bottom-4 right-4 p-3 rounded-full bg-white/90 hover:bg-[#435B47] text-[#435B47] hover:text-white border border-[#C2D0C0] transition-all shadow-xl backdrop-blur-md"
                        title="Inspect Garment Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Details Body */}
                    <div className="p-6 space-y-4">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#435B47]">
                            {set.category}
                          </span>
                          <span className="text-base font-bold text-[#435B47] font-mono">
                            {formatPrice(set.numericPrice)}
                          </span>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-[#222831] mt-1">
                          {set.title}
                        </h3>
                        <p className="text-xs text-[#222831]/70 mt-1 leading-relaxed">
                          {set.subtitle}
                        </p>
                      </div>

                      {/* Interactive Swatches Section */}
                      <div className="pt-2 border-t border-[#C2D0C0] space-y-2">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-[#222831]/70 font-semibold">Color Variation:</span>
                          <span className="font-bold text-[#435B47]">{currentSwatch.name}</span>
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                          {set.swatches.map((swatch, idx) => (
                            <button
                              key={swatch.name}
                              onClick={() => handleSwatchSelect(set.id, idx)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                                currentSwatchIdx === idx
                                  ? 'bg-[#435B47] text-white border-[#435B47] shadow-md scale-105'
                                  : 'bg-[#F3EDE2] text-[#222831]/80 border-[#C2D0C0] hover:border-[#435B47]'
                              }`}
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-white/60 shrink-0"
                                style={{ backgroundColor: swatch.hex }}
                              />
                              <span>{swatch.name.split(' ')[0]}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => handleQuickAdd(set)}
                      className={`w-full py-3.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#435B47] hover:bg-[#354938] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-white" />
                          <span>Quick Add to Cart ({currentSwatch.name.split(' ')[0]})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

