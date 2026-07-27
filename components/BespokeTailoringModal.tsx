'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sparkles, Ruler, Check, ShieldCheck, Shirt, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/lib/data';

interface BespokeTailoringModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
}

export function BespokeTailoringModal({ open, onOpenChange, product }: BespokeTailoringModalProps) {
  const [bust, setBust] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [fitPreference, setFitPreference] = useState<'snug' | 'tailored' | 'relaxed'>('tailored');
  const [specialNotes, setSpecialNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bust || !waist || !hip) {
      toast.error('Please specify bust, waist, and hip measurements.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(
        `Custom Measurements Saved for ${product ? product.name : 'Atelier Order'}! Our Master Tailor will craft your garment accordingly.`
      );
      onOpenChange(false);
      // Reset form
      setBust('');
      setWaist('');
      setHip('');
      setHeight('');
      setSpecialNotes('');
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[94vw] sm:w-full bg-[#393E46] text-[#EEEEEE] border border-white/20 p-0 overflow-hidden rounded-3xl shadow-2xl">
        {/* Top Header Banner */}
        <div className="bg-[#222831] p-6 text-center relative border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ADB5]/20 text-[#00ADB5] border border-[#00ADB5]/40 text-xs font-bold uppercase tracking-widest mb-2">
            <Ruler className="w-3.5 h-3.5 text-[#00ADB5]" />
            <span>Bespoke Atelier Service</span>
          </div>
          <DialogTitle className="text-2xl font-serif font-bold text-[#EEEEEE]">
            Order Custom Measurements
          </DialogTitle>
          <DialogDescription className="text-xs text-[#EEEEEE]/70 mt-1 font-light">
            {product
              ? `Tailored to your body for ${product.name}`
              : 'Submit precise specifications for zero-flaw couture fitting.'}
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Unit Toggle */}
          <div className="flex justify-between items-center bg-[#222831]/80 p-2 rounded-2xl border border-white/10">
            <span className="text-xs font-semibold text-[#EEEEEE]/80 pl-2">Measurement Unit</span>
            <div className="flex gap-1 bg-[#393E46] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  unit === 'inches' ? 'bg-[#00ADB5] text-[#222831]' : 'text-[#EEEEEE]/60 hover:text-white'
                }`}
              >
                Inches (in)
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  unit === 'cm' ? 'bg-[#00ADB5] text-[#222831]' : 'text-[#EEEEEE]/60 hover:text-white'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Measurements Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#EEEEEE]/90 mb-1">
                Bust / Chest ({unit}) *
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={bust}
                onChange={(e) => setBust(e.target.value)}
                placeholder={unit === 'inches' ? 'e.g. 36' : 'e.g. 91'}
                className="w-full bg-[#222831] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#EEEEEE] placeholder:text-white/30 focus:outline-none focus:border-[#00ADB5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#EEEEEE]/90 mb-1">
                Natural Waist ({unit}) *
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder={unit === 'inches' ? 'e.g. 28' : 'e.g. 71'}
                className="w-full bg-[#222831] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#EEEEEE] placeholder:text-white/30 focus:outline-none focus:border-[#00ADB5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#EEEEEE]/90 mb-1">
                Full Hips ({unit}) *
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                placeholder={unit === 'inches' ? 'e.g. 38' : 'e.g. 96'}
                className="w-full bg-[#222831] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#EEEEEE] placeholder:text-white/30 focus:outline-none focus:border-[#00ADB5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#EEEEEE]/90 mb-1">
                Total Height ({unit === 'inches' ? 'ft/in' : 'cm'})
              </label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'inches' ? "e.g. 5'7\"" : 'e.g. 170'}
                className="w-full bg-[#222831] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#EEEEEE] placeholder:text-white/30 focus:outline-none focus:border-[#00ADB5]"
              />
            </div>
          </div>

          {/* Fit Silhouette Preference */}
          <div>
            <label className="block text-xs font-bold text-[#EEEEEE]/90 mb-2">
              Silhouette & Fit Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'snug', label: 'Snug Couture', desc: 'Form-fitting' },
                { id: 'tailored', label: 'Classic Tailored', desc: 'Standard drape' },
                { id: 'relaxed', label: 'Fluid & Relaxed', desc: 'Generous drape' },
              ].map((fit) => (
                <button
                  key={fit.id}
                  type="button"
                  onClick={() => setFitPreference(fit.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    fitPreference === fit.id
                      ? 'bg-[#00ADB5] text-[#222831] border-[#00ADB5] font-bold shadow-md'
                      : 'bg-[#222831] text-[#EEEEEE]/80 border-white/10 hover:border-[#00ADB5]'
                  }`}
                >
                  <span className="block text-xs font-bold">{fit.label}</span>
                  <span className="block text-[10px] opacity-75">{fit.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Special Atelier Notes */}
          <div>
            <label className="block text-xs font-bold text-[#EEEEEE]/90 mb-1">
              Custom Sleeve / Hem / Shoulder Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Please add 2 extra inches to trouser hem or shorten sleeve length slightly."
              className="w-full bg-[#222831] border border-white/10 rounded-xl p-3 text-xs text-[#EEEEEE] placeholder:text-white/30 focus:outline-none focus:border-[#00ADB5]"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full bg-[#00ADB5] hover:bg-[#008B92] text-[#222831] font-bold text-xs sm:text-sm transition-all shadow-xl flex items-center justify-center gap-2"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-[#222831]/30 border-t-[#222831] rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#222831]" />
                  <span>Save & Apply Bespoke Measurements</span>
                  <ArrowRight className="w-4 h-4 text-[#222831]" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-white/50 text-center font-light pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00ADB5]" />
            <span>Guaranteed perfect fit backed by free 7-day atelier alterations</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
