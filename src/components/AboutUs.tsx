import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Wheat, Eye, Target } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. HERO HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48]">
          Our Roots & Commitment
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#174D36] tracking-tight leading-tight">
          Locally Grown. Quality Assured. Proudly Nigerian.
        </h1>
        <p className="text-base text-[#4A524D] leading-relaxed">
          PrimeSource Rice is an agribusiness focused on sourcing paddy rice from local farmers in Nasarawa State and processing it into clean, quality-controlled, and properly packaged Nigerian rice.
        </p>
      </div>

      {/* 2. WHO WE ARE (NO PICTURE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48]">
            Who We Are
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174D36] tracking-tight">
            Bridging the Gap Between Agrarian Abundance and Consumer Quality
          </h2>
          <p className="text-sm sm:text-base text-[#4A524D] leading-relaxed">
            Nasarawa State possesses some of the most fertile floodplains and agrarian microclimates in Nigeria, with communities like Doma, Awe, Keana, Ashagwa, and Assakio producing bountiful harvests of paddy rice year after year.
          </p>
          <p className="text-sm sm:text-base text-[#4A524D] leading-relaxed">
            However, traditional cottage milling often left local rice with stones, sand, dark grains, and variable parboiling quality. PrimeSource Rice was established to solve this challenge. By investing in modern destoners, standardized parboiling chambers, and optical color sorting equipment, we elevate home-grown Nigerian rice into a clean, premium staple that Nigerian households and commercial food businesses can trust with absolute confidence.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-[#FAF9F6] p-7 sm:p-9 rounded-3xl border border-[#EAE6DD] space-y-5 shadow-xs">
            <h3 className="font-extrabold text-[#174D36] text-base flex items-center gap-2">
              <Wheat className="w-5 h-5 text-[#C69C48]" />
              <span>Agrarian Outgrower Network</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-[#EAE6DD] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#174D36]">Local Farming Network</p>
                  <p className="text-[#6B726A] text-[11px]">Doma, Awe, Keana, Assakio</p>
                </div>
                <span className="font-extrabold text-[#C69C48] text-sm">120+ Outgrowers</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#EAE6DD] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#174D36]">Milling Facility</p>
                  <p className="text-[#6B726A] text-[11px]">Central Sortex & De-stoning Plant</p>
                </div>
                <span className="font-extrabold text-[#174D36] text-sm">Assakio-Lafia</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#EAE6DD] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#174D36]">Purity Standard</p>
                  <p className="text-[#6B726A] text-[11px]">Sortex color & density cleaning</p>
                </div>
                <span className="font-extrabold text-[#174D36] text-sm">99.8% Stone-Free</span>
              </div>
            </div>
            <p className="text-[11px] text-[#555C57] leading-relaxed pt-1">
              Direct off-take contracts at fair market rates empower rural smallholder farming communities while securing premium single-origin grain quality.
            </p>
          </div>
        </div>
      </div>

      {/* 3. MISSION & VISION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="bg-white p-8 rounded-3xl border border-[#EAE6DD] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#174D36] text-[#C69C48] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#174D36]">Our Mission</h3>
          <p className="text-sm text-[#555C57] leading-relaxed">
            To improve the economic value of locally produced Nigerian rice through hygienic processing, rigorous grading, professional branding, and dependable distribution, ensuring that every bag sold delivers stone-free quality, exceptional cooking volume, and fair income to local farm families.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white p-8 rounded-3xl border border-[#EAE6DD] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#174D36] text-[#C69C48] flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#174D36]">Our Vision</h3>
          <p className="text-sm text-[#555C57] leading-relaxed">
            To become the most dependable and respected indigenous rice processing and distribution brand in North-Central Nigeria and beyond, proving that Nigerian agriculture can surpass imported rice standards through technological discipline and farmer-centric partnerships.
          </p>
        </div>
      </div>

      {/* Taste the Quality CTA */}
      <div className="bg-[#FAF9F6] border border-[#EAE6DD] rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4">
        <Wheat className="w-12 h-12 text-[#C69C48] mx-auto" />
        <h3 className="text-2xl font-extrabold text-[#174D36]">Taste the Quality</h3>
        <p className="text-sm text-[#555C57]">
          Every bowl of PrimeSource Rice on your table directly supports a farming family in Nasarawa State.
        </p>
        <button
          onClick={() => {
            setCurrentPage('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-3.5 rounded-xl bg-[#174D36] text-white text-xs font-bold hover:bg-[#0F3324] transition-colors cursor-pointer shadow-xs inline-block"
        >
          Order Nasarawa Rice Today
        </button>
      </div>
    </div>
  );
};
