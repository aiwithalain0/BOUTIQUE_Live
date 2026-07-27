'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { SafeImage } from '@/components/SafeImage';

export function WishlistDrawer() {
  const { wishlist, wishlistOpen, setWishlistOpen, toggleWishlist, addToCart, setSelectedProduct, formatPrice, t } = useShop();

  return (
    <Dialog open={wishlistOpen} onOpenChange={setWishlistOpen}>
      <DialogContent className="max-w-xl bg-[#F3EDE2] text-[#222831] border border-[#C2D0C0] p-6 rounded-3xl max-h-[85vh] overflow-y-auto scrollbar-hide shadow-2xl">
        <DialogHeader className="text-left border-b border-[#C2D0C0] pb-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <DialogTitle className="text-xl font-serif font-bold text-[#222831]">
              Your Boutique Wishlist ({wishlist.length})
            </DialogTitle>
          </div>
        </DialogHeader>

        {wishlist.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-white border border-[#C2D0C0] flex items-center justify-center mx-auto text-[#222831]/40">
              <Heart className="w-8 h-8" />
            </div>
            <p className="text-sm text-[#222831]/70">Your wishlist is currently empty.</p>
            <button
              onClick={() => setWishlistOpen(false)}
              className="px-6 py-2.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white text-xs font-bold transition-all shadow-md"
            >
              Explore Catalog
            </button>
          </div>
        ) : (
          <div className="space-y-3 py-2">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-white border border-[#C2D0C0] hover:border-[#435B47] transition-all shadow-sm"
              >
                <div
                  onClick={() => {
                    setSelectedProduct(product);
                    setWishlistOpen(false);
                  }}
                  className="relative w-14 h-16 rounded-xl overflow-hidden cursor-pointer shrink-0 bg-[#F3EDE2]"
                >
                  <SafeImage
                    src={product.imageUrl || product.image}
                    alt={product.name}
                    fill
                    sizes="56px"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-[#435B47]">{product.category}</span>
                  <p
                    onClick={() => {
                      setSelectedProduct(product);
                      setWishlistOpen(false);
                    }}
                    className="text-xs font-bold text-[#222831] hover:text-[#435B47] cursor-pointer truncate"
                  >
                    {product.name}
                  </p>
                  <p className="text-sm font-serif font-bold text-[#435B47]">{formatPrice(product.price)}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      addToCart(product, 1, 'M');
                      toggleWishlist(product);
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white text-xs font-bold flex items-center gap-1 transition-all shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-white" />
                    <span className="hidden sm:inline">{t('product.addToCart')}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label="Remove item"
                    className="p-2 rounded-full hover:bg-rose-500/20 text-[#222831]/50 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

