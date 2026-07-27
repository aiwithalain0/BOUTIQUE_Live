'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { products, Product } from '@/lib/data';
import { useShop } from '@/context/ShopContext';
import { cn } from '@/lib/utils';
import {
  ProductFilterToolbar,
  initialFilterState,
  applyProductFilters,
  FilterState,
} from '@/components/ProductFilterToolbar';

interface CollectionsClientProps {
  initialCategory: string;
}

export default function CollectionsClient({ initialCategory }: CollectionsClientProps) {
  const { formatPrice } = useShop();
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setFilters((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  let filtered: Product[] = [];
  try {
    filtered = applyProductFilters(products, filters);
  } catch (err) {
    console.error('Failed to filter products:', err);
    setError('An error occurred while filtering the boutique catalog.');
  }

  const isBridal = filters.category.toLowerCase().includes('bridal');
  const isFestive = filters.category.toLowerCase().includes('jacket') || filters.category.toLowerCase().includes('festive');

  return (
    <>
      {/* Header Banner */}
      <section className={cn(
        "pt-28 pb-12 text-white border-b transition-colors duration-500",
        isBridal ? "bg-[#5B2333] border-[#7D3145]" : isFestive ? "bg-[#3A5A40] border-[#2C4A32]" : "bg-[#435B47] border-[#354938]"
      )}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-white bg-[#86A386] px-3.5 py-1 rounded-full border border-white/20 inline-block mb-3 shadow-sm">
              {isBridal ? 'Regal Bridal Couture Atelier' : isFestive ? 'Festive Celebration Sets' : 'The Atelier Catalog'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
              {isBridal
                ? 'Royal Bridal Lehengas & Heavy Silk Gowns'
                : isFestive
                ? 'Festive Sets: Indo-Western Co-ords & Shararas'
                : 'Autumn / Winter Boutique Collection'}
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              {isBridal
                ? 'Exquisite heritage zardozi lehengas, heavily embroidered heavy silk gowns, and zari dupattas crafted for grand celebrations (₹25,000 – ₹1,500,000).'
                : isFestive
                ? 'Lighter celebration wear featuring Indo-Western co-ords, sharara sets, floral Anarkalis, and silk jackets (₹5,000 – ₹25,000).'
                : 'Explore sustainable organic Mulberry silk, merino wool knitwear, zardozi festive sets, and handcrafted accessories from our atelier.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter Toolbar & Product Grid Section */}
      <section className="py-10 bg-[#F3EDE2] min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error ? (
            <div className="text-center py-16 bg-white text-[#222831] rounded-3xl p-8 max-w-md mx-auto my-12 border border-red-200 shadow-xl">
              <p className="font-serif text-xl font-bold text-red-600 mb-2">Error Loading Catalog</p>
              <p className="text-xs text-red-600/80 mb-6">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setFilters(initialFilterState);
                }}
                className="px-6 py-3 rounded-full bg-[#435B47] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-[#354938] transition-all cursor-pointer"
              >
                Reset and Retry
              </button>
            </div>
          ) : (
            <>
              {/* Advanced Filter Toolbar */}
              <ProductFilterToolbar
                filters={filters}
                setFilters={setFilters}
                totalProductsCount={products.length}
                filteredCount={filtered.length}
                formatPrice={formatPrice}
              />

              {/* Results Summary Bar */}
              <div className="flex items-center justify-between mb-6 border-b border-[#C2D0C0] pb-4">
                <p className="text-xs sm:text-sm font-semibold text-[#222831]">
                  Showing <span className="text-white bg-[#435B47] px-2.5 py-0.5 rounded-full font-bold">{filtered.length}</span> luxury boutique pieces
                </p>
                {filtered.length < products.length && (
                  <button
                    onClick={() => setFilters(initialFilterState)}
                    className="text-xs font-bold text-[#435B47] hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {/* Grid or Empty State */}
              {filtered.length === 0 ? (
                <div className="text-center py-16 bg-white text-[#222831] rounded-3xl p-8 max-w-md mx-auto my-12 border border-[#C2D0C0] shadow-xl">
                  <p className="font-serif text-xl font-bold text-[#435B47] mb-2">No items match your selected filters.</p>
                  <p className="text-xs text-[#222831]/70 mb-6">Try broadening your price range, clearing color filters, or searching for another keyword.</p>
                  <button
                    onClick={() => setFilters(initialFilterState)}
                    className="px-6 py-3 rounded-full bg-[#435B47] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-[#354938] transition-all cursor-pointer"
                  >
                    Reset All Filters ({products.length} Items)
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filtered.map((p, i) => (
                    <Reveal key={p.id} delay={(i % 4) * 50}>
                      <ProductCard product={p} />
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
