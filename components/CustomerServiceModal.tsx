'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  HelpCircle,
  RotateCcw,
  Sparkles,
  Ruler,
  Building,
  CheckCircle2,
  ChevronDown,
  Calendar,
  Send,
  ShieldCheck,
  Truck,
  Mail,
  Phone,
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { cn } from '@/lib/utils';
import { faqs } from '@/lib/data';
import { toast } from 'sonner';

export function CustomerServiceModal() {
  const { csModalOpen, setCsModalOpen, csTab, openCustomerService } = useShop();

  // Styling Consultation form state
  const [stylingForm, setStylingForm] = useState({
    name: '',
    email: '',
    preferredDate: '',
    occasion: 'Bespoke Evening Wardrobe',
    notes: '',
  });
  const [submittedConsultation, setSubmittedConsultation] = useState(false);

  // Accordion open states for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleStylingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stylingForm.name || !stylingForm.email) {
      toast.error('Please provide your name and email address.');
      return;
    }
    setSubmittedConsultation(true);
    toast.success('Styling Consultation Request Sent! Our senior stylist will reach out within 24 hours.');
  };

  return (
    <Dialog open={csModalOpen} onOpenChange={setCsModalOpen}>
      <DialogContent className="max-w-4xl bg-[#393E46] text-[#EEEEEE] border border-white/20 p-6 sm:p-8 rounded-3xl max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* Header Tabs */}
        <div className="border-b border-white/10 pb-4 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00ADB5] bg-[#00ADB5]/15 px-3 py-1 rounded-full border border-[#00ADB5]/30 inline-block mb-2">
            L’AVENIR Concierge & Support
          </span>
          <DialogTitle className="text-2xl sm:text-3xl font-serif font-bold text-[#EEEEEE]">
            Customer Service & Guidance
          </DialogTitle>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-4 pt-2">
            {[
              { id: 'faqs', label: 'FAQs', icon: HelpCircle },
              { id: 'returns', label: '7-Day Returns', icon: RotateCcw },
              { id: 'styling', label: 'Styling Consultation', icon: Sparkles },
              { id: 'sizeGuide', label: 'Size Guide', icon: Ruler },
              { id: 'company', label: 'Company & Legal', icon: Building },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => openCustomerService(id as any)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap',
                  csTab === id
                    ? 'bg-[#00ADB5] text-[#222831] border-[#00ADB5] shadow-md scale-105'
                    : 'bg-[#222831] text-[#EEEEEE]/80 border-white/10 hover:border-[#00ADB5]'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6 animate-fade-in text-left">
          {/* 1. FAQs TAB */}
          {csTab === 'faqs' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#222831] border border-white/10">
                <h4 className="font-serif font-bold text-lg text-white mb-1">Frequently Asked Questions</h4>
                <p className="text-xs text-[#EEEEEE]/70">
                  Find quick answers regarding our atelier, order processing, custom fittings, and sustainable fabrics.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className="border border-white/10 rounded-2xl bg-[#222831]/80 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-4 text-left flex justify-between items-center text-sm font-bold text-white hover:text-[#00ADB5] transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={cn('w-4 h-4 text-[#00ADB5] transition-transform', isOpen && 'rotate-180')} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-[#EEEEEE]/80 leading-relaxed border-t border-white/5 animate-fade-in">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. RETURNS & EXCHANGES TAB */}
          {csTab === 'returns' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#222831] border border-[#00ADB5]/30 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00ADB5]/20 border border-[#00ADB5] flex items-center justify-center shrink-0 text-[#00ADB5]">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-white mb-1">
                    Complimentary 7-Day Easy Returns Guarantee
                  </h4>
                  <p className="text-xs text-[#EEEEEE]/80 leading-relaxed">
                    We want every piece from L’AVENIR to fit you flawlessly. If you wish to return or exchange an item, enjoy our hassle-free 7-day pickup window with zero return shipping fees.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#222831]/80 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#00ADB5] font-bold">
                    <Truck className="w-4 h-4" /> 1. Doorstep Pickup
                  </div>
                  <p className="text-[#EEEEEE]/70">Schedule a pickup date from your account or contact concierge. Our courier will arrive at your door.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#222831]/80 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#00ADB5] font-bold">
                    <ShieldCheck className="w-4 h-4" /> 2. Quality Inspection
                  </div>
                  <p className="text-[#EEEEEE]/70">Returned garments must be unworn with original atelier security tags attached.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#222831]/80 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#00ADB5] font-bold">
                    <CheckCircle2 className="w-4 h-4" /> 3. Instant Refund
                  </div>
                  <p className="text-[#EEEEEE]/70">Refunds are processed to your original payment method within 24 hours of inspection.</p>
                </div>
              </div>
            </div>
          )}

          {/* 3. STYLING CONSULTATION TAB */}
          {csTab === 'styling' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#222831] border border-white/10">
                <h4 className="font-serif font-bold text-lg text-white mb-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00ADB5]" /> 1-on-1 Bespoke Styling Session
                </h4>
                <p className="text-xs text-[#EEEEEE]/80">
                  Book a private video or in-person consultation with our head stylist to curate capsule wardrobes, wedding guest attire, or seasonal collection fits.
                </p>
              </div>

              {submittedConsultation ? (
                <div className="p-8 bg-[#222831] border border-[#00ADB5]/40 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#00ADB5] mx-auto animate-bounce" />
                  <h5 className="font-serif font-bold text-xl text-white">Consultation Request Confirmed</h5>
                  <p className="text-xs text-[#EEEEEE]/80 max-w-md mx-auto">
                    Thank you, <strong className="text-[#00ADB5]">{stylingForm.name}</strong>. Our lead stylist has received your request for <strong>{stylingForm.occasion}</strong> and will contact you at <strong>{stylingForm.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setSubmittedConsultation(false)}
                    className="px-6 py-2 rounded-full bg-[#00ADB5] text-[#222831] font-bold text-xs"
                  >
                    Book Another Session
                  </button>
                </div>
              ) : (
                <form onSubmit={handleStylingSubmit} className="space-y-4 bg-[#222831] p-5 rounded-2xl border border-white/10 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#EEEEEE]/80 font-bold mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Eleanor Whitfield"
                        value={stylingForm.name}
                        onChange={(e) => setStylingForm({ ...stylingForm, name: e.target.value })}
                        className="w-full bg-[#393E46] border border-white/15 rounded-xl px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00ADB5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#EEEEEE]/80 font-bold mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="eleanor@maisonverde.com"
                        value={stylingForm.email}
                        onChange={(e) => setStylingForm({ ...stylingForm, email: e.target.value })}
                        className="w-full bg-[#393E46] border border-white/15 rounded-xl px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00ADB5]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#EEEEEE]/80 font-bold mb-1">Focus Occasion</label>
                      <select
                        value={stylingForm.occasion}
                        onChange={(e) => setStylingForm({ ...stylingForm, occasion: e.target.value })}
                        className="w-full bg-[#393E46] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00ADB5]"
                      >
                        <option>Bespoke Evening Wardrobe</option>
                        <option>Executive Workwear Capsule</option>
                        <option>Resort & Summer Holiday Fit</option>
                        <option>Bridal / Gala Event Styling</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#EEEEEE]/80 font-bold mb-1">Preferred Consultation Date</label>
                      <input
                        type="date"
                        value={stylingForm.preferredDate}
                        onChange={(e) => setStylingForm({ ...stylingForm, preferredDate: e.target.value })}
                        className="w-full bg-[#393E46] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00ADB5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#EEEEEE]/80 font-bold mb-1">Personal Notes or Style Preferences</label>
                    <textarea
                      rows={3}
                      placeholder="Share size preferences, color palette likes, or specific garments you're interested in..."
                      value={stylingForm.notes}
                      onChange={(e) => setStylingForm({ ...stylingForm, notes: e.target.value })}
                      className="w-full bg-[#393E46] border border-white/15 rounded-xl px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00ADB5]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#00ADB5] hover:bg-[#008B92] text-[#222831] font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#222831]" />
                    <span>Confirm Consultation Request</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. SIZE GUIDE TAB */}
          {csTab === 'sizeGuide' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#222831] border border-white/10">
                <h4 className="font-serif font-bold text-lg text-white mb-1">International Size Measurements</h4>
                <p className="text-xs text-[#EEEEEE]/70">
                  All L’AVENIR garments follow European & British tailoring dimensions. Measurements below are in inches.
                </p>
              </div>

              {/* Women's Table */}
              <div className="bg-[#222831] p-4 rounded-2xl border border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00ADB5] block">Women&apos;s Apparel</span>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/15 text-[#00ADB5]">
                      <th className="py-2">Size</th>
                      <th className="py-2">UK / US</th>
                      <th className="py-2">Bust</th>
                      <th className="py-2">Waist</th>
                      <th className="py-2">Hips</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#EEEEEE]/80">
                    <tr><td className="py-2 font-bold text-white">XS</td><td>UK 6 / US 2</td><td>31–32&quot;</td><td>23–24&quot;</td><td>34–35&quot;</td></tr>
                    <tr><td className="py-2 font-bold text-white">S</td><td>UK 8 / US 4</td><td>33–34&quot;</td><td>25–26&quot;</td><td>36–37&quot;</td></tr>
                    <tr><td className="py-2 font-bold text-white">M</td><td>UK 10 / US 6</td><td>35–36&quot;</td><td>27–28&quot;</td><td>38–39&quot;</td></tr>
                    <tr><td className="py-2 font-bold text-white">L</td><td>UK 12 / US 8</td><td>37–38&quot;</td><td>29–30&quot;</td><td>40–41&quot;</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Men's Table */}
              <div className="bg-[#222831] p-4 rounded-2xl border border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00ADB5] block">Men&apos;s Apparel</span>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/15 text-[#00ADB5]">
                      <th className="py-2">Size</th>
                      <th className="py-2">Chest</th>
                      <th className="py-2">Waist</th>
                      <th className="py-2">Neck Collar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#EEEEEE]/80">
                    <tr><td className="py-2 font-bold text-white">S</td><td>36–38&quot;</td><td>30–31&quot;</td><td>15&quot;</td></tr>
                    <tr><td className="py-2 font-bold text-white">M</td><td>39–41&quot;</td><td>32–34&quot;</td><td>15.5&quot;</td></tr>
                    <tr><td className="py-2 font-bold text-white">L</td><td>42–44&quot;</td><td>35–37&quot;</td><td>16.5&quot;</td></tr>
                    <tr><td className="py-2 font-bold text-white">XL</td><td>45–47&quot;</td><td>38–40&quot;</td><td>17.5&quot;</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. COMPANY & LEGAL TAB */}
          {csTab === 'company' && (
            <div className="space-y-4 text-xs text-[#EEEEEE]/80 leading-relaxed">
              <div className="p-5 rounded-2xl bg-[#222831] border border-white/10 space-y-2">
                <h4 className="font-serif font-bold text-lg text-white">L’AVENIR House Ethos</h4>
                <p>
                  Founded in 2024 in the Cotswolds, United Kingdom, L’AVENIR operates at the intersection of slow fashion, organic material integrity, and modern digital design. Every piece is cut in limited quantities to eliminate fabric waste.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#222831] border border-white/10 space-y-2">
                  <span className="font-bold text-[#00ADB5] block uppercase tracking-wider text-[10px]">Atelier Address</span>
                  <p className="text-white">L’AVENIR Studio & Atelier<br />42 Heritage Lane, Chipping Campden<br />Gloucestershire, GL55 6AT, United Kingdom</p>
                </div>

                <div className="p-4 rounded-xl bg-[#222831] border border-white/10 space-y-2">
                  <span className="font-bold text-[#00ADB5] block uppercase tracking-wider text-[10px]">Direct Concierge</span>
                  <p className="text-white flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#00ADB5]" /> concierge@lavenir-atelier.com</p>
                  <p className="text-white flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#00ADB5]" /> +44 (0) 20 7946 0912</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#222831] border border-white/10 space-y-1">
                <span className="font-bold text-white">Privacy & Legal Compliance</span>
                <p className="text-[11px] text-[#EEEEEE]/70">
                  L’AVENIR protects user data in accordance with UK GDPR and international privacy standards. We never sell or share user account information with third parties.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
