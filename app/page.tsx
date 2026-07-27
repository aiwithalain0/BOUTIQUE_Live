'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, LayoutGrid, Shirt, PanelTop, Footprints, Sparkles, ShoppingBag, Check, Layers } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { BridalBanner } from '@/components/BridalBanner';
import { MannequinShowcase } from '@/components/MannequinShowcase';
import { CategoryNav } from '@/components/CategoryNav';
import { ProductCard } from '@/components/ProductCard';
import { ServiceCard } from '@/components/ServiceCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { FAQAccordion } from '@/components/FAQAccordion';
import { ContactForm } from '@/components/ContactForm';
import { Reveal } from '@/components/Reveal';
import { products, newArrivals, shopTheLookOutfit, services, testimonials, faqs, team, portfolio, curatedCombos, CuratedCombo } from '@/lib/data';
import { PortfolioCard } from '@/components/PortfolioCard';
import { useShop } from '@/context/ShopContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const subFilters = [
  { label: 'All', icon: LayoutGrid },
  { label: 'Dresses', icon: Shirt },
  { label: 'Knitwear', icon: Shirt },
  { label: 'Outerwear', icon: PanelTop },
  { label: 'Bottoms', icon: PanelTop },
  { label: 'Footwear', icon: Footprints },
  { label: 'Accessories', icon: Sparkles },
  { label: 'Sustainable Line', icon: Sparkles },
];

