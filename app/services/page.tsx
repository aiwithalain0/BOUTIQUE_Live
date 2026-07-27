'use client';

import { Reveal } from '@/components/Reveal';
import { ServiceCard } from '@/components/ServiceCard';
import { services } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-hero-glow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-brass">Digital Studio</span>
            <h1 className="text-5xl font-serif font-semibold text-charcoal mt-3 mb-6">
              Services We Craft
            </h1>
            <p className="text-lg text-slate leading-relaxed">
              From storefronts to AI stylists, we design and build the digital experiences
              that bring heritage brands to life online.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-linen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-footer-gradient rounded-3xl p-10 sm:p-14 text-center text-linen">
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">
                Ready to build something beautiful?
              </h2>
              <p className="text-linen/80 mb-8 max-w-lg mx-auto">
                Tell us about your project and we&apos;ll craft a proposal within 48 hours.
              </p>
              <Link href="/contact" className="btn-mustard">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
