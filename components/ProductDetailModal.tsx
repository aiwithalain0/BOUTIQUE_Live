'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ShoppingBag, Heart, Check, Ruler, Shirt, Info, RotateCcw, Sparkles, Layers, Flame, Plus } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { BespokeTailoringModal } from '@/components/BespokeTailoringModal';
import { products } from '@/lib/data';
import { SafeImage } from '@/components/SafeImage';

export function ProductDetailModal() {
  const { user, setAuthModalOpen, selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isInWishlist, formatPrice, t } = useShop();
  const [activeTab, setActiveTab] = useState<'overview' | 'sizeGuide' | 'fabricCare'>('overview');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Burgundy');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [added, setAdded] = useState(false);
  const [bespokeOpen, setBespokeOpen] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);

  React.useEffect(() => {
    if (selectedProduct) {
      setSelectedColor(selectedProduct.color || 'Burgundy');
      setSelectedImage(selectedProduct.imageUrl || selectedProduct.image || '');
      setSelectedSize('M');
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const wished = isInWishlist(selectedProduct.id);

  // Color swatch options with distinct image URLs
  const colorOptions = [
    { name: 'Burgundy', hex: '#6B2D5C', image: selectedProduct.imageUrl || selectedProduct.image },
    { name: 'Emerald', hex: '#2C5E43', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80' },
    { name: 'Royal Blue', hex: '#1B365D', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80' },
    { name: 'Gold', hex: '#D4AF37', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80' },
    { name: 'Ivory', hex: '#FDFBF7', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80' },
    { name: 'Charcoal', hex: '#333333', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80' },
  ];

  // Dynamic size-based pricing
  const baseNumericPrice = parseInt(String(selectedProduct.price).replace(/[^0-9]/g, '')) || 5000;
  const sizeExtra = selectedSize === 'XL' || selectedSize === 'XXL' ? 800 : selectedSize === 'L' ? 500 : selectedSize === 'M' ? 250 : 0;
  const currentAdjustedPrice = baseNumericPrice + sizeExtra;
  const formattedPrice = formatPrice(currentAdjustedPrice);

  // Cross-selling matching items for Complete the Look
  const matchingItems = products
    .filter((p) => p.id !== selectedProduct.id && (p.category === 'Accessories' || p.category === 'Footwear' || p.category === 'Jewelry'))
    .slice(0, 2);

  const handleAddToCart = () => {
    if (!user) {
      setSelectedProduct(null);
      setAuthModalOpen(true);
      toast.info('Please sign in to add items to your cart.');
      return;
    }
    const adjustedProduct = {
      ...selectedProduct,
      price: formatPrice(currentAdjustedPrice),
      color: selectedColor,
      image: selectedImage || selectedProduct.image,
      imageUrl: selectedImage || selectedProduct.imageUrl,
    };
    addToCart(adjustedProduct, 1, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlistClick = () => {
    if (!user) {
      setSelectedProduct(null);
      setAuthModalOpen(true);
      toast.info('Please sign in to save items to your wishlist.');
      return;
    }
    toggleWishlist(selectedProduct);
  };

  const handleBundleAddToCart = () => {
    if (!user) {
      setSelectedProduct(null);
      setAuthModalOpen(true);
      toast.info('Please sign in to add items to your cart.');
      return;
    }

    const adjustedProduct = {
      ...selectedProduct,
      price: formatPrice(currentAdjustedPrice),
      color: selectedColor,
      image: selectedImage || selectedProduct.image,
      imageUrl: selectedImage || selectedProduct.imageUrl,
    };

    addToCart(adjustedProduct, 1, selectedSize);
    matchingItems.forEach((item) => {
      addToCart(item, 1, 'Standard');
    });

    setBundleAdded(true);
    toast.success(`Added ${selectedProduct.name} + ${matchingItems.length} matching accessories to your cart!`);
    setTimeout(() => setBundleAdded(false), 2500);
  };

  const isShoes = selectedProduct.category === 'Footwear' || selectedProduct.category === 'Shoes';
  const sizeOptions = selectedProduct.sizes || (isShoes ? ['37', '38', '39', '40', '41'] : ['XS', 'S', 'M', 'L', 'XL']);
  const displayImageUrl = selectedImage || selectedProduct.imageUrl || selectedProduct.image;

  return (
    <>
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl bg-[#F3EDE2] text-[#222831] border border-[#C2D0C0] p-5 sm:p-8 rounded-3xl max-h-[92vh] overflow-y-auto scrollbar-hide shadow-2xl">
          <div className="grid md:grid-cols-12 gap-6 sm:gap-8">
            {/* Standing Pose Product Image */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-[#C2D0C0] aspect-[3/4] bg-white shadow-md">
              <SafeImage
                src={displayImageUrl}
                alt={selectedProduct.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                referrerPolicy="no-referrer"
                className="object-cover transition-all duration-500"
              />
              {/* Badges */}
              {selectedProduct.badges && selectedProduct.badges.length > 0 && (
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  {selectedProduct.badges.map((b) => (
                    <span
                      key={b}
                      className={cn(
                        'text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md text-white',
                        b.includes('left in stock')
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-[#435B47]'
                      )}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Details & Tabs */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#435B47]">
                    {selectedProduct.category}
                  </span>
                  {selectedProduct.stockCount && selectedProduct.stockCount <= 5 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                      <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                      Only {selectedProduct.stockCount} handcrafted left in Size {selectedSize}!
                    </span>
                  )}
                </div>

                <DialogTitle className="text-2xl sm:text-3xl font-serif font-bold text-[#222831] mt-1">
                  {selectedProduct.name}
                </DialogTitle>
                <p className="text-2xl font-serif font-bold text-[#435B47] mt-2">
                  {formattedPrice}
                </p>

                {/* 7-Day Easy Returns Guarantee Badge */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#C2D0C0] text-xs text-[#435B47] font-semibold mt-2.5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-[#435B47] shrink-0" />
                    <span>7-Day Easy Returns • Complimentary Pickup</span>
                  </div>
                  {/* Bespoke Tailoring Modal Trigger */}
                  <button
                    onClick={() => setBespokeOpen(true)}
                    className="text-[11px] font-bold text-[#435B47] hover:underline flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Custom Fits</span>
                  </button>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-[#C2D0C0] mt-4">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={cn(
                      'flex items-center gap-1.5 py-2 px-3 text-xs font-bold border-b-2 transition-colors',
                      activeTab === 'overview'
                        ? 'border-[#435B47] text-[#435B47]'
                        : 'border-transparent text-[#222831]/60 hover:text-[#222831]'
                    )}
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>{t('product.overview')}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('sizeGuide')}
                    className={cn(
                      'flex items-center gap-1.5 py-2 px-3 text-xs font-bold border-b-2 transition-colors',
                      activeTab === 'sizeGuide'
                        ? 'border-[#435B47] text-[#435B47]'
                        : 'border-transparent text-[#222831]/60 hover:text-[#222831]'
                    )}
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{t('product.sizeGuide')}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('fabricCare')}
                    className={cn(
                      'flex items-center gap-1.5 py-2 px-3 text-xs font-bold border-b-2 transition-colors',
                      activeTab === 'fabricCare'
                        ? 'border-[#435B47] text-[#435B47]'
                        : 'border-transparent text-[#222831]/60 hover:text-[#222831]'
                    )}
                  >
                    <Shirt className="w-3.5 h-3.5" />
                    <span>{t('product.fabricCare')}</span>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="py-3">
                  {activeTab === 'overview' && (
                    <div className="space-y-3">
                      <p className="text-xs text-[#222831]/80 leading-relaxed font-light">
                        {selectedProduct.description ||
                          'Handcrafted with meticulous attention to detail at our Cotswolds atelier, incorporating sustainable organic fibers and signature tailoring.'}
                      </p>

                      {/* Size Selector */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-2">
                          <span className="font-bold text-[#222831]">{t('product.selectSize')}: <span className="text-[#435B47] font-normal">(Base + Size Tier Pricing)</span></span>
                          <button
                            onClick={() => setBespokeOpen(true)}
                            className="text-[#435B47] font-bold text-[11px] hover:underline flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3" />
                            Order Custom Measurements
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sizeOptions.map((size) => (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={cn(
                                'w-9 h-9 rounded-xl font-bold text-xs transition-all border',
                                selectedSize === size
                                  ? 'bg-[#435B47] text-white border-[#435B47] shadow-md'
                                  : 'bg-white text-[#222831] border-[#C2D0C0] hover:border-[#86A386]'
                              )}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color Variation Switcher */}
                      <div className="pt-2">
                        <div className="flex justify-between items-center text-xs mb-2">
                          <span className="font-bold text-[#222831]">Color Variation: <span className="text-[#435B47]">{selectedColor}</span></span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {colorOptions.map((opt) => (
                            <button
                              key={opt.name}
                              onClick={() => {
                                setSelectedColor(opt.name);
                                if (opt.image) setSelectedImage(opt.image);
                              }}
                              className={cn(
                                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all',
                                selectedColor === opt.name
                                  ? 'bg-[#435B47] text-white border-[#435B47] shadow-sm'
                                  : 'bg-white text-[#222831] border-[#C2D0C0] hover:border-[#86A386]'
                              )}
                            >
                              <span className="w-3 h-3 rounded-full border border-white shadow-inner shrink-0" style={{ backgroundColor: opt.hex }} />
                              <span>{opt.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'sizeGuide' && (
                    <div className="space-y-2.5">
                      <p className="text-xs text-[#222831]/80 font-light">
                        {selectedProduct.sizeAndFit ||
                          'Designed for a modern tailored silhouette. Fits true to standard international sizing.'}
                      </p>

                      {/* Sizing Table */}
                      <div className="overflow-x-auto rounded-xl border border-[#C2D0C0] bg-white p-2">
                        <table className="w-full text-left text-[11px]">
                          <thead>
                            <tr className="border-b border-[#C2D0C0] text-[#435B47]">
                              <th className="p-1.5">Size</th>
                              <th className="p-1.5">Bust/Chest</th>
                              <th className="p-1.5">Waist</th>
                              <th className="p-1.5">Hips</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#C2D0C0]/50 text-[#222831]/80">
                            <tr>
                              <td className="p-1.5 font-bold text-[#222831]">S (UK 8/US 4)</td>
                              <td className="p-1.5">33 - 34&quot;</td>
                              <td className="p-1.5">25 - 26&quot;</td>
                              <td className="p-1.5">36 - 37&quot;</td>
                            </tr>
                            <tr>
                              <td className="p-1.5 font-bold text-[#222831]">M (UK 10/US 6)</td>
                              <td className="p-1.5">35 - 36&quot;</td>
                              <td className="p-1.5">27 - 28&quot;</td>
                              <td className="p-1.5">38 - 39&quot;</td>
                            </tr>
                            <tr>
                              <td className="p-1.5 font-bold text-[#222831]">L (UK 12/US 8)</td>
                              <td className="p-1.5">37 - 38&quot;</td>
                              <td className="p-1.5">29 - 30&quot;</td>
                              <td className="p-1.5">40 - 41&quot;</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'fabricCare' && (
                    <div className="space-y-3 text-xs text-[#222831]/80">
                      <div className="p-3 rounded-xl bg-white border border-[#C2D0C0] space-y-1.5">
                        <span className="font-bold text-[#435B47] uppercase tracking-wider text-[10px]">
                          Material Composition
                        </span>
                        <p className="text-[#222831]">
                          {selectedProduct.fabricAndCare ||
                            '100% Sustainable Organic Mulberry Silk & Cotswold Merino Wool.'}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-[#222831]">Care Recommendations:</span>
                        <ul className="list-disc list-inside text-[#222831]/70 space-y-1">
                          <li>Professional dry clean or cold gentle hand wash.</li>
                          <li>Do not tumble dry. Line dry flat in shade.</li>
                          <li>Cool steam iron on reverse side.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#C2D0C0] flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold text-sm transition-all shadow-xl hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-white" />
                      <span>{t('product.addToCart')} ({formattedPrice})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWishlistClick}
                  aria-label="Wishlist"
                  className={cn(
                    'w-12 h-12 rounded-full border border-[#C2D0C0] flex items-center justify-center transition-all',
                    wished
                      ? 'bg-rose-500/10 border-rose-500 text-rose-500'
                      : 'bg-white text-[#222831] hover:bg-[#F3EDE2]'
                  )}
                >
                  <Heart className={cn('w-5 h-5', wished && 'fill-rose-500 text-rose-500')} />
                </button>
              </div>
            </div>
          </div>

          {/* COMPLETE THE LOOK CROSS-SELLING MODULE */}
          {matchingItems.length > 0 && (
            <div className="mt-6 pt-6 border-t border-[#C2D0C0]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#435B47]" />
                  <h4 className="font-serif font-bold text-sm text-[#222831]">
                    Complete the Look (Curated Accessories)
                  </h4>
                </div>
                <button
                  onClick={handleBundleAddToCart}
                  className="text-xs font-bold text-[#435B47] bg-[#86A386]/20 hover:bg-[#435B47] hover:text-white px-3.5 py-1.5 rounded-full border border-[#86A386] transition-all flex items-center gap-1.5"
                >
                  {bundleAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added Outfit + Accessories!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Complete Ensemble to Cart</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {matchingItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-[#C2D0C0]"
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#C2D0C0]">
                      <SafeImage
                        src={item.imageUrl || item.image}
                        alt={item.name}
                        fill
                        sizes="50px"
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#86A386] block">
                        {item.category}
                      </span>
                      <h5 className="text-xs font-bold text-[#222831] truncate">{item.name}</h5>
                      <span className="text-xs font-mono text-[#435B47] font-semibold">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <BespokeTailoringModal open={bespokeOpen} onOpenChange={setBespokeOpen} product={selectedProduct} />
    </>
  );
}
