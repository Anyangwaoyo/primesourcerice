import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { createInquiry } from '../services/api.ts';
import {
  Wheat,
  Clock,
  ShieldCheck,
  Package,
  Truck,
  CheckCircle2,
  Info,
  MessageCircle,
  ExternalLink,
  Phone,
  Send
} from 'lucide-react';

interface PackagingSpec {
  size: string;
  category: string;
  bagType: string;
  grainType: string;
  destoningPurity: string;
  moistureContent: string;
  brokenRatio: string;
  recommendedFor: string;
  highlight: string;
}

const UPCOMING_PACKAGING_SPECS: PackagingSpec[] = [
  {
    size: '5kg',
    category: 'Small Household & Student Pack',
    bagType: 'Airtight packaging with hermetic inner moisture seal',
    grainType: 'Premium Long Grain Parboiled (Faro 44)',
    destoningPurity: '99.8% Sortex Stone-Free',
    moistureContent: '12.8% (optimal for shelf storage)',
    brokenRatio: '< 4% Broken',
    recommendedFor: 'Students, young professionals, and compact household cooking',
    highlight: 'Convenient carry size, fast cooking, fresh grain aroma',
  },
  {
    size: '10kg',
    category: 'Everyday Family Pack',
    bagType: 'Reinforced woven carry bag with ergonomic handle',
    grainType: 'Premium Long Grain Parboiled',
    destoningPurity: '99.8% Sortex Stone-Free',
    moistureContent: '13.0%',
    brokenRatio: '< 4% Broken',
    recommendedFor: 'Standard family weekly meals and medium households',
    highlight: 'High swelling yield, uniform grain length, zero sand/stones',
  },
  {
    size: '25kg',
    category: 'Household & Catering Standard',
    bagType: 'Heavy-duty food-grade woven polypropylene bag',
    grainType: 'Premium Long Grain Parboiled',
    destoningPurity: '99.9% Sortex Stone-Free',
    moistureContent: '12.5%',
    brokenRatio: '< 3.5% Broken',
    recommendedFor: 'Large households, party caterers, restaurants, and festivities',
    highlight: 'The Nigerian party favorite: non-sticky grain separation for Jollof & Fried Rice',
  },
  {
    size: '50kg',
    category: 'Commercial Wholesale Sack',
    bagType: 'Commercial heavy-duty UV woven polypropylene sack',
    grainType: 'Premium Long Grain Parboiled',
    destoningPurity: '99.8% Sortex Stone-Free',
    moistureContent: '13.2%',
    brokenRatio: '< 5% Broken',
    recommendedFor: 'Grain wholesalers, supermarket distributors, institutions, and bulk catering',
    highlight: 'Palletized bulk haulage, tiered volume pricing for 20+ bags',
  },
];

