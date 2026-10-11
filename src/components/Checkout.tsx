import React, { useState } from 'react';
import { useCart } from '../context/CartContext.tsx';
import { useApp } from '../context/AppContext.tsx';
import { createOrder } from '../services/api.ts';
import { Order, FulfilmentMethod } from '../types/index.ts';
import {
  CheckCircle2,
  Truck,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
  ShoppingBag,
  ExternalLink,
  MessageCircle,
  FileText
} from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, subtotal, clearCart } = useCart();
  const { settings, setCurrentPage, showToast } = useApp();

  const [fulfilmentMethod, setFulfilmentMethod] = useState<FulfilmentMethod>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState(
    settings?.deliveryLocations[0]?.name || 'Lafia Central (Township, GRA, Lowcost)'
  );
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  const selectedLoc = settings?.deliveryLocations.find(
    (l) => l.name.toLowerCase() === deliveryLocation.toLowerCase()
  );

  const deliveryFee = fulfilmentMethod === 'pickup' ? 0 : (selectedLoc ? selectedLoc.fee : 1500);
  const orderTotal = subtotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart.length) {
      showToast('Your cart is empty. Please add items to proceed.', 'error');
      return;
    }
    if (!customerName.trim() || !phone.trim()) {
      showToast('Please provide your full name and phone number.', 'error');
      return;
    }
    if (fulfilmentMethod === 'delivery' && !deliveryAddress.trim()) {
      showToast('Please provide your full delivery address and landmark.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const newOrder = await createOrder({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        fulfilmentMethod,
        deliveryLocation: fulfilmentMethod === 'pickup' ? 'Lafia Mill Center Pickup' : deliveryLocation,
        deliveryAddress: fulfilmentMethod === 'pickup' ? 'Self-Pickup at Lafia Processing Plant' : deliveryAddress.trim(),
        orderNotes: orderNotes.trim() || undefined,
        items: cart.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
      });

      setSubmittedOrder(newOrder);
      clearCart();
      showToast(`Order request #${newOrder.reference} created successfully!`, 'success');
    } catch (err: any) {
      console.error('Checkout failed:', err);
      showToast(err.message || 'Failed to submit order request. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppOrderLink = (order: Order) => {
    const rawPhone = (settings?.whatsapp || '07030881613').replace(/[^0-9]/g, '');
    const itemsText = order.items.map((i) => `• ${i.quantity}x ${i.name} (${i.size}) - ₦${i.subtotal.toLocaleString('en-NG')}`).join('\n');
    const msg = `Hello PrimeSource Rice! 🌾
I have just placed an order request on your website.

Order Reference: *${order.reference}*
Customer Name: *${order.customerName}*
Phone: *${order.phone}*
Fulfilment: *${order.fulfilmentMethod === 'delivery' ? 'Delivery to ' + order.deliveryLocation : 'Self-Pickup at Lafia Mill'}*
${order.fulfilmentMethod === 'delivery' ? 'Address: ' + order.deliveryAddress + '\n' : ''}
Items:
${itemsText}

Order Subtotal: ₦${order.subtotal.toLocaleString('en-NG')}
Delivery Fee: ₦${order.deliveryFee.toLocaleString('en-NG')}
*Total Amount: ₦${order.total.toLocaleString('en-NG')}*

Kindly confirm my order and share payment details. Thank you!`;

    return `https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`;
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-[#EAE6DD] shadow-xl p-6 sm:p-10 space-y-8 text-center sm:text-left">
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-[#EAE6DD]">
            <div className="w-16 h-16 rounded-full bg-[#174D36]/10 text-[#174D36] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-[#174D36]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48]">
              Order Request Received
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#174D36]">
              Thank You, {submittedOrder.customerName}!
            </h1>
            <p className="text-sm text-[#555C57] max-w-lg mx-auto">
              Your order reference is <strong className="text-[#174D36] font-mono text-base">{submittedOrder.reference}</strong>. We have logged your request in our dispatch operations queue.
            </p>
          </div>

          {/* Important MVP Notice: No forced online payment */}
          <div className="bg-[#FAF9F6] border border-[#E2DFD8] rounded-2xl p-5 text-left space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#174D36] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C69C48]" />
              What Happens Next?
            </h4>
            <ul className="text-xs text-[#555C57] space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>Our dispatch desk in Lafia will call or message your phone (<strong className="text-[#242A26]">{submittedOrder.phone}</strong>) within 30 minutes to confirm delivery details.</li>
              <li>Payment is processed safely via bank transfer upon dispatch verification or payment on delivery depending on your location.</li>
              <li>To fast-track confirmation immediately, tap the WhatsApp button below to notify our sales manager directly.</li>
            </ul>
          </div>

          {/* WhatsApp Direct Action */}
          <div className="pt-2">
            <a
              href={getWhatsAppOrderLink(submittedOrder)}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-98"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Confirm Instantly via WhatsApp ({submittedOrder.reference})</span>
              <ExternalLink className="w-4 h-4 opacity-75" />
            </a>
          </div>

          {/* Order Summary breakdown */}
          <div className="bg-neutral-50 rounded-2xl p-5 text-left space-y-3 border border-[#EAE6DD]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#174D36]">
              Order Request Breakdown
            </h3>
            <div className="divide-y divide-neutral-200 text-xs">
              {submittedOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-[#242A26]">{item.quantity}x {item.name}</span>
                    <span className="text-[#6B726A] block text-[11px]">{item.size} bag</span>
                  </div>
                  <span className="font-bold text-[#174D36]">₦{item.subtotal.toLocaleString('en-NG')}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-200 text-xs space-y-1.5">
              <div className="flex justify-between text-[#555C57]">
                <span>Fulfilment</span>
                <span className="font-medium text-[#242A26]">
                  {submittedOrder.fulfilmentMethod === 'delivery' ? `Delivery (${submittedOrder.deliveryLocation})` : 'Warehouse Pickup'}
                </span>
              </div>
              {submittedOrder.fulfilmentMethod === 'delivery' && (
                <div className="flex justify-between text-[#555C57]">
                  <span>Delivery Address</span>
                  <span className="font-medium text-[#242A26] max-w-xs text-right truncate">{submittedOrder.deliveryAddress}</span>
                </div>
              )}
              <div className="flex justify-between text-[#555C57]">
                <span>Subtotal</span>
                <span>₦{submittedOrder.subtotal.toLocaleString('en-NG')}</span>
              </div>
              <div className="flex justify-between text-[#555C57]">
                <span>Delivery Fee</span>
                <span>₦{submittedOrder.deliveryFee.toLocaleString('en-NG')}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#174D36] pt-2 border-t border-neutral-300">
                <span>Total Expected</span>
                <span>₦{submittedOrder.total.toLocaleString('en-NG')}</span>
              </div>
            </div>
          </div>

          {/* Return button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => {
                setSubmittedOrder(null);
                setCurrentPage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-[#174D36] hover:underline cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Rice Catalogue</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // IF CART IS EMPTY
  if (!cart.length) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F3EFE6] text-[#174D36] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8 stroke-1" />
        </div>
        <h2 className="text-xl font-bold text-[#174D36]">Your cart is empty</h2>
        <p className="text-xs text-[#555C57] max-w-sm mx-auto">
          You don't have any rice bags in your cart to checkout. Please browse our product catalog first.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="mt-4 px-6 py-2.5 rounded-lg bg-[#174D36] text-white font-semibold text-xs cursor-pointer shadow-xs"
        >
          Browse Rice Packages
        </button>
      </div>
    );
  }

  // CHECKOUT FORM
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setCurrentPage('shop')}
          className="text-xs font-semibold text-[#555C57] hover:text-[#174D36] flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE6DD] shadow-xs space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48]">
              Step 2 of 2
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#174D36] tracking-tight mt-1">
              Complete Your Order Request
            </h1>
            <p className="text-xs text-[#555C57] mt-1">
              Please enter your delivery details. We will confirm your order and schedule dispatch directly with you.
            </p>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-6">
            {/* Fulfilment Method Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#174D36] mb-2">
                Fulfilment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfilmentMethod('delivery')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 cursor-pointer transition-all ${
                    fulfilmentMethod === 'delivery'
                      ? 'border-[#174D36] bg-[#174D36]/5 ring-1 ring-[#174D36]'
                      : 'border-[#EAE6DD] hover:bg-neutral-50'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#174D36] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-[#174D36]">Doorstep Delivery</strong>
                    <span className="text-[11px] text-[#6B726A]">Direct delivery to your home or shop</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfilmentMethod('pickup')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 cursor-pointer transition-all ${
                    fulfilmentMethod === 'pickup'
                      ? 'border-[#174D36] bg-[#174D36]/5 ring-1 ring-[#174D36]'
                      : 'border-[#EAE6DD] hover:bg-neutral-50'
                  }`}
                >
                  <Building className="w-5 h-5 text-[#174D36] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-[#174D36]">Mill Self-Pickup</strong>
                    <span className="text-[11px] text-[#6B726A]">Collect free at Lafia Processing Hub</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Customer Personal Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#174D36]">
                Customer Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#242A26] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Hajia Fatima Garba"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#242A26] mb-1">
                    Phone Number (WhatsApp preferred) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
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
              </div>

              <div>
                <label className="block text-xs font-medium text-[#242A26] mb-1">
                  Email Address <span className="text-[#8C948E] font-normal">(Optional, for receipt)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                />
              </div>
            </div>

            {/* Delivery Details */}
            {fulfilmentMethod === 'delivery' && (
              <div className="space-y-4 pt-2 border-t border-[#F3EFE6]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#174D36]">
                  Delivery Address & Destination
                </h3>

                <div>
                  <label className="block text-xs font-medium text-[#242A26] mb-1">
                    Delivery Zone / Region <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36] cursor-pointer"
                  >
                    {settings?.deliveryLocations
                      .filter((l) => l.fee > 0)
                      .map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.name} ({loc.state}) — ₦{loc.fee.toLocaleString('en-NG')} ({loc.estimatedDeliveryTime})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#242A26] mb-1">
                    Detailed Street Address & Landmark <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="House/Plot number, street name, nearest junction or notable landmark in Lafia, Doma, Abuja, etc."
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                  />
                </div>
              </div>
            )}

            {fulfilmentMethod === 'pickup' && (
              <div className="p-4 rounded-xl bg-[#F3EFE6] border border-[#E2DFD8] text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#174D36]">
                  <MapPin className="w-4 h-4 text-[#C69C48]" />
                  <span>Pickup Location:</span>
                </div>
                <p className="text-[#4A524D]">
                  {settings?.processingHubAddress || 'Assakio-Lafia, Nasarawa State'}
                </p>
                <p className="text-[11px] text-[#6B726A]">
                  Open Mon - Sat: 8:00 AM - 5:30 PM. No pickup fee charged.
                </p>
              </div>
            )}

            {/* Special Notes */}
            <div>
              <label className="block text-xs font-medium text-[#242A26] mb-1">
                Order Notes / Special Delivery Instructions
              </label>
              <textarea
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="e.g. Call before dispatch, deliver in morning, gate security notice..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 rounded-xl bg-[#174D36] hover:bg-[#0F3324] text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 disabled:opacity-50"
            >
              {submitting ? (
                <span>Submitting Order Request...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#C69C48]" />
                  <span>Submit Order Request (₦{orderTotal.toLocaleString('en-NG')})</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-[#6B726A]">
              We respect your trust: No card details required online. Verified payment on dispatch confirmation.
            </p>
          </form>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#EAE6DD] shadow-xs space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE6DD]">
            <h3 className="font-extrabold text-[#174D36] text-base">Order Summary</h3>
            <span className="text-xs text-[#6B726A]">{cart.length} items</span>
          </div>

          {/* Items List */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-3 text-xs items-center justify-between py-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-11 h-11 rounded-md object-cover border border-[#E2DFD8] shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-[#242A26] truncate">{item.product.name}</p>
                    <p className="text-[11px] text-[#6B726A]">{item.quantity} × ₦{item.product.price.toLocaleString('en-NG')}</p>
                  </div>
                </div>
                <span className="font-bold text-[#174D36] shrink-0">
                  ₦{(item.product.price * item.quantity).toLocaleString('en-NG')}
                </span>
              </div>
            ))}
          </div>

          {/* Cost Summary */}
          <div className="pt-4 border-t border-[#EAE6DD] space-y-2 text-xs">
            <div className="flex justify-between text-[#555C57]">
              <span>Items Subtotal</span>
              <span className="font-semibold text-[#242A26]">₦{subtotal.toLocaleString('en-NG')}</span>
            </div>
            <div className="flex justify-between text-[#555C57]">
              <span>Delivery Fee ({fulfilmentMethod === 'pickup' ? 'Self-Pickup' : deliveryLocation})</span>
              <span className="font-semibold text-[#242A26]">₦{deliveryFee.toLocaleString('en-NG')}</span>
            </div>

            <div className="pt-3 border-t border-[#E2DFD8] flex justify-between items-baseline">
              <span className="text-sm font-extrabold text-[#174D36]">Total Amount</span>
              <span className="text-2xl font-extrabold text-[#174D36]">
                ₦{orderTotal.toLocaleString('en-NG')}
              </span>
            </div>
          </div>

          {/* Value Guarantee */}
          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#EAE6DD] text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#174D36]">
              <Truck className="w-4 h-4 text-[#C69C48]" />
              <span>Prompt Dispatch Timeline</span>
            </div>
            <p className="text-[11px] text-[#6B726A] leading-relaxed">
              Same-day delivery within Lafia. Next-day delivery to Doma, Keana, Awe, Assakio. 24–48hr direct courier to Abuja.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
