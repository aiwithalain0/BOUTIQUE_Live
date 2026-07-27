'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  QrCode,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Building,
  Wallet,
  Smartphone,
  MapPin,
  ShieldCheck,
  Truck,
  Copy,
  Check,
  Sparkles,
  Download,
  RotateCcw,
  FileText,
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

type PaymentTab = 'upi' | 'card' | 'netbanking' | 'wallet';

export function CheckoutModal() {
  const {
    cart,
    checkoutOpen,
    setCheckoutOpen,
    clearCart,
    user,
    formatPrice,
    formattedTotalCartPrice,
    currencySymbol,
    t,
  } = useShop();

  // Shipping Form State
  const [shippingData, setShippingData] = useState({
    fullName: user?.name || 'Aarav Sharma',
    phone: '+91 98765 43210',
    address: '42, Boulevard Heights, MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
  });

  // Payment Option State
  const [activePayment, setActivePayment] = useState<PaymentTab>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'paytm' | 'phonepe' | 'custom'>('gpay');
  const [customUpiId, setCustomUpiId] = useState('');
  
  // Card state
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [selectedEmi, setSelectedEmi] = useState('full');

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Wallet state
  const [selectedWallet, setSelectedWallet] = useState('Amazon Pay');

  // Flow State
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('lavenir.boutique@icici');
    setCopiedUpi(true);
    toast.success('UPI ID copied to clipboard!');
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleDownloadInvoice = () => {
    const customerName = user?.name || shippingData.fullName || 'Valued Guest';
    const customerEmail = user?.email || 'customer@lavenir-boutique.com';
    const invoiceContent = `====================================================
L'AVENIR LUXURY BOUTIQUE & DIGITAL STUDIO
INVOICE SUMMARY - ORDER #${orderId || 'LAV-98124'}
====================================================
Date: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}
Customer: ${customerName}
Email: ${customerEmail}
Phone: ${shippingData.phone}
Shipping Address:
${shippingData.address}, ${shippingData.city}, ${shippingData.state} - ${shippingData.pincode}

ITEMS PURCHASED:
----------------------------------------------------
${cart.map((item, idx) => `${idx + 1}. ${item.product.name} (Size: ${item.selectedSize}, Qty: ${item.quantity}) - ${formatPrice(item.product.price)}`).join('\n') || 'Boutique Apparel Collection Ensembles'}

----------------------------------------------------
TOTAL AMOUNT PAID: ${formattedTotalCartPrice}
PAYMENT METHOD: ${activePayment.toUpperCase()} (Verified & Paid)
GUARANTEE: 7-Day Easy Returns Guarantee Included

Thank you for shopping with L’AVENIR.
For assistance, contact concierge@lavenir-atelier.com
====================================================`;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LAVENIR_Invoice_${orderId || 'Order'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Invoice Summary downloaded!');
  };

  const handleProceedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingData.fullName || !shippingData.phone || !shippingData.address || !shippingData.pincode) {
      toast.error('Please complete all required shipping fields.');
      return;
    }

    setIsProcessing(true);
    const generatedOrderId = `LAV-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(generatedOrderId);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      toast.success('Order Successfully Confirmed!');
      
      // Micro-interaction Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#435B47', '#86A386', '#C2D0C0', '#F3EDE2', '#354938'],
        });
      } catch (err) {
        console.error(err);
      }

      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    setTimeout(() => {
      setStep('checkout');
    }, 300);
  };

  return (
    <Dialog open={checkoutOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl w-[94vw] sm:w-full bg-[#F3EDE2] text-[#222831] border border-[#C2D0C0] p-0 overflow-hidden rounded-3xl shadow-2xl max-h-[92vh] flex flex-col">
        {step === 'checkout' ? (
          <form onSubmit={handleProceedPayment} className="flex flex-col h-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#435B47] p-5 sm:p-6 border-b border-[#86A386] flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#86A386] px-3 py-1 rounded-full border border-white/20 inline-block mb-1">
                  Express Checkout
                </span>
                <DialogTitle className="text-xl sm:text-2xl font-serif font-bold text-white">
                  L’AVENIR Luxury Checkout
                </DialogTitle>
                <DialogDescription className="text-xs text-white/90">
                  Select payment method & confirm your boutique shipping address
                </DialogDescription>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-[11px] text-white/80 block">Total Amount</span>
                <span className="text-2xl font-serif font-bold text-white">
                  {formattedTotalCartPrice}
                </span>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 text-left bg-[#F3EDE2]">
              {/* 1. SHIPPING ADDRESS FORM */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#435B47]">
                  <MapPin className="w-4 h-4 text-[#435B47]" />
                  <span>1. Shipping Address</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-2xl border border-[#C2D0C0] shadow-sm">
                  <div>
                    <label className="block text-[11px] text-[#222831]/80 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={shippingData.fullName}
                      onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                      className="w-full bg-[#F3EDE2]/60 border border-[#C2D0C0] rounded-xl px-3 py-2 text-xs text-[#222831] placeholder-[#222831]/40 focus:outline-none focus:border-[#435B47]"
                      placeholder="Full Name"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#222831]/80 font-semibold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      className="w-full bg-[#F3EDE2]/60 border border-[#C2D0C0] rounded-xl px-3 py-2 text-xs text-[#222831] placeholder-[#222831]/40 focus:outline-none focus:border-[#435B47]"
                      placeholder="+91 Phone"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#222831]/80 font-semibold mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={shippingData.address}
                      onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                      className="w-full bg-[#F3EDE2]/60 border border-[#C2D0C0] rounded-xl px-3 py-2 text-xs text-[#222831] placeholder-[#222831]/40 focus:outline-none focus:border-[#435B47]"
                      placeholder="Apartment, suite, street"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#222831]/80 font-semibold mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={shippingData.city}
                      onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                      className="w-full bg-[#F3EDE2]/60 border border-[#C2D0C0] rounded-xl px-3 py-2 text-xs text-[#222831] focus:outline-none focus:border-[#435B47]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#222831]/80 font-semibold mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={shippingData.pincode}
                      onChange={(e) => setShippingData({ ...shippingData, pincode: e.target.value })}
                      className="w-full bg-[#F3EDE2]/60 border border-[#C2D0C0] rounded-xl px-3 py-2 text-xs text-[#222831] focus:outline-none focus:border-[#435B47]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. PAYMENT METHODS SELECTION */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#435B47]">
                  <CreditCard className="w-4 h-4 text-[#435B47]" />
                  <span>2. Select Payment Method</span>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-4 gap-1.5 bg-white p-1.5 rounded-2xl border border-[#C2D0C0] shadow-sm">
                  <button
                    type="button"
                    onClick={() => setActivePayment('upi')}
                    className={`py-2 px-1 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 transition-all ${
                      activePayment === 'upi'
                        ? 'bg-[#435B47] text-white shadow-md'
                        : 'text-[#222831]/70 hover:text-[#222831]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePayment('card')}
                    className={`py-2 px-1 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 transition-all ${
                      activePayment === 'card'
                        ? 'bg-[#435B47] text-white shadow-md'
                        : 'text-[#222831]/70 hover:text-[#222831]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Card / EMI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePayment('netbanking')}
                    className={`py-2 px-1 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 transition-all ${
                      activePayment === 'netbanking'
                        ? 'bg-[#435B47] text-white shadow-md'
                        : 'text-[#222831]/70 hover:text-[#222831]'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePayment('wallet')}
                    className={`py-2 px-1 text-[11px] font-bold rounded-xl flex flex-col items-center gap-1 transition-all ${
                      activePayment === 'wallet'
                        ? 'bg-[#435B47] text-white shadow-md'
                        : 'text-[#222831]/70 hover:text-[#222831]'
                    }`}
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Wallets</span>
                  </button>
                </div>

                {/* Tab 1: UPI & QR Code */}
                {activePayment === 'upi' && (
                  <div className="bg-white p-4 rounded-2xl border border-[#C2D0C0] space-y-4 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      {/* Generated QR Box */}
                      <div className="text-center p-3 bg-[#F3EDE2] rounded-2xl border-2 border-[#435B47] shadow-md space-y-2">
                        <div className="relative w-36 h-36 mx-auto">
                          <Image
                            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=lavenir@icici"
                            alt="L’AVENIR UPI QR"
                            fill
                            sizes="144px"
                            unoptimized
                            className="object-contain"
                          />
                        </div>
                        <div className="text-[10px] text-[#222831] font-bold flex items-center justify-center gap-1">
                          <span>Scan with any UPI App</span>
                        </div>
                      </div>

                      {/* UPI Apps Selection & Copy ID */}
                      <div className="space-y-3 text-xs">
                        <p className="font-bold text-[#222831]">Instant App Launch</p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedUpiApp('gpay')}
                            className={`p-2.5 rounded-xl border text-center font-bold flex items-center justify-center gap-2 transition-all ${
                              selectedUpiApp === 'gpay'
                                ? 'bg-[#435B47] text-white border-[#435B47]'
                                : 'bg-[#F3EDE2] border-[#C2D0C0] text-[#222831]'
                            }`}
                          >
                            Google Pay
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedUpiApp('phonepe')}
                            className={`p-2.5 rounded-xl border text-center font-bold flex items-center justify-center gap-2 transition-all ${
                              selectedUpiApp === 'phonepe'
                                ? 'bg-[#435B47] text-white border-[#435B47]'
                                : 'bg-[#F3EDE2] border-[#C2D0C0] text-[#222831]'
                            }`}
                          >
                            PhonePe
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedUpiApp('paytm')}
                            className={`p-2.5 rounded-xl border text-center font-bold flex items-center justify-center gap-2 transition-all ${
                              selectedUpiApp === 'paytm'
                                ? 'bg-[#435B47] text-white border-[#435B47]'
                                : 'bg-[#F3EDE2] border-[#C2D0C0] text-[#222831]'
                            }`}
                          >
                            Paytm UPI
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedUpiApp('custom')}
                            className={`p-2.5 rounded-xl border text-center font-bold flex items-center justify-center gap-2 transition-all ${
                              selectedUpiApp === 'custom'
                                ? 'bg-[#435B47] text-white border-[#435B47]'
                                : 'bg-[#F3EDE2] border-[#C2D0C0] text-[#222831]'
                            }`}
                          >
                            Enter VPA ID
                          </button>
                        </div>

                        {selectedUpiApp === 'custom' && (
                          <input
                            type="text"
                            placeholder="username@okaxis or 9876543210@paytm"
                            value={customUpiId}
                            onChange={(e) => setCustomUpiId(e.target.value)}
                            className="w-full bg-[#F3EDE2] border border-[#C2D0C0] rounded-xl p-2.5 text-xs text-[#222831] placeholder-[#222831]/40 focus:outline-none focus:border-[#435B47]"
                          />
                        )}

                        <div className="pt-2 border-t border-[#C2D0C0] flex items-center justify-between text-[11px]">
                          <span className="text-[#222831]/70">Boutique VPA:</span>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="flex items-center gap-1.5 font-mono text-[#435B47] font-bold bg-[#86A386]/20 px-2 py-1 rounded-lg border border-[#86A386]"
                          >
                            <span>lavenir.boutique@icici</span>
                            {copiedUpi ? <Check className="w-3 h-3 text-[#435B47]" /> : <Copy className="w-3 h-3 text-[#435B47]" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Credit/Debit Card & EMI Options */}
                {activePayment === 'card' && (
                  <div className="bg-white p-4 rounded-2xl border border-[#C2D0C0] space-y-3 shadow-sm">
                    <div>
                      <label className="block text-[11px] text-[#222831]/80 font-semibold mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#F3EDE2] border border-[#C2D0C0] rounded-xl p-2.5 text-xs font-mono text-[#222831] focus:outline-none focus:border-[#435B47]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#222831]/80 font-semibold mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-[#F3EDE2] border border-[#C2D0C0] rounded-xl p-2.5 text-xs font-mono text-[#222831] focus:outline-none focus:border-[#435B47]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#222831]/80 font-semibold mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-[#F3EDE2] border border-[#C2D0C0] rounded-xl p-2.5 text-xs font-mono text-[#222831] focus:outline-none focus:border-[#435B47]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#222831]/80 font-semibold mb-1">
                        EMI Tenure Selection
                      </label>
                      <select
                        value={selectedEmi}
                        onChange={(e) => setSelectedEmi(e.target.value)}
                        className="w-full bg-[#F3EDE2] border border-[#C2D0C0] rounded-xl p-2.5 text-xs text-[#222831] focus:outline-none focus:border-[#435B47]"
                      >
                        <option value="full">Pay Full Amount (No EMI)</option>
                        <option value="3m">3 Months No-Cost EMI (0% Interest)</option>
                        <option value="6m">6 Months No-Cost EMI (0% Interest)</option>
                        <option value="12m">12 Months Low Interest EMI</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Tab 3: Net Banking */}
                {activePayment === 'netbanking' && (
                  <div className="bg-white p-4 rounded-2xl border border-[#C2D0C0] space-y-3 shadow-sm">
                    <p className="text-xs font-bold text-[#222831]">Select Popular Indian Bank</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank', 'Yes Bank'].map(
                        (bank) => (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => setSelectedBank(bank)}
                            className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                              selectedBank === bank
                                ? 'bg-[#435B47] text-white border-[#435B47]'
                                : 'bg-[#F3EDE2] border-[#C2D0C0] text-[#222831] hover:bg-[#C2D0C0]/30'
                            }`}
                          >
                            {bank}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Tab 4: Wallets */}
                {activePayment === 'wallet' && (
                  <div className="bg-white p-4 rounded-2xl border border-[#C2D0C0] space-y-3 shadow-sm">
                    <p className="text-xs font-bold text-[#222831]">Select Digital Wallet</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['Amazon Pay', 'MobiKwik', 'PhonePe Wallet', 'Freecharge'].map((wallet) => (
                        <button
                          key={wallet}
                          type="button"
                          onClick={() => setSelectedWallet(wallet)}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                            selectedWallet === wallet
                              ? 'bg-[#435B47] text-white border-[#435B47]'
                              : 'bg-[#F3EDE2] border-[#C2D0C0] text-[#222831] hover:bg-[#C2D0C0]/30'
                          }`}
                        >
                          {wallet}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 bg-[#F3EDE2] border-t border-[#C2D0C0] flex items-center justify-between gap-4">
              <div className="sm:hidden">
                <span className="text-[10px] text-[#222831]/60 block">Total Payable</span>
                <span className="text-lg font-serif font-bold text-[#435B47]">
                  {formattedTotalCartPrice}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 py-3.5 rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold text-sm transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Proceed to Pay ({formattedTotalCartPrice})</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* SUCCESS CONFIRMATION MODAL */
          <div className="p-6 sm:p-8 space-y-6 text-center my-auto animate-fade-in bg-[#F3EDE2]">
            {/* Animated Checkmark Circle */}
            <div className="w-20 h-20 rounded-full bg-[#86A386]/20 border-2 border-[#435B47] flex items-center justify-center mx-auto text-[#435B47] animate-bounce shadow-xl">
              <CheckCircle2 className="w-10 h-10 text-[#435B47]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white bg-[#435B47] px-3.5 py-1 rounded-full border border-[#435B47] inline-block shadow-md">
                Order Confirmed • ID #{orderId}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#222831]">
                Order Successfully Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-[#222831]/85 max-w-md mx-auto leading-relaxed font-light">
                Thank you for your order, <strong className="text-[#435B47]">{user?.name || shippingData.fullName}</strong>. A confirmation email and tracking details have been sent to <span className="text-[#435B47] underline">{user?.email || 'your registered email'}</span>.
              </p>
            </div>

            {/* Order Details & 7-Day Guarantee Card */}
            <div className="bg-white border border-[#C2D0C0] rounded-2xl p-4 text-left space-y-3 shadow-md">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#C2D0C0]">
                <span className="text-[#222831]/60">Estimated Delivery:</span>
                <span className="font-bold text-[#435B47] flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#435B47]" /> 2–3 Business Days
                </span>
              </div>

              <div className="text-xs space-y-1">
                <p className="text-[#222831]/60 font-semibold">Delivering To:</p>
                <p className="text-[#222831] font-bold">{shippingData.fullName}</p>
                <p className="text-[#222831]/80">{shippingData.address}, {shippingData.city}, {shippingData.pincode}</p>
              </div>

              <div className="pt-2 border-t border-[#C2D0C0] flex justify-between items-center text-xs">
                <span className="text-[#222831]/60">Guarantee Included:</span>
                <span className="font-bold text-[#435B47] flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-[#435B47]" /> 7-Day Easy Returns
                </span>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="flex-1 py-3 rounded-full bg-white hover:bg-[#F3EDE2] text-[#222831] border border-[#C2D0C0] font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-[#435B47]" />
                <span>Download Invoice Summary</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 rounded-full bg-[#435B47] hover:bg-[#354938] text-white font-bold text-xs transition-all shadow-xl hover:scale-105"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
