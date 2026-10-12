import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Clock,
  Wheat,
  ArrowLeft,
  ExternalLink,
  MessageCircle,
  Truck,
  Phone,
  Building2
} from 'lucide-react';

export const Checkout: React.FC = () => {
  const { settings, setCurrentPage } = useApp();
  const rawPhone = (settings?.whatsapp || '07030881613').replace(/[^0-9]/g, '');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <button
        onClick={() => setCurrentPage('shop')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174D36] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Upcoming Products Catalogue</span>
      </button>

      <div className="bg-white rounded-3xl border border-[#EAE6DD] p-8 sm:p-12 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#174D36]/10 text-[#174D36] flex items-center justify-center mx-auto">
          <Wheat className="w-8 h-8 text-[#C69C48]" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48] bg-[#C69C48]/15 px-3 py-1 rounded-full inline-block">
            Startup Pre-Launch Status
          </span>
          <h1 className="text-3xl font-extrabold text-[#174D36] tracking-tight">
            Products Coming Soon
          </h1>
          <p className="text-sm text-[#555C57] leading-relaxed">
            PrimeSource Rice is currently in its processing and preparation phase in Nasarawa State. Rather than simulating fake product checkout, online purchasing will officially open once our commercial de-stoning and packaging lines launch!
          </p>
        </div>

        <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#EAE6DD] text-left text-xs max-w-xl mx-auto space-y-3">
          <p className="font-bold text-[#174D36] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C69C48]" />
            <span>Interested in securing rice before public dispatch?</span>
          </p>
          <p className="text-[11px] text-[#555C57] leading-relaxed">
            You can fast-track a pre-order reservation or institutional bulk order directly with our sales desk. We notify registered buyers first when each milled bag size (5kg, 10kg, 25kg, 50kg) becomes available.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={`https://wa.me/${rawPhone}?text=${encodeURIComponent('Hello PrimeSource Rice! 🌾 I would like to make a pre-order inquiry for your upcoming rice packages.')}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pre-Order on WhatsApp ({settings?.whatsapp || '07030881613'})</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <button
            onClick={() => setCurrentPage('bulk-orders')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#174D36] hover:bg-[#0F3324] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Building2 className="w-4 h-4 text-[#C69C48]" />
            <span>Request Bulk Quotation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
