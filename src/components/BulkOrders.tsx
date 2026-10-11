import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { createBulkRequest } from '../services/api.ts';
import { BulkRequest } from '../types/index.ts';
import {
  Truck,
  Building2,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const BulkOrders: React.FC = () => {
  const { settings, showToast } = useApp();

  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('Wholesaler / Grain Trader');
  const [preferredSize, setPreferredSize] = useState('50kg Commercial Sacks');
  const [requiredQuantity, setRequiredQuantity] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [preferredDeliveryDate, setPreferredDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<BulkRequest | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !phone.trim() || !requiredQuantity.trim()) {
      showToast('Please provide your business name, phone number, and required quantity.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const req = await createBulkRequest({
        businessName: businessName.trim(),
        contactPerson: contactPerson.trim() || businessName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        businessType,
        preferredSize,
        requiredQuantity: requiredQuantity.trim(),
        deliveryLocation: deliveryLocation.trim() || 'To be specified',
        preferredDeliveryDate: preferredDeliveryDate || 'Immediate / Flexible',
        notes: notes.trim() || undefined,
      });

      setSubmittedRequest(req);
      showToast(`Bulk inquiry #${req.reference} submitted successfully!`, 'success');
    } catch (err: any) {
      console.error('Bulk submission failed:', err);
      showToast(err.message || 'Failed to submit bulk request. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppBulkLink = (req: BulkRequest) => {
    const rawPhone = (settings?.whatsapp || '07030881613').replace(/[^0-9]/g, '');
    const msg = `Hello PrimeSource Rice B2B Desk! 🌾
I have submitted a Bulk Supply Quotation Request:

Request Reference: *${req.reference}*
Business / Entity: *${req.businessName}*
Contact Person: *${req.contactPerson}*
Phone: *${req.phone}*
Business Type: *${req.businessType}*
Package Size: *${req.preferredSize}*
Required Quantity: *${req.requiredQuantity}*
Delivery Destination: *${req.deliveryLocation}*
Preferred Date: *${req.preferredDeliveryDate}*
${req.notes ? 'Special Specs: ' + req.notes + '\n' : ''}
Kindly send us your commercial wholesale quotation and availability schedule. Thank you!`;

    return `https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-[#174D36] text-white p-8 sm:p-12 relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C69C48]/25 text-[#DFBA6D] text-xs font-semibold">
            <Building2 className="w-4 h-4" />
            Wholesale & Institutional B2B Supply
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Bulk Rice Supply for Businesses & Large Buyers
          </h1>
          <p className="text-sm sm:text-base text-[#D5D0C3] leading-relaxed">
            Direct-from-mill volume supply for supermarkets, catering enterprises, hotels, boarding schools, and food distribution wholesalers across Nasarawa State, Abuja, and surrounding regions.
          </p>
        </div>
      </div>

      {/* Main Form or Submission Confirmation */}
      {submittedRequest ? (
        <div className="bg-white rounded-3xl border border-[#EAE6DD] p-8 sm:p-12 shadow-xl max-w-3xl mx-auto space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#174D36]/10 text-[#174D36] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-[#174D36]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C69C48]">
            Quotation Request Received
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174D36]">
            Thank You, {submittedRequest.contactPerson}!
          </h2>
          <p className="text-sm text-[#555C57] max-w-lg mx-auto">
            Your bulk request reference is <strong className="text-[#174D36] font-mono text-base">{submittedRequest.reference}</strong>. Our commercial procurement team will review your requirement and prepare a tailored quotation based on current mill inventory and freight distance.
          </p>

          <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#E2DFD8] text-left text-xs space-y-2">
            <p className="font-semibold text-[#174D36]">Requested Order Details:</p>
            <p className="text-[#555C57]"><strong>Business:</strong> {submittedRequest.businessName} ({submittedRequest.businessType})</p>
            <p className="text-[#555C57]"><strong>Package Size:</strong> {submittedRequest.preferredSize}</p>
            <p className="text-[#555C57]"><strong>Quantity:</strong> {submittedRequest.requiredQuantity}</p>
            <p className="text-[#555C57]"><strong>Destination:</strong> {submittedRequest.deliveryLocation}</p>
          </div>

          <div>
            <a
              href={getWhatsAppBulkLink(submittedRequest)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm sm:text-base transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Fast-Track Quotation on WhatsApp ({submittedRequest.reference})</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>
          </div>

          <button
            onClick={() => setSubmittedRequest(null)}
            className="text-xs text-[#174D36] hover:underline cursor-pointer block mx-auto pt-2"
          >
            Submit Another Bulk Request
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#EAE6DD] p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl font-extrabold text-[#174D36] tracking-tight">
              Submit Your Bulk Supply Requirements
            </h2>
            <p className="text-xs sm:text-sm text-[#555C57] mt-1">
              Fill in your specifications below. Bulk orders are quotation-based to provide you with the best commercial rates for your volume.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1.5">
                  Business / Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Grand Apex Foods Ltd / Lafia Central School"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1.5">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Mr. Sani Abubakar (Procurement Manager)"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0802 345 6789"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1.5">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="purchasing@company.ng"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1.5">
                  Business Classification <span className="text-red-500">*</span>
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36] cursor-pointer"
                >
                  <option value="Wholesaler / Grain Trader">Wholesaler / Grain Trader</option>
                  <option value="Supermarket / Retail Chain">Supermarket / Retail Chain</option>
                  <option value="Restaurant / Fast Food / Hotel">Restaurant / Fast Food / Hotel</option>
                  <option value="Event Catering Service">Event Catering Service</option>
                  <option value="School / University Cafeteria">School / University Cafeteria</option>
                  <option value="Corporate / Festive Staff Hamper Buyer">Corporate / Festive Staff Hamper Buyer</option>
                  <option value="Government / NGO Feeding Program">Government / NGO Feeding Program</option>
                  <option value="Other">Other Institutional Buyer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1.5">
                  Preferred Packaging Size <span className="text-red-500">*</span>
                </label>
                <select
                  value={preferredSize}
                  onChange={(e) => setPreferredSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36] cursor-pointer"
                >
                  <option value="50kg Commercial Sacks">50kg Commercial Sacks</option>
                  <option value="25kg Bags">25kg Bags</option>
                  <option value="10kg Bags">10kg Bags</option>
                  <option value="5kg Packs">5kg Packs</option>
                  <option value="Assorted Mix (50kg, 25kg, 10kg)">Assorted Mix (50kg, 25kg, 10kg)</option>
                  <option value="Raw Cleaned Paddy Rice (Bags/Metric Tons)">Raw Cleaned Paddy Rice (Bags/Metric Tons)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1.5">
                  Estimated Quantity Required <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={requiredQuantity}
                  onChange={(e) => setRequiredQuantity(e.target.value)}
                  placeholder="e.g. 50 bags, 200 bags, 10 tons per month"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1.5">
                  Delivery Destination / Warehouse City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="e.g. Abuja (Wuse 2), Lafia, Keffi, Jos, Makurdi"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242A26] mb-1.5">
                  Target Delivery Date
                </label>
                <input
                  type="date"
                  value={preferredDeliveryDate}
                  onChange={(e) => setPreferredDeliveryDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#242A26] mb-1.5">
                  Special Requirements, Customized Branding or Quality Inquiries
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Require samples first, custom private labeling on 50kg sacks, staggered weekly delivery schedule..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E2DFD8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#174D36]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#174D36] hover:bg-[#0F3324] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Submitting Bulk Request...</span>
                ) : (
                  <>
                    <span>Submit Request for Quotation</span>
                    <ArrowRight className="w-4 h-4 text-[#C69C48]" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
