import React, { useState } from 'react';
import { 
  X, Smartphone, Download, Share2, PlusSquare, 
  CheckCircle2, Copy, Check, ExternalLink, QrCode, ArrowLeft
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallAppModalProps {
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copiedLink, setCopiedLink] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // Public shareable URL for phones (ais-pre is publicly accessible without developer auth cookies)
  const appUrl = 'https://ais-pre-aoyxs6a3fu6jo22p6zfy5k-177457471198.europe-west2.run.app';

  const handleCopyLink = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(appUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = appUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleTriggerInstall = async () => {
    const success = await install();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-amber-500 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-black text-xl">
              ح
            </div>
            <div>
              <h3 className="font-extrabold text-base">تحميل وتثبيت التطبيق على الهاتف</h3>
              <p className="text-xs text-amber-100">تطبيق حرفي بلادي - بدون الحاجة إلى متجر Play Store</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* If already installed or just installed */}
          {isInstalled || installSuccess ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-stone-900 text-lg">التطبيق مثبت على هاتفك بنجاح!</h4>
              <p className="text-xs text-stone-600">
                يمكنك الآن فتح التطبيق مباشرة من الشاشة الرئيسية لهاتفك كأي تطبيق رسمي.
              </p>
            </div>
          ) : (
            <>
              {/* Direct Install Button if supported by current browser (Android / Chrome) */}
              {isInstallable && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center space-y-3">
                  <h4 className="font-bold text-stone-900 text-sm">متصفحك يدعم التثبيت بنقرة واحدة!</h4>
                  <button
                    onClick={handleTriggerInstall}
                    className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black text-base shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
                  >
                    <Download className="w-5 h-5" />
                    <span>تثبيت التطبيق على هاتفي الآن</span>
                  </button>
                </div>
              )}

              {/* Instructions for Android (Google Chrome) */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>طريقة التثبيت على هواتف أندرويد (Android / Chrome):</span>
                </div>
                
                <ol className="space-y-2 text-xs text-stone-700 list-decimal list-inside pr-1 leading-relaxed">
                  <li>افتح رابط التطبيق في متصفح <strong>Google Chrome</strong> على هاتفك.</li>
                  <li>اضغط على <strong>قائمة الخيارات (الثلاث نقاط ⋮)</strong> في أعلى يسار المتصفح.</li>
                  <li>اختر <strong>"تثبيت التطبيق" (Installer l'application)</strong> أو <strong>"إضافة إلى الشاشة الرئيسية" (Ajouter à l'écran d'accueil)</strong>.</li>
                  <li>اضغط على <strong>تثبيت (Installer)</strong> وستظهر أيقونة التطبيق مباشرة على شاشة هاتفك!</li>
                </ol>
              </div>

              {/* Instructions for iPhone (iOS Safari) */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <Smartphone className="w-4 h-4 text-stone-900 shrink-0" />
                  <span>طريقة التثبيت على هواتف آيفون (iPhone / iPad - Safari):</span>
                </div>
                
                <ol className="space-y-2 text-xs text-stone-700 list-decimal list-inside pr-1 leading-relaxed">
                  <li>افتح الرابط في متصفح <strong>Safari</strong> على هاتفك الآيفون.</li>
                  <li>اضغط على زر <strong>المشاركة (Share <Share2 className="w-3.5 h-3.5 inline mx-1 text-blue-600" />)</strong> في أسفل الشاشة.</li>
                  <li>انزل في القائمة واضغط على <strong>"إضافة إلى الشاشة الرئيسية" (Sur l'écran d'accueil <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-stone-700" />)</strong>.</li>
                  <li>اضغط على <strong>إضافة (Ajouter)</strong> في أعلى اليمين.</li>
                </ol>
              </div>

              {/* Copy Link to Open on Phone */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-stone-700 block mb-1.5">
                  أرسل الرابط لهاتفك أو انسخه لفتحه:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={appUrl}
                    className="flex-1 px-3 py-2 text-xs bg-stone-100 border border-stone-300 rounded-lg font-mono text-stone-700 truncate"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'تم النسخ!' : 'نسخ الرابط'}</span>
                  </button>
                </div>
              </div>

              {/* Benefits of App Installation */}
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs text-stone-700 space-y-1.5">
                <span className="font-bold text-stone-900 block">مميزات التطبيق على الهاتف:</span>
                <div className="flex items-center gap-2 text-stone-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>يعمل حتى مع ضعف أو انقطاع الإنترنت لحفظ الأرقام</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>فتح فوري بملء الشاشة بدون أشرطة المتصفح مثل التطبيقات الأصلية</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>اتصال مباشر بأرقام الحرفيين والواتساب بنقرة واحدة</span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <span className="text-xs text-stone-500">حرفي بلادي - متاح لجميع الهواتف</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            فهمت، شكراً
          </button>
        </div>

      </div>
    </div>
  );
};
