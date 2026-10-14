import React, { useState } from 'react';
import { X, Copy, Check, Share2, ExternalLink, QrCode, Download, Smartphone, Sparkles, CheckCircle } from 'lucide-react';
import { usePcos } from '../context/PcosContext';
import { APP_SHARED_URL } from '../data/mockData';

export const QrCodeModal: React.FC = () => {
  const { language, qrDialogVisible, setQrDialogVisible } = usePcos();
  const [copied, setCopied] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const isAr = language === 'AR';

  if (!qrDialogVisible) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(APP_SHARED_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: isAr ? 'تطبيق SMOP DZ لصحة المرأة وتكيس المبايض' : 'Application SMOP DZ - Santé Hormonale',
          text: isAr
            ? `مرحباً! تفضلي برابط تطبيق SMOP DZ المخصص لمتلازمة تكيس المبايض وصحة المرأة في الجزائر:\n${APP_SHARED_URL}`
            : `Bonjour ! Découvrez l'application SMOP DZ dédiée au SOPK et à la santé hormonale en Algérie :\n${APP_SHARED_URL}`,
          url: APP_SHARED_URL
        });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = '/smop_app_qr_code.png';
      link.download = 'SMOP_DZ_QR_Code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setQrDialogVisible(false)}
    >
      <div
        className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full p-5 sm:p-6 shadow-2xl border-2 border-[#FFCEE3] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        data-testid="app-qr-code-dialog"
      >
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D81B60]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E8F0]/70 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D81B60] to-[#E040FB] flex items-center justify-center text-white shadow-xs">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm sm:text-base text-[#1E293B]">
                  {isAr ? 'رمز QR لتطبيق SMOP DZ' : "Code QR de l'Application"}
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {isAr ? 'فعّال ✓' : 'Actif'}
                </span>
              </div>
              <p className="text-[11px] text-[#64748B]">
                {isAr ? 'العافية الهرمونية للجزائريات' : 'Santé Hormonale Féminine'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setQrDialogVisible(false)}
            className="w-8 h-8 rounded-full bg-[#FCF8F9] hover:bg-[#FFCEE3]/50 text-[#64748B] hover:text-[#1E293B] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Presentation */}
        <div className="py-4 flex flex-col items-center relative z-10">
          {/* Main Visual QR Image Container with gradient border */}
          <div className="relative p-3.5 bg-gradient-to-b from-[#FFF5F9] to-white rounded-3xl border-2 border-[#FFCEE3] shadow-md flex items-center justify-center group">
            <img
              src="/smop_app_qr_code.png"
              alt="Code QR SMOP DZ"
              className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-2xl"
            />
          </div>

          {/* Device scanner guidance */}
          <div className="mt-3.5 bg-emerald-50/80 border border-emerald-200 text-emerald-950 rounded-2xl p-2.5 text-center text-xs flex items-center justify-center gap-2 w-full">
            <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-[11px] leading-snug">
              {isAr
                ? 'وجّهي كاميرا هاتفك (Android أو iPhone) لمسح الرمز والدخول المباشر فوراً.'
                : "Scannez avec l'appareil photo de n'importe quel smartphone pour ouvrir l'app."}
            </span>
          </div>

          {/* URL Box with Quick Copy */}
          <div className="w-full mt-3 bg-[#FCF8F9] border border-[#E2E8F0] rounded-2xl p-2.5 flex items-center justify-between gap-2">
            <span className="text-xs text-[#1E293B] font-mono truncate select-all font-semibold">
              {APP_SHARED_URL}
            </span>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#D81B60] text-[#D81B60] transition-colors shrink-0 flex items-center gap-1 text-xs font-bold shadow-2xs"
              title={isAr ? 'نسخ الرابط' : 'Copier'}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 text-[10px]">{isAr ? 'تم النسخ!' : 'Copié!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{isAr ? 'نسخ' : 'Copier'}</span>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons: Download PNG, Share, Open in Browser */}
          <div className="w-full grid grid-cols-3 gap-2 mt-3.5">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="truncate">{isAr ? 'تحميل الصورة' : 'Télécharger'}</span>
            </button>

            <button
              onClick={handleShare}
              data-testid="share-qr-btn"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-gradient-to-r from-[#D81B60] to-[#C2185B] hover:opacity-95 text-white rounded-xl font-bold text-xs shadow-2xs transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="truncate">{isAr ? 'مشاركة' : 'Partager'}</span>
            </button>

            <a
              href={APP_SHARED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-white border border-[#E2E8F0] hover:bg-[#FCF8F9] text-[#1E293B] rounded-xl font-bold text-xs shadow-2xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="truncate">{isAr ? 'فتح الرابط' : 'Ouvrir'}</span>
            </a>
          </div>

          {downloaded && (
            <p className="text-[11px] text-emerald-600 font-bold mt-2 text-center animate-in fade-in flex items-center justify-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isAr ? 'تم تحميل صورة رمز QR بنجاح!' : 'Image téléchargée avec succès !'}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
