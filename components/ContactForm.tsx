'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useShop } from '@/context/ShopContext';

const services = [
  'E-Commerce UI',
  'Web App',
  'Mobile App',
  'PWA',
  'UI/UX & Motion',
  'AI Automations',
  'CRM/ERP Interface',
  'Digital Marketing & SEO',
];

export function ContactForm() {
  const { formatPrice } = useShop();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [budget, setBudget] = useState(25);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.service) e.service = 'Choose a service';
    if (!form.message.trim()) e.message = 'Tell us about your project';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      setBudget(25);
      setTimeout(() => setStatus('idle'), 4000);
    }, 1200);
  };

  const field = (
    name: keyof typeof form,
    label: string,
    type = 'text',
    placeholder = ''
  ) => (
    <div>
      <label className="block text-sm font-medium text-[#EEEEEE] mb-1.5">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-[#222831] px-4 py-3 text-sm text-[#EEEEEE] placeholder:text-white/30 focus:outline-none focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 transition-all"
      />
      {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        {field('name', 'Full Name', 'text', 'Jane Doe')}
        {field('email', 'Email', 'email', 'jane@example.com')}
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {field('phone', 'Phone', 'tel', '+91 98765 43210')}
        <div>
          <label className="block text-sm font-medium text-[#EEEEEE] mb-1.5">Service Choice</label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#222831] px-4 py-3 text-sm text-[#EEEEEE] focus:outline-none focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 transition-all"
          >
            <option value="" className="bg-[#222831]">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s} className="bg-[#222831]">{s}</option>
            ))}
          </select>
          {errors.service && <p className="text-xs text-red-400 mt-1">{errors.service}</p>}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-[#EEEEEE]">Project Budget</label>
          <span className="text-sm font-bold text-[#00ADB5]">
            {formatPrice(budget * 2000)}+
          </span>
        </div>
        <Slider
          value={[budget]}
          min={5}
          max={100}
          step={5}
          onValueChange={(v) => setBudget(v[0])}
          className="[&_[role=slider]]:bg-[#00ADB5] [&_[role=slider]]:border-[#00ADB5]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#EEEEEE] mb-1.5">Message</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
          placeholder="Tell us about your project..."
          className="w-full rounded-xl border border-white/10 bg-[#222831] px-4 py-3 text-sm text-[#EEEEEE] placeholder:text-white/30 focus:outline-none focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 transition-all resize-none"
        />
        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#00ADB5] hover:bg-[#008B92] text-[#222831] font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {status === 'loading' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : status === 'success' ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-[#222831]" />
            Message Sent!
          </>
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4 text-[#222831]" />
          </>
        )}
      </button>

      {status === 'success' && (
        <div className="p-4 rounded-xl bg-[#00ADB5]/20 border border-[#00ADB5]/40 text-[#00ADB5] text-sm font-semibold animate-fade-in">
          Thank you! We&apos;ll be in touch within 24 hours.
        </div>
      )}
    </form>
  );
}
