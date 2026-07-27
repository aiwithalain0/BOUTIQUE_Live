'use client';

import { useState, useEffect } from 'react';
import { BlogCard } from '@/components/BlogCard';
import { Reveal } from '@/components/Reveal';
import { blogPosts } from '@/lib/data';
import { cn } from '@/lib/utils';

const filters = ['All', 'AI', 'Design', 'E-Commerce', 'Web Development', 'Fashion'];

export default function BlogPage() {
  const [filter, setFilter] = useState('All');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const filtered = blogPosts.filter((p) => (filter === 'All' ? true : p.category === filter));

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
        <div
          className="h-full bg-[#95271D] transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section className="pt-32 pb-12 bg-[#F9F8F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#95271D]">Journal</span>
            <h1 className="text-5xl font-serif font-semibold text-[#1A1A1A] mt-3 mb-4">
              The L’AVENIR Blog
            </h1>
            <p className="text-lg text-[#666666]">
              Notes on fashion, design, and the craft of building digital experiences.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-8 bg-[#F0ECE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  filter === f ? 'bg-[#95271D] text-white' : 'bg-white text-[#1A1A1A] border border-[#E2E8F0] hover:bg-[#95271D] hover:text-white'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <Reveal key={post.id} delay={i * 80}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
