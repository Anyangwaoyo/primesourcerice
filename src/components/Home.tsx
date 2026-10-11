import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import { Product } from '../types/index.ts';
import { fetchProducts } from '../services/api.ts';
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
  Eye,
  ShoppingBag
} from 'lucide-react';

export const Home: React.FC = () => {
  const { setCurrentPage, setSelectedProduct } = useApp();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchProducts()
      .then((data) => {
        if (mounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load products on home:', err);
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 bg-linear-to-b from-[#F3EFE6]/60 via-[#FAF9F6] to-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#174D36] tracking-tight leading-[1.12]">
                Quality Nigerian Rice, From Our Farms to Your Table.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#4A524D] leading-relaxed max-w-2xl font-normal">
                We source locally grown paddy rice, process it with care and deliver clean, quality rice to homes and businesses. Enjoy authentic Nigerian rice that cooks with exceptional aroma, fluffy grain separation, and zero stones.
              </p>

              {/* Key Trust Checkmarks */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#242A26] font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#174D36] shrink-0" />
                  <span>De-stoned & Sortex clean</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#174D36] shrink-0" />
                  <span>Moisture controlled &lt;14%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#174D36] shrink-0" />
                  <span>Local farmer empowered</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                <button
                  onClick={() => {
                    setCurrentPage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 rounded-xl bg-[#174D36] hover:bg-[#0F3324] text-white font-semibold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-5 h-5 text-[#C69C48]" />
                  <span>Shop Rice</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('bulk-orders');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#174D36] border border-[#174D36]/25 font-semibold text-sm sm:text-base transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Truck className="w-5 h-5 text-[#C69C48]" />
                  <span>Order in Bulk</span>
                </button>
              </div>

              {/* Geographic availability note */}
              <p className="text-xs text-[#6B726A] pt-1">
                Fast local delivery in Lafia, Doma, Awe, Ashagwa, Assakio, plus scheduled dispatch to Abuja & nationwide bulk haulage.
              </p>
            </div>

            {/* Right Column: High Quality Realistic Photography Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Accent border backdrop */}
                <div className="absolute -inset-2 rounded-2xl bg-linear-to-tr from-[#174D36]/15 via-[#C69C48]/20 to-[#174D36]/10 transform rotate-1 blur-xs" />

                {/* Main Card Frame */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E2DFD8] bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80"
                    alt="Nigerian milled parboiled rice in woven bag"
                    className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-102 transition-transform duration-500"
                  />

                  {/* Floating quality stamp on image */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E2DFD8] shadow-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C69C48]" />
                    <span className="text-xs font-bold text-[#174D36]">Grade 1 Parboiled Rice</span>
                  </div>

                  {/* Bottom Image Caption Bar */}
                  <div className="p-4 bg-white border-t border-[#EAE6DD] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#6B726A]">Origin: Nasarawa Agrarian Plains</p>
                      <p className="text-sm font-bold text-[#174D36]">Faro 44 & Jasmine Parboiled</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#6B726A]">Starting from</span>
                      <p className="text-base font-extrabold text-[#C69C48]">₦7,500</p>
                    </div>
                  </div>
                </div>

                {/* Floating Metric Pill on bottom-left */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-[#174D36] text-white p-3.5 rounded-xl shadow-lg border border-[#226B4C] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#C69C48] text-[#174D36] flex items-center justify-center font-black text-sm shrink-0">
                    99.8%
                  </div>
                  <div className="text-left pr-2">
                    <p className="text-xs font-bold leading-tight">Sortex Stone-Free</p>
                    <p className="text-[10px] text-[#D5D0C3]">Optical color cleaned</p>
                  </div>
                </div>
              </div>
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

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#EAE6DD]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48]">
              Our Product Catalogue
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174D36] mt-1">
              Featured Rice Packages
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sm font-semibold text-[#174D36] hover:text-[#C69C48] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View Full Catalogue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-[#6B726A]">
            Loading PrimeSource Rice products...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#EAE6DD] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#174D36]/40 transition-all group"
              >
                {/* Image Container */}
                <div
                  onClick={() => handleProductClick(product)}
                  className="relative aspect-4/3 bg-[#F3EFE6] overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-[#174D36] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {product.size}
                  </div>
                  {product.inStock ? (
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#174D36] text-[11px] font-semibold px-2 py-0.5 rounded-sm">
                      In Stock · {product.stockCount} bags
                    </div>
                  ) : (
                    <div className="absolute bottom-3 left-3 bg-red-100 text-red-700 text-[11px] font-semibold px-2 py-0.5 rounded-sm">
                      Low Stock / Pre-order
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => handleProductClick(product)}
                      className="font-bold text-[#174D36] text-base leading-snug hover:underline cursor-pointer mb-1.5"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#555C57] line-clamp-2 mb-3">
                      {product.shortDescription}
                    </p>
                    <div className="text-xs text-[#6B726A] space-y-0.5 mb-4">
                      <p>• {product.grainType}</p>
                      <p>• {product.purityPercentage}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F3EFE6]">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#6B726A]">Sample Price</span>
                        <div className="text-xl font-extrabold text-[#174D36]">
                          ₦{product.price.toLocaleString('en-NG')}
                        </div>
                      </div>
                      <span className="text-xs text-[#6B726A]">Per bag</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleProductClick(product)}
                        className="w-full py-2 px-2 text-xs font-semibold text-[#174D36] bg-[#F3EFE6] hover:bg-[#EAE6DD] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="w-full py-2 px-2 text-xs font-semibold text-white bg-[#174D36] hover:bg-[#0F3324] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C69C48]" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. OUR STORY: NASARAWA VALUE CHAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#EAE6DD]">
              <img
                src="https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=80"
                alt="Golden harvested paddy rice ready for parboiling"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
            {/* Story Card overlay */}
            <div className="absolute -bottom-6 -right-3 sm:right-6 bg-white p-4 sm:p-5 rounded-xl border border-[#EAE6DD] shadow-lg max-w-xs">
              <p className="text-xs font-bold text-[#174D36] flex items-center gap-1.5 mb-1">
                <Users className="w-4 h-4 text-[#C69C48]" />
                Empowering Rural Outgrowers
              </p>
              <p className="text-[11px] text-[#555C57]">
                Over 120 smallholder farmers in Doma, Awe, and Assakio receive guaranteed off-take contracts at fair market rates.
              </p>
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
