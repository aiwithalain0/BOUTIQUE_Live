'use client';

import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { SafeImage } from '@/components/SafeImage';

export function CategoryNav({ onSelectCategory, activeCategory }: { onSelectCategory?: (category: string) => void; activeCategory?: string }) {
  const { setActiveCategory: setGlobalCategory, t } = useShop();

  const categories = [
    {
      label: t('cat.women'),
      categoryKey: 'Women',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=200&q=80',
    },
    {
      label: t('cat.men'),
      categoryKey: 'Men',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=200&q=80',
    },
    {
      label: t('cat.accessories'),
      categoryKey: 'Accessories',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80',
    },
    {
      label: t('cat.sustainable'),
      categoryKey: 'Sustainable Line',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=200&q=80',
    },
  ];

  const handleCategoryClick = (categoryKey: string) => {
    setGlobalCategory(categoryKey);
    if (onSelectCategory) {
      onSelectCategory(categoryKey);
    }
  };

  return (
    <section className="py-6 sm:py-10 bg-[#F3EDE2]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.categoryKey;
              const cardContent = (
                <>
                  <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-[#86A386] bg-white">
                    <SafeImage
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="48px"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold text-[11px] sm:text-sm text-[#222831] min-w-0 flex-1 text-left truncate leading-tight group-hover:text-[#435B47] transition-colors">
                    {cat.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#86A386] shrink-0 group-hover:translate-x-1 transition-transform" />
                </>
              );

              if (onSelectCategory) {
                return (
                  <button
                    key={cat.categoryKey}
                    onClick={() => handleCategoryClick(cat.categoryKey)}
                    className={`group flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border min-w-0 w-full overflow-hidden ${
                      isActive
                        ? 'border-[#435B47] ring-2 ring-[#86A386] bg-white'
                        : 'border-[#C2D0C0] hover:border-[#435B47]'
                    }`}
                  >
                    {cardContent}
                  </button>
                );
              }

              return (
                <Link
                  key={cat.categoryKey}
                  href={`/collections?category=${encodeURIComponent(cat.categoryKey)}`}
                  onClick={() => handleCategoryClick(cat.categoryKey)}
                  className="group flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-[#C2D0C0] hover:border-[#435B47] min-w-0 w-full overflow-hidden"
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
