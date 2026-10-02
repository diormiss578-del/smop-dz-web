import React, { useState, useRef } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { X, Copy, Check, Share2, ExternalLink, Palette, QrCode, Download, Sparkles, Smartphone, CheckCircle } from 'lucide-react';
import { usePcos } from '../context/PcosContext';
import { APP_SHARED_URL } from '../data/mockData';

export const QrCodeModal: React.FC = () => {
  const { language, qrDialogVisible, setQrDialogVisible } = usePcos();
  const [colorMode, setColorMode] = useState<'classic' | 'brand'>('classic');
  const [withLogo, setWithLogo] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isAr = language === 'AR';

  if (!qrDialogVisible) return null;

  // Classic dark color is #0F172A (slate-900) for highest contrast, brand is #D81B60
  const fgColor = colorMode === 'brand' ? '#D81B60' : '#0F172A';

  const handleCopy = () => {
    navigator.clipboard.writeText(APP_SHARED_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: isAr ? 'تطبيق SMOP DZ لصحة المرأة ومتلازمة تكيس المبايض' : 'Application SMOP DZ - Santé de la Femme',
          text: isAr
            ? `مرحباً! تفضلي برابط تطبيق SMOP DZ لمتلازمة تكيس المبايض والغذاء الصحي بالبليدة:\n${APP_SHARED_URL}`
            : `Bonjour ! Découvrez l'application SMOP DZ dédiée au SOPK et à l'alimentation saine :\n${APP_SHARED_URL}`,
          url: APP_SHARED_URL
        });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleDownloadQr = () => {
    try {
      // Find the hidden or visible canvas
      const canvas = canvasRef.current || document.getElementById('smop-qr-canvas') as HTMLCanvasElement;
      if (!canvas) return;

      // Create high-res download canvas with white border and branded footer
      const exportCanvas = document.createElement('canvas');
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) return;

      const padding = 40;
      const footerHeight = 70;
      exportCanvas.width = canvas.width + padding * 2;
      exportCanvas.height = canvas.height + padding * 2 + footerHeight;

      // Draw background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

      // Draw QR Code
      ctx.drawImage(canvas, padding, padding);

      // Draw Header Text
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 20px Cairo, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SMOP DZ - لمتلازمة تكيس المبايض', exportCanvas.width / 2, exportCanvas.height - 45);

      // Draw Subtitle / URL
      ctx.fillStyle = '#D81B60';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('ai.studio/apps/46bef3e5-6732-48be-8abb-8db100012cf3', exportCanvas.width / 2, exportCanvas.height - 22);

      // Download
      const dataUrl = exportCanvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = 'SMOP_DZ_App_QRCode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      console.error('Download QR failed', e);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setQrDialogVisible(false)}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-[#E2E8F0] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        data-testid="app-qr-code-dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E8F0]/70">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFCEE3]/60 flex items-center justify-center text-[#D81B60]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm sm:text-base text-[#1E293B]">
                  {isAr ? 'رمز QR لدخول وتصفح التطبيق' : "Code QR de l'Application"}
                </h3>
                <span className="bg-emerald-100 text-emerald-900 text-[9px] font-black px-2 py-0.2 rounded-full">
                  {isAr ? 'فعّال للجميع ✓' : 'Active'}
                </span>
              </div>
              <p className="text-[11px] text-[#64748B]">
                {isAr ? 'امسحي بكاميرا أي هاتف للدخول الفوري' : 'Scan with any phone camera to open'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setQrDialogVisible(false)}
            className="w-8 h-8 rounded-full bg-[#FCF8F9] hover:bg-[#FFCEE3]/40 text-[#64748B] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Presentation */}
        <div className="py-4 flex flex-col items-center">
          {/* Main Visual QR Code Container with guaranteed white quiet zone margin */}
          <div className="relative p-4 bg-white rounded-2xl border-2 border-[#E2E8F0] shadow-md flex items-center justify-center">
            <QRCodeSVG
              value={APP_SHARED_URL}
              size={210}
              fgColor={fgColor}
              bgColor="#FFFFFF"
              level="H"
              includeMargin={true}
              imageSettings={
                withLogo
                  ? {
                      src: '/smop_dz_logo.jpg',
                      height: 42,
                      width: 42,
                      excavate: true
                    }
                  : undefined
              }
            />

            {/* Hidden canvas for high-resolution PNG download */}
            <div className="hidden">
              <QRCodeCanvas
                id="smop-qr-canvas"
                ref={canvasRef}
                value={APP_SHARED_URL}
                size={400}
                fgColor={fgColor}
                bgColor="#FFFFFF"
                level="H"
                includeMargin={true}
                imageSettings={
                  withLogo
                    ? {
                        src: '/smop_dz_logo.jpg',
                        height: 76,
                        width: 76,
                        excavate: true
                      }
                    : undefined
                }
              />
            </div>
          </div>

          {/* Quick Controls: Color & Logo options */}
          <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
            {/* Contrast toggle */}
            <div className="inline-flex rounded-xl p-0.5 bg-[#FCF8F9] border border-[#E2E8F0] text-[11px]">
              <button
                type="button"
                onClick={() => setColorMode('classic')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  colorMode === 'classic'
                    ? 'bg-[#0F172A] text-white shadow-2xs'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                {isAr ? 'أسود عالي التباين (أسرع مسح)' : 'Noir (Recommandé)'}
              </button>
              <button
                type="button"
                onClick={() => setColorMode('brand')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  colorMode === 'brand'
                    ? 'bg-[#D81B60] text-white shadow-2xs'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                {isAr ? 'وردي SMOP' : 'Rose SMOP'}
              </button>
            </div>

            {/* Logo toggle */}
            <button
              type="button"
              onClick={() => setWithLogo(!withLogo)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all ${
                withLogo
                  ? 'bg-rose-50 text-[#D81B60] border-[#FFCEE3]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0]'
              }`}
            >
              {withLogo ? (isAr ? '✓ مع الشعار' : 'Avec Logo') : (isAr ? 'بدون شعار' : 'Sans Logo')}
            </button>
          </div>

          {/* Scanner Instructions */}
          <div className="mt-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl p-2.5 text-center text-xs text-emerald-950 flex items-center justify-center gap-2 w-full">
            <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="leading-snug text-[11px]">
              {isAr
                ? 'مضبوط ومجرّب ليعمل فورياً مع كاميرا جميع الهواتف الذكية (Android & iPhone).'
                : "Compatible instantanément avec l'appareil photo de tous les smartphones."}
            </span>
          </div>

          {/* Direct URL Display & Quick Copy */}
          <div className="w-full mt-3 bg-[#FCF8F9] border border-[#E2E8F0] rounded-xl p-2.5 flex items-center justify-between gap-2">
            <span className="text-[11px] text-[#1E293B] font-mono truncate select-all">
              {APP_SHARED_URL}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#D81B60] text-[#D81B60] transition-colors shrink-0 flex items-center gap-1 text-xs font-bold"
              title={isAr ? 'نسخ الرابط' : 'Copier'}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 text-[10px]">{isAr ? 'تم النسخ' : 'Copié'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{isAr ? 'نسخ' : 'Copier'}</span>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons: Download Image, Share, Open in Browser */}
          <div className="w-full grid grid-cols-3 gap-2 mt-3.5">
            <button
              onClick={handleDownloadQr}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-2xs transition-colors"
              title={isAr ? 'تحميل صورة رمز QR للطباعة أو النشر' : 'Télécharger Image'}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="truncate">{isAr ? 'تحميل الصورة' : 'Télécharger'}</span>
            </button>

            <button
              onClick={handleShare}
              data-testid="share-qr-btn"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl font-bold text-xs shadow-2xs transition-colors"
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

          {downloadSuccess && (
            <p className="text-[11px] text-emerald-600 font-bold mt-2 text-center animate-in fade-in flex items-center justify-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isAr ? 'تم تحميل صورة الرمز بنجاح! جاهزة للنشر والطباعة' : 'Code QR téléchargé avec succès !'}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
