'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sparkles, Calendar, Clock, UserCheck, ShieldCheck, Video, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface StylistConsultationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const stylists = [
  {
    name: 'Elena Rostova',
    role: 'Senior Bridal & Festive Specialist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    experience: '12 yrs Couture Experience',
  },
  {
    name: 'Julian Vance',
    role: 'Executive Tailoring & Menswear Icon',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    experience: 'London Savile Row Trained',
  },
  {
    name: 'Aria Chen',
    role: 'Sustainable Capsule & Evening Stylist',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    experience: 'Paris & Milan Runway Consultant',
  },
];

export function StylistConsultationModal({ open, onOpenChange }: StylistConsultationModalProps) {
  const [selectedStylist, setSelectedStylist] = useState(stylists[0].name);
  const [focusArea, setFocusArea] = useState('Bridal & Wedding Trousseau');
  const [date, setDate] = useState('2026-08-02');
  const [timeSlot, setTimeSlot] = useState('03:00 PM EST');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(
        `Stylist Consultation Booked with ${selectedStylist} for ${date} at ${timeSlot}! A private HD video link has been dispatched.`
      );
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl w-[94vw] sm:w-full bg-[#F3EDE2] text-[#222831] border border-[#C2D0C0] p-0 overflow-hidden rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto scrollbar-hide">
        {/* Top Header */}
        <div className="bg-[#435B47] p-6 text-center relative border-b border-[#86A386]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#86A386]/30 text-white border border-[#86A386] text-xs font-bold uppercase tracking-widest mb-2">
            <Video className="w-3.5 h-3.5 text-white" />
            <span>VIP Virtual Consultation</span>
          </div>
          <DialogTitle className="text-2xl font-serif font-bold text-white">
            Book Personal Stylist Appointment
          </DialogTitle>
          <DialogDescription className="text-xs text-white/80 mt-1 font-light">
            Enjoy 30 minutes of complimentary 1-on-1 virtual couture styling, fabric drape inspection, and bespoke fitting advice.
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Stylist Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#435B47] mb-2">
              Select Your Senior Atelier Stylist
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {stylists.map((st) => (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => setSelectedStylist(st.name)}
                  className={`p-3 rounded-2xl border text-left transition-all flex sm:flex-col items-center sm:items-start gap-3 ${
                    selectedStylist === st.name
                      ? 'bg-[#435B47] text-white border-[#435B47] shadow-lg scale-102'
                      : 'bg-white text-[#222831] border-[#C2D0C0] hover:border-[#435B47]'
                  }`}
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#86A386]">
                    <Image
                      src={st.image}
                      alt={st.name}
                      fill
                      sizes="40px"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-bold leading-tight">{st.name}</span>
                    <span className="block text-[10px] opacity-80 mt-0.5 line-clamp-1">{st.role}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Outfit Focus Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#435B47] mb-1.5">
              Styling Focus
            </label>
            <select
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              className="w-full bg-white border border-[#C2D0C0] rounded-xl px-3.5 py-2.5 text-xs text-[#222831] focus:outline-none focus:border-[#435B47]"
            >
              <option value="Bridal & Wedding Trousseau">Bridal & Wedding Trousseau</option>
              <option value="Red Carpet & Evening Wear">Red Carpet & Gala Evening Wear</option>
              <option value="Executive & Corporate Wardrobe">Executive & Corporate Wardrobe</option>
              <option value="Casual Resort & Capsule Refresh">Casual Resort & Sustainable Capsule</option>
            </select>
          </div>

          {/* Date & Time Slot Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#222831]/90 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#435B47]" /> Preferred Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-[#C2D0C0] rounded-xl px-3.5 py-2 text-xs text-[#222831] focus:outline-none focus:border-[#435B47]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#222831]/90 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#435B47]" /> Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-white border border-[#C2D0C0] rounded-xl px-3 py-2 text-xs text-[#222831] focus:outline-none focus:border-[#435B47]"
              >
                <option value="11:00 AM EST">11:00 AM EST</option>
                <option value="01:30 PM EST">01:30 PM EST</option>
                <option value="03:00 PM EST">03:00 PM EST</option>
                <option value="05:30 PM EST">05:30 PM EST</option>
                <option value="07:00 PM EST">07:00 PM EST</option>
              </select>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-bold text-[#222831]/90 mb-1">
              Event Details or Wardrobe Preferences
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Looking for a high-neck emerald gown for a November wedding reception in Rajasthan."
              className="w-full bg-white border border-[#C2D0C0] rounded-xl p-3 text-xs text-[#222831] placeholder:text-[#222831]/40 focus:outline-none focus:border-[#435B47]"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold text-xs sm:text-sm transition-all shadow-xl flex items-center justify-center gap-2"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserCheck className="w-4 h-4 text-white" />
                  <span>Confirm Virtual Stylist Appointment</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-[#222831]/60 text-center font-light pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#435B47]" />
            <span>Complimentary luxury service • HD video invitation sent via email</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

