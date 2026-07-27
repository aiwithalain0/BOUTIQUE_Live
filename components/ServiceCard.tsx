'use client';

import { LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  tools?: string[];
  useCase?: string;
}

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = service.icon;
  return (
    <Reveal delay={index * 80}>
      <div className="group p-6 rounded-2xl bg-[#393E46] text-[#EEEEEE] border border-white/10 hover:border-[#00ADB5] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
        <div className="w-12 h-12 rounded-xl bg-[#00ADB5]/20 border border-[#00ADB5]/40 flex items-center justify-center mb-4 group-hover:bg-[#00ADB5] transition-colors duration-300">
          <Icon className="w-6 h-6 text-[#00ADB5] group-hover:text-[#222831] transition-colors duration-300 font-bold" />
        </div>
        <h3 className="text-lg font-serif font-semibold text-[#EEEEEE] mb-2">{service.title}</h3>
        <p className="text-sm text-[#EEEEEE]/80 leading-relaxed mb-4">{service.description}</p>
        {service.tools && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {service.tools.map((tool) => (
              <span key={tool} className="text-xs px-2.5 py-0.5 rounded-full bg-[#222831] text-[#00ADB5] font-semibold border border-white/5">
                {tool}
              </span>
            ))}
          </div>
        )}
        {service.useCase && (
          <p className="text-xs text-[#EEEEEE]/70 italic border-l-2 border-[#00ADB5] pl-3">
            {service.useCase}
          </p>
        )}
      </div>
    </Reveal>
  );
}
