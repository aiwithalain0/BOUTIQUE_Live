'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { PortfolioCard } from '@/components/PortfolioCard';
import { portfolio } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const filters = ['All', 'E-Commerce', 'Web App', 'Mobile App', 'AI Automations', 'CRM/ERP', 'Digital Marketing'];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<typeof portfolio[number] | null>(null);

  const filtered = portfolio.filter((p) => (filter === 'All' ? true : p.category === filter));

  return (
    <>
      <section className="pt-32 pb-12 bg-[#F3EDE2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#435B47]">Selected Work</span>
            <h1 className="text-5xl font-serif font-semibold text-[#222831] mt-3 mb-4">Portfolio</h1>
            <p className="text-lg text-[#222831]/80">A selection of projects we&apos;re proud to have crafted.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  filter === f
                    ? 'bg-[#435B47] text-white shadow-md'
                    : 'bg-[#F3EDE2] text-[#222831] border border-[#C2D0C0] hover:bg-[#86A386]/20'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <PortfolioCard item={item} onClick={() => setSelected(item)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl bg-[#F3EDE2] text-[#222831] border border-[#C2D0C0] rounded-3xl p-6 sm:p-8">
          {selected && (
            <>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white mb-4 border border-[#C2D0C0]">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif text-[#222831] font-bold">{selected.title}</DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-[#222831]/70">{selected.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#435B47] mb-1">Problem</p>
                  <p className="text-sm text-[#222831]/80">{selected.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#86A386] mb-1">Solution</p>
                  <p className="text-sm text-[#222831]/80">{selected.solution}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#435B47] mb-1">Result</p>
                  <p className="text-sm text-[#222831]/80">{selected.result}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

