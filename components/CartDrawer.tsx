'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { SafeImage } from '@/components/SafeImage';

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    setCheckoutOpen,
    formattedTotalCartPrice,
    formatPrice,
    t,
  } = useShop();

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <Dialog open={cartOpen} onOpenChange={setCartOpen}>
      <DialogContent className="max-w-md bg-[#F3EDE2] text-[#222831] border border-[#C2D0C0] p-6 rounded-3xl max-h-[85vh] overflow-y-auto scrollbar-hide shadow-2xl">
        <DialogHeader className="text-left border-b border-[#C2D0C0] pb-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#435B47]" />
            <DialogTitle className="text-xl font-serif font-bold text-[#222831]">
              {t('cart.title')} ({cart.reduce((a, b) => a + b.quantity, 0)})
            </DialogTitle>
          </div>
        </DialogHeader>

        {cart.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-white border border-[#C2D0C0] flex items-center justify-center mx-auto text-[#222831]/40">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <p className="text-sm text-[#222831]/70">{t('cart.empty')}</p>
            <button
              onClick={() => setCartOpen(false)}
              className="px-6 py-2.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white text-xs font-bold transition-all shadow-md"
            >
              {t('cart.continue')}
            </button>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${idx}`}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#C2D0C0] hover:border-[#435B47] transition-all shadow-sm"
                >
                  <div className="relative w-14 h-16 rounded-xl overflow-hidden shrink-0 bg-[#F3EDE2]">
                    <SafeImage
                      src={item.product.imageUrl || item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="56px"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-bold text-[#435B47]">{item.product.category}</span>
                    <p className="text-xs font-bold text-[#222831] truncate">{item.product.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-serif font-bold text-[#435B47]">
                        {formatPrice(item.product.price)}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F3EDE2] text-[#222831]/80 font-bold border border-[#C2D0C0]">
                        Size: {item.selectedSize}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="text-[#222831]/40 hover:text-rose-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-[#F3EDE2] border border-[#C2D0C0] rounded-lg p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, -1)}
                        className="p-1 hover:bg-white rounded text-[#222831]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1 text-[#222831]">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, 1)}
                        className="p-1 hover:bg-white rounded text-[#222831]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal & Checkout */}
            <div className="pt-4 border-t border-[#C2D0C0] space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-[#222831]/80">{t('cart.subtotal')}:</span>
                <span className="text-xl font-serif font-bold text-[#435B47]">
                  {formattedTotalCartPrice}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold text-sm transition-all shadow-xl hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <span>{t('cart.checkout')}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

