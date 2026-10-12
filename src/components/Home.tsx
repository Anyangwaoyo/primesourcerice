import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Wheat,
  ShieldCheck,
  Package,
  Truck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  ChevronRight,
  Clock
} from 'lucide-react';

export const Home: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. HERO SECTION (NO IMAGES) */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-14 sm:pb-22 bg-linear-to-b from-[#F3EFE6]/60 via-[#FAF9F6] to-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#174D36]/10 text-[#174D36] text-xs font-bold uppercase tracking-wider mb-6 border border-[#174D36]/20">
            <Clock className="w-3.5 h-3.5 text-[#C69C48]" />
            <span>Nasarawa Agrarian Heartland · Products Launching Soon</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#174D36] tracking-tight leading-[1.12] max-w-4xl mx-auto">
            Quality Nigerian Rice, From Our Farms to Your Table.
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#4A524D] leading-relaxed max-w-2xl mx-auto mt-6 font-normal">
            We source locally grown paddy rice, process it with care and deliver clean, quality rice to homes and businesses. Enjoy authentic Nigerian rice that cooks with exceptional aroma, fluffy grain separation, and zero stones.
          </p>

          {/* Key Trust Checkmarks */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 text-xs text-[#242A26] font-medium">
            <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#EAE6DD] shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#174D36] shrink-0" />
              <span>De-stoned & Sortex clean</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#EAE6DD] shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#174D36] shrink-0" />
              <span>Moisture controlled &lt;14%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#EAE6DD] shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#174D36] shrink-0" />
              <span>Local farmer empowered</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-8">
            <button
              onClick={() => {
                setCurrentPage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#174D36] hover:bg-[#0F3324] text-white font-semibold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Clock className="w-5 h-5 text-[#C69C48]" />
              <span>Pre-Order Launch Waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCurrentPage('bulk-orders');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#174D36] border border-[#174D36]/25 font-semibold text-sm sm:text-base transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Truck className="w-5 h-5 text-[#C69C48]" />
              <span>Order in Bulk</span>
            </button>
          </div>

          {/* Geographic availability note */}
          <p className="text-xs text-[#6B726A] pt-4 max-w-xl mx-auto">
            Fast local delivery in Lafia, Doma, Awe, Ashagwa, Assakio, plus scheduled dispatch to Abuja & nationwide bulk haulage.
          </p>

          {/* 4 Feature Value Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-left">
            <div className="p-4 rounded-2xl bg-white border border-[#EAE6DD] shadow-2xs">
              <div className="text-xl font-black text-[#174D36]">99.8%</div>
              <div className="text-xs font-bold text-[#174D36] mt-0.5">Stone-Free Sortex</div>
              <p className="text-[11px] text-[#6B726A] mt-1">Optical camera cleaned</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#EAE6DD] shadow-2xs">
              <div className="text-xl font-black text-[#174D36]">&lt;14%</div>
              <div className="text-xs font-bold text-[#174D36] mt-0.5">Optimal Moisture</div>
              <p className="text-[11px] text-[#6B726A] mt-1">Maximum storage shelf life</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#EAE6DD] shadow-2xs">
              <div className="text-xl font-black text-[#174D36]">120+</div>
              <div className="text-xs font-bold text-[#174D36] mt-0.5">Nasarawa Farmers</div>
              <p className="text-[11px] text-[#6B726A] mt-1">Direct community off-take</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#EAE6DD] shadow-2xs">
              <div className="text-xl font-black text-[#C69C48]">100%</div>
              <div className="text-xs font-bold text-[#174D36] mt-0.5">Nigerian Grown</div>
              <p className="text-[11px] text-[#6B726A] mt-1">Premium parboiled grains</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE PRIMESOURCE RICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48]">
            Built On Integrity & Quality
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174D36] mt-2 mb-4 tracking-tight">
            Why Choose PrimeSource Rice
          </h2>
          <p className="text-sm sm:text-base text-[#555C57] leading-relaxed">
            From paddy sourcing to automated de-stoning and doorstep delivery, we set the benchmark for Nigerian agricultural excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Benefit 1 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EAE6DD] shadow-xs hover:border-[#174D36]/40 transition-all hover:shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#F3EFE6] text-[#174D36] flex items-center justify-center mb-5 group-hover:bg-[#174D36] group-hover:text-[#C69C48] transition-colors">
              <Wheat className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-bold text-[#174D36] mb-2">
              1. Locally Sourced Rice
            </h3>
            <p className="text-sm text-[#555C57] leading-relaxed">
              We buy directly from local farming communities in Doma, Awe, Assakio and Keana at fair farmgate prices, fostering food sovereignty and economic stability for rural growers.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EAE6DD] shadow-xs hover:border-[#174D36]/40 transition-all hover:shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#F3EFE6] text-[#174D36] flex items-center justify-center mb-5 group-hover:bg-[#174D36] group-hover:text-[#C69C48] transition-colors">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-bold text-[#174D36] mb-2">
              2. Quality-Controlled Processing
            </h3>
            <p className="text-sm text-[#555C57] leading-relaxed">
              Every batch undergoes multi-stage de-stoning, parboiling under controlled temperatures, and modern optical color sorting to ensure zero grit, stones, or broken hulls.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EAE6DD] shadow-xs hover:border-[#174D36]/40 transition-all hover:shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#F3EFE6] text-[#174D36] flex items-center justify-center mb-5 group-hover:bg-[#174D36] group-hover:text-[#C69C48] transition-colors">
              <Package className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-bold text-[#174D36] mb-2">
              3. Affordable Packaging Options
            </h3>
            <p className="text-sm text-[#555C57] leading-relaxed">
              Whether you need 5kg for a small apartment, 10kg/25kg for family meals, or 50kg for restaurants and celebrations, our hygienic bags keep rice fresh and pest-free.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EAE6DD] shadow-xs hover:border-[#174D36]/40 transition-all hover:shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#F3EFE6] text-[#174D36] flex items-center justify-center mb-5 group-hover:bg-[#174D36] group-hover:text-[#C69C48] transition-colors">
              <Truck className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-lg font-bold text-[#174D36] mb-2">
              4. Convenient Ordering & Supply
            </h3>
            <p className="text-sm text-[#555C57] leading-relaxed">
              Transparent digital ordering with quick WhatsApp confirmation, prompt local delivery in Nasarawa communities, and direct depot logistics for Abuja and bulk buyers.
            </p>
          </div>
        </div>
      </section>

      {/* 3. UPCOMING PRODUCTS LAUNCH MESSAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EAE6DD] p-6 sm:p-10 lg:p-12 shadow-xs">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#EAE6DD]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C69C48]/20 text-[#174D36] text-xs font-bold uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5 text-[#C69C48]" />
                Upcoming Mill Production · Launching Soon
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174D36] tracking-tight">
                Our Products — Coming Soon
              </h2>
              <p className="text-sm sm:text-base text-[#555C57] mt-2 max-w-2xl leading-relaxed">
                PrimeSource Rice is currently in its active harvest processing, precision de-stoning, and parboiling stage in Assakio-Lafia, Nasarawa State. We are preparing our official retail and wholesale launch.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentPage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-[#174D36] text-white hover:bg-[#0F3324] text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer self-start md:self-end"
            >
              <span>View Upcoming Packaging Guide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Upcoming Milling & Packaging Roadmap (No Cards) */}
          <div className="my-8 p-6 sm:p-8 rounded-2xl bg-[#FAF9F6] border border-[#EAE6DD] space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-[#174D36] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#C69C48]" />
              <span>Upcoming Commercial Bag Sizes (Launching Soon)</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#555C57] leading-relaxed">
              Upon official rollout from our Assakio-Lafia processing center, PrimeSource Rice will be distributed in 4 standard packaging sizes tailored for different needs:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-xs">
              <div className="border-l-2 border-[#174D36] pl-3 py-1">
                <p className="font-bold text-[#174D36]">5kg Hermetic Pack</p>
                <p className="text-[#6B726A] text-[11px]">Students & compact households</p>
              </div>
              <div className="border-l-2 border-[#174D36] pl-3 py-1">
                <p className="font-bold text-[#174D36]">10kg Everyday Family</p>
                <p className="text-[#6B726A] text-[11px]">Weekly household meals</p>
              </div>
              <div className="border-l-2 border-[#174D36] pl-3 py-1">
                <p className="font-bold text-[#174D36]">25kg Household & Catering</p>
                <p className="text-[#6B726A] text-[11px]">Events & large families</p>
              </div>
              <div className="border-l-2 border-[#174D36] pl-3 py-1">
                <p className="font-bold text-[#174D36]">50kg Wholesale Sack</p>
                <p className="text-[#6B726A] text-[11px]">Commercial & institutional</p>
              </div>
            </div>
          </div>

          {/* Upcoming Launch Notice Box */}
          <div className="bg-[#174D36] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#DFBA6D]">
                <Wheat className="w-4 h-4 text-[#C69C48]" />
                <span>OFFICIAL LAUNCH IN PREPARATION</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                No products are uploaded for retail checkout yet.
              </h3>
              <p className="text-xs sm:text-sm text-[#D5D0C3] leading-relaxed">
                We believe in 100% transparency. Our commercial milling and de-stoning lines are concluding setup. Official prices, distribution depots, and instant orders will open at launch. Pre-register today to secure priority supply!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  setCurrentPage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-[#C69C48] hover:bg-[#A57F32] text-[#174D36] font-bold text-xs sm:text-sm transition-colors text-center cursor-pointer shadow-sm"
              >
                Pre-Order Waitlist
              </button>
              <button
                onClick={() => {
                  setCurrentPage('bulk-orders');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm transition-colors text-center cursor-pointer"
              >
                Bulk Supply Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR STORY: NASARAWA VALUE CHAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="bg-[#FAF9F6] p-8 sm:p-10 rounded-3xl border border-[#EAE6DD] space-y-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#174D36] text-[#C69C48] flex items-center justify-center font-black">
                  <Wheat className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#174D36] text-lg">Assakio-Lafia Agrarian Hub</h3>
                  <p className="text-xs text-[#6B726A]">Central Processing & Sortex De-stoning Operations</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-[#EAE6DD] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#174D36]">Smallholder Outgrowers</p>
                    <p className="text-[#6B726A] text-[11px]">Doma, Awe, Assakio & Keana communities</p>
                  </div>
                  <span className="font-extrabold text-[#C69C48] text-sm">120+ Farmers</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#EAE6DD] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#174D36]">Sortex Optical Purity</p>
                    <p className="text-[#6B726A] text-[11px]">Camera color sensor & rubber-roller destoner</p>
                  </div>
                  <span className="font-extrabold text-[#174D36] text-sm">99.8% Stone-Free</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#EAE6DD] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#174D36]">Moisture Control Target</p>
                    <p className="text-[#6B726A] text-[11px]">Controlled solar & steam drying beds</p>
                  </div>
                  <span className="font-extrabold text-[#174D36] text-sm">&lt;14.0%</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#174D36]/5 border border-[#174D36]/15 text-[11px] text-[#4A524D] flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#C69C48] shrink-0" />
                <span>Fair farmgate compensation empowering rural Nigerian agricultural families directly.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48]">
              Our Story & Roots
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174D36] tracking-tight">
              Transforming Nasarawa Rice from Farmgate to Premium Table
            </h2>
            <p className="text-sm sm:text-base text-[#4A524D] leading-relaxed">
              Nasarawa State produces some of the finest paddy varieties in West Africa, yet historically, unhygienic traditional processing left local rice with stones and uneven grain quality.
            </p>
            <p className="text-sm text-[#4A524D] leading-relaxed">
              <strong>PrimeSource Rice</strong> was created to bridge this critical gap. We invest directly in controlled parboiling steam chambers, precision rubber-roller de-stoners, and computerized Sortex optical color sorters. The result? 100% stone-free, fragrant, long-grain Nigerian rice that rivals and exceeds imported alternatives at an affordable price point.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentPage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#174D36] hover:text-[#C69C48] transition-colors cursor-pointer"
              >
                <span>Read more about our value chain & mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BULK SUPPLY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#174D36] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          {/* Subtle background pattern */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#226B4C]/40 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C69C48]/20 text-[#DFBA6D] text-xs font-semibold">
              <Truck className="w-3.5 h-3.5" />
              Commercial & Institutional Supplies
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Supplying Wholesalers, Restaurants, Supermarkets & Institutions
            </h2>
            <p className="text-sm sm:text-base text-[#D5D0C3] leading-relaxed">
              Need 20, 50, 200, or 1,000+ bags for commercial resale, hotel catering, school food programs, or festive corporate hampers? We offer dependable volume contracts, palletized delivery, and quotation-based bulk pricing.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  setCurrentPage('bulk-orders');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-[#C69C48] hover:bg-[#A57F32] text-[#174D36] font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Request Bulk Supply Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium text-sm transition-colors text-center cursor-pointer"
              >
                Contact B2B Desk
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
