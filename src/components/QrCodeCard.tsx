import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { usePcos } from '../context/PcosContext';
import { APP_SHARED_URL } from '../data/mockData';

export const QrCodeCard: React.FC = () => {
  const { language, setQrDialogVisible } = usePcos();
  const isAr = language === 'AR';

  return (
    <div
      onClick={() => setQrDialogVisible(true)}
      data-testid="app-qr-code-card"
      className="w-full bg-[#FCF8F9] hover:bg-[#FFF0F6] border border-[#FFCEE3]/80 rounded-2xl p-3.5 cursor-pointer shadow-xs transition-all flex items-center gap-3.5 group"
    >
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-xl bg-white p-1 border border-[#E2E8F0] shadow-2xs flex items-center justify-center shrink-0">
        <QRCodeSVG
          value={APP_SHARED_URL}
          size={56}
          fgColor="#D81B60"
          bgColor="#FFFFFF"
          level="M"
          includeMargin={true}
        />
      </div>

      {/* Text Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-xs sm:text-sm text-[#1E293B] group-hover:text-[#D81B60] transition-colors flex items-center gap-1.5">
          <span>{isAr ? 'رمز QR لمشاركة وتصفح التطبيق 📱' : "Code QR de l'Application 📱"}</span>
        </h4>
        <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
          {isAr
            ? 'امسحي الرمز بكاميرا الهاتف أو شاركي الرابط المباشر لفتح التطبيق للجميع'
            : "Scannez le code ou partagez le lien direct pour ouvrir l'application"}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setQrDialogVisible(true);
        }}
        className="px-3 py-1.5 rounded-full bg-[#FFCEE3]/80 hover:bg-[#FFCEE3] text-[#D81B60] font-bold text-xs shrink-0 transition-colors shadow-2xs"
      >
        {isAr ? 'عرض' : 'Voir'}
      </button>
    </div>
  );
};