export const Shop: React.FC = () => {
  const { settings, showToast } = useApp();

  // Pre-order form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredSize, setPreferredSize] = useState('25kg');
  const [location, setLocation] = useState('Lafia');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const rawPhone = (settings?.whatsapp || '07030881613').replace(/[^0-9]/g, '');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('Please provide your name and phone/WhatsApp number.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await createInquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: '',
        subject: `Pre-Order Waitlist: ${preferredSize} Bag (${location})`,
        message: `Customer joined pre-order launch waitlist. Preferred size: ${preferredSize}. Delivery target: ${location}. Additional note: ${notes.trim() || 'None'}.`,
      });
      setSubmitted(true);
      showToast('Thank you! Your pre-order interest has been registered successfully.', 'success');
      setName('');
      setPhone('');
      setNotes('');
    } catch (err: any) {
      console.error('Waitlist submission failed:', err);
      showToast(err.message || 'Submission failed. Please message us directly on WhatsApp.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDirectWhatsApp = (sizeChoice: string) => {
    const msg = `Hello PrimeSource Rice! 🌾
I would like to register my pre-order interest for your upcoming *${sizeChoice}* bag when commercial milling opens in Nasarawa State.

Name:
Location:
Estimated Quantity:
Please notify me with official prices upon launch. Thank you!`;
    window.open(`https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* 1. HEADER & PRE-LAUNCH ANNOUNCEMENT */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C69C48]/20 text-[#174D36] text-xs font-bold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-[#C69C48]" />
          <span>Milling In Preparation · Products Launching Soon</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#174D36] tracking-tight">
          Upcoming Products & Specifications
        </h1>
        <p className="text-sm sm:text-base text-[#555C57] leading-relaxed max-w-3xl">
          PrimeSource Rice is currently in its active harvest parboiling, de-stoning, and facility calibration phase in Assakio-Lafia, Nasarawa State. In line with our agribusiness integrity, no products are uploaded for retail cart checkout yet. Review our upcoming package specifications and reserve priority allocation below.
        </p>

        {/* Agribusiness Integrity Banner */}
        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6DD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#555C57] mt-4">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#C69C48] shrink-0" />
            <span>
              <strong>Zero False Stock:</strong> Direct purchases will go live immediately once automated bagging commences. Early reservations are non-binding.
            </span>
          </div>
          <button
            onClick={() => handleDirectWhatsApp('General')}
            className="shrink-0 px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Sales Desk</span>
          </button>
        </div>
      </div>

      {/* 2. UPCOMING PACKAGING SPECIFICATIONS (STRUCTURED DIRECTORY - NO PRODUCT CARDS) */}
      <div className="space-y-6">
        <div className="border-b border-[#EAE6DD] pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#174D36]">
              Packaging Sizes & Quality Specifications
            </h2>
            <p className="text-xs text-[#6B726A] mt-0.5">
              Automated de-stoning, moisture calibration & packaging standards for our upcoming release.
            </p>
          </div>
          <span className="text-xs font-bold text-[#C69C48] bg-[#C69C48]/15 px-3 py-1 rounded-full hidden sm:inline-block">
            4 Upcoming Sizes
          </span>
        </div>

        {/* Specifications List */}
        <div className="divide-y divide-[#EAE6DD] border border-[#EAE6DD] rounded-2xl bg-white overflow-hidden shadow-xs">
          {UPCOMING_PACKAGING_SPECS.map((spec) => (
            <div key={spec.size} className="p-5 sm:p-7 hover:bg-[#FAF9F6] transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Size info */}
                <div className="space-y-2 lg:max-w-md">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-xl bg-[#174D36] text-[#C69C48] flex items-center justify-center font-black text-base shrink-0">
                      {spec.size}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-base text-[#174D36] leading-tight">
                        {spec.category}
                      </h3>
                      <p className="text-xs text-[#C69C48] font-semibold mt-0.5">
                        Status: Coming Soon · Official Pricing at Launch
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#555C57] leading-relaxed pt-1">
                    {spec.highlight}
                  </p>
                  <p className="text-[11px] text-[#6B726A]">
                    <strong>Bag Type:</strong> {spec.bagType}
                  </p>
                </div>

                {/* Center: Technical Milling Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-[#FAF9F6] p-4 rounded-xl border border-[#EAE6DD] lg:w-96">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#8C948E] block">Grain Type</span>
                    <span className="font-bold text-[#242A26]">{spec.grainType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#8C948E] block">De-stoning</span>
                    <span className="font-bold text-[#174D36]">{spec.destoningPurity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#8C948E] block">Moisture</span>
                    <span className="font-bold text-[#242A26]">{spec.moistureContent}</span>
                  </div>
                  <div className="sm:col-span-3 pt-1 border-t border-[#EAE6DD]">
                    <span className="text-[10px] uppercase font-semibold text-[#8C948E] block">Recommended Use</span>
                    <span className="text-[#4A524D] text-[11px] font-medium">{spec.recommendedFor}</span>
                  </div>
                </div>

                {/* Right: Pre-Order Quick Action */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 justify-center">
                  <button
                    onClick={() => {
                      setPreferredSize(spec.size);
                      const formEl = document.getElementById('preorder-form');
                      formEl?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#174D36] hover:bg-[#0F3324] text-white text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Select for Waitlist
                  </button>
                  <button
                    onClick={() => handleDirectWhatsApp(spec.size)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#174D36] border border-[#174D36]/25 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp Inquiry</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PRE-ORDER WAITLIST REGISTRATION FORM (DIRECTLY ON PAGE - NO MODAL) */}
      <div id="preorder-form" className="bg-white rounded-3xl border border-[#EAE6DD] p-6 sm:p-10 shadow-xs">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#174D36]/10 text-[#174D36] flex items-center justify-center mx-auto mb-2">
              <Wheat className="w-6 h-6 text-[#C69C48]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174D36]">
              Join the Launch Waitlist
            </h2>
            <p className="text-xs sm:text-sm text-[#555C57]">
              Be the first to receive notifications and priority dispatch once commercial bagging goes live. Zero payment required until order confirmation.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#174D36] mx-auto" />
              <h3 className="font-extrabold text-base text-[#174D36]">You're on the Priority List!</h3>
              <p className="text-xs text-[#555C57] leading-relaxed max-w-md mx-auto">
                Thank you for supporting authentic Nigerian agriculture. Our commercial desk will contact you via WhatsApp/SMS prior to our official launch.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-5 py-2 rounded-xl bg-[#174D36] text-white text-xs font-bold cursor-pointer hover:bg-[#0F3324]"
              >
                Register Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#174D36] mb-1">
                    Your Name / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Hajiya Fatima / ABC Catering"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36] text-[#242A26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#174D36] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., 08012345678"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36] text-[#242A26]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#174D36] mb-1">
                    Preferred Packaging Size
                  </label>
                  <select
                    value={preferredSize}
                    onChange={(e) => setPreferredSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36] text-[#242A26] cursor-pointer"
                  >
                    <option value="5kg">5kg Hermetic Pack</option>
                    <option value="10kg">10kg Everyday Family Bag</option>
                    <option value="25kg">25kg Catering & Household Standard</option>
                    <option value="50kg">50kg Wholesale Commercial Sack</option>
                    <option value="Bulk (20+ bags)">Bulk Commercial Order (20+ bags)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#174D36] mb-1">
                    Delivery Location Target
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Lafia GRA, Doma, Abuja Central"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36] text-[#242A26]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#174D36] mb-1">
                  Optional Note / Estimated Quantity Needed
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Looking for 5 bags of 25kg for family consumption in Abuja..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36] text-[#242A26]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#174D36] hover:bg-[#0F3324] text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#C69C48]" />
                  <span>{submitting ? 'Registering...' : 'Register for Launch Notification'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDirectWhatsApp(preferredSize)}
                  className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Instead</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* 4. COMMERCIAL & B2B DIRECT DESK */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#174D36] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#DFBA6D] flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#C69C48]" />
            Commercial Wholesale & Institutions
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">
            Supplying 20 to 1,000+ Bags for Businesses
          </h3>
          <p className="text-xs sm:text-sm text-[#D5D0C3] leading-relaxed">
            Are you a supermarket chain, school cafeteria, hotel caterer, or rice wholesaler? We provide volume contracts, palletized delivery, and depot off-take in Nasarawa & Abuja.
          </p>
        </div>

        <button
          onClick={() => {
            window.location.hash = '';
            const msg = `Hello PrimeSource Rice! 🌾 I represent a commercial business and would like to inquire about volume supply contracts for 20+ bags.`;
            window.open(`https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`, '_blank');
          }}
          className="px-6 py-3 rounded-xl bg-[#C69C48] hover:bg-[#A57F32] text-[#174D36] font-bold text-xs sm:text-sm transition-colors shrink-0 cursor-pointer shadow-sm"
        >
          Request Commercial Haulage Quote
        </button>
      </div>
    </div>
  );
};
