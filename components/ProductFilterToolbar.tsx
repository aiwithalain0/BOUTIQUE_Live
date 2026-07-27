'use client';

import React, { useState } from 'react';
import { Filter, X, Check, RotateCcw, Sparkles, Tag, SlidersHorizontal, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/data';

export interface FilterState {
  category: string;
  priceRange: string; // 'all' | 'under2k' | '2kTo5k' | '5kTo10k' | '10kPlus'
  maxPrice: number;
  selectedColor: string; // 'all' | 'Black' | 'Charcoal' | 'White' | 'Teal' | 'Burgundy' | 'Navy' | 'Beige'
  onlyReturnEligible: boolean;
  onlyInStock: boolean;
  onlyOnSale: boolean;
  searchQuery: string;
}

export const initialFilterState: FilterState = {
  category: 'All',
  priceRange: 'all',
  maxPrice: 20000,
  selectedColor: 'all',
  onlyReturnEligible: false,
  onlyInStock: false,
  onlyOnSale: false,
  searchQuery: '',
};

interface ProductFilterToolbarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalProductsCount: number;
  filteredCount: number;
  formatPrice: (amount: number | string) => string;
}

const colors = [
  { name: 'all', label: 'All Colors', hex: 'transparent' },
  { name: 'Black', label: 'Black', hex: '#111111' },
  { name: 'Charcoal', label: 'Charcoal', hex: '#36454F' },
  { name: 'White', label: 'White', hex: '#FFFFFF' },
  { name: 'Forest Green', label: 'Forest Green', hex: '#435B47' },
  { name: 'Burgundy', label: 'Burgundy', hex: '#800020' },
  { name: 'Navy', label: 'Navy Blue', hex: '#000080' },
  { name: 'Beige', label: 'Warm Beige', hex: '#F5F5DC' },
];

const categories = ['All', 'Women', 'Men', 'Accessories & Footwear', 'Bridal & Festive', 'Sustainable Line'];