export default function Home() {
  const { activeCategory, setActiveCategory, setShopTheLookOpen, addToCartMultiple, formatPrice, t } = useShop();
  const [portfolioFilter, setPortfolioFilter] = useState('All');
  const [selectedPortfolio, setSelectedPortfolio] = useState<typeof portfolio[number] | null>(null);
  const [outfitAdded, setOutfitAdded] = useState(false);
  const [addedCombos, setAddedCombos] = useState<Record<string, boolean>>({});

  const handleCategorySelect = (catKey: string) => {
    setActiveCategory(catKey);
    const elem = document.getElementById('products-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddOutfitDirect = () => {
    const itemsToAdd = shopTheLookOutfit.items.map((item) => ({
      product: item,
      quantity: 1,
      size: 'M',
    }));
    addToCartMultiple(itemsToAdd);
    setOutfitAdded(true);
    setTimeout(() => setOutfitAdded(false), 2000);
  };

  const handleAddCombo = (combo: CuratedCombo) => {
    const itemsToAdd = combo.items.map((item) => ({
      product: item,
      quantity: 1,
      size: 'M',
    }));
    addToCartMultiple(itemsToAdd);
    setAddedCombos((prev) => ({ ...prev, [combo.id]: true }));
    toast.success(`Added "${combo.title}" combo to cart!`);
    setTimeout(() => {
      setAddedCombos((prev) => ({ ...prev, [combo.id]: false }));
    }, 2000);
  };

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'All') return true;
    if (p.category === activeCategory) return true;

    const nameLower = p.name.toLowerCase();
    if (activeCategory === 'Dresses') return nameLower.includes('dress') || nameLower.includes('skirt');
    if (activeCategory === 'Knitwear') return nameLower.includes('knit') || nameLower.includes('turtleneck') || nameLower.includes('sweater') || nameLower.includes('crewneck') || nameLower.includes('cardigan') || nameLower.includes('v-neck') || nameLower.includes('rollneck');
    if (activeCategory === 'Outerwear') return nameLower.includes('coat') || nameLower.includes('jacket') || nameLower.includes('blazer') || nameLower.includes('suit') || nameLower.includes('overcoat') || nameLower.includes('trench') || nameLower.includes('waistcoat');
    if (activeCategory === 'Bottoms') return nameLower.includes('trouser') || nameLower.includes('pants') || nameLower.includes('skirt') || nameLower.includes('shorts');
    if (activeCategory === 'Footwear') return p.category === 'Footwear' || nameLower.includes('boot') || nameLower.includes('shoe') || nameLower.includes('loafer') || nameLower.includes('sneaker') || nameLower.includes('derby') || nameLower.includes('oxford') || nameLower.includes('heel') || nameLower.includes('flat') || nameLower.includes('mule') || nameLower.includes('trainer');
    if (activeCategory === 'Accessories') return p.category === 'Accessories' || nameLower.includes('bag') || nameLower.includes('tote') || nameLower.includes('belt') || nameLower.includes('scarf') || nameLower.includes('watch') || nameLower.includes('earring') || nameLower.includes('chain') || nameLower.includes('sunglasses') || nameLower.includes('hat') || nameLower.includes('cap') || nameLower.includes('beanie') || nameLower.includes('glove') || nameLower.includes('duffle') || nameLower.includes('tie');
    if (activeCategory === 'Sustainable Line') return p.category === 'Sustainable Line' || p.badges?.includes('Sustainable');

    return false;
  });

  const portfolioFilters = ['All', 'E-Commerce', 'Web App', 'Mobile App', 'AI Automations', 'CRM/ERP', 'Digital Marketing'];
  const filteredPortfolio = portfolio.filter((p) =>
    portfolioFilter === 'All' ? true : p.category === portfolioFilter
  );

  return (
    <>
      {/* Hero 3D Video Background Section */}
      <Hero />

      {/* Featured Bridal Banner Showcase (30% OFF) */}
      <BridalBanner />

      {/* Mannequin Display Showcase Section (Real Garment Standing Mannequins) */}
      <MannequinShowcase />

      {/* Category Navigation */}
      <CategoryNav onSelectCategory={handleCategorySelect} activeCategory={activeCategory} />

      {/* ── CURATED OUTFIT COMBOS SECTION ───────────────────────── */}
      <section className="py-14 bg-[#F3EDE2] border-b border-[#C2D0C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#86A386]/20 border border-[#86A386] text-[#435B47] text-xs font-bold uppercase tracking-widest mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Curated Styling</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#222831]">
              Curated Outfit Combos
            </h2>
            <p className="text-sm sm:text-base text-[#222831]/80 mt-2 max-w-2xl mx-auto font-light">
              Complete head-to-toe luxury ensembles hand-curated by our atelier stylists.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {curatedCombos.map((combo, i) => (
              <Reveal key={combo.id} delay={i * 100}>
                <div className="bg-white text-[#222831] rounded-3xl overflow-hidden border border-[#C2D0C0] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#F3EDE2]">
                      <Image
                        src={combo.image}
                        alt={combo.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        referrerPolicy="no-referrer"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#435B47] text-white text-[11px] font-bold shadow-md z-10">
                        {combo.badge}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#86A386]">
                          {combo.subtitle}
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-[#222831] mt-0.5">
                          {combo.title}
                        </h3>
                      </div>

                      <p className="text-xs text-[#222831]/80 leading-relaxed">
                        {combo.description}
                      </p>

                      {/* Items Pill Stack */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {combo.items.map((item) => (
                          <span
                            key={item.id}
                            className="text-[10px] px-2.5 py-1 rounded-full bg-[#F3EDE2] border border-[#C2D0C0] text-[#222831] font-semibold"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[#C2D0C0] mt-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-xs text-[#222831]/60 line-through font-medium">
                        Value {formatPrice(combo.originalPrice)}
                      </span>
                      <span className="text-2xl font-serif font-bold text-[#435B47]">
                        {formatPrice(combo.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddCombo(combo)}
                      className="w-full py-3.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold text-xs transition-all shadow-lg hover:scale-[1.01] flex items-center justify-center gap-2"
                    >
                      {addedCombos[combo.id] ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Added Full Combo!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-white" />
                          <span>Shop Full Combo ({formatPrice(combo.price)})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 1. NEW ARRIVALS SECTION ───────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-[#C2D0C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#86A386]/20 border border-[#86A386] text-[#435B47] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Winter 2026</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#222831]">
              New Arrivals
            </h2>
            <p className="text-sm sm:text-base text-[#222831]/80 mt-2 max-w-2xl mx-auto font-light">
              Trendy, high-fashion apparel balancing luxury aesthetics with approachable pricing tags (₹2,499 – ₹12,999).
            </p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {newArrivals.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE "SHOP THE LOOK" FEATURED BANNER ──────────────── */}
      <section className="py-14 bg-[#435B47] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/20 shadow-2xl bg-white">
              <Image
                src={shopTheLookOutfit.image}
                alt={shopTheLookOutfit.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#86A386] text-white text-xs font-bold shadow-lg flex items-center gap-1.5 z-10">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Featured Look</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-white">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C2D0C0]">
                  {shopTheLookOutfit.subtitle}
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
                  {shopTheLookOutfit.title}
                </h3>
                <p className="text-sm text-white/90 mt-3 leading-relaxed font-light">
                  {shopTheLookOutfit.description}
                </p>
              </div>

              {/* Items in outfit preview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {shopTheLookOutfit.items.map((item) => (
                  <div key={item.id} className="bg-white/10 p-2 rounded-xl border border-white/20 text-center">
                    <div className="relative w-full h-20 rounded-lg overflow-hidden mb-2 bg-white/20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="120px"
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <p className="text-[11px] font-bold text-white truncate">{item.name}</p>
                    <p className="text-[10px] text-[#C2D0C0] font-bold">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>

              {/* Pricing & Single-Click Action */}
              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-white/70 line-through block">Regular Total: {formatPrice(shopTheLookOutfit.totalPrice)}</span>
                  <span className="text-2xl font-serif font-bold text-white">
                    Outfit Price: {formatPrice(shopTheLookOutfit.discountedPrice)}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShopTheLookOpen(true)}
                    className="px-5 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/30 transition-all"
                  >
                    Customise Sizes
                  </button>

                  <button
                    onClick={handleAddOutfitDirect}
                    className="px-6 py-3 rounded-full bg-[#86A386] hover:bg-white hover:text-[#435B47] text-white font-bold text-xs transition-all shadow-xl hover:scale-105 flex items-center gap-2"
                  >
                    {outfitAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added Complete Look!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add Complete Outfit ({formatPrice(shopTheLookOutfit.discountedPrice)})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-category filter pills */}
      <section className="py-6 bg-[#F3EDE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {subFilters.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 border',
                  activeCategory === label
                    ? 'bg-[#435B47] text-white border-[#435B47] shadow-md scale-105'
                    : 'bg-white text-[#222831] border-[#C2D0C0] hover:bg-[#86A386]/20'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED COLLECTION / CATALOG GRID ───────────────────────── */}
      <section id="products-section" className="py-12 bg-[#F3EDE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-white bg-[#435B47] px-3.5 py-1.5 rounded-full shadow-sm">
              Collections Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#222831] mt-4">
              Explore All Boutique Pieces
            </h2>
            {activeCategory !== 'All' && (
              <p className="text-xs text-[#435B47] font-bold mt-2 uppercase tracking-wider">
                Category: {activeCategory} ({filteredProducts.length} items)
              </p>
            )}
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold text-sm shadow-xl hover:scale-105 transition-all"
            >
              <span>View Full Catalog ({products.length} Items)</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* Services showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#435B47]">Digital Studio</span>
            <h2 className="text-4xl font-serif font-semibold text-[#222831] mt-2">Services We Craft</h2>
            <p className="text-[#222831]/80 mt-3 max-w-xl mx-auto text-sm sm:text-base">
              Beyond fashion — we design and build the digital experiences that bring brands to life online.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio / Case studies */}
      <section className="py-16 bg-[#F3EDE2] border-t border-[#C2D0C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#435B47]">Selected Work</span>
            <h2 className="text-4xl font-serif font-semibold text-[#222831] mt-2">Portfolio & Case Studies</h2>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {portfolioFilters.map((f) => (
              <button
                key={f}
                onClick={() => setPortfolioFilter(f)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-bold transition-all border',
                  portfolioFilter === f
                    ? 'bg-[#435B47] text-white border-[#435B47] shadow-md'
                    : 'bg-white text-[#222831] border-[#C2D0C0] hover:bg-[#86A386]/20'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <PortfolioCard item={item} onClick={() => setSelectedPortfolio(item)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#435B47]">Kind Words</span>
            <h2 className="text-4xl font-serif font-semibold text-[#222831] mt-2">What Clients Say</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About preview / team */}
      <section className="py-16 bg-[#F3EDE2] border-t border-[#C2D0C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <Reveal direction="left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#435B47]">Our Story</span>
              <h2 className="text-4xl font-serif font-semibold text-[#222831] mt-2 mb-4">
                A Studio Between Heritage and Digital Art
              </h2>
              <p className="text-[#222831]/80 leading-relaxed mb-6">
                L’AVENIR was born from a passion for timeless luxury and modern design. We craft
                couture clothing and build bespoke digital experiences for brands that value precision,
                elegance, and enduring quality.
              </p>
              <Link href="/about" className="px-6 py-3 rounded-full border border-[#435B47] text-[#435B47] font-bold text-xs uppercase tracking-wider hover:bg-[#435B47] hover:text-white transition-all inline-flex items-center gap-2">
                <span>Read Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
            <Reveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                {team.map((m) => (
                  <div key={m.name} className="text-center">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-3 border border-[#C2D0C0]">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <p className="font-medium text-[#222831] text-sm">{m.name}</p>
                    <p className="text-xs text-[#222831]/70">{m.role}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#435B47]">Questions</span>
            <h2 className="text-4xl font-serif font-semibold text-[#222831] mt-2">Frequently Asked</h2>
          </Reveal>
          <Reveal>
            <FAQAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ── DEDICATED "ABOUT L’AVENIR" BRAND STORY SECTION ──────────────── */}
      <section className="py-20 bg-[#F3EDE2] border-t border-[#C2D0C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center bg-white border border-[#C2D0C0] rounded-3xl p-6 sm:p-12 shadow-xl">
            {/* Left: High-res artisan workshop photo */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C2D0C0] shadow-md bg-[#F3EDE2]">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
                alt="L’AVENIR Artisan Workshop"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#435B47]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#C2D0C0]">
                <p className="text-[11px] font-bold text-[#435B47] uppercase tracking-wider">Cotswolds Atelier & Silk Weaving</p>
                <p className="text-xs text-[#222831]/80">Hand-loomed Mulberry silk & traditional zardozi embroidery.</p>
              </div>
            </div>

            {/* Right: Rich editorial storytelling & founder quote */}
            <div className="lg:col-span-6 space-y-5 text-[#222831]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#86A386]/20 border border-[#86A386] text-[#435B47] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Heritage & Sustainability</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#435B47]">
                The Craft Behind L’AVENIR — Handcrafted Modern Heritage
              </h2>

              <p className="text-sm sm:text-base text-[#222831]/80 leading-relaxed font-light">
                Founded in the heart of the English countryside, L’AVENIR represents an uncompromising dedication to sustainable silk weaving, artisan bridal couture, and bespoke tailoring. Every garment is meticulously structured using GOTS-certified organic Mulberry silk, merino wool, and zero-waste pattern-cutting techniques that honor traditional master craftsmanship while shaping modern haute couture.
              </p>

              <blockquote className="border-l-4 border-[#435B47] pl-4 py-1 italic font-serif text-[#435B47] text-sm sm:text-base bg-[#F3EDE2]/50 rounded-r-xl">
                &ldquo;True luxury is never rushed. It lives in the quiet dedication of human hands, the integrity of sustainable threads, and garments designed to be treasured across generations.&rdquo;
                <span className="block not-italic font-sans text-xs font-bold text-[#222831]/70 mt-1">— Eleanor Vance, Creative Director</span>
              </blockquote>

              <div className="pt-2 flex flex-wrap gap-3">
                <div className="bg-[#F3EDE2] px-3.5 py-2 rounded-xl border border-[#C2D0C0] text-xs font-bold text-[#435B47]">
                  🌿 100% Organic Silk
                </div>
                <div className="bg-[#F3EDE2] px-3.5 py-2 rounded-xl border border-[#C2D0C0] text-xs font-bold text-[#435B47]">
                  ✂️ Zero-Waste Tailoring
                </div>
                <div className="bg-[#F3EDE2] px-3.5 py-2 rounded-xl border border-[#C2D0C0] text-xs font-bold text-[#435B47]">
                  🤝 Direct Artisan Wages
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="py-16 bg-[#F3EDE2] border-t border-[#C2D0C0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#435B47]">Get in Touch</span>
            <h2 className="text-4xl font-serif font-semibold text-[#222831] mt-2">Start a Project</h2>
            <p className="text-[#222831]/80 mt-3">Tell us about your vision — we&apos;ll reply within 24 hours.</p>
          </Reveal>
          <Reveal>
            <div className="bg-white text-[#222831] rounded-3xl p-6 sm:p-10 shadow-lg border border-[#C2D0C0]">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <Dialog open={!!selectedPortfolio} onOpenChange={(o) => !o && setSelectedPortfolio(null)}>
        <DialogContent className="max-w-2xl bg-[#F3EDE2] text-[#222831] border border-[#C2D0C0] rounded-3xl p-6 sm:p-8">
          {selectedPortfolio && (
            <>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white mb-4 border border-[#C2D0C0]">
                <Image
                  src={selectedPortfolio.image}
                  alt={selectedPortfolio.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif text-[#435B47] font-bold">{selectedPortfolio.title}</DialogTitle>
                <DialogDescription className="text-[#222831]/70">{selectedPortfolio.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#222831]/60 mb-1">Problem</p>
                  <p className="text-sm text-[#222831]/90">{selectedPortfolio.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#435B47] mb-1">Solution</p>
                  <p className="text-sm text-[#222831]/90">{selectedPortfolio.solution}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#86A386] mb-1">Result</p>
                  <p className="text-sm text-[#222831]/90">{selectedPortfolio.result}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

