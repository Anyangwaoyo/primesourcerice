import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Wheat, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings } = useApp();

  return (
    <footer className="bg-[#174D36] text-[#FAF9F6] border-t border-[#0F3324] mt-24">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center text-[#C69C48]">
                <Wheat className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                PrimeSource <span className="text-[#C69C48]">Rice</span>
              </span>
            </div>
            <p className="text-sm text-[#D5D0C3] leading-relaxed mb-4">
              {settings?.tagline || 'Locally Grown. Quality Assured. Proudly Nigerian.'}
            </p>
            <p className="text-xs text-[#B8B1A0] leading-relaxed">
              We connect local paddy farmers in Nasarawa State to modern parboiling, de-stoning and optical color sorting for superior cooking quality.
            </p>
          </div>

          {/* Operating Hubs */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#C69C48] mb-4">
              Operating Location
            </h4>
            <ul className="space-y-3 text-xs text-[#D5D0C3]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C69C48] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-medium">Milling & Processing Hub:</strong>
                  <span>Assakio-Lafia, Nasarawa State</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Customer Service & WhatsApp */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#C69C48] mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-[#D5D0C3] mb-5">
              <a
                href={`tel:${(settings?.phone || '07030881613').replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C69C48] shrink-0" />
                <span>{settings?.phone || '07030881613'}</span>
              </a>
              <a
                href={`https://wa.me/${(settings?.whatsapp || '07030881613').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white font-medium hover:text-[#C69C48] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>WhatsApp Order Desk: {settings?.whatsapp || '07030881613'}</span>
              </a>
              <a
                href={`mailto:${settings?.email || 'oyomattany@gmail.com'}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C69C48] shrink-0" />
                <span>{settings?.email || 'oyomattany@gmail.com'}</span>
              </a>
            </div>

            <div className="p-3 rounded-lg bg-[#0F3324] border border-[#226B4C]/40 text-[11px] text-[#B8B1A0]">
              <span className="font-semibold text-white block mb-0.5">Startup Pre-Launch Status:</span>
              Products are currently Coming Soon while milling setup progresses in Nasarawa State. Pre-orders and bulk inquiries are welcome.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#0F3324] bg-[#0E2E20] py-6 px-4 text-center text-xs text-[#9FA8A1]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} PrimeSource Rice Ltd. All rights reserved. Sourced & Processed in Nasarawa State, Nigeria.</p>
          <p className="text-[11px] text-[#A57F32]">Locally Grown · Quality Assured · Proudly Nigerian</p>
        </div>
      </div>
    </footer>
  );
};
