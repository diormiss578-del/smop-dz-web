import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Smartphone,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  FileCheck2,
  RefreshCw
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { usePcos } from '../context/PcosContext';
import { PaymentMethod } from '../types';

export const PaymentModal: React.FC = () => {
  const { language, activePaymentItem, closePayment, completePayment } = usePcos();
  const isAr = language === 'AR';

  const [method, setMethod] = useState<PaymentMethod>('baridimob');

  // BaridiMob State
  const [copiedRip, setCopiedRip] = useState(false);
  const [baridiTxRef, setBaridiTxRef] = useState('');
  const [baridiPayerPhone, setBaridiPayerPhone] = useState('');

  // CIB / Edahabia State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generatedTxId, setGeneratedTxId] = useState('');

  if (!activePaymentItem) return null;

  const BARIDIMOB_RIP = '007 99999 0023456789 42';
  const BARIDIMOB_HOLDER = 'SMOP DZ - صحة وتغذية المرأة';

  const handleCopyRip = () => {
    navigator.clipboard.writeText(BARIDIMOB_RIP.replace(/\s+/g, ''));
    setCopiedRip(true);
    setTimeout(() => setCopiedRip(false), 2000);
  };

  const handleFormatCard = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/.{1,4}/g);
    setCardNumber(parts ? parts.join(' ') : raw);
  };

  const handleFormatExpiry = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setExpiry(raw);
    }
  };

  const handleBaridiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const txId = 'BM-' + Math.floor(10000000 + Math.random() * 90000000);
      setGeneratedTxId(txId);
      setIsProcessing(false);
      setPaymentSuccess(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleCibInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, '').length < 16) return;
    setIsProcessing(true);
    // Simulate 3D Secure OTP transition
    setTimeout(() => {
      setIsProcessing(false);
      setOtpStep(true);
    }, 1000);
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const txId = 'CIB-' + Math.floor(10000000 + Math.random() * 90000000);
      setGeneratedTxId(txId);
      setIsProcessing(false);
      setPaymentSuccess(true);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleFinish = () => {
    completePayment(method, generatedTxId);
  };

  const itemTitle = isAr ? activePaymentItem.titleAr : activePaymentItem.titleEn;
  const itemDesc = isAr ? activePaymentItem.descriptionAr : activePaymentItem.descriptionEn;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in"
      onClick={closePayment}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 shadow-2xl border border-[#E2E8F0]"
        onClick={(e) => e.stopPropagation()}
        data-testid="payment-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#DDFFBB]/70 flex items-center justify-center text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-[#1E293B]">
                {isAr ? 'بوابة الدفع الإلكتروني الجزائري' : 'Algerian Secure Payment Portal'}
              </h3>
              <p className="text-[11px] text-[#64748B] flex items-center gap-1 font-medium">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>{isAr ? 'دفع آمن عبر بريدي موب وبطاقات CIB / الذهبية' : '100% Secure via BaridiMob & CIB / Edahabia'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={closePayment}
            className="w-8 h-8 rounded-full bg-[#FCF8F9] hover:bg-[#FFCEE3]/40 text-[#64748B] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {paymentSuccess ? (
          /* Success Screen */
          <div className="py-6 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <FileCheck2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                {isAr ? 'عملية دفع مؤكدة ومقبولة' : 'Payment Confirmed & Verified'}
              </span>
              <h4 className="text-lg font-black text-[#1E293B] mt-2">
                {isAr ? 'شكراً لكِ! تم تفعيل طلبكِ بنجاح 🎉' : 'Thank You! Access Unlocked 🎉'}
              </h4>
              <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto leading-relaxed">
                {isAr
                  ? 'تم استلام وتأكيد العملية بنجاح عبر النظام المصرفي الجزائري. بإمكانكِ الآن الاستفادة من المحتوى فوراً.'
                  : 'Your transaction has been processed and your content is now fully unlocked in your account.'}
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-4 text-xs text-start space-y-2 max-w-md mx-auto">
              <div className="flex justify-between items-center text-[#64748B]">
                <span>{isAr ? 'العنصر المشترى:' : 'Purchased Item:'}</span>
                <span className="font-bold text-[#1E293B] text-end">{itemTitle}</span>
              </div>
              <div className="flex justify-between items-center text-[#64748B]">
                <span>{isAr ? 'المبلغ الإجمالي:' : 'Amount Paid:'}</span>
                <span className="font-black text-[#D81B60] text-sm">{activePaymentItem.priceDzd.toLocaleString()} DZD</span>
              </div>
              <div className="flex justify-between items-center text-[#64748B]">
                <span>{isAr ? 'طريقة الدفع:' : 'Payment Method:'}</span>
                <span className="font-bold uppercase text-[#1E293B]">
                  {method === 'baridimob' ? (isAr ? 'بريدي موب (BaridiMob)' : 'BaridiMob') : (isAr ? 'بطاقة CIB / الذهبية' : 'CIB / Edahabia')}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                <span>{isAr ? 'رقم الإيصال:' : 'Receipt Number:'}</span>
                <span className="font-mono font-bold text-[#1E293B]">{generatedTxId}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'متابعة وتصفح المحتوى الآن' : 'Continue to Unlocked Content'}</span>
            </button>
          </div>
        ) : (
          /* Main Payment Workflow */
          <div className="mt-4 space-y-4">
            {/* Purchase Item Card Summary */}
            <div className="bg-[#FCF8F9] border border-[#FFCEE3]/80 rounded-2xl p-3.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-[#D81B60] bg-[#FFCEE3]/40 px-2 py-0.5 rounded-full">
                  {isAr ? 'الطلب الحالي' : 'Selected Item'}
                </span>
                <h4 className="font-extrabold text-xs sm:text-sm text-[#1E293B] mt-1 truncate">
                  {itemTitle}
                </h4>
                <p className="text-[11px] text-[#64748B] truncate mt-0.5">{itemDesc}</p>
              </div>
              <div className="text-end shrink-0">
                <span className="text-[10px] text-[#64748B] block">{isAr ? 'المبلغ المستحق' : 'Price'}</span>
                <span className="text-base sm:text-lg font-black text-[#D81B60]">
                  {activePaymentItem.priceDzd.toLocaleString()} DZD
                </span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div>
              <label className="text-xs font-bold text-[#1E293B] block mb-2">
                {isAr ? 'اختاري وسيلة الدفع المناسبة:' : 'Select Payment Method:'}
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* BaridiMob Tab Button */}
                <button
                  type="button"
                  onClick={() => {
                    setMethod('baridimob');
                    setOtpStep(false);
                  }}
                  className={`p-3 rounded-2xl border text-start transition-all flex items-center gap-3 ${
                    method === 'baridimob'
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                      : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs font-bold">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-black text-xs sm:text-sm text-[#1E293B] block leading-tight">
                      {isAr ? 'بريدي موب' : 'BaridiMob'}
                    </span>
                    <span className="text-[10px] text-emerald-800 font-semibold block mt-0.5">
                      {isAr ? 'بريد الجزائر' : 'Algérie Poste'}
                    </span>
                  </div>
                </button>

                {/* CIB / Edahabia Tab Button */}
                <button
                  type="button"
                  onClick={() => {
                    setMethod('cib');
                    setOtpStep(false);
                  }}
                  className={`p-3 rounded-2xl border text-start transition-all flex items-center gap-3 ${
                    method === 'cib'
                      ? 'border-[#D81B60] bg-rose-50/60 shadow-xs ring-1 ring-[#D81B60]'
                      : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-amber-950 flex items-center justify-center shrink-0 shadow-2xs font-bold">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-black text-xs sm:text-sm text-[#1E293B] block leading-tight">
                      {isAr ? 'البطاقة الذهبية / CIB' : 'CIB & Edahabia'}
                    </span>
                    <span className="text-[10px] text-amber-800 font-semibold block mt-0.5">
                      {isAr ? 'دفع إلكتروني فوري' : 'Instant SATIM'}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: BaridiMob Flow */}
            {method === 'baridimob' && (
              <form onSubmit={handleBaridiSubmit} className="space-y-3.5 pt-1 animate-in fade-in">
                {/* BaridiMob Details Box */}
                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900">
                      {isAr ? 'معلومات حساب بريدي موب (RIP):' : 'BaridiMob Account Details (RIP):'}
                    </span>
                    <span className="text-[10px] bg-emerald-200/70 text-emerald-900 font-black px-2 py-0.5 rounded-md">
                      COMPTE OFFICIEL
                    </span>
                  </div>

                  {/* RIP copy box */}
                  <div className="bg-white border border-emerald-300/80 rounded-xl p-2.5 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[9px] text-[#64748B] block">{isAr ? 'رقم الحساب البريدي الجاري RIP' : 'Postal RIP Account Number'}</span>
                      <span className="font-mono font-bold text-xs sm:text-sm text-[#1E293B] select-all">
                        {BARIDIMOB_RIP}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyRip}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors shrink-0"
                    >
                      {copiedRip ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedRip ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ RIP' : 'Copy')}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-900">
                    <span className="text-[#64748B]">{isAr ? 'اسم المستفيد:' : 'Beneficiary:'}</span>
                    <span className="font-bold">{BARIDIMOB_HOLDER}</span>
                  </div>

                  {/* QR Code for in-app transfer */}
                  <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-3">
                    <div className="w-16 h-16 bg-white p-1 rounded-xl border border-emerald-200 shrink-0 flex items-center justify-center">
                      <QRCodeSVG
                        value={`RIP:${BARIDIMOB_RIP.replace(/\s+/g, '')}&AMOUNT:${activePaymentItem.priceDzd}&NOTE=SMOPDZ`}
                        size={56}
                        level="M"
                        fgColor="#065f46"
                      />
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-snug">
                      {isAr
                        ? 'افتحي تطبيق BaridiMob بهاتفكِ، قومي بالتحويل إلى رقم RIP أعلاه بمبلغ ' + activePaymentItem.priceDzd + ' دج، ثم أدخلي رقم المعاملة بالأسفل.'
                        : 'Open BaridiMob app, make a transfer of ' + activePaymentItem.priceDzd + ' DZD to the RIP above, then input your transaction reference below.'}
                    </p>
                  </div>
                </div>

                {/* Input for Transaction Confirmation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                      {isAr ? 'رقم الهاتف المسجل في بريدي موب *' : 'BaridiMob Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={baridiPayerPhone}
                      onChange={(e) => setBaridiPayerPhone(e.target.value)}
                      placeholder="05 / 06 / 07..."
                      className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-emerald-600 rounded-xl px-3 py-2 text-xs text-[#1E293B] font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                      {isAr ? 'رقم المعاملة أو آخر 6 أرقام للإشعار *' : 'Transaction Ref / Receipt No. *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={baridiTxRef}
                      onChange={(e) => setBaridiTxRef(e.target.value)}
                      placeholder="e.g. 98452104"
                      className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-emerald-600 rounded-xl px-3 py-2 text-xs text-[#1E293B] font-mono outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || !baridiTxRef.trim() || !baridiPayerPhone.trim()}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{isAr ? 'جاري التحقق من إشعار بريدي موب...' : 'Verifying BaridiMob receipt...'}</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isAr ? `تأكيد الدفع عبر بريدي موب (${activePaymentItem.priceDzd} دج)` : `Confirm BaridiMob Payment (${activePaymentItem.priceDzd} DZD)`}</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB CONTENT 2: CIB & Edahabia Flow */}
            {method === 'cib' && (
              <div className="space-y-3.5 pt-1 animate-in fade-in">
                {/* Visual Card Mockup */}
                <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-white rounded-2xl p-4 shadow-md relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-black tracking-widest uppercase opacity-90">
                      EDAHABIA / CIB SATIM
                    </span>
                    <div className="flex gap-1.5 items-center">
                      <span className="bg-white/20 backdrop-blur-xs text-[9px] font-black px-2 py-0.5 rounded">
                        ALGERIE
                      </span>
                    </div>
                  </div>

                  <div className="my-3 flex items-center gap-3">
                    <div className="w-8 h-6 bg-yellow-200/90 rounded border border-yellow-400 flex items-center justify-center text-[7px] text-yellow-950 font-mono font-bold">
                      CHIP
                    </div>
                    <span className="font-mono text-sm sm:text-base tracking-widest font-black">
                      {cardNumber || '6035 •••• •••• ••••'}
                    </span>
                  </div>

                  <div className="flex justify-between items-end text-[10px] pt-1">
                    <div>
                      <span className="block opacity-75 text-[8px] uppercase">{isAr ? 'صاحبة البطاقة' : 'Card Holder'}</span>
                      <span className="font-bold uppercase tracking-wider">{cardHolder || (isAr ? 'الاسم واللقب' : 'NAME SURNAME')}</span>
                    </div>
                    <div>
                      <span className="block opacity-75 text-[8px] uppercase">{isAr ? 'تنتهي في' : 'Expires'}</span>
                      <span className="font-mono font-bold">{expiry || 'MM/YY'}</span>
                    </div>
                  </div>
                </div>

                {!otpStep ? (
                  /* Card Details Input Step */
                  <form onSubmit={handleCibInitiate} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                        {isAr ? 'رقم البطاقة الذهبية أو بطاقة CIB (16 رقم) *' : 'Card Number (16 digits) *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => handleFormatCard(e.target.value)}
                        placeholder="6035 0000 0000 0000"
                        className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#1E293B] font-mono outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                          {isAr ? 'تاريخ نهاية الصلاحية *' : 'Expiry Date (MM/YY) *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={(e) => handleFormatExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-3 py-2 text-xs text-[#1E293B] font-mono outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                          {isAr ? 'رمز الأمان CVV2 (3 أرقام) *' : 'CVV2 (3 digits) *'}
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-3 py-2 text-xs text-[#1E293B] font-mono outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#64748B] block mb-1">
                        {isAr ? 'اسم ولقب صاحبة البطاقة (كما هو مدون عليها) *' : 'Cardholder Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="e.g. AMINA BENALI"
                        className="w-full bg-[#FCF8F9] border border-[#E2E8F0] focus:border-[#D81B60] rounded-xl px-3 py-2 text-xs text-[#1E293B] uppercase outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing || cardNumber.replace(/\s/g, '').length < 16 || !expiry || !cvv}
                      className="w-full py-3 bg-[#D81B60] hover:bg-[#C2185B] disabled:opacity-50 text-white rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{isAr ? 'جاري الاتصال بخادم SATIM...' : 'Connecting to SATIM Gateway...'}</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>{isAr ? `الانتقال لرمز التحقق SMS (${activePaymentItem.priceDzd} دج)` : `Proceed to 3D Secure (${activePaymentItem.priceDzd} DZD)`}</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* 3D Secure / OTP SMS Step */
                  <form onSubmit={handleOtpVerify} className="space-y-3 bg-[#FCF8F9] border border-amber-200 rounded-2xl p-4 animate-in fade-in">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{isAr ? 'تأكيد العملية عبر رمز الأمان SMS (3D Secure)' : 'SATIM 3D Secure SMS Authentication'}</span>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      {isAr
                        ? 'تم إرسال رمز أمان سري مكون من 6 أرقام عبر رسالة قصيرة SMS إلى هاتفكِ المرتبط بالبطاقة الذهبية.'
                        : 'A 6-digit confirmation code was sent via SMS to your phone registered with Algérie Poste / Bank.'}
                    </p>

                    <div>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="••••••"
                        className="w-full text-center bg-white border border-[#CBD5E1] focus:border-[#D81B60] rounded-xl py-2.5 text-base font-mono tracking-widest font-black text-[#1E293B] outline-none"
                      />
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setOtpStep(false)}
                        className="px-3 py-2 bg-white border border-[#E2E8F0] text-[#64748B] rounded-xl text-xs font-semibold"
                      >
                        {isAr ? 'تعديل البيانات' : 'Back'}
                      </button>

                      <button
                        type="submit"
                        disabled={isProcessing || otpCode.length < 4}
                        className="flex-1 py-2.5 bg-[#D81B60] hover:bg-[#C2185B] disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>{isAr ? 'جاري التحقق...' : 'Verifying...'}</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{isAr ? 'تأكيد الخصم والدفع' : 'Authenticate & Pay'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
