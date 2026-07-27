'use client';

import { useState } from 'react';
import { Heart, ShoppingBag, Check, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useShop } from '@/context/ShopContext';
import { Product } from '@/lib/data';
import { toast } from 'sonner';
import { SafeImage } from '@/components/SafeImage';

export function ProductCard({ product }: { product: Product }) {
  const { user, setAuthModalOpen, addToCart, toggleWishlist, isInWishlist, setSelectedProduct, formatPrice, t } = useShop();
  const [added, setAdded] = useState(false);

  const wished = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      setAuthModalOpen(true);
      toast.error('Authentication required to save items to your wishlist.');
      return;
    }
    toggleWishlist(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      setAuthModalOpen(true);
      toast.error('Authentication required to add items or access your cart.');
      return;
    }
    addToCart(product, 1, 'M');
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleOpenDetail = () => {
    setSelectedProduct(product);
  };

  const formattedPrice = formatPrice(product.price);
  const formattedOriginalPrice = product.originalPrice ? formatPrice(product.originalPrice) : null;
  const imageUrl = product.imageUrl || product.image;

  return (
    <div
      onClick={handleOpenDetail}
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl bg-white border border-[#C2D0C0] hover:border-[#435B47] flex flex-col justify-between"
      style={{ aspectRatio: '3/4' }}
    >
      {/* Product Image */}
      <SafeImage
        src={imageUrl}
        alt={product.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        referrerPolicy="no-referrer"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient Dark Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

      {/* Custom Badges Top Left */}
      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 flex flex-col gap-1 max-w-[75%]">
        {product.discountPercentage && (
          <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-md bg-[#86A386] text-white border border-[#86A386] self-start">
            {product.discountPercentage}
          </span>
        )}
        {product.badges &&
          product.badges
            .filter((b) => b !== product.discountPercentage)
            .slice(0, 2)
            .map((b) => (
              <span
                key={b}
                className={cn(
                  'text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-md self-start',
                  b.includes('left in stock')
                    ? 'bg-rose-600 text-white animate-pulse border border-rose-300'
                    : b.includes('Exclusive') || b === 'New' || b === 'Limited Edition'
                    ? 'bg-[#86A386] text-white border border-[#86A386]'
                    : b.includes('Bestseller') || b.includes('Trending')
                    ? 'bg-[#435B47] text-white border border-[#86A386]'
                    : 'bg-white/90 border border-[#C2D0C0] text-[#222831]'
                )}
              >
                {b}
              </span>
            ))}
      </div>

      {/* Wishlist Button Top Right */}
      <button
        aria-label="Add to wishlist"
        onClick={handleWishlist}
        className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 backdrop-blur-md border border-[#C2D0C0] flex items-center justify-center hover:bg-[#435B47] hover:text-white transition-all shadow-lg hover:scale-110"
      >
        <Heart className={cn('w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors', wished ? 'fill-rose-500 text-rose-500' : 'text-[#222831]')} />
      </button>

      {/* Mobile Tap to View Badge indicator */}
      <div className="sm:hidden absolute top-2.5 right-12 z-20">
        <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 border border-white/20">
          <Eye className="w-3 h-3 text-[#86A386]" />
          <span>Tap Pose</span>
        </span>
      </div>

      {/* Text Overlay & Quick Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20 space-y-1 text-white">
        <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#86A386] font-bold">{product.category}</p>
        <h3 className="text-white font-medium text-xs sm:text-sm leading-tight line-clamp-1 drop-shadow group-hover:text-[#86A386] transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-white/20">
          <div>
            {formattedOriginalPrice && (
              <span className="text-[9px] sm:text-[10px] text-white/60 line-through block font-mono">
                {formattedOriginalPrice}
              </span>
            )}
            <p className="text-white font-serif font-bold text-xs sm:text-base">{formattedPrice}</p>
          </div>

          <button
            onClick={handleQuickAdd}
            className={cn(
              'flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-300 shadow-md border shrink-0',
              added
                ? 'bg-[#86A386] text-white border-[#86A386]'
                : 'bg-[#435B47] hover:bg-[#354938] text-white border-[#86A386]'
            )}
          >
            {added ? (
              <>
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                <span className="hidden sm:inline">{t('product.added')}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                <span className="hidden sm:inline">{t('product.quickAdd')}</span>
                <span className="sm:hidden">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
