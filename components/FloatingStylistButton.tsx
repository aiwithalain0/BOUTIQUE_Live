'use client';

import React, { useState } from 'react';
import { Sparkles, UserCheck, Video } from 'lucide-react';
import { StylistConsultationModal } from '@/components/StylistConsultationModal';

export function FloatingStylistButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setModalOpen(true)}
          className="group relative inline-flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#00ADB5] hover:bg-[#008B92] text-[#222831] font-bold text-xs sm:text-sm transition-all duration-300 shadow-2xl hover:scale-105 border border-[#00ADB5] animate-bounce-subtle"
          title="Book Virtual Personal Stylist"
        >
          <span className="w-2 h-2 rounded-full bg-[#222831] animate-ping" />
          <Video className="w-4 h-4 text-[#222831]" />
          <span className="hidden sm:inline">Book Virtual Stylist</span>
          <span className="sm:hidden">Stylist</span>
        </button>
      </div>

      <StylistConsultationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
