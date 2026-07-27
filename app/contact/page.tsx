'use client';

import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { MapPin, Clock, Mail, Phone, Instagram, Twitter, Facebook } from 'lucide-react';

const hours = [
  { day: 'Monday — Friday', time: '9:00 — 18:00' },
  { day: 'Saturday', time: '10:00 — 16:00' },
  { day: 'Sunday', time: 'Closed' },
];

const socials = [
  { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com/lavenir.atelier' },
  { Icon: Twitter, label: 'Twitter', href: 'https://twitter.com/lavenir_studio' },
  { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com/lavenir.atelier' },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-hero-glow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-brass">Get in Touch</span>
            <h1 className="text-5xl font-serif font-semibold text-charcoal mt-3 mb-4">Contact Us</h1>
            <p className="text-lg text-slate">
              We&apos;d love to hear about your project — or simply say hello.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 bg-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <Reveal className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card">
                <h2 className="text-2xl font-serif font-semibold text-charcoal mb-6">Send a Message</h2>
                <ContactForm />
              </div>
            </Reveal>

            <Reveal direction="right" className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-serif text-lg text-charcoal mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-forest" /> Visit Us
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  12 Sheep Street<br />
                  Burford, Cotswolds<br />
                  OX18 4LS, England
                </p>
                <div className="mt-4 aspect-video rounded-xl bg-sage-light/60 flex items-center justify-center">
                  <span className="text-sm text-slate">Map placeholder</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-serif text-lg text-charcoal mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-forest" /> Hours
                </h3>
                <ul className="space-y-2">
                  {hours.map((h) => (
                    <li key={h.day} className="flex justify-between text-sm">
                      <span className="text-slate">{h.day}</span>
                      <span className="text-charcoal font-medium">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-serif text-lg text-charcoal mb-4">Connect</h3>
                <div className="space-y-3">
                  <a href="mailto:concierge@lavenir-atelier.com" className="flex items-center gap-2 text-sm text-slate hover:text-[#00ADB5] transition-colors">
                    <Mail className="w-4 h-4 text-[#00ADB5]" /> concierge@lavenir-atelier.com
                  </a>
                  <a href="tel:+441499123456" className="flex items-center gap-2 text-sm text-slate hover:text-[#00ADB5] transition-colors">
                    <Phone className="w-4 h-4 text-[#00ADB5]" /> +44 1499 123 456
                  </a>
                </div>
                <div className="flex gap-3 mt-4">
                  {socials.map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00ADB5] hover:text-[#222831] transition-colors flex items-center justify-center text-[#222831]"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
