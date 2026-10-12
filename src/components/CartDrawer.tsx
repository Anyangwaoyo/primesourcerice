import React from 'react';
import { useCart } from '../context/CartContext.tsx';
import { useApp } from '../context/AppContext.tsx';
import { X, Clock, ShoppingBag, ArrowRight, MessageCircle, ExternalLink, Wheat } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen } = useCart();
  const { setCurrentPage, settings } = useApp();

  if (!isCartOpen) return null;

  const rawPhone = (settings?.whatsapp || '07030881613').replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#EAE6DD]">
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-[#EAE6DD] flex items-center justify-between bg-[#FAF9F6]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#174D36]" />
              <h2 className="text-lg font-bold text-[#174D36]">Product Orders</h2>
              <span className="text-xs font-bold text-[#C69C48] bg-[#C69C48]/15 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Coming Soon
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Coming Soon Notice Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#174D36]/10 text-[#174D36] flex items-center justify-center mx-auto">
              <Wheat className="w-8 h-8 text-[#C69C48]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48]">
                Startup Pre-Launch
              </span>
              <h3 className="text-xl font-extrabold text-[#174D36]">
                Products Launching Soon
              </h3>
              <p className="text-xs text-[#555C57] leading-relaxed max-w-xs mx-auto">
                PrimeSource Rice is currently in its harvest parboiling and milling phase in Nasarawa State. Rather than selling fake stock online, direct cart checkouts will go live once commercial distribution starts!
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#EAE6DD] text-left text-xs space-y-2.5">
              <p className="font-bold text-[#174D36] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C69C48]" />
                How to secure your supply:
              </p>
              <ul className="space-y-1.5 text-[11px] text-[#555C57]">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#C69C48] font-bold">•</span>
                  <span><strong>Retail pre-orders:</strong> Message our sales desk on WhatsApp to join our launch notification list.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#C69C48] font-bold">•</span>
                  <span><strong>Commercial volume:</strong> Submit a bulk quotation request for 20+ bags.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={`https://wa.me/${rawPhone}?text=${encodeURIComponent('Hello PrimeSource Rice! 🌾 I would like to register my pre-order interest for your upcoming rice launch.')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pre-Order on WhatsApp ({settings?.whatsapp || '07030881613'})</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentPage('shop');
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#174D36] hover:bg-[#0F3324] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Upcoming Rice Sizes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentPage('bulk-orders');
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#174D36] hover:underline cursor-pointer"
              >
                Request Commercial Bulk Supply →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
