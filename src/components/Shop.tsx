import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import { Product, PackageSize } from '../types/index.ts';
import { fetchProducts } from '../services/api.ts';
import {
  ShoppingBag,
  SlidersHorizontal,
  Search,
  CheckCircle2,
  ShieldCheck,
  Wheat,
  Clock,
  ArrowRight,
  Info,
  X,
  Truck
} from 'lucide-react';

export const Shop: React.FC = () => {
  const { selectedProduct, setSelectedProduct, settings } = useApp();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [detailQuantity, setDetailQuantity] = useState(1);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading shop products:', err);
        setLoading(false);
      });
  }, []);

  const handleQtyChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const getProductQty = (productId: string) => quantities[productId] || 1;

  const filteredProducts = products.filter((p) => {
    if (sizeFilter !== 'all' && p.size !== sizeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchGrain = p.grainType.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchGrain) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price;
    if (sortOrder === 'price-desc') return b.price - a.price;
    return 0;
  });

  const availableSizes: { label: string; value: string }[] = [
    { label: 'All Packaging Sizes', value: 'all' },
    { label: '5kg Packs', value: '5kg' },
    { label: '10kg Bags', value: '10kg' },
    { label: '25kg Bags', value: '25kg' },
    { label: '50kg Sacks', value: '50kg' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Title & MVP Demo Notice Header */}
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EAE6DD]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48]">
              Product Catalogue
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#174D36] tracking-tight mt-1">
              Shop PrimeSource Rice
            </h1>
            <p className="text-sm text-[#555C57] mt-1.5 max-w-2xl">
              100% stone-free, precision-parboiled long-grain rice grown by local farmers in Nasarawa State. Select your preferred packaging size below.
            </p>
          </div>

          {/* Sample Pricing Notice Badge */}
          <div className="bg-[#F3EFE6] border border-[#E2DFD8] rounded-xl p-3 text-xs text-[#555C57] max-w-sm flex items-start gap-2">
            <Info className="w-4 h-4 text-[#174D36] shrink-0 mt-0.5" />
            <span>
              <strong>Demonstration Prices:</strong> The prices below represent calibrated development sample prices for MVP testing and quotation evaluation.
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#EAE6DD] shadow-xs">
        {/* Package Size Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {availableSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => setSizeFilter(size.value)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                sizeFilter === size.value
                  ? 'bg-[#174D36] text-white shadow-xs'
                  : 'bg-[#FAF9F6] text-[#555C57] hover:bg-[#F3EFE6] hover:text-[#174D36]'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#8C948E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rice packages..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#174D36] text-[#242A26]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B726A]" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-lg text-[#242A26] focus:outline-none focus:ring-1 focus:ring-[#174D36] cursor-pointer"
            >
              <option value="default">Sort: Default order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-[#6B726A]">
          Loading products...
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-[#EAE6DD] p-8">
          <Wheat className="w-12 h-12 text-[#C69C48] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#174D36]">No products match your filter</h3>
          <p className="text-xs text-[#6B726A] mt-1 mb-4">Try clearing your search query or selecting a different package size.</p>
          <button
            onClick={() => {
              setSizeFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold bg-[#174D36] text-white rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {sortedProducts.map((product) => {
            const qty = getProductQty(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#EAE6DD] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#174D36]/40 hover:shadow-md transition-all group"
              >
                {/* Product Image */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="relative aspect-4/3 bg-[#F3EFE6] overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-[#174D36] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {product.size}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-[#174D36] text-[11px] font-semibold px-2 py-0.5 rounded-sm">
                    {product.inStock ? `In Stock (${product.stockCount} bags)` : 'Low Stock / Pre-order'}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-bold text-[#174D36] text-base leading-snug hover:underline cursor-pointer mb-1.5"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#555C57] line-clamp-2 mb-3">
                      {product.shortDescription}
                    </p>

                    {/* Specifications metadata */}
                    <div className="text-[11px] text-[#6B726A] space-y-1 mb-4 bg-[#FAF9F6] p-2.5 rounded-lg border border-[#F3EFE6]">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Grain Type:</span>
                        <span className="font-medium text-[#242A26]">{product.grainType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Purity / De-stoning:</span>
                        <span className="font-medium text-[#174D36]">{product.purityPercentage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Broken Ratio:</span>
                        <span className="font-medium text-[#242A26]">{product.brokenRatio}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F3EFE6] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#6B726A]">Price per bag</span>
                        <div className="text-2xl font-extrabold text-[#174D36]">
                          ₦{product.price.toLocaleString('en-NG')}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="text-xs font-semibold text-[#C69C48] hover:text-[#A57F32] cursor-pointer"
                      >
                        Specs & Guide →
                      </button>
                    </div>

                    {/* Quantity Selector & Add to Cart */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#E2DFD8] rounded-lg bg-[#FAF9F6] overflow-hidden">
                        <button
                          onClick={() => handleQtyChange(product.id, -1)}
                          className="px-2.5 py-2 text-xs font-bold text-[#555C57] hover:bg-[#EAE6DD] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-2 text-xs font-bold text-[#174D36] min-w-8 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(product.id, 1)}
                          className="px-2.5 py-2 text-xs font-bold text-[#555C57] hover:bg-[#EAE6DD] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => addToCart(product, qty)}
                        className="flex-1 py-2.5 px-3 text-xs font-bold text-white bg-[#174D36] hover:bg-[#0F3324] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C69C48]" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGE 3: PRODUCT DETAIL MODAL / POPUP */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#EAE6DD] shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 border border-[#E2DFD8] text-[#242A26] hover:bg-neutral-100 flex items-center justify-center cursor-pointer shadow-xs"
              aria-label="Close Product Details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-10">
              {/* Product Large Image */}
              <div className="md:col-span-5 space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-4/3 bg-[#F3EFE6] border border-[#EAE6DD] relative">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#174D36] text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs">
                    {selectedProduct.size} Bag
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F3EFE6] border border-[#E2DFD8] text-xs space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-[#174D36]">
                    <ShieldCheck className="w-4 h-4 text-[#C69C48]" />
                    <span>PrimeSource Quality Guarantee</span>
                  </div>
                  <p className="text-[#555C57] text-[11px] leading-relaxed">
                    Processed with dual rubber-roller dehuskers and Sortex optical sensors to eliminate stones, chaff, and dark grains.
                  </p>
                </div>
              </div>

              {/* Product Information & Purchasing */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C69C48] mb-1">
                    <span>{selectedProduct.origin}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174D36]">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex items-baseline gap-3 mt-3">
                    <span className="text-3xl font-extrabold text-[#174D36]">
                      ₦{selectedProduct.price.toLocaleString('en-NG')}
                    </span>
                    <span className="text-xs text-[#6B726A]">Sample Demonstration Price</span>
                  </div>
                </div>

                <p className="text-sm text-[#4A524D] leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Technical Specifications Table */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#174D36] mb-2">
                    Quality Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF9F6] p-3.5 rounded-xl border border-[#EAE6DD]">
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Grain Classification</span>
                      <strong className="text-[#242A26]">{selectedProduct.grainType}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">De-stoning & Purity</span>
                      <strong className="text-[#174D36]">{selectedProduct.purityPercentage}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Broken Ratio</span>
                      <strong className="text-[#242A26]">{selectedProduct.brokenRatio}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Moisture Level</span>
                      <strong className="text-[#242A26]">{selectedProduct.moistureContent}</strong>
                    </div>
                  </div>
                </div>

                {/* Storage & Cooking Guide */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-[#EAE6DD]">
                    <strong className="text-[#174D36] block mb-0.5">Storage Instruction:</strong>
                    <span className="text-[#555C57]">
                      Store off bare concrete floors on wooden pallets or racks in a well-ventilated, dry environment away from dampness.
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#EAE6DD]">
                    <strong className="text-[#174D36] block mb-0.5">Cooking Performance:</strong>
                    <span className="text-[#555C57]">
                      Requires standard water ratio (1.8 to 2 parts water to 1 part rice). Exceptional expansion ratio without clumping or sogginess.
                    </span>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="flex items-center gap-2 text-xs text-[#555C57] pt-1">
                  <Truck className="w-4 h-4 text-[#C69C48] shrink-0" />
                  <span>
                    Available for delivery in Lafia (same day), Doma, Awe, Assakio, and express shipping to Abuja.
                  </span>
                </div>

                {/* Quantity & Add to Cart Action */}
                <div className="pt-4 border-t border-[#EAE6DD] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex items-center border border-[#E2DFD8] rounded-xl bg-[#FAF9F6] overflow-hidden self-start sm:self-auto">
                    <button
                      onClick={() => setDetailQuantity((q) => Math.max(1, q - 1))}
                      className="px-4 py-3 text-sm font-bold text-[#555C57] hover:bg-[#EAE6DD] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-5 py-3 text-sm font-bold text-[#174D36] min-w-10 text-center">
                      {detailQuantity}
                    </span>
                    <button
                      onClick={() => setDetailQuantity((q) => q + 1)}
                      className="px-4 py-3 text-sm font-bold text-[#555C57] hover:bg-[#EAE6DD] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct, detailQuantity);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#174D36] hover:bg-[#0F3324] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#C69C48]" />
                    <span>Add {detailQuantity} to Cart (₦{(selectedProduct.price * detailQuantity).toLocaleString('en-NG')})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
