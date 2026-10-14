import React, { useState } from 'react';
import { QrCode, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { usePcos } from '../context/PcosContext';
import { APP_SHARED_URL } from '../data/mockData';

export const QrCodeCard: React.FC = () => {
  const { language, setQrDialogVisible } = usePcos();
  const [copied, setCopied] = useState<boolean>(false);
  const isAr = language === 'AR';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(APP_SHARED_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => setQrDialogVisible(true)}
      data-testid="app-qr-code-card"
      className="w-full bg-gradient-to-r from-[#FFF5F9] via-white to-[#FFF0F6] hover:from-[#FFEBF3] hover:to-[#FFE5F0] border-2 border-[#FFCEE3] rounded-3xl p-3.5 sm:p-4 cursor-pointer shadow-xs hover:shadow-md transition-all flex items-center gap-3.5 group relative overflow-hidden"
    >
      {/* Decorative accent */}
      <div className="absolute top-0 end-0 w-24 h-24 bg-gradient-to-bl from-[#D81B60]/10 to-transparent rounded-full blur-xl pointer-events-none" />

      {/* QR Code Thumbnail with gradient match */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1.5 border border-[#FFCEE3] shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
        <img
          src="/smop_app_qr_code.png"
          alt="SMOP DZ App QR Code"
          className="w-full h-full object-contain rounded-xl"
        />
      </div>

      {/* Text Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 bg-[#D81B60]/10 text-[#D81B60] text-[10px] font-black px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 fill-current" />
            <span>{isAr ? 'رمز QR الحصري للتطبيق' : 'Code QR Officiel'}</span>
          </span>
        </div>
        <h4 className="font-extrabold text-xs sm:text-sm text-[#1E293B] group-hover:text-[#D81B60] transition-colors mt-1">
          {isAr ? 'امسحي الرمز لفتح ومشاركة SMOP DZ 📱' : "Scannez pour ouvrir l'application SMOP DZ 📱"}
        </h4>
        <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug line-clamp-2">
          {isAr
            ? 'وجّهي كاميرا هاتفك للدخول المباشر فوراً أو شاركي الرابط مع صديقاتك'
            : "Scannez avec votre appareil photo pour ouvrir l'application directement"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 shrink-0">
        <button
          onClick={handleCopy}
          className="px-2.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#D81B60] text-[#1E293B] hover:text-[#D81B60] font-bold text-xs transition-colors shadow-2xs flex items-center gap-1"
          title={isAr ? 'نسخ الرابط' : 'Copier'}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[10px] text-emerald-700">{isAr ? 'تم!' : 'Copié!'}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#D81B60]" />
              <span className="text-[10px]">{isAr ? 'نسخ' : 'Copier'}</span>
            </>
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setQrDialogVisible(true);
          }}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D81B60] to-[#AD1457] hover:from-[#C2185B] hover:to-[#880E4F] text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>{isAr ? 'تكبير' : 'Agrandir'}</span>
        </button>
      </div>
    </div>
  );
};
