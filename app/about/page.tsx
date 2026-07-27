'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Heart, Gem } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { team } from '@/lib/data';

const milestones = [
  { year: '2018', title: 'The First Stitch', text: 'L’AVENIR opens a small atelier with three handcrafted couture pieces.' },
  { year: '2020', title: 'Sustainable Line', text: 'Launched our fully traceable, organic-material collection.' },
  { year: '2022', title: 'Digital Studio', text: 'Began designing websites and apps for fellow heritage brands.' },
  { year: '2024', title: 'Global Atelier', text: 'Now serving clients across 12 countries, both clothed and digital.' },
];

const values = [
  {
    icon: Leaf,
    title: 'Sustainability',
    text: 'Organic materials, low-impact dyes, and a fully traceable supply chain.',
  },
  {
    icon: Heart,
    title: 'Craftsmanship',
    text: 'Every piece is finished by hand in our haute couture atelier.',
  },
  {
    icon: Gem,
    title: 'Timelessness',
    text: 'We design for years, not seasons — style that outlives trends.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[#F3EDE2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#435B47]">Our Story</span>
            <h1 className="text-5xl font-serif font-semibold text-[#222831] mt-3 mb-6">
              Between Heritage and Digital Art
            </h1>
            <p className="text-lg text-[#222831]/80 leading-relaxed">
              L’AVENIR was born from a love of timeless luxury and modern craft. We design
              couture clothing and build digital experiences for brands that value quality
              over quantity — and style that lasts beyond a season.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-[#222831] mb-2">Our Journey</h2>
          </Reveal>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-[#435B47]/30 sm:-translate-x-1/2" />
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 100}>
                <div className={`relative flex items-center mb-8 ${i % 2 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className="hidden sm:block sm:w-1/2" />
                  <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-[#435B47] ring-4 ring-white sm:-translate-x-1/2" />
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8">
                    <div className="bg-[#F3EDE2] rounded-2xl p-5 border border-[#C2D0C0]">
                      <span className="text-[#435B47] font-serif text-xl font-semibold">{m.year}</span>
                      <h3 className="font-serif text-lg text-[#222831] mt-1">{m.title}</h3>
                      <p className="text-sm text-[#222831]/70 mt-1">{m.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#F3EDE2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-[#222831]">What We Stand For</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 text-center h-full border border-[#C2D0C0]">
                    <div className="w-14 h-14 rounded-2xl bg-[#86A386]/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[#435B47]" />
                    </div>
                    <h3 className="font-serif text-xl text-[#222831] mb-2">{v.title}</h3>
                    <p className="text-sm text-[#222831]/70">{v.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-[#222831] mb-2">Meet the Team</h2>
            <p className="text-[#222831]/70">The hands and minds behind L’AVENIR.</p>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <div className="text-center">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F3EDE2] mb-3 border border-[#C2D0C0]">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </div>
                  <p className="font-serif text-lg text-[#222831]">{m.name}</p>
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-[#86A386]/20 text-[#435B47] text-xs font-medium">
                    {m.role}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 bg-[#F3EDE2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-[#435B47] rounded-3xl p-10 sm:p-14 text-center text-white border border-[#86A386]">
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">
                Let&apos;s create something timeless together
              </h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                Whether it&apos;s a garment or a digital experience, we&apos;d love to hear your vision.
              </p>
              <Link href="/contact" className="px-8 py-3.5 rounded-full bg-[#86A386] hover:bg-white hover:text-[#435B47] text-white font-bold text-sm inline-flex items-center gap-2 transition-all">
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

