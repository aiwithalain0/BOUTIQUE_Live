'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ShoppingBag, Sparkles, Check } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { shopTheLookOutfit } from '@/lib/data';
import { SafeImage } from '@/components/SafeImage';

export function ShopTheLookModal() {
  const { shopTheLookOpen, setShopTheLookOpen, addToCartMultiple, formatPrice, t } = useShop();
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({
    101: 'S',
    103: 'S',
    104: 'M',
    37: '39',
  });
  const [added, setAdded] = useState(false);

  const handleSizeChange = (id: number, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const handleAddAllToCart = () => {
    const itemsToAdd = shopTheLookOutfit.items.map((item) => ({
      product: item,
      quantity: 1,
      size: selectedSizes[item.id] || 'M',
    }));
    addToCartMultiple(itemsToAdd);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setShopTheLookOpen(false);
    }, 1200);
  };

  const formattedTotal = formatPrice(shopTheLookOutfit.totalPrice);
  const formattedDiscounted = formatPrice(shopTheLookOutfit.discountedPrice);

  return (
    <Dialog open={shopTheLookOpen} onOpenChange={setShopTheLookOpen}>
      <DialogContent className="max-w-3xl bg-[#F3EDE2] text-[#222831] border border-[#C2D0C0] p-6 sm:p-8 rounded-3xl max-h-[90vh] overflow-y-auto scrollbar-hide shadow-2xl">
        <DialogHeader className="text-left border-b border-[#C2D0C0] pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#86A386]/20 border border-[#86A386] text-[#435B47] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Outfit Builder</span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-serif font-bold text-[#222831]">
            {shopTheLookOutfit.title}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-[#222831]/70">
            {shopTheLookOutfit.description}
          </DialogDescription>
        </DialogHeader>

        {/* Outfit Preview Grid */}
        <div className="grid md:grid-cols-12 gap-6 my-4">
          {/* Main Look Photo */}
          <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-[#C2D0C0] shadow-2xl aspect-[3/4] bg-white">
            <SafeImage
              src={shopTheLookOutfit.image}
              alt={shopTheLookOutfit.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/90 backdrop-blur-md rounded-xl border border-[#C2D0C0]">
              <span className="text-[10px] uppercase font-bold text-[#435B47]">{shopTheLookOutfit.savings}</span>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-[#222831]/60 line-through">{formattedTotal}</span>
                <span className="text-lg font-serif font-bold text-[#435B47]">{formattedDiscounted}</span>
              </div>
            </div>
          </div>

          {/* Individual Items List */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#222831]/70 flex items-center justify-between border-b border-[#C2D0C0] pb-2">
              <span>Included Look Pieces ({shopTheLookOutfit.items.length})</span>
              <span className="text-[#435B47]">1-Click Complete Bundle</span>
            </h4>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {shopTheLookOutfit.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white border border-[#C2D0C0] hover:border-[#435B47] transition-colors shadow-sm"
                >
                  <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 bg-[#F3EDE2]">
                    <SafeImage
                      src={item.imageUrl || item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-[#222831] truncate">{item.name}</p>
                    <p className="text-[11px] text-[#435B47] font-bold">{formatPrice(item.price)}</p>
                  </div>

                  {/* Size Selector */}
                  <div className="shrink-0">
                    <select
                      value={selectedSizes[item.id] || 'M'}
                      onChange={(e) => handleSizeChange(item.id, e.target.value)}
                      className="bg-[#F3EDE2] text-[#222831] text-xs border border-[#C2D0C0] rounded-lg px-2 py-1 focus:outline-none focus:border-[#435B47]"
                    >
                      {item.category === 'Footwear'
                        ? ['37', '38', '39', '40', '41'].map((sz) => (
                            <option key={sz} value={sz}>
                              EU {sz}
                            </option>
                          ))
                        : ['XS', 'S', 'M', 'L', 'XL'].map((sz) => (
                            <option key={sz} value={sz}>
                              Size {sz}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Total price + Bundle Action */}
            <div className="pt-3 border-t border-[#C2D0C0] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#222831]/70">Individual Total:</span>
                <span className="text-[#222831] line-through font-semibold">{formattedTotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-[#222831]">Bundle Price (4 Pieces):</span>
                <span className="text-xl font-serif text-[#435B47] font-bold">{formattedDiscounted}</span>
              </div>

              <button
                onClick={handleAddAllToCart}
                className="w-full py-3.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold text-sm transition-all shadow-xl hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added Entire Outfit!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>Add Complete Look to Cart ({formattedDiscounted})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

