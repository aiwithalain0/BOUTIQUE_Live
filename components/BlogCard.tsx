'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/trends`} className="group block h-full">
      <article className="bg-white text-[#222831] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col border border-[#C2D0C0] hover:border-[#435B47]">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EDE2]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            referrerPolicy="no-referrer"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 bg-[#435B47] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md z-10">{post.category}</span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-3 text-xs text-[#222831]/60 mb-3">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#222831] mb-2 group-hover:text-[#435B47] transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-[#222831]/80 leading-relaxed mb-4 flex-1">{post.excerpt}</p>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-[#435B47] group-hover:text-[#354938]">
            Read More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </article>
    </Link>
  );
}

