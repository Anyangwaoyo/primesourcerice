import React from 'react';
import { useCart } from '../context/CartContext.tsx';
import { useApp } from '../context/AppContext.tsx';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, subtotal, cartCount } = useCart();
  const { setCurrentPage } = useApp();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              <h2 className="text-lg font-bold text-[#174D36]">Your Rice Basket</h2>
              <span className="text-xs font-semibold text-[#C69C48] bg-[#C69C48]/10 px-2 py-0.5 rounded-full">
                {cartCount} {cartCount === 1 ? 'bag' : 'bags'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#B8B1A0] mx-auto stroke-1" />
                <p className="text-sm font-semibold text-[#174D36]">Your cart is empty</p>
                <p className="text-xs text-[#6B726A] max-w-xs mx-auto">
                  Browse our selection of stone-free Nigerian parboiled rice in 5kg, 10kg, 25kg, and 50kg bags.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="mt-3 px-4 py-2 text-xs font-bold text-white bg-[#174D36] rounded-lg cursor-pointer"
                >
                  Shop Rice Now
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3.5 rounded-xl border border-[#EAE6DD] bg-[#FAF9F6]/50 items-center justify-between"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover border border-[#E2DFD8] shrink-0"
                  />

                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-xs font-bold text-[#174D36] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-[#6B726A]">{item.product.size} bag</p>
                    <p className="text-xs font-extrabold text-[#174D36] mt-1">
                      ₦{(item.product.price * item.quantity).toLocaleString('en-NG')}
                    </p>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-[#E2DFD8] rounded-md bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-[#174D36]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#EAE6DD] bg-[#FAF9F6] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#555C57]">
                  <span>Order Subtotal</span>
                  <span className="font-semibold text-[#242A26]">₦{subtotal.toLocaleString('en-NG')}</span>
                </div>
                <div className="flex justify-between text-[#6B726A] text-[11px]">
                  <span>Delivery Fee</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2DFD8] flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#174D36]">Estimated Total</span>
                <span className="text-xl font-extrabold text-[#174D36]">
                  ₦{subtotal.toLocaleString('en-NG')}
                </span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#174D36] hover:bg-[#0F3324] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#6B726A]">
                Secure Order Request · Payment confirmed upon delivery verification
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
