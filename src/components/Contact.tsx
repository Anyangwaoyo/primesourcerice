import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { createInquiry } from '../services/api.ts';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle2,
  Send,
  ExternalLink
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { settings, showToast } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product / Delivery Inquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('Please provide your name, phone number, and message.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await createInquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        subject,
        message: message.trim(),
      });
      setSubmitted(true);
      showToast('Your message has been sent successfully! We will get in touch.', 'success');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      console.error('Inquiry error:', err);
      showToast(err.message || 'Failed to send message. Please try again or message via WhatsApp.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48]">
          Reach Our Team
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#174D36] tracking-tight">
          Contact PrimeSource Rice
        </h1>
        <p className="text-sm text-[#555C57]">
          Have an inquiry about our rice products, wholesale contracts, or dispatch timelines? Get in touch with our operations desk.
        </p>
      </div>

      {/* Main Grid: Info + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contacts & Operating Hubs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Contact Cards */}
          <div className="bg-white p-6 rounded-2xl border border-[#EAE6DD] shadow-xs space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#174D36]">
              Direct Assistance
            </h3>

            <div className="space-y-4 text-xs">
              <a
                href={`https://wa.me/${(settings?.whatsapp || '07030881613').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 transition-colors font-semibold"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                <div className="flex-1">
                  <span className="block text-xs font-bold text-[#174D36]">WhatsApp Order Desk</span>
                  <span className="text-[11px] text-[#242A26] font-normal">{settings?.whatsapp || '07030881613'}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>

              <a
                href={`tel:${(settings?.phone || '07030881613').replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E2DFD8] text-[#242A26] hover:bg-[#F3EFE6] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#174D36] shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-[#174D36]">Customer Support Phone</span>
                  <span className="text-[11px] text-[#555C57]">{settings?.phone || '07030881613'}</span>
                </div>
              </a>

              <a
                href={`mailto:${settings?.email || 'oyomattany@gmail.com'}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E2DFD8] text-[#242A26] hover:bg-[#F3EFE6] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#174D36] shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-[#174D36]">Email Procurement</span>
                  <span className="text-[11px] text-[#555C57]">{settings?.email || 'oyomattany@gmail.com'}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Operating Hubs */}
          <div className="bg-white p-6 rounded-2xl border border-[#EAE6DD] shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#174D36]">
              Our Operating Location
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C69C48] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#174D36]">Processing & Distribution Center:</strong>
                  <span className="text-[#555C57]">Assakio-Lafia, Nasarawa State</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-[#F3EFE6]">
                <Clock className="w-4 h-4 text-[#174D36] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#174D36]">Operating Hours:</strong>
                  <span className="text-[#555C57]">Monday – Saturday: 8:00 AM – 6:00 PM (Orders online 24/7)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#EAE6DD] shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48]">
              Send a Message
            </span>
            <h2 className="text-2xl font-extrabold text-[#174D36] mt-1">
              Customer & Partner Enquiry Form
            </h2>
            <p className="text-xs text-[#555C57] mt-1">
              Have a question or request? Fill out the form and our team in Lafia will respond promptly.
            </p>
          </div>

          {submitted && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thank you! Your inquiry was received. We will contact you via phone or email shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sani Bello"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0803 123 4567"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1">
                  Email Address <span className="text-[#8C948E] font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1">
                  Subject / Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36] cursor-pointer"
                >
                  <option value="Product / Delivery Inquiry">Product / Delivery Inquiry</option>
                  <option value="Bulk Supply Quotation">Bulk Supply Quotation</option>
                  <option value="Farmer Outgrower Supply to Mill">Farmer Outgrower Supply to Mill</option>
                  <option value="Distribution Partnership">Distribution Partnership</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#242A26] mb-1">
                Your Message / Details <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we assist you with PrimeSource Rice?"
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-7 py-3 rounded-xl bg-[#174D36] hover:bg-[#0F3324] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {submitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#C69C48]" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