export function ProductFilterToolbar({
  filters,
  setFilters,
  totalProductsCount,
  filteredCount,
  formatPrice,
}: ProductFilterToolbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Active filter count
  const activeCount =
    (filters.category !== 'All' ? 1 : 0) +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.selectedColor !== 'all' ? 1 : 0) +
    (filters.onlyReturnEligible ? 1 : 0) +
    (filters.onlyInStock ? 1 : 0) +
    (filters.onlyOnSale ? 1 : 0) +
    (filters.searchQuery.trim() !== '' ? 1 : 0);

  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Search & Main Category Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-[#C2D0C0] shadow-md text-[#222831]">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#435B47]" />
          <input
            type="text"
            placeholder="Search gowns, silk dresses, lehengas, coats..."
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-[#F3EDE2]/60 border border-[#C2D0C0] rounded-full pl-10 pr-9 py-2 text-xs sm:text-sm text-[#222831] placeholder:text-[#222831]/50 focus:outline-none focus:border-[#435B47] transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#222831]/50 hover:text-[#222831]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Actions & Drawer Toggle */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border shadow-sm cursor-pointer',
              drawerOpen || activeCount > 0
                ? 'bg-[#435B47] text-white border-[#435B47]'
                : 'bg-[#F3EDE2] text-[#222831] border-[#C2D0C0] hover:border-[#435B47]'
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#86A386] text-white font-extrabold text-[10px] flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>

          {activeCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-500/10 transition-all border border-rose-500/30 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer',
              filters.category === cat
                ? 'bg-[#435B47] text-white border-[#435B47] shadow-md scale-105'
                : 'bg-white text-[#222831]/80 border-[#C2D0C0] hover:border-[#435B47] hover:text-[#222831]'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Expandable Filter Drawer Panel */}
      {drawerOpen && (
        <div className="bg-white text-[#222831] border border-[#C2D0C0] p-5 sm:p-6 rounded-3xl shadow-xl space-y-6 animate-fade-in text-left">
          <div className="flex items-center justify-between border-b border-[#C2D0C0] pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#435B47]" />
              <h3 className="font-serif font-bold text-base text-[#435B47]">
                Refine Boutique Selection
              </h3>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1 rounded-full text-[#222831]/60 hover:text-[#222831] hover:bg-[#F3EDE2]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Price Range Filters */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#435B47] block">
                Price Ranges
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under2k', label: `Under ${formatPrice(2000)}` },
                  { id: '2kTo5k', label: `${formatPrice(2000)} – ${formatPrice(5000)}` },
                  { id: '5kTo10k', label: `${formatPrice(5000)} – ${formatPrice(10000)}` },
                  { id: '10kPlus', label: `${formatPrice(10000)}+` },
                ].map((pr) => (
                  <button
                    key={pr.id}
                    onClick={() => setFilters((prev) => ({ ...prev, priceRange: pr.id }))}
                    className={cn(
                      'p-2.5 rounded-xl border text-left font-semibold transition-all cursor-pointer',
                      filters.priceRange === pr.id
                        ? 'bg-[#435B47] text-white border-[#435B47] font-bold shadow-md'
                        : 'bg-[#F3EDE2]/60 text-[#222831]/80 border-[#C2D0C0] hover:border-[#435B47]'
                    )}
                  >
                    {pr.label}
                  </button>
                ))}
              </div>

              {/* Slider */}
              <div className="pt-2">
                <div className="flex justify-between items-center text-[11px] text-[#222831]/70 mb-1">
                  <span>Max Price Cap:</span>
                  <span className="font-bold text-[#435B47] font-mono">{formatPrice(filters.maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={20000}
                  step={500}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-[#435B47] cursor-pointer"
                />
              </div>
            </div>

            {/* 2. Color Swatches */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#435B47] block">
                Color Swatches
              </span>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setFilters((prev) => ({ ...prev, selectedColor: c.name }))}
                    title={c.label}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer',
                      filters.selectedColor === c.name
                        ? 'bg-[#435B47] text-white border-[#435B47] font-bold shadow-md scale-105'
                        : 'bg-[#F3EDE2]/60 text-[#222831]/80 border-[#C2D0C0] hover:border-[#435B47]'
                    )}
                  >
                    {c.name !== 'all' && (
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-gray-300"
                        style={{ backgroundColor: c.hex }}
                      />
                    )}
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Special Attributes & Toggles */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#435B47] block">
                Special Attributes
              </span>

              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F3EDE2]/60 border border-[#C2D0C0] cursor-pointer hover:border-[#435B47] transition-all">
                  <input
                    type="checkbox"
                    checked={filters.onlyReturnEligible}
                    onChange={(e) => setFilters((prev) => ({ ...prev, onlyReturnEligible: e.target.checked }))}
                    className="w-4 h-4 accent-[#435B47] rounded"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#222831] flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5 text-[#435B47]" /> 7-Day Easy Returns Only
                    </span>
                    <span className="text-[10px] text-[#222831]/60 block">Show items covered by 7-day pickup policy</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F3EDE2]/60 border border-[#C2D0C0] cursor-pointer hover:border-[#435B47] transition-all">
                  <input
                    type="checkbox"
                    checked={filters.onlyInStock}
                    onChange={(e) => setFilters((prev) => ({ ...prev, onlyInStock: e.target.checked }))}
                    className="w-4 h-4 accent-[#435B47] rounded"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#222831] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#435B47]" /> Ready to Ship (In Stock)
                    </span>
                    <span className="text-[10px] text-[#222831]/60 block">Exclude items with low/out of stock</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F3EDE2]/60 border border-[#C2D0C0] cursor-pointer hover:border-[#435B47] transition-all">
                  <input
                    type="checkbox"
                    checked={filters.onlyOnSale}
                    onChange={(e) => setFilters((prev) => ({ ...prev, onlyOnSale: e.target.checked }))}
                    className="w-4 h-4 accent-[#435B47] rounded"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#222831] flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#435B47]" /> Discounted & On Sale
                    </span>
                    <span className="text-[10px] text-[#222831]/60 block">Show items with active promotional discounts</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#C2D0C0] flex items-center justify-between text-xs">
            <span className="text-[#222831]/70 font-semibold">
              Found <strong className="text-[#435B47]">{filteredCount}</strong> of {totalProductsCount} boutique items
            </span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="px-6 py-2 rounded-full bg-[#435B47] text-white font-bold hover:bg-[#354938] transition-all shadow-md cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Utility function to apply filter logic to any list of products
export function applyProductFilters(productsList: Product[], filters: FilterState): Product[] {
  return productsList.filter((p) => {
    // 1. Category (case-insensitive & trimmed matching)
    if (filters.category !== 'All') {
      const targetCat = filters.category.toLowerCase().trim();
      const pCat = p.category.toLowerCase().trim();
      const pName = p.name.toLowerCase();

      if (targetCat === 'accessories & footwear') {
        if (pCat !== 'accessories' && pCat !== 'footwear' && pCat !== 'shoes' && pCat !== 'jewelry') return false;
      } else if (targetCat === 'accessories') {
        if (pCat !== 'accessories' && pCat !== 'jewelry' && !pName.includes('bag') && !pName.includes('belt') && !pName.includes('scarf') && !pName.includes('sunglasses') && !pName.includes('necklace') && !pName.includes('earring')) return false;
      } else if (targetCat === 'footwear') {
        if (pCat !== 'footwear' && pCat !== 'shoes' && !pName.includes('shoe') && !pName.includes('boot') && !pName.includes('loafer') && !pName.includes('heel') && !pName.includes('sandal')) return false;
      } else if (targetCat === 'sustainable line') {
        if (pCat !== 'sustainable line' && !p.badges?.includes('Sustainable') && !pName.includes('organic') && !pName.includes('sustainable')) return false;
      } else if (targetCat.includes('bridal')) {
        if (!pName.includes('lehenga') && !pName.includes('gown') && !pName.includes('saree') && !pName.includes('sherwani') && !pName.includes('dupatta') && !pName.includes('ballgown') && !pCat.includes('bridal')) return false;
      } else if (targetCat.includes('festive') || targetCat.includes('jacket') || targetCat.includes('indo-western')) {
        if (pCat !== 'bridal & festive' && pCat !== 'jacket sets & indo-western' && !pCat.includes('festive') && !pCat.includes('jacket') && !pCat.includes('indo') && !pName.includes('jacket') && !pName.includes('sherwani') && !pName.includes('blazer') && !pName.includes('anarkali') && !pName.includes('kurta') && !pName.includes('co-ord') && !pName.includes('sharara')) return false;
      } else if (targetCat.includes('men') || targetCat.includes('royal')) {
        if (pCat.includes('women') || pName.includes('gown') || pName.includes('saree') || pName.includes('lehenga') || pName.includes('skirt') || pName.includes('dress') || pName.includes('blouse')) return false;
        if (pCat !== 'men’s royal ethnic' && pCat !== 'men' && !pCat.includes('men') && !pName.includes('suit') && !pName.includes('sherwani') && !pName.includes('bandhgala') && !pName.includes('tuxedo') && !pName.includes('blazer') && !pName.includes('kurta') && !pName.includes('polo')) return false;
      } else {
        if (pCat !== targetCat && !pCat.includes(targetCat) && !targetCat.includes(pCat)) return false;
      }
    }

    // 2. Numeric price calculation
    const rawPriceNum = parseInt(String(p.price).replace(/[^0-9]/g, '')) || 0;
    if (rawPriceNum > filters.maxPrice) return false;

    if (filters.priceRange === 'under2k' && rawPriceNum >= 2000) return false;
    if (filters.priceRange === '2kTo5k' && (rawPriceNum < 2000 || rawPriceNum > 5000)) return false;
    if (filters.priceRange === '5kTo10k' && (rawPriceNum < 5000 || rawPriceNum > 10000)) return false;
    if (filters.priceRange === '10kPlus' && rawPriceNum < 10000) return false;

    // 3. Color
    if (filters.selectedColor !== 'all') {
      const pColor = p.color?.toLowerCase() || '';
      const pName = p.name.toLowerCase();
      const pDesc = p.description?.toLowerCase() || '';
      const targetCol = filters.selectedColor.toLowerCase();

      let colorMatch = false;
      if (pColor) {
        const colorTokens = pColor.split(/[\s\/,\-]+/);
        colorMatch = colorTokens.includes(targetCol) || pColor.includes(targetCol);
      }
      if (!colorMatch) {
        colorMatch = pName.includes(targetCol) || pDesc.includes(targetCol);
      }

      if (!colorMatch) return false;
    }

    // 4. Return Eligible
    if (filters.onlyReturnEligible) {
      const isReturnable = p.returnEligible !== false && (rawPriceNum >= 4000 || p.badges?.includes('7-Day Returns'));
      if (!isReturnable) return false;
    }

    // 5. In Stock Only
    if (filters.onlyInStock && p.stockCount <= 0) return false;

    // 6. Discounted
    if (filters.onlyOnSale && !p.discountPercentage && !p.originalPrice) return false;

    // 7. Search query (token-based search with synonym / plural support)
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      const tokens = query.split(/\s+/).filter(Boolean);
      
      // Check if all tokens (or their stems) match the product details
      const matchesAllTokens = tokens.every((token) => {
        // Simple stemmer
        let stem = token;
        if (token.endsWith('s') && token.length > 3) {
          if (token.endsWith('ies')) {
            stem = token.slice(0, -3) + 'y';
          } else if (token.endsWith('es') && !token.endsWith('v-neck') && !token.endsWith('trench') && !token.endsWith('lace')) {
            stem = token.slice(0, -2);
          } else {
            stem = token.slice(0, -1);
          }
        }
        
        // Synonyms or alternate forms
        const isSilk = stem === 'silk';
        const isDress = stem === 'dress' || stem === 'gown' || stem === 'saree' || stem === 'lehenga';
        const isJacket = stem === 'jacket' || stem === 'blazer' || stem === 'coat' || stem === 'overcoat' || stem === 'trench';
        const isTrouser = stem === 'trouser' || stem === 'pant' || stem === 'bottom' || stem === 'skirt';
        const isKnit = stem === 'knit' || stem === 'sweater' || stem === 'turtleneck' || stem === 'cardigan' || stem === 'jumper';

        const nameLower = p.name.toLowerCase();
        const catLower = p.category.toLowerCase();
        const descLower = (p.description || '').toLowerCase();
        const colorLower = (p.color || '').toLowerCase();

        // Direct match with token or stem
        if (
          nameLower.includes(token) ||
          nameLower.includes(stem) ||
          catLower.includes(token) ||
          catLower.includes(stem) ||
          descLower.includes(token) ||
          descLower.includes(stem) ||
          colorLower.includes(token) ||
          colorLower.includes(stem)
        ) {
          return true;
        }

        // Match using synonyms / classifications
        if (isSilk && (nameLower.includes('silk') || descLower.includes('silk') || descLower.includes('satin') || nameLower.includes('satin') || nameLower.includes('mulberry'))) {
          return true;
        }
        if (isDress && (nameLower.includes('dress') || nameLower.includes('gown') || nameLower.includes('saree') || nameLower.includes('lehenga') || nameLower.includes('skirt') || catLower.includes('bridal'))) {
          return true;
        }
        if (isJacket && (nameLower.includes('jacket') || nameLower.includes('blazer') || nameLower.includes('coat') || nameLower.includes('trench') || nameLower.includes('overcoat') || nameLower.includes('suit'))) {
          return true;
        }
        if (isTrouser && (nameLower.includes('trouser') || nameLower.includes('pants') || nameLower.includes('skirt') || nameLower.includes('shorts'))) {
          return true;
        }
        if (isKnit && (nameLower.includes('knit') || nameLower.includes('sweater') || nameLower.includes('turtleneck') || nameLower.includes('cardigan') || nameLower.includes('jumper') || nameLower.includes('crewneck') || nameLower.includes('v-neck') || nameLower.includes('rollneck'))) {
          return true;
        }

        return false;
      });

      if (!matchesAllTokens) return false;
    }

    return true;
  });
}
